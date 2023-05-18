//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "../interface/core/IDefiBets.sol";



error DefiBets__Forbidden();
error DefiBets__NoValidExpTime();
error DefiBets__NoValidPrice();
error DefiBets__NoValidWinningPrice();
error DefiBets__OutOfActiveExpTimeRange();
error DefiBets__AlreadyInitialized();
error DefiBets__ParameterNotInitialized();
error DefiBets_NoValidParamters();
error DefiBets__TokenDontExists();
error DefiBets__NotExecutableTime();
error DefiBets__NotTheTokenOwner();
error DefiBets__NotEpxired();

contract DefiBets is ERC721, Ownable, IDefiBets {

    using SafeMath for uint256;
    using Counters for Counters.Counter;
    


    struct ExpTimeInfo {
        uint256 maxUserWinning;
        uint256 totalBets;
        uint256 maxLossLimit;
        uint256 expPrice;
        uint256 deltaValue;
        uint256 slotSize;
        bool finished;
        bool profit;
        bool init;
    }

    struct Bet {
        uint256 expTime;
        uint256 betSize;
        uint256 profit;
        uint256 minPrice;
        uint256 maxPrice;
    }

    uint256 public constant EXP_TIME_DELTA = 60*60*24;

    /* ====== State Variables ====== */
    Counters.Counter private tokenIds;
    string public underlying;
    bool private initialized;
    uint256 public minBetDuration;
    uint256 public maxBetDuration;
    uint256 public slot;                /* Steps of valid bet prices */
    uint256 public maxWinMultiplier;    /* How much should a winner be able to multiply his bet amount (also important for minimum bet range) */

    


    //All mappings can be searched with the expiration date.
    uint256 private  startExpTime;
    uint256 public lastActiveExpTime;
    mapping(uint256 => bool) private validExpTime;
    mapping(uint256 => ExpTimeInfo) public expTimeInfos;
    mapping(uint256 => Bet) private bets;

    mapping(uint => mapping(uint256 => uint256)) public betsWinningSlots;

    address public defiBetsManager;
    


    /* ====== Events ====== */
    event EpxirationTimeCreated(uint256 expTime,uint256 maxLpLoss);
    event ExpiryTimeBetInfoUpdated(uint256 expirationDate,uint256 totalBets,uint256 maxUserWinnings);
    event BetPlaced(address indexed account,uint256 betSize,uint256 profit,uint256 expDate,uint256 minPrice,uint256 maxPrice);
    event Expiration(uint256 expTime,bool profit, uint256 delta);
    event BetParameterUpdated(uint256 minBetDuration,uint256 maxBetDuration,uint256 slot);

    /**
     * @param _defiBetsManager - the manager and owner of the contract. 
     */
    constructor(string memory _underlying,address _defiBetsManager) ERC721("DefiBetsToken","DB"){
        underlying = _underlying;
        
        defiBetsManager = _defiBetsManager;
    }

    /* ====== Mutation Functions ====== */
    function setBetForAccount(address _account,uint256 _betSize,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime,uint256 _winning) external {
        _isDefiBetManager();
        _isInitialized();

        // validate input paramaters
        _validExpirationTime(_expTime);
        _isValidActiveTimeRange(_expTime);
        _validPriceRange(_minPrice, _maxPrice);

        uint256 _maxUserWinnings = calculateMaxUserWinnings(_expTime,_minPrice,_maxPrice,_winning);
        
        uint256 _maxLPLoss = calculateMaxLPLoss(_maxUserWinnings,expTimeInfos[_expTime].totalBets);

        if(_maxLPLoss > expTimeInfos[_expTime].maxLossLimit){
            revert DefiBets__NoValidWinningPrice();
        }

        _updateBetInfo(_expTime,_maxUserWinnings,_betSize);

        _createBetData(_account,_expTime,_betSize,_winning,_minPrice,_maxPrice);

        //Attention: This function has high gas costs!!!!
        _distributeWinningsToSlots( _minPrice, _maxPrice, _winning, _expTime);

        emit BetPlaced(_account,_betSize,_winning,_expTime,_minPrice,_maxPrice);
    }

    function claimForAccount(address _account,uint256 _tokenId) external returns(uint256,uint256,bool) {
        _isDefiBetManager();

        Bet memory _betTokenInfo = getBetTokenData(_tokenId);
        ExpTimeInfo memory _expInfo = expTimeInfos[_betTokenInfo.expTime];

        if(_expInfo.finished != true){
            revert DefiBets__NotEpxired();
        }

        if(ownerOf(_tokenId) != _account){
            revert DefiBets__NotTheTokenOwner();
        }


        uint256 _tokensForClaim;
        bool _profits;

        if(_expInfo.expPrice >= _betTokenInfo.minPrice && _expInfo.expPrice < _betTokenInfo.maxPrice){
            _tokensForClaim = _betTokenInfo.profit;

            _profits = true;
        }

        
        
        _burn(_tokenId);

        return (_tokensForClaim,_betTokenInfo.expTime,_profits);
    }

    function performExpiration(uint256 _expTime,uint256 _expPrice) external returns(uint256,bool) {
        _isDefiBetManager();
        _isInitialized();

        _validExpirationTime(_expTime);

        if(_expTime > block.timestamp) {
            revert DefiBets__NotExecutableTime();
        }

        (uint256 _delta,bool _profit) = _evaluateProfits(_expTime,_expPrice);

        //update the data 
        expTimeInfos[_expTime].deltaValue = _delta;
        expTimeInfos[_expTime].profit = _profit;

        expTimeInfos[_expTime].finished = true;
        expTimeInfos[_expTime].expPrice = _expPrice;

        emit Expiration(_expTime,_profit,_delta);

        return (_delta,_profit);
    }

    function initializeNewExpTime(uint256 _maxLpLoss) external {
        _isDefiBetManager();
        
        _isNextExpTimeValid();

        uint256 _expTime = lastActiveExpTime.add(EXP_TIME_DELTA);

        if(expTimeInfos[_expTime].init == false){
        _initExpTime(_expTime,_maxLpLoss);}
    }

    /* ====== Setup Function ====== */
    
    
    function initializeData(uint256 _startExpTime, uint256 _maxLossPerExpTime, uint256 _minBetDuration, uint256 _maxBetDuration, uint256 _slot, uint256 _maxWinMultiplier) external   {
        _isDefiBetManager();

        if(initialized){
            revert DefiBets__AlreadyInitialized();
        }

        startExpTime = _startExpTime;
        
        setBetParamater(_maxLossPerExpTime,_minBetDuration,_maxBetDuration,_slot, _maxWinMultiplier);

        initialized = true;
    }

    //TODO: Only the owner of the contract can call the function
    function setBetParamater(uint256 _maxLossPerExpTime, uint256 _minBetDuration,uint256 _maxBetDuration,uint256 _slot, uint256 _maxWinMultiplier) public {
        _isDefiBetManager();
        if(_minBetDuration >= _maxBetDuration){
            revert DefiBets_NoValidParamters();
        }

        minBetDuration = _minBetDuration;
        maxBetDuration = _maxBetDuration;
        slot = _slot;
        maxWinMultiplier = _maxWinMultiplier;
        
        _initializeMaxWinningsPerExpTime(_maxLossPerExpTime);

        emit BetParameterUpdated(minBetDuration,maxBetDuration,slot);
    }

    
    /* ====== Internal Functions ====== */

   

    function _createBetData(address _account,uint256 _expTime,uint256 _betSize,uint256 _winning,uint256 _minPrice,uint256 _maxPrice) internal {
     

        tokenIds.increment();
        uint256 newTokenId = tokenIds.current();
        _mint(_account, newTokenId);

        Bet memory _newBet;

        _newBet.betSize = _betSize;
        _newBet.minPrice = _minPrice;
        _newBet.maxPrice = _maxPrice;
        _newBet.profit = _winning;
        _newBet.expTime = _expTime;

        bets[newTokenId] = _newBet;

    }

    function _updateBetInfo(uint256 _expTime,uint256 _userWinnings,uint256 _betSize) internal {
        uint256 _totalBets = expTimeInfos[_expTime].totalBets;

        expTimeInfos[_expTime].maxUserWinning = _userWinnings;
        expTimeInfos[_expTime].totalBets = _totalBets.add(_betSize);

        emit ExpiryTimeBetInfoUpdated(_expTime,expTimeInfos[_expTime].totalBets,_userWinnings);
    }

    function _distributeWinningsToSlots(uint256 _minPrice,uint256 _maxPrice,uint256 _winning,uint256 _expTime)internal{
        
        uint256 _slotAmount = (_maxPrice.sub(_minPrice)).div(slot);

        for(uint i = 0;i < _slotAmount;i++){
            uint256 _slot = _minPrice.add(i.mul(slot));
            
            uint256 _slotWinning = betsWinningSlots[_expTime][_slot];

            betsWinningSlots[_expTime][_slot] = _slotWinning.add(_winning);
        }

    }

    function _isDefiBetManager() internal view {
        if(msg.sender != defiBetsManager){
            revert DefiBets__Forbidden();
        }
    }

    function _validExpirationTime(uint256 _expTime) internal view{

        if(expTimeInfos[_expTime].init != true){
            revert DefiBets__NoValidExpTime();
        }
    }

    function _isValidActiveTimeRange(uint256 _expTime) internal view {
        if(_expTime < block.timestamp.add(minBetDuration) || _expTime > block.timestamp.add(maxBetDuration)){
            revert DefiBets__OutOfActiveExpTimeRange();
        }
    }

    function _validPriceRange(uint256 minPrice, uint256 maxPrice) internal view {
        if((0 != (minPrice % slot)) ||
            (0 != (maxPrice % slot)) ||
            (minPrice >= maxPrice))
        {
            revert DefiBets__NoValidPrice();
        }
    }

    function _isNotIntialized() internal view {
        if(initialized){
            revert DefiBets__AlreadyInitialized();
        }
    }

    function _initializeMaxWinningsPerExpTime(uint256 _maxLossPerExpTime) internal {
        uint256 _timeSteps = (maxBetDuration.sub(minBetDuration)).div(EXP_TIME_DELTA);

        for(uint i = 0; i< _timeSteps;i++){
            uint256 _expTime = startExpTime.add(EXP_TIME_DELTA.mul(i));

          _initExpTime(_expTime,_maxLossPerExpTime);
        }

        lastActiveExpTime = startExpTime.add(EXP_TIME_DELTA.mul(_timeSteps.sub(1)));
    }

    function _initExpTime(uint256 _expTime,uint256 _maxLoss) internal {
            
            expTimeInfos[_expTime].maxLossLimit = _maxLoss;
            expTimeInfos[_expTime].init = true;
            expTimeInfos[_expTime].slotSize = slot;

            emit EpxirationTimeCreated(_expTime,_maxLoss);
    }

    function _isInitialized() internal view {
        if(initialized != true){
            revert DefiBets__ParameterNotInitialized();
        }
    }



    function _evaluateProfits(uint256 _expTime,uint256 _expPrice) internal view returns(uint256,bool){
        uint256 _delta;
        bool _profit;
        uint256 _totalBets = expTimeInfos[_expTime].totalBets;
        uint256 _winningsExist;

        if(_expPrice % slot == 0){
  
            _winningsExist =  betsWinningSlots[_expTime][_expPrice];
 
        }else{
            _winningsExist = betsWinningSlots[_expTime][_expPrice.sub(_expPrice.mod(slot))];
        }

        _profit = _totalBets > _winningsExist;

        _delta = _profit ? _totalBets.sub(_winningsExist) : _winningsExist.sub(_totalBets);

        return (_delta,_profit);

    }

    function _isNextExpTimeValid() internal view {
        uint256 _nextExpTime = lastActiveExpTime.add(EXP_TIME_DELTA);
        if(_nextExpTime > block.timestamp){
            revert DefiBets__OutOfActiveExpTimeRange();
        }


    }

    /* ====== Pure/View Functions ====== */

    function calculateMaxUserWinnings(uint256 _expTime,uint256 _minPrice, uint256 _maxPrice, uint256 _winning) public view returns(uint256){
        uint256 _maxUserWinnings = expTimeInfos[_expTime].maxUserWinning;

        uint256 _slotAmount = (_maxPrice.sub(_minPrice)).div(slot);

        for(uint i = 0; i<= _slotAmount;i++){
            uint256 _price = _minPrice.add(i.mul(slot));
            uint256 _winningSlot = betsWinningSlots[_expTime][_price].add(_winning);

            if(_maxUserWinnings < _winningSlot){
                _maxUserWinnings = _winningSlot;
            }
        }

        return (_maxUserWinnings);
    }


    function calculateMaxLPLoss(uint256 _maxUserWinnings,uint256 _totalBets) public pure returns(uint256){
        if(_maxUserWinnings > _totalBets){
            return _maxUserWinnings.sub(_totalBets);
        }

        return 0;
    }

   

    function getStartExpTime() public view returns(uint256){
        return startExpTime;
    }

    function getBetTokenData(uint256 _tokenId) public view returns (Bet memory){
        if(_exists(_tokenId) != true){
            revert DefiBets__TokenDontExists();
        }

        return bets[_tokenId];
    }
    
}
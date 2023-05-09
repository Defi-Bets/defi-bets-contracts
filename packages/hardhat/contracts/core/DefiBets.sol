//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../interface/math/IDefiBetsMath.sol";

error DefiBets__Forbidden();
error DefiBets__NoValidExpTime();
error DefiBets__NoValidPrice();
error DefiBets__OutOfActiveExpTimeRange();
error DefiBets__AlreadyInitialized();

contract DefiBets {

    using SafeMath for uint256;

    struct BetInfo {
        uint256 maxUserWinning;
        uint256 totalBets;
        uint256 maxLPLoss;
        bool finished;
        uint256 expPrice;
    }

    struct PlayerBet {
        uint256 betSize;
        uint256 profit;
        uint256 minPrice;
        uint256 maxPrice;
        bool claimed;
    }

    uint256 public constant EXP_TIME_DELTA = 60*60*24;

    /* ====== State Variables ====== */
    uint256 public maxLossPerDay; //max loss per day in percent with 2 decimals e.g. 1% => 100
    uint256 public minBetDuration;
    uint256 public maxBetDuration;
    uint256 public slot;


    //All mappings can be searched with the expiration date.
    uint256 private immutable startExpTime;
    // uint256 private lastExpTime;
    bool private initialized;
    mapping(uint256 => bool) private validExpTime;
    mapping(uint256 => BetInfo) public bets;
    mapping(uint => mapping(uint256 => uint256)) public betsWinningSlots;
    mapping(uint256 => mapping(address => PlayerBet)) public playerBets;

    address public defiBetsManager;
    address public mathContract;


    /* ====== Events ====== */
    event EpxirationTimeCreated(uint256 expTime);
    event ExpiryTimeBetInfoUpdated(uint256 expirationDate,uint256 totalBets,uint256 maxUserWinnings,uint256 maxLPLoss);
    event BetPlaced(address indexed account,uint256 betSize,uint256 profit,uint256 expDate,uint256 minPrice,uint256 maxPrice);
    event BetFinished(uint256 expTime,bool lpWin, uint256 totalAmount);
    event BetParameterUpdated(uint256 maxLossPerDay,uint256 minBetDuration,uint256 maxBetDuration,uint256 slot);

    /**
     * @param _defiBetsManager - the manager and owner of the contract. 
     * @param _mathContract - the math contract, where you can calulate possible winnings for the bet 
     * @param _startExpTime - the start time when someone is able to place a bet
     */
    constructor(address _defiBetsManager,address _mathContract,uint256 _startExpTime){
        defiBetsManager = _defiBetsManager;
        mathContract = _mathContract;

        startExpTime = _startExpTime;
    }

    /* ====== Mutation Functions ====== */
    function setBetForAccount(address _account,uint256 _betSize,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime) external {
        _isDefiBetManager();


        // validate input paramaters
        _validExpirationTime(_expTime);
        _isValidActiveRange(_expTime);
        _validPrice(_minPrice);
        _validPrice(_maxPrice);

        uint256 _winning = IDefiBetsMath(mathContract).calculateWinning(_minPrice,_maxPrice,_betSize,_expTime);

        uint256 _maxUserWinnings = calculateMaxUserWinnings(_expTime,_minPrice,_maxPrice,_winning);
        uint256 _maxLPLoss = calculateMaxLPLoss(_maxUserWinnings,bets[_expTime].totalBets);

        //TODO: Check if the loss is valid

        _updateBetInfo(_expTime,_maxUserWinnings,_maxLPLoss,_betSize);

        _setPlayerBet(_account,_expTime,_betSize,_winning,_minPrice,_maxPrice);

        _distributeWinningsToSlots( _minPrice, _maxPrice, _winning, _expTime);

        emit BetPlaced(_account,_betSize,_winning,_expTime,_minPrice,_maxPrice);
    }

    /* ====== Setup Function ====== */
    
    function setBetParamater(uint256 _maxLossPerDay,uint256 _minBetDuration,uint256 _maxBetDuration,uint256 _slot) external {
        maxLossPerDay = _maxLossPerDay;
        minBetDuration = _minBetDuration;
        maxBetDuration = _maxBetDuration;
        slot = _slot;

        emit BetParameterUpdated( maxLossPerDay, minBetDuration, maxBetDuration, slot);
    }

    
    /* ====== Internal Functions ====== */

    function _setPlayerBet(address _account,uint256 _expTime,uint256 _betSize,uint256 _winning,uint256 _minPrice,uint256 _maxPrice) internal {
        PlayerBet memory _newBet;

        _newBet.betSize = _betSize;
        _newBet.minPrice = _minPrice;
        _newBet.maxPrice = _maxPrice;
        _newBet.profit = _winning;

        playerBets[_expTime][_account] = _newBet; 

    }

    function _updateBetInfo(uint256 _expTime,uint256 _userWinnings,uint256 _maxLPLoss,uint256 _betSize) internal {
        uint256 _totalBets = bets[_expTime].totalBets;

        bets[_expTime].maxLPLoss = _maxLPLoss;
        bets[_expTime].maxUserWinning = _userWinnings;
        bets[_expTime].totalBets = _totalBets.add(_betSize);

        emit ExpiryTimeBetInfoUpdated(_expTime,bets[_expTime].totalBets,_userWinnings,_maxLPLoss);
    }

    function _distributeWinningsToSlots(uint256 _minPrice,uint256 _maxPrice,uint256 _winning,uint256 _expTime)internal{
        
        uint256 _slotAmount = (_maxPrice.sub(_minPrice)).div(slot);

        for(uint i = 0;i <= _slotAmount;i++){
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

        if((_expTime.sub(startExpTime)) % EXP_TIME_DELTA != 0){
            revert DefiBets__NoValidExpTime();
        }
    }

    function _isValidActiveRange(uint256 _expTime) internal view {
        if(_expTime < block.timestamp.add(minBetDuration) || _expTime > block.timestamp.add(maxBetDuration)){
            revert DefiBets__OutOfActiveExpTimeRange();
        }
    }

    function _validPrice(uint256 _price) internal view {
        if(_price % slot != 0){
            revert DefiBets__NoValidPrice();
        }
    }

    function _isNotIntialized() internal view {
        if(initialized){
            revert DefiBets__AlreadyInitialized();
        }
    }

    

    /* ====== Pure/View Functions ====== */

    function calculateMaxUserWinnings(uint256 _expTime,uint256 _minPrice, uint256 _maxPrice, uint256 _winning) public view returns(uint256){
        uint256 _maxUserWinnings = bets[_expTime].maxUserWinning;

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

    function isExpTimeValid(uint256 _expTime) public view returns(bool){
        return validExpTime[_expTime];
    }

    function getStartExpTime() public view returns(uint256){
        return startExpTime;
    }
    
}
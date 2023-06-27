//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import '../interface/core/ILiquidityPool.sol';
import "../interface/core/IDefiBets.sol";
import "../interface/math/IDefiBetsMath.sol";
import "../interface/core/IDefiBetsVault.sol";
import "../interface/core/IDefiBetsManager.sol";
import "../interface/core/IDefiBetsPayoutRatio.sol";

// Library import
import "../lib/MathLibraryDefibets.sol";


error DefiBetsManager__NoValidUnderlying();
error DefiBetsManager__NoLiquidity();
error DefiBetsManager__FeeNotAllowed();
error DefiBetsManager__FeeWouldBeTooSmall();
error DefiBetsManager__ParamNull();
error DefiBetsManager__NotValidRoundId();
error DefiBetsManager__AccessForbidden();


/**
* @title DefiBets Manager Contract
* @notice This contract controls the main functions of the protocol, allowing users to interact with the decentralized betting platform. It manages liquidity, bets, winnings, and expiration of bets.
*/
contract DefiBetsManager is Pausable,Ownable,IDefiBetsManager {

    using SafeMath for uint256;

    struct IVFeed{
        address feedAddress;
        uint256 period;
    }

    uint256 public constant MAX_FEE_PPM = 50000; // in ppm (parts per million). 50.000 ppm = 5% = 0,050000
    uint256 public constant MILLION = 1000000;

    /* ====== State Variables ====== */

    address public liquidityPool;
    address public payoutRatioContract;
    
    uint256 public feePpm;
    uint256 public payoutFactor;       /* payout per 100 */

    mapping(bytes32 => IVFeed) public underlyingIVFeeds;
    mapping(bytes32 => address) public underlyingPriceFeeds;
    mapping(bytes32 => bool) public validUnderlying;
    mapping(bytes32 => address) public defiBetsContracts;
    mapping(bytes32 => address) public vaults;

    /* ====== Events ====== */
    event UnderlyingAdded(string underlying,bytes32 underlyingHash,address defiBets,address vault);
    event PriceFeedUpdated(bytes32 underlying,address priceFeed);
    event FeeUpdated(uint256 feePpm);
    event IVFeedUpdated(bytes32 underlying,address feed,uint256 period);

    constructor(uint256 _feePpm,uint8 _startPayoutFactor){
       feePpm = _feePpm;
       payoutFactor = _startPayoutFactor;
    }


    /* ======= Mutation Functions ====== */

    /**
    * @dev Provides liquidity to the liquidity pool on behalf of a user.
    * @param _amount The amount of liquidity to be provided.
    */
    function provideLP(uint256 _amount) external whenNotPaused() {

        ILiquidityPool(liquidityPool).depositForAccount(msg.sender,_amount);

    }


    function redeemLPTokens(uint256 _amount) external whenNotPaused() {
        ILiquidityPool(liquidityPool).redeemSharesForAccount(msg.sender,_amount);
    }


    /**
    * 
    * @dev Sets a bet for a user in the decentralized betting platform.
    * @param _betSize The size of the bet.
    * @param _minPrice The minimum price for the bet.
    * @param _maxPrice The maximum price for the bet.
    * @param _expTime The expiration time for the bet.
    * @param _underlying The underlying asset for the bet.
    */
    function setBet(uint256 _betSize,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime,string memory _underlying) external whenNotPaused(){
        bytes32 _hash = getUnderlyingByte(_underlying);
        _isValidUnderlying(_hash);

        uint256 _fee = calculateFee(_betSize);
     
        uint256 _price = getCurrPrice(_hash);

        uint256 _winning = calculateWinning(_price,_betSize,_fee,_minPrice,_maxPrice,_expTime,_hash);

        address _defiBets = defiBetsContracts[_hash];
        address _vault = vaults[_hash];
        
        _executeBetForAccount(_defiBets,_betSize.sub(_fee),_minPrice,_maxPrice,_expTime,_winning);

        IDefiBetsPayoutRatio(payoutRatioContract).updateLpWins(_betSize.sub(_fee));

        IDefiBetsVault(_vault).deposit(msg.sender,_betSize,_expTime,_fee);
    }


    /**
    * @dev Claims the winnings for a user based on a specified token ID and underlying asset hash.
    * @param _tokenId The token ID representing the bet.
    * @param _hash The hash of the underlying asset for the bet.
    */
    function claimWinnings(uint256 _tokenId,bytes32 _hash) external whenNotPaused() {
                
        address _defiBets = defiBetsContracts[_hash];
        address _vault = vaults[_hash];

        (uint256 _token,uint256 _expTime,bool _profit) = IDefiBets(_defiBets).claimForAccount(msg.sender,_tokenId);
       

        if(_profit == true){
            IDefiBetsVault(_vault).withdraw(msg.sender,_token,_expTime);
        }
    }


    /**
    * @dev Executes the expiration of a bet based on the specified expiration time and underlying asset.
    * @param _expTime The expiration time of the bet.
    * @param _underlying The underlying asset for the bet.
    * @param _roundId The round id for a valid price of the underlying
    */
    function executeExpiration(uint256 _expTime,string memory _underlying,uint80 _roundId) external whenNotPaused() {
        bytes32 _hash = getUnderlyingByte(_underlying);
       _isValidUnderlying(_hash);
     
        uint256 _price = getPrice(_hash,_expTime,_roundId);

        address _defiBets = defiBetsContracts[_hash];
        address _vault = vaults[_hash];

        (uint256 _delta,bool _profit, uint256 _playerWinnings) = IDefiBets(_defiBets).performExpiration(_expTime,_price);

        if(_profit == true){
            IDefiBetsPayoutRatio(payoutRatioContract).updatePlayerWins(payoutFactor, _playerWinnings);

            IDefiBetsVault(_vault).withdraw(liquidityPool,_delta,_expTime);
        }else{
            ILiquidityPool(liquidityPool).transferTokensToVault(_delta);

            IDefiBetsVault(_vault).depositFromLP(_expTime,_delta);
        }

        ILiquidityPool(liquidityPool).resetLockedTokens(_expTime);

    }

    function createNewExpTime(bytes32 _tokenHash) external whenNotPaused() {
        
        _isValidUnderlying(_tokenHash);

        uint256 _maxLoss = ILiquidityPool(liquidityPool).maxLPLost();

        address _defiBets = defiBetsContracts[_tokenHash];

        IDefiBets(_defiBets).initializeNewExpTime(_maxLoss);
       
    }


    /* ====== Setup Functions ====== */

    function setAddresses(address _liquidityPool, address _payoutRatioContract) external onlyOwner {
        liquidityPool = _liquidityPool;
        payoutRatioContract = _payoutRatioContract;
    }

    function addUnderlyingToken(string memory _underlying,address _feed,address _defiBets,address _vault) external onlyOwner {
        bytes32 _hash = getUnderlyingByte(_underlying);

        validUnderlying[_hash] = true;

        updatePriceFeed(_hash,_feed);

        defiBetsContracts[_hash] = _defiBets;
        vaults[_hash] = _vault;

        emit UnderlyingAdded(_underlying,_hash,_defiBets,_vault);
    } 

    function updatePriceFeed(bytes32 _hash,address _feed) public onlyOwner  {
        _isValidUnderlying(_hash);

        underlyingPriceFeeds[_hash] = _feed;

        emit PriceFeedUpdated(_hash,_feed);
    }

    function updateIVFeed(bytes32 _hash,address _feed, uint256 _period) public onlyOwner{
        _isValidUnderlying(_hash);

        underlyingIVFeeds[_hash] = IVFeed(_feed,_period);

        emit IVFeedUpdated(_hash,_feed,_period);
    }

    function initializeBets(bytes32 _hash,uint256 _startExpTime,uint256 _minBetDuration,uint256 _maxBetDuration,uint256 _slot, uint256 _maxWinMultiplier) external onlyOwner {
        uint256 _maxLoss = ILiquidityPool(liquidityPool).maxLPLost();

        if(_maxLoss == 0){
            revert DefiBetsManager__NoLiquidity();
        }

        address _defiBets = defiBetsContracts[_hash];

        IDefiBets(_defiBets).initializeData(_startExpTime,_maxLoss,_minBetDuration,_maxBetDuration,_slot,_maxWinMultiplier);
    }

   

    function setFeesPpm(uint256 _newFee) external onlyOwner {
        if(_newFee > MAX_FEE_PPM){
            revert DefiBetsManager__FeeNotAllowed();
        }

        feePpm = _newFee;

        emit FeeUpdated(feePpm);
    }


    function setDefiBetsParameter(uint256 _maxLossPerExpTime, uint256 _minBetDuration,uint256 _maxBetDuration,uint256 _slot, uint256 _maxWinMultiplier,uint256 _timeDelta,uint256 _dependentTimeStamp,bytes32 _hash) external onlyOwner {
        _isValidUnderlying(_hash);

        address _defiBetsAddress = defiBetsContracts[_hash];

        IDefiBets(_defiBetsAddress).setBetParamater(_maxLossPerExpTime,_maxBetDuration,_minBetDuration,_slot,_maxWinMultiplier,_timeDelta,_dependentTimeStamp);


    }

    function updateMaxLPLoss(uint256 _newMaxLoss) external onlyOwner{
        ILiquidityPool(liquidityPool).updateMaxLoss(_newMaxLoss);
    }

    /* ====== Internal Functions ====== */

    function _isValidUnderlying(bytes32 _hash) internal view {
        if(validUnderlying[_hash] == false){
            revert DefiBetsManager__NoValidUnderlying();
        }
    }

    function _isPayoutRatioContract() internal view {
        if(msg.sender != payoutRatioContract){
            revert DefiBetsManager__AccessForbidden();
        }
    }

    function _executeBetForAccount(address _defiBets,uint256 _netBetSize,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime,uint256 _winning) internal {
        
        (uint256 _deltaLockedTokenSupply,bool _increase) = IDefiBets(_defiBets).setBetForAccount(msg.sender,_netBetSize,_minPrice,_maxPrice,_expTime,_winning);
       
        ILiquidityPool(liquidityPool).updateLockedTokenSupply(_deltaLockedTokenSupply,_increase,_expTime);
        
    }

    function _isRoundIdValid(uint256 _expTime,uint80 _roundId,uint80 _latestRoundId,uint256 _latestRoundIdTimestamp,address _priceFeed) internal view {
       bool _valid = true;

       if(_roundId > _latestRoundId){
        _valid = false;
       }


        if(_roundId < _latestRoundId){

            (,,,uint256 _timestamp,) = AggregatorV3Interface(_priceFeed).getRoundData(_roundId+1);
            _valid = _timestamp >= _expTime;
        }

        if(_roundId == _latestRoundId){
        _valid = _latestRoundIdTimestamp <= _expTime;
        }
       
       if(_valid == false ){
        revert DefiBetsManager__NotValidRoundId();
       }
    }

    function _calculateWinnings(uint256 _value,uint256 _probability) internal view returns(uint256){
        
        return (_value).mul(10000).div(_probability).mul(payoutFactor).div(100);
    }


    /* ====== Pure/View Functions ====== */

    function getCurrPrice(bytes32 _hash) public view returns(uint256){
        uint256 price;
        

        address _priceFeed = underlyingPriceFeeds[_hash];

        
        ( ,
        int256 answer,
        ,
        ,
        ) = AggregatorV3Interface(_priceFeed).latestRoundData();

        price = uint256(answer);

       

        return price;
    }

    function getPrice(bytes32 _hash,uint256 _expTime,uint80 _roundId) public view returns(uint256){
        uint256 price;
        
        if(underlyingPriceFeeds[_hash] != address(0) && block.timestamp >= _expTime){

            address _priceFeed = underlyingPriceFeeds[_hash];

            (uint80 _latestRoundId,int256 _latestAnswer,,uint256 _latestTimestamp,) = AggregatorV3Interface(_priceFeed).latestRoundData();

            _isRoundIdValid(_expTime,_roundId,_latestRoundId,_latestTimestamp,_priceFeed);


            if(_latestRoundId == _roundId){
                price = uint256(_latestAnswer);
            }else{
                 ( ,
            int256 _answer,
            ,
            ,
            ) = AggregatorV3Interface(_priceFeed).getRoundData(_roundId);
             price = uint256(_answer);
            }


        
        }

        return price;
    }

    function getUnderlyingByte(string memory _token) public pure returns(bytes32){
        return keccak256(bytes(_token));
    }

    function calculateFee(uint256 _amount) public view returns(uint256){
        _isNotNull(_amount);

        if(feePpm == 0){
            return 0;
        }
        
        // multiply amount with fee. But because fee is in parts per 1 million (ppm), divide by 1 million
        uint256 _feeAmount = _amount.mul(feePpm).div(MILLION);  

        if(0 == _feeAmount)
        {
            // amount or feePpm is extremely small. Do not accept.
            revert DefiBetsManager__FeeWouldBeTooSmall();
        }

        return _feeAmount;
    }

    function calculateWinning(uint256 _price,uint256 _betSize,uint256 _fee,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime,bytes32 _hash) public view returns (uint256){

        //Probabiliy per 10000
        uint256 probability = MathLibraryDefibets.calculateProbabilityRange(
        _minPrice,
        _maxPrice,
        _price,      /* current price BTC */
        getImplVol(_hash),       
        underlyingIVFeeds[_hash].period,      
        (_expTime.sub(block.timestamp)));     /* days untill expiry * 10000 */

        return _calculateWinnings(_betSize.sub(_fee),probability);
    }

    function _isNotNull(uint256 param) internal pure {
        if(0 == param) {
            revert DefiBetsManager__ParamNull();
        }
    }

    function getLPTokenSupplies() external view returns(uint256,uint256){
        uint256 _totalSupply = ILiquidityPool(liquidityPool).totalTokenSupply();
        uint256 _lockedSupply = ILiquidityPool(liquidityPool).lockedTokenSupply();

        return (_totalSupply,_lockedSupply);

    }

    function getImplVol(bytes32 _hash) public view returns(uint256){


        ( ,
        int256 answer,
        ,
        ,
        ) = AggregatorV3Interface(underlyingIVFeeds[_hash].feedAddress).latestRoundData();

        return uint256(answer);

    }

    function setNewPayoutFactor(uint256 _payoutFactor) external {
        _isPayoutRatioContract();
        payoutFactor = _payoutFactor;
    }

}
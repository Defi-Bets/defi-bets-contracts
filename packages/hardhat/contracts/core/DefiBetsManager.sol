//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import '../interface/core/ILiquidityPool.sol';
import "../interface/core/IDefiBets.sol";
import "../interface/math/IDefiBetsMath.sol";
import "../interface/core/IDefiBetsVault.sol";


error DefiBetsManager__NoValidUnderlying();
error DefiBetsManager__NoLiquidity();


/**  @title DefiBets Manager Contract
 *   @notice This contract controls the main functions of the protocol
 */

contract DefiBetsManager is Pausable,Ownable {

    /* ====== State Variables ====== */

    address public liquidityPool;
    address public mathContract;
    

    mapping(bytes32 => address) public underlyingPriceFeeds;
    mapping(bytes32 => bool) public validUnderlying;
    mapping(bytes32 => address) public defiBetsContracts;
    mapping(bytes32 => address) public vaults;

    /* ====== Events ====== */
    event UnderlyingAdded(string underlying,bytes32 underlyingHash,address defiBets,address vault);
    event PriceFeedUpdated(bytes32 underlying,address priceFeed);

    constructor(){

    }


    /* ======= Mutation Functions ====== */


    /**
     * @dev provideLP is called to provide new tokens to the liquidity pool
     * 
     * @param _amount - amount of token the caaller wants to deposit. The tokens has to be approved to the liquidity pool
     * 
     */
    function provideLP(uint256 _amount) external whenNotPaused() {

        ILiquidityPool(liquidityPool).depositForAccount(msg.sender,_amount);

    }


    /**
     * @dev with this function the caller can redeem his share of the liquidity pool and gets the share of tokens transferred to himself
     * 
     * @param _amount - amount of LP tokens the caller wants to redeem. The tokens do not have to be pre-approved.
     * 
     */
    function redeemLPTokens(uint256 _amount) external whenNotPaused() {

        //TODO: Implement the redeem function!!!!

    }

    function setBet(uint256 _betSize,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime,string memory _underlying) external whenNotPaused(){
        bytes32 _hash = getUnderlyingByte(_underlying);
        _isValidUnderlying(_hash);
        
        uint256 _winning = IDefiBetsMath(mathContract).calculateWinning(_minPrice,_maxPrice,_betSize,_expTime);

        address _defiBets = defiBetsContracts[_hash];
        address _vault = vaults[_hash];
        
        IDefiBets(_defiBets).setBetForAccount(msg.sender,_betSize,_minPrice,_maxPrice,_expTime,_winning);

        IDefiBetsVault(_vault).deposit(msg.sender,_betSize,_expTime);
    }

    function claimWinnings(uint256 _tokenId,bytes32 _hash) external {
                
        address _defiBets = defiBetsContracts[_hash];
        address _vault = vaults[_hash];

        (uint256 _token,uint256 _expTime,bool _profit) = IDefiBets(_defiBets).claimForAccount(msg.sender,_tokenId);
       

        if(_profit == true){
            IDefiBetsVault(_vault).withdraw(msg.sender,_token,_expTime);
        }
    }

    function executeExpiration(uint256 _expTime,string memory _underlying) external {
        bytes32 _hash = getUnderlyingByte(_underlying);
       _isValidUnderlying(_hash);
     
        uint256 _price = getPrice(_hash,_expTime);

        address _defiBets = defiBetsContracts[_hash];
        address _vault = vaults[_hash];

        (uint256 _delta,bool _profit) = IDefiBets(_defiBets).performExpiration(_expTime,_price);

        if(_profit == true){
            IDefiBetsVault(_vault).withdraw(liquidityPool,_delta,_expTime);
        }

    }

    function createNewExpTime(bytes32 _tokenHash) external {
        
        _isValidUnderlying(_tokenHash);

        uint256 _maxLoss = ILiquidityPool(liquidityPool).maxLPLost();

        address _defiBets = defiBetsContracts[_tokenHash];

        IDefiBets(_defiBets).initializeNewExpTime(_maxLoss);
       
    }

  


    /* ====== Setup Functions ====== */

    function setAddresses(address _liquidityPool,address _mathContract) external onlyOwner {
        liquidityPool = _liquidityPool;
        mathContract = _mathContract;
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

    function initializeBets(bytes32 _hash,uint256 _startExpTime,uint256 _minBetDuration,uint256 _maxBetDuration,uint256 _slot) external onlyOwner {
        uint256 _maxLoss = ILiquidityPool(liquidityPool).maxLPLost();

        if(_maxLoss == 0){
            revert DefiBetsManager__NoLiquidity();
        }

        address _defiBets = defiBetsContracts[_hash];

        IDefiBets(_defiBets).initializeData(_startExpTime,_maxLoss,_minBetDuration,_maxBetDuration,_slot);
    }


    /* ====== Internal Functions ====== */

    function _isValidUnderlying(bytes32 _hash) internal view {
        if(validUnderlying[_hash] == false){
            revert DefiBetsManager__NoValidUnderlying();
        }
    }


    /* ====== Pure/View Functions ====== */

    function getPrice(bytes32 _hash,uint256 _expTime) public view returns(uint256){
        uint256 price;
        
        if(underlyingPriceFeeds[_hash] != address(0) && block.timestamp >= _expTime){

            address _priceFeed = underlyingPriceFeeds[_hash];

            //TODO: Calculate the price for the expTime
            ( ,
            int256 answer,
            ,
            ,
            ) = AggregatorV3Interface(_priceFeed).latestRoundData();

            price = uint256(answer);

        }

        return price;
    }

    function getUnderlyingByte(string memory _token) public pure returns(bytes32){
        return keccak256(bytes(_token));
    }

}
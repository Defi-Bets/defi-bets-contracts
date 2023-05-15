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


error DefiBetsManager__NoValidUnderlyingToken();


/**  @title DefiBets Manager Contract
 *   @notice This contract controls the main functions of the protocol
 */

contract DefiBetsManager is Pausable,Ownable {

    /* ====== State Variaables ====== */

    

    address public liquidityPool;
    address public defiBets;
    address public mathContract;
    address public vault;

    address public token;

    mapping(address => address) public tokenPriceFeeds;
    mapping (address => bool) public validUnderlyingToken;

    /* ====== Events ====== */
    event UnderlyingTokenAdded(address token);
    event PriceFeedUpdated(address token,address priceFeed);

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

    function setBet(uint256 _betSize,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime,address _token) external whenNotPaused(){
        _isValidUnderlyingToken(_token);
        
        uint256 _winning = IDefiBetsMath(mathContract).calculateWinning(_minPrice,_maxPrice,_betSize,_expTime);
        
        IDefiBets(defiBets).setBetForAccount(msg.sender,_betSize,_minPrice,_maxPrice,_expTime,_winning);

        IDefiBetsVault(vault).deposit(msg.sender,_betSize,_expTime);
    }

    function executeExpiration(uint256 _expTime,address _token) external {

       _isValidUnderlyingToken(_token);

       

        uint256 _price = 1000 ether;

        (uint256 _delta,bool _profit) = IDefiBets(defiBets).performExpiration(_expTime,_price);

        if(_profit == true){
            IDefiBetsVault(vault).withdraw(liquidityPool,_delta,_expTime);
        }

    }

    function createNewExpTime(uint256 _expTime) external {
        //TODO: Create the next ExpTime if it possible

    }

    function claimWinnings(uint256 _tokenId) external {

        (uint256 _token,uint256 _expTime,bool _profit) = IDefiBets(defiBets).claimForAccount(msg.sender,_tokenId);
       

        if(_profit == true){
            IDefiBetsVault(vault).withdraw(msg.sender,_token,_expTime);
        }
    }


    /* ====== Setup Functions ====== */

    function setAddresses(address _liquidityPool,address _defiBets,address _mathContract,address _vault) external onlyOwner {
        liquidityPool = _liquidityPool;
        defiBets = _defiBets;
        mathContract = _mathContract;
        vault = _vault;
    }

    function addUnderlyingToken(address _token,address _feed) external onlyOwner {
        validUnderlyingToken[_token] = true;

        updatePriceFeed(_token,_feed);

        emit UnderlyingTokenAdded(_token);
    } 

    function updatePriceFeed(address _token,address _feed) public onlyOwner  {
        _isValidUnderlyingToken(_token);

        tokenPriceFeeds[_token] = _feed;

        emit PriceFeedUpdated(_token,_feed);
    }


    /* ====== Internal Functions ====== */

    function _isValidUnderlyingToken(address _token) internal view {
        if(validUnderlyingToken[_token] == false){
            revert DefiBetsManager__NoValidUnderlyingToken();
        }
    }


    /* ====== Pure/View Functions ====== */

    function getPrice(address _token,uint256 _expTime) public view returns(uint256){
        uint256 price;
        
        if(tokenPriceFeeds[_token] != address(0) && block.timestamp >= _expTime){

            address _priceFeed = tokenPriceFeeds[_token];

            
        }
    }

}
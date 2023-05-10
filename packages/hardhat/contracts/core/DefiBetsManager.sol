//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import '../interface/core/ILiquidityPool.sol';
import "../interface/core/IDefiBets.sol";
import "../interface/math/IDefiBetsMath.sol";



/**  @title DefiBets Manager Contract
 *   @author Florian Meiswinkel
 *   @notice This contract controls the main functions of the protocol
 */

contract DefiBetsManager is Pausable,Ownable {

    /* ====== State Variaables ====== */

    

    address public liquidityPool;
    address public defiBets;
    address public mathContract;

    address public token;

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

        ILiquidityPool(liquidityPool).redeemSharesForAccount(msg.sender,_amount);

    }

    function setBet(uint256 _betSize,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime) external whenNotPaused(){
        
        //TODO: Send the tokens to the betting vault
        uint256 _winning = IDefiBetsMath(mathContract).calculateWinning(_minPrice,_maxPrice,_betSize,_expTime);
        
        IDefiBets(defiBets).setBetForAccount(msg.sender,_betSize,_minPrice,_maxPrice,_expTime,_winning);
    }


    /* ====== Setup Functions ====== */

    function setAddresses(address _liquidityPool,address _defiBets,address _mathContract) external onlyOwner {
        liquidityPool = _liquidityPool;
        defiBets = _defiBets;
        mathContract = _mathContract;
    }


    /* ====== Internal Functions ====== */



}
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import '../interface/core/ILiquidityPool.sol';



/**  @title DefiBets Manager Contract
 *   @author Florian Meiswinkel
 *   @notice This contract controls the main functions of the protocol
 */

contract DefiBetsManager is Pausable,Ownable {

    /* ====== State Variaables ====== */
    address public liquidityPool;

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


    /* ====== Setup Functions ====== */

    function setAddresses(address _liquidityPool) external onlyOwner {
        liquidityPool = _liquidityPool;
    }


    

}
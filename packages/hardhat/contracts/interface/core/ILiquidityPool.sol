//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ILiquidityPool is IERC20 {
    
    function depositForAccount(address _account,uint256 _amount) external;

    function redeemSharesForAccount(address _account, uint256 _shares) external;

}
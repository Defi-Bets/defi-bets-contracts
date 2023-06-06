//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface ILiquidityPool is IERC20 {

    function maxLPLost() external returns(uint256);
    
    function depositForAccount(address _account,uint256 _amount) external;

    function redeemSharesForAccount(address _account, uint256 _shares) external;

    function transferTokensToVault(uint256 _amount) external;

     function updateLockedTokenSupply(uint256 _delta,bool _increase) external;

}
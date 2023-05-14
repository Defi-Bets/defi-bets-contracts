//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IDefiBetsVault {

    event Deposit(uint256 expTime,uint256 amount,uint256 supply);
    event Withdraw(address indexed to,uint256 amount,uint256 expTime,uint256 newSupply);

    function deposit(address _from,uint256 _amount,uint256 _expTime) external;

    function withdraw(address _to,uint256 _amount,uint256 _expTime) external;

}
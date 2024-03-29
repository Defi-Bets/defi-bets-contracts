//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IDefiBetsVault {

    event Deposit(uint256 expTime,uint256 amount,uint256 supply,uint256 totalFees);
    event Withdraw(address indexed to,uint256 amount,uint256 expTime,uint256 newSupply);
    event FessWithdrawd(uint256 amount);

    function deposit(address _from,uint256 _amount,uint256 _expTime,uint256 _fees) external;

    function withdraw(address _to,uint256 _amount,uint256 _expTime) external;

    function depositFromLP(uint256 _expTime,uint256 _amount) external;

}
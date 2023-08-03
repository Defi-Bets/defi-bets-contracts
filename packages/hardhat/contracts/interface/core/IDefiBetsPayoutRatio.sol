// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDefiBetsPayoutRatio {
    function updateLPProfit(uint256 _amount, uint256 _expTime) external;

    function updatePlayerProfit(uint256 _currentPayoutFactor, uint256 _amount, uint256 _expTime) external;
}

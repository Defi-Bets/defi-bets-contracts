// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDefiBetsPayoutRatio {
    function updateLpWins(uint256 amount) external;
    function updatePlayerWins(uint256 _currentPayoutFactor, uint256 amount) external;
}
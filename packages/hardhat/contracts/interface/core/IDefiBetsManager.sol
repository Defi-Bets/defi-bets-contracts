// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDefiBetsManager {
    function getLPTokenSupplies() external view returns(uint256,uint256);
}
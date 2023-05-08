//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IDefiBetsMath {
    function calculateWinning(uint256 _minPrice,uint256 _maxPrice,uint256 _betSize,uint256 _expTime) external view returns(uint256);
}
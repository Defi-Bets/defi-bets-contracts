//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


contract MockMath {


    function calculateWinning(uint256 _minPrice,uint256 _maxPrice,uint256 _betSize,uint256 _expTime) external pure returns(uint256){
        return _betSize * 2;
    }

}
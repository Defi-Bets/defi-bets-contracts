// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./DefiBetOracle.sol";


contract ImpliedVolatilityOracle is DefiBetOracle {

    uint256 public period;
    string public underlying;

    constructor(uint8 _decimals,int256 _initialAnswer,string memory _description,uint256 _version,string memory _underlying,uint256 _period) DefiBetOracle(_decimals,_initialAnswer,_description,_version){
        underlying = _underlying;
        period = _period;
    }
}
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "./DefiBetOracle.sol";

contract BTCPriceOracle is DefiBetOracle {
    
    string public underlying;

    constructor(uint8 _decimals,string memory _description,uint256 _version,string memory _underlying) DefiBetOracle(_decimals,_description,_version){
        underlying = _underlying;
    }
}
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

error Referal__CodeAlreadyExists();

contract Referal {


    mapping(bytes32 => bool) public isActiveCode;
    mapping(bytes32 => address) public recipients;

    event RefCodeSetted(address recipient, string refCode);



    function setReferalCode(string memory _refCode) external {

        bytes32 _convertedCode = getRefCodeByte(_refCode);

        _codeIsNotActive(_convertedCode);

        isActiveCode[_convertedCode] = true;
        recipients[_convertedCode] = msg.sender;

        emit RefCodeSetted(msg.sender, _refCode);

    }


    function _codeIsNotActive(bytes32 _refCode) internal view {
        if(isActiveCode[_refCode]){

            revert Referal__CodeAlreadyExists();
        }
    }


    function getRefCodeByte(string memory _refCode) public pure returns(bytes32){
        return keccak256(bytes(_refCode));
    }

}
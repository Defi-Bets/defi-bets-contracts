//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MockDUSD is ERC20,Ownable {


    bytes32 private hashedPassword;
    bool public isPasswordSecured;

    constructor() ERC20('Mock DUSD',"mDUSD"){}

    function mint(address _to,uint256 _amount) external {
        require(isPasswordSecured == false);
        _mint(_to,_amount);
    }

    function mintWithPW(address _to,uint256 _amount,string memory _password) external {
        require(keccak256(bytes(_password)) == hashedPassword,'Password is Incorrect');

        _mint(_to,_amount);
    }

    function setPassowrd(string memory _password) external onlyOwner {
        isPasswordSecured = true;

        hashedPassword = keccak256(bytes(_password));
    }

    function switchPasswordSecurity() external onlyOwner {
        bool _passwordSecured = isPasswordSecured;
        
        isPasswordSecured = !_passwordSecured;
    }

}
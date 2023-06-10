//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockDUSD is ERC20 {


    

    constructor() ERC20('Mock DUSD',"mDUSD"){}

    function mint(address _to,uint256 _amount) external {
        _mint(_to,_amount);
    }

}
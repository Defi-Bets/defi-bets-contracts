//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interface/core/IDefiBetsVault.sol";

error DefiBetsVault__Forbidden();
error DefiBetsVault__NotEnoughFunds();

contract DefiBetsVault is IDefiBetsVault,Ownable{

    using SafeMath for uint256;

    /* ====== State Variables ====== */

    uint256 public totalFees;

    mapping(uint256 => uint256) public expTimeSupply;

    address public token;
    address public defiBetsManager;


    constructor(address _defibetsManager,address _token){
        defiBetsManager = _defibetsManager;
        token = _token;
    }

    /* ====== Mutation Functions ====== */

    function deposit(address _from,uint256 _amount,uint256 _expTime,uint256 _fees) external {

        _isManager();

        bool _success = IERC20(token).transferFrom(_from,address(this),_amount);

        require(_success);

        uint256 _supply = expTimeSupply[_expTime];
        uint256 _totalFees = totalFees;

        expTimeSupply[_expTime] = _supply.add(_amount).sub(_fees);
        totalFees = _totalFees.add(_fees);

        emit Deposit(_expTime,_amount,expTimeSupply[_expTime],totalFees);
    }

    function withdraw(address _to,uint256 _amount,uint256 _expTime) external {

        _isManager();

        uint256 _supply = expTimeSupply[_expTime];

        if(_supply < _amount){
            revert DefiBetsVault__NotEnoughFunds();
        }

        bool _success =IERC20(token).transfer(_to,_amount);

        require(_success);

        expTimeSupply[_expTime] = _supply.sub(_amount);


        emit Withdraw(_to,_amount,_expTime,expTimeSupply[_expTime]);
    }

    


    /* ====== Internal Functions ====== */

    function _isManager() internal view {
        if(msg.sender != defiBetsManager){
            revert DefiBetsVault__Forbidden();
        }
    }

}
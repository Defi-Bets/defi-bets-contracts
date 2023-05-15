//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

error LiquidityPool__AccessForbidden();
error LiquidityPool__NotAllowedAmount();

contract LiquidityPool is ERC20 {

    using SafeMath for uint256;


    uint256 private constant MULTIPLIER = 1000000;



    /* ====== State Variables ====== */

    uint256 public totalTokenSupply;
    

    address public token;
    address public managerContract;
    address public betVault;
    address public redeemVault;

    

    /* ====== Events ====== */
    event Deposit(address indexed account,uint256 amount,uint256 shares,uint256 totalTokens,uint256 totalSupply);
    event Redeem(address indexed account, uint256 shares,uint256 amount,uint256 totalTokens, uint256 totalSupply);

    /* ====== Modifier ====== */


    constructor(address _managerContract,address _token,address _betVault,address _redeemVault) ERC20("DefiB","DefiB"){
        managerContract = _managerContract;
        token = _token;
        betVault = _betVault;
        redeemVault = _redeemVault;
    }

    /* ====== Main Functions ====== */

    function depositForAccount(address _account,uint256 _amount) external{
        _isManagerContract();

        uint256 _shares = calcSharesToMint(_amount);

        IERC20(token).transferFrom(_account,address(this),_amount);

        _mint(_account,_shares);

        emit Deposit(_account,_amount,_shares,balanceTokens(),totalSupply());
    }

    function redeemSharesForAccount(address _account, uint256 _shares) external {
        
        //TODO: Update the new redeem concept
        _isManagerContract();

        _isValidAmount(_account,_shares);


        uint256 _tokens = calcTokensToWithdraw(_shares);

        _burn(_account,_shares);

        IERC20(token).transfer(_account,_tokens);


        emit Redeem(_account,_shares,_tokens,balanceTokens(),totalSupply());
    }

    function updateTokenSupply(uint256 _amount,bool _profit) external {
        _isManagerContract();

        if(_profit){
            totalTokenSupply = totalTokenSupply.add(_amount);
        }else{

            IERC20(token).transfer(betVault,_amount);

            totalTokenSupply = totalTokenSupply.sub(_amount);
        }

        
    }


    /* ====== Internal Functions ====== */

    function _isManagerContract() internal view {
        if(msg.sender != managerContract){
            revert LiquidityPool__AccessForbidden();
        }
    }

    function _isValidAmount(address _account,uint256 _amount) internal view {
        uint256 _balance = balanceOf(_account);
        if(_balance < _amount){
            revert LiquidityPool__NotAllowedAmount();
        }
    }

    /* ====== Pure/View Functions ====== */

    function calcSharesToMint(uint256 _amount) public view returns(uint256){
        /*
        a = amount
        B = balance of token before deposit
        T = total supply
        s = shares to mint

        (T + s) / T = (a + B) / B 

        s = aT / B
        */
       if(balanceTokens() == 0){
        return _amount;
       }

        
        return _amount.mul(totalSupply()).div(balanceTokens());

    }

    function calcTokensToWithdraw(uint256 _shares) public view returns(uint256){
        /*
        a = amount
        B = balance of token before withdraw
        T = total supply
        s = shares to burn

        (T - s) / T = (B - a) / B 

        a = sB / T
        */

       return _shares.mul(balanceTokens()).div(totalSupply());
    }

    function calcRedeemFraction(uint256 _amount) public view returns(uint256){

    }

    function balanceTokens() public view returns(uint256){

        return IERC20(token).balanceOf(address(this));
    }

}
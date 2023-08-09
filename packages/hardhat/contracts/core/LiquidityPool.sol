//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "../interface/core/ILiquidityPool.sol";

error LiquidityPool__AccessForbidden();
error LiquidityPool__NotAllowedAmount();
error LiquidityPool__NotEnoughFreeSuppy();
error LiquidityPool__VaultNotValid();

contract LiquidityPool is ERC20, ILiquidityPool {
    using SafeMath for uint256;

    uint256 private constant MULTIPLIER = 1000000;

    /* ====== State Variables ====== */

    uint256 public totalTokenSupply;
    uint256 public lockedTokenSupply;

    uint256 public maxLostPerTimeInPercent; // in ppm (parts per million). 50.000 ppm = 5% = 0,050000

    // uint256 public maxLPLostPerTime;

    address public token;
    address public managerContract;
    mapping(address => bool) public validVaults;

    mapping(uint256 => uint256) public lockedPerExpTime;

    /* ====== Events ====== */
    event Deposit(address indexed account, uint256 amount, uint256 shares, uint256 totalTokens, uint256 totalSupply);
    event Redeem(address indexed account, uint256 shares, uint256 amount, uint256 totalTokens, uint256 totalSupply);
    event LockedSupplyUpdated(uint256 lockedTokenSupply, uint256 expTime, uint256 lockedPerExpTime);
    event MaxLossPerTimeUpdated(uint256 newMaxLoss);

    /* ====== Modifier ====== */

    constructor(
        address _managerContract,
        address _token,
        address _betVault,
        uint256 _maxLossPerTimePercent
    ) ERC20("DefiB", "DefiB") {
        managerContract = _managerContract;
        token = _token;
        validVaults[_betVault] = true;
        maxLostPerTimeInPercent = _maxLossPerTimePercent;
    }

    /* ====== Main Functions ====== */

    function depositForAccount(address _account, uint256 _amount) external {
        _isManagerContract();

        uint256 _shares = calcSharesToMint(_amount);

        IERC20(token).transferFrom(_account, address(this), _amount);

        _mint(_account, _shares);

        totalTokenSupply = totalTokenSupply.add(_amount);

        emit Deposit(_account, _amount, _shares, balanceTokens(), totalSupply());
    }

    function redeemSharesForAccount(address _account, uint256 _shares) external {
        _isManagerContract();

        _isValidAmount(_account, _shares);

        uint256 _tokens = calcTokensToWithdraw(_shares);

        _isEnoughFreeTokenSupply(_tokens);

        _burn(_account, _shares);

        IERC20(token).transfer(_account, _tokens);

        emit Redeem(_account, _shares, _tokens, balanceTokens(), totalSupply());
    }

    function updateTokenSupply(address _vault, uint256 _amount, bool _profit) external {
        _isManagerContract();

        if (_profit) {
            totalTokenSupply = totalTokenSupply.add(_amount);
        } else {
            IERC20(token).transfer(_vault, _amount);

            totalTokenSupply = totalTokenSupply.sub(_amount);
        }
    }

    function updateLockedTokenSupply(uint256 _delta, bool _increase, uint256 _expTime) external {
        _isManagerContract();

        uint256 _lockedTokenSupply = lockedTokenSupply;

        lockedTokenSupply = _increase ? _lockedTokenSupply.add(_delta) : _lockedTokenSupply.sub(_delta);

        uint256 _lockedPerExpTime = lockedPerExpTime[_expTime];

        lockedPerExpTime[_expTime] = _increase ? _lockedPerExpTime.add(_delta) : _lockedPerExpTime.sub(_delta);

        emit LockedSupplyUpdated(lockedTokenSupply, _expTime, lockedPerExpTime[_expTime]);
    }

    function transferTokensToVault(address _vault, uint256 _amount) external {
        _isManagerContract();
        _isValidVault(_vault);

        IERC20(token).transfer(_vault, _amount);
        uint256 _tokenSupply = totalTokenSupply;
        totalTokenSupply = _tokenSupply.sub(_amount);
    }

    function resetLockedTokens(uint256 _expTime) external {
        _isManagerContract();

        uint256 _resetValue = lockedPerExpTime[_expTime];

        uint256 _totalLockedTokens = lockedTokenSupply;

        lockedTokenSupply = _totalLockedTokens.sub(_resetValue);
        lockedPerExpTime[_expTime] = 0;

        emit LockedSupplyUpdated(lockedTokenSupply, _expTime, lockedPerExpTime[_expTime]);
    }

    function updateMaxLoss(uint256 _newMaxLoss) external {
        _isManagerContract();

        maxLostPerTimeInPercent = _newMaxLoss;

        emit MaxLossPerTimeUpdated(_newMaxLoss);
    }

    /* ====== Internal Functions ====== */

    function _isManagerContract() internal view {
        if (msg.sender != managerContract) {
            revert LiquidityPool__AccessForbidden();
        }
    }

    function _isValidAmount(address _account, uint256 _amount) internal view {
        uint256 _balance = balanceOf(_account);
        if (_balance < _amount) {
            revert LiquidityPool__NotAllowedAmount();
        }
    }

    function _isEnoughFreeTokenSupply(uint256 _amount) internal view {
        if (totalTokenSupply.sub(lockedTokenSupply) < _amount) {
            revert LiquidityPool__NotEnoughFreeSuppy();
        }
    }

    function _isValidVault(address _vault) internal view {
        if (validVaults[_vault] == false) {
            revert LiquidityPool__VaultNotValid();
        }
    }

    /* ====== Pure/View Functions ====== */

    function calcSharesToMint(uint256 _amount) public view returns (uint256) {
        /*
        a = amount
        B = balance of token before deposit
        T = total supply
        s = shares to mint

        (T + s) / T = (a + B) / B 

        s = aT / B
        */
        if (balanceTokens() == 0) {
            return _amount;
        }

        return _amount.mul(totalTokenSupply).div(balanceTokens());
    }

    function calcTokensToWithdraw(uint256 _shares) public view returns (uint256) {
        /*
        a = amount
        B = balance of token before withdraw
        T = total supply
        s = shares to burn

        (T - s) / T = (B - a) / B 

        a = sB / T
        */

        return _shares.mul(totalTokenSupply).div(totalSupply());
    }

    function balanceTokens() public view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }

    function maxLPLost() public view returns (uint256) {
        return maxLostPerTimeInPercent;
    }
}

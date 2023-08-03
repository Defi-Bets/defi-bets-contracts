// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "../interface/core/IDefiBetsManager.sol";
import "../interface/core/IDefiBets.sol";
import "../interface/core/IDefiBetsPayoutRatio.sol";

contract MockManager is IDefiBetsManager {
    function getLPTokenSupplies() external pure returns (uint256, uint256) {
        uint256 _totalSupply = 6000 * 10 ** 18;
        uint256 _lockedSupply = 0;

        return (_totalSupply, _lockedSupply);
    }

    function setNewPayoutFactor(uint256 _payoutFactor) external {
        // dummy
    }

    function initialize(
        address defiBets,
        uint256 startExpTime,
        uint256 maxLossPerDay,
        uint256 minBetDuration,
        uint256 maxBetDuration,
        uint256 slot,
        uint256 maxWinMultiplier
    ) external {
        IDefiBets(defiBets).initializeData(
            startExpTime,
            maxLossPerDay,
            minBetDuration,
            maxBetDuration,
            slot,
            maxWinMultiplier
        );
    }

    function setBetForAccount(
        address defiBets,
        address user,
        uint256 betSize,
        uint256 minPrice,
        uint256 maxPrice,
        uint256 expTime,
        uint256 winning
    ) external {
        IDefiBets(defiBets).setBetForAccount(user, betSize, minPrice, maxPrice, expTime, winning);
    }

    function performExpiration(address defiBets, uint256 expTime, uint256 expPrice) external {
        IDefiBets(defiBets).performExpiration(expTime, expPrice);
    }

    function claimForAccount(address defiBets, address _account, uint256 _tokenId) external {
        IDefiBets(defiBets).claimForAccount(_account, _tokenId);
    }

    function setBetParameter(
        address defiBets,
        uint256 _maxLossPerExpTime,
        uint256 _minBetDuration,
        uint256 _maxBetDuration,
        uint256 _slot,
        uint256 _maxWinMultiplier,
        uint256 _timeDelta,
        uint256 _dependentTimeStamp
    ) external {
        IDefiBets(defiBets).setBetParamater(
            _maxLossPerExpTime,
            _minBetDuration,
            _maxBetDuration,
            _slot,
            _maxWinMultiplier,
            _timeDelta,
            _dependentTimeStamp
        );
    }

    function updatePlayerProfit(
        address payoutRatio,
        uint256 _currentPayoutFactor,
        uint256 _amount,
        uint256 _exptime
    ) external {
        IDefiBetsPayoutRatio(payoutRatio).updatePlayerProfit(_currentPayoutFactor, _amount, _exptime);
    }

    function updateLPProfit(address payoutRatio, uint256 _amount, uint256 _expTime) external {
        IDefiBetsPayoutRatio(payoutRatio).updateLPProfit(_amount, _expTime);
    }
}

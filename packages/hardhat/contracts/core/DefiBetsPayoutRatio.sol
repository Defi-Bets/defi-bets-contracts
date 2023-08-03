//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interface/core/IDefiBetsPayoutRatio.sol";
import "../interface/core/IDefiBetsManager.sol";

import "hardhat/console.sol";

error DefiBetsPayoutRatio__AccessForbidden();
error DefiBetsPayoutRatio__NoValidExpTime();

contract DefiBetsPayoutRatio is IDefiBetsPayoutRatio, Ownable {
    using SafeMath for uint256;

    /* ====== State Variables ====== */
    uint256 public constant MIN_PAYOUT_FACTOR = 10;

    uint256 public startTimestamp;
    uint256 public delta = 86400;

    mapping(uint256 => uint256) public totalProfitLP; /* total wins of the lp per day */
    mapping(uint256 => uint256) public totalProfitPlayer; /* total wins of the player per day */

    address managerContract;

    uint256 public currProfitsPeriodLP;
    uint256 public currProfitsPeriodPlayer;

    //Index for efficient searching the results over the period
    uint256 private startIndex;
    uint256 private endIndex;

    uint256 public period;

    uint256 public targetPayoutRatio; /* set target ratio you want. (e.g. 90 = 90% payout ratio) */

    uint256 public adjustmentFactor = 5;

    /* ====== Events ====== */
    event UpdateProfitLP(uint256 currProfit);
    event UpdateProfitPlayer(uint256 currProfit);
    event UpdateProfitsPeriod(
        uint256 startIndex,
        uint256 endIndex,
        uint256 currProfitsPeriodLP,
        uint256 currProfitsPeriodPlayer
    );

    constructor(address _managerContract, uint256 _period, uint256 _targetPayoutRatio, uint256 _startTimeStamp) {
        managerContract = _managerContract;
        period = _period;
        targetPayoutRatio = _targetPayoutRatio;
        startTimestamp = _startTimeStamp;
        startIndex = startTimestamp.sub(_period.mul(delta));
        endIndex = startTimestamp;
    }

    /* ====== Mutation Functions ====== */

    function setTargetPayoutRatio(uint256 _targetPayoutRatio) external onlyOwner {
        targetPayoutRatio = _targetPayoutRatio;
    }

    function setAdjustmentFactor(uint256 _factor) external onlyOwner {
        adjustmentFactor = _factor;
    }

    function updateLPProfit(uint256 _amount, uint256 _expTime) external {
        _isManagerContract();
        _isValidExpTime(_expTime);

        // loop through all modulo days
        uint256 _adjTimestamp = calulateAdjustedTimestamp(_expTime);
        uint256 _profit = totalProfitLP[_adjTimestamp];

        totalProfitLP[_adjTimestamp] = _profit.add(_amount);

        emit UpdateProfitLP(totalProfitLP[_adjTimestamp]);
    }

    function updatePlayerProfit(uint256 _currentPayoutFactor, uint256 _amount, uint256 _expTime) external {
        _isManagerContract();

        uint256 _adjTimestamp = calulateAdjustedTimestamp(_expTime);

        totalProfitPlayer[_adjTimestamp] += _amount;

        _updatePeriodProfits(_adjTimestamp, _amount);

        // // calculate new payoutFactor
        uint256 newPayoutFactor = _getNewPayoutFactor(_currentPayoutFactor);
        console.log(newPayoutFactor);
        // set new Payout Factor

        IDefiBetsManager(managerContract).setNewPayoutFactor(newPayoutFactor);
    }

    /* ====== Internal Functions ====== */

    function _getNewPayoutFactor(uint256 _currentPayoutFactor) internal view returns (uint256) {
        uint256 _newPayoutRatio = currProfitsPeriodLP == 0 ? 0 : (currProfitsPeriodPlayer * 100) / currProfitsPeriodLP; // currentRatio = Gplayer / Glp
        console.log("new factor: %i", _newPayoutRatio);
        if (_newPayoutRatio > targetPayoutRatio) {
            // too much for player, decrease payout factor
            uint256 factorDiff = _newPayoutRatio - targetPayoutRatio;
            uint256 adjustment = factorDiff / adjustmentFactor;
            console.log("adjustment %i", adjustment);
            console.log("currentPayoutFactor %i", _currentPayoutFactor);
            return _currentPayoutFactor > adjustment ? _currentPayoutFactor - adjustment : MIN_PAYOUT_FACTOR;
        } else if (_newPayoutRatio < targetPayoutRatio) {
            // too much for LP, increase payout factor
            uint256 factorDiff = targetPayoutRatio - _newPayoutRatio;
            uint256 adjustment = factorDiff / adjustmentFactor;
            return _currentPayoutFactor + adjustment;
        }
        // targetPayoutRatio == currPayoutRatio
        // perfect ratio and factor, do nothing
        return _currentPayoutFactor;
    }

    function _isManagerContract() internal view {
        if (msg.sender != managerContract) {
            revert DefiBetsPayoutRatio__AccessForbidden();
        }
    }

    function _calculateIndexSteps(uint256 _currIndex, uint256 _newIndex) internal view returns (uint256) {
        uint256 _indexSteps = _newIndex > _currIndex ? (_newIndex.sub(_currIndex)).div(delta) : 0;

        return _indexSteps;
    }

    function _isValidExpTime(uint256 _expTime) internal view {
        if (_expTime < block.timestamp) {
            revert DefiBetsPayoutRatio__NoValidExpTime();
        }
    }

    function _updatePeriodProfits(uint256 _adjTimestamp, uint256 _amount) internal {
        if (_adjTimestamp > endIndex) {
            //calculate the profits of lp and player till the new timestamp
            for (uint256 i = 1; i <= _calculateIndexSteps(endIndex, _adjTimestamp); i++) {
                uint256 _index = endIndex.add(i.mul(delta));

                currProfitsPeriodLP += totalProfitLP[_index];
                currProfitsPeriodPlayer += totalProfitPlayer[_index];
                console.log("Profit LP: %i", currProfitsPeriodLP);
                console.log("Profit Player: %i", currProfitsPeriodPlayer);
            }

            for (uint256 i = 1; i <= _calculateIndexSteps(startIndex, _adjTimestamp.sub(period.mul(delta))); i++) {
                uint256 _index = startIndex.add(i.mul(delta));

                currProfitsPeriodLP -= totalProfitLP[_index];
                currProfitsPeriodPlayer -= totalProfitPlayer[_index];
            }

            endIndex = _adjTimestamp;
            startIndex = _adjTimestamp.sub(period.mul(delta));
        } else if (_adjTimestamp <= endIndex && _adjTimestamp >= endIndex.sub(period.mul(delta))) {
            currProfitsPeriodPlayer += _amount;
        }

        emit UpdateProfitsPeriod(startIndex, endIndex, currProfitsPeriodLP, currProfitsPeriodPlayer);
    }

    function calulateAdjustedTimestamp(uint256 _timestamp) public view returns (uint256) {
        if (startTimestamp > _timestamp) {
            return startTimestamp.sub((startTimestamp.sub(_timestamp)).div(delta).mul(delta));
        }

        uint256 _adjTimestamp = (((_timestamp.sub(startTimestamp)).div(delta)).mul(delta)).add(startTimestamp);

        return _adjTimestamp;
    }
}

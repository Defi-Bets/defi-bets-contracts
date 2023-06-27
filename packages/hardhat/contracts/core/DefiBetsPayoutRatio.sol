//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../interface/core/IDefiBetsPayoutRatio.sol";
import "../interface/core/IDefiBetsManager.sol";
// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";


error DefiBetsPayoutRatio__AccessForbidden();

contract DefiBetsPayoutRatio is IDefiBetsPayoutRatio, Ownable{

    using SafeMath for uint256;

    /* ====== State Variables ====== */

    address managerContract;

    mapping(uint256 => uint256) public totalWinLpDays;      /* total wins of the lp per day */
    mapping(uint256 => uint256) public totalWinPlayerDays;  /* total wins of the player per day */

    uint256 currWinLp;          /* last modulo days of LP Winnings (e.g. cummulative LP wins of last 30 days) */
    uint256 currWinPlayer;      /* last module days of Player Winnings (e.g. cummulative Player wins of last 30 days) */

    uint256 moduloDays;     /* what time span do we look for payout Ratio (e.g. 30 days) */

    uint256 currDay;       /* increases every day */

    uint256 targetPayoutRatio;      /* set target ratio you want. (e.g. 90 = 90% payout ratio) */

    constructor(address _managerContract, uint256 _moduloDays, uint256 _targetPayoutRatio)
    {
        managerContract = _managerContract;
        moduloDays = _moduloDays;
        targetPayoutRatio = _targetPayoutRatio;
    }

    /* ====== Mutation Functions ====== */

    function setTargetPayoutRatio(uint256 _targetPayoutRatio) external onlyOwner
    {
        targetPayoutRatio = _targetPayoutRatio;
    }

    function updateLpWins(uint256 amount) external
    {   
        _isManagerContract();
        // loop through all modulo days
        uint256 dayCounter;
        for(dayCounter = 0; dayCounter < moduloDays; dayCounter++)
        {
            totalWinLpDays[dayCounter] += amount;
        }
    }

     /* call max once per day! */
    function updatePlayerWins(uint256 _currentPayoutFactor, uint256 amount) external
    {   
        _isManagerContract();
        // loop through all modulo days
        uint256 dayCounter;
        for(dayCounter = 0; dayCounter < moduloDays; dayCounter++)
        {
            totalWinPlayerDays[dayCounter] += amount;
        }

        // save winnings
        currWinPlayer = totalWinPlayerDays[currDay % moduloDays];
        currWinLp = totalWinLpDays[currDay % moduloDays];

        // reset saved winnings
        totalWinPlayerDays[currDay % moduloDays] = 0;
        totalWinLpDays[currDay % moduloDays] = 0;

        // calculate new payoutFactor
        uint256 newPayoutFactor = getNewPayoutFactor(_currentPayoutFactor);

        console.log("currWinPlayer: %i", currWinPlayer);
        console.log("currWinLp: %i", currWinLp);      
        console.log("newPayoutFactor: %i", newPayoutFactor);

        // set new Payout Factor
        IDefiBetsManager(managerContract).setNewPayoutFactor(newPayoutFactor);

        // go to next day
        currDay++;
    }

    /* ====== Internal Functions ====== */

    function getNewPayoutFactor(uint256 _currentPayoutFactor) internal view returns(uint256)
    {
        uint256 currPayoutRatio = 0;

        if(currDay < moduloDays)
        {
            // first modulo days, do nothing (beginning phase)
            return _currentPayoutFactor;
        }

        if(0 == currWinLp)
        {
            // invalid
            return _currentPayoutFactor;
        }

        currPayoutRatio = currWinPlayer * 100 / currWinLp;     // currentRatio = Gplayer / Glp

        if(currPayoutRatio > targetPayoutRatio)
        {
            // too much for player, decrease payout factor
            return _currentPayoutFactor - (currPayoutRatio - targetPayoutRatio) / 5;     /* slow decreasing of player winnings */
        }
        else if (currPayoutRatio < targetPayoutRatio)
        {
            // too much for LP, increase payout factor
            return _currentPayoutFactor + (targetPayoutRatio - currPayoutRatio) / 5;     /* slow increasing of player winnings */
        }
        // targetPayoutRatio == currPayoutRatio

        // perfect ratio and factor, do nothing
        return _currentPayoutFactor;
    }

    function _isManagerContract() internal view {
        if(msg.sender != managerContract){
            revert DefiBetsPayoutRatio__AccessForbidden();
        }
    }
}
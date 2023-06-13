// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;

import "../interface/core/IDefiBetsManager.sol";
import "../interface/core/IDefiBets.sol";

contract MockManager is IDefiBetsManager{
    function getLPTokenSupplies() external view returns(uint256,uint256){
        uint256 _totalSupply = 6000*10**18;
        uint256 _lockedSupply = 0;

        return (_totalSupply,_lockedSupply);

    }

    function initialize(address defiBets,uint256 startExpTime,uint256 maxLossPerDay,uint256 minBetDuration,uint256 maxBetDuration,uint256 slot, uint256 maxWinMultiplier) external {
        IDefiBets(defiBets).initializeData(startExpTime, maxLossPerDay, minBetDuration, maxBetDuration, slot, maxWinMultiplier);
    }

    function setBetForAccount(address defiBets,address user,uint256 betSize, uint256 minPrice,uint256 maxPrice,uint256 expTime,uint256 winning) external {
        IDefiBets(defiBets).setBetForAccount(user,betSize,minPrice,maxPrice,expTime,winning);
    }

    function performExpiration(address defiBets,uint256 expTime,uint256 expPrice) external {
        IDefiBets(defiBets).performExpiration(expTime,expPrice);
    }
}
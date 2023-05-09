//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IDefiBets {
    struct BetInfo {
        uint256 maxUserWinning;
        uint256 totalBets;
        uint256 maxLPLoss;
        bool finished;
        uint256 expPrice;
    }

    struct PlayerBet {
        uint256 betSize;
        uint256 profit;
        uint256 minPrice;
        uint256 maxPrice;
        bool claimed;
    }

    function setBetForAccount(address _account,uint256 _betSize,uint256 _minPrice,uint256 _maxPrice,uint256 _expTime) external;

    function setBetParamater(uint256 _maxLossPerDay,uint256 _minBetDuration,uint256 _maxBetDuration,uint256 _slot) external;
}
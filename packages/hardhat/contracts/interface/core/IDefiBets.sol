//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

interface IDefiBets {
    function setBetForAccount(
        address _account,
        uint256 _betSize,
        uint256 _minPrice,
        uint256 _maxPrice,
        uint256 _expTime,
        uint256 _winning
    ) external returns (uint256, bool);

    function claimForAccount(address _account, uint256 _tokenId) external returns (uint256, uint256, bool);

    function setBetParamater(
        uint256 _minBetDuration,
        uint256 _maxBetDuration,
        uint256 _slot,
        uint256 _maxWinMultiplier,
        uint256 _timeDelta,
        uint256 _dependentTimeStamp
    ) external;

    function performExpiration(uint256 _expTime, uint256 _expPrice) external returns (uint256, bool, uint256);

    function initializeNewExpTime(uint256 _maxLpLoss) external;

    function lastActiveExpTime() external returns (uint256);

    function initializeData(
        uint256 _startExpTime,
        uint256 _maxLossPerExpTime,
        uint256 _minBetDuration,
        uint256 _maxBetDuration,
        uint256 _slot,
        uint256 _maxWinMultiplier
    ) external;
}

// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.9;


import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DefiBetOracle is AggregatorV3Interface,Ownable {
    
    uint8 public decimals;
    uint80 private latestRound;
    uint256 public version;
    string public description;

    mapping(uint80 => int256) public getAnswer;
    mapping(uint80 => uint256) public getTimestamp;
    mapping(uint80 => uint256) public getStartedAt;

    constructor(uint8 _decimals,string memory _description,uint256 _version){
      decimals = _decimals;
      description = _description;
      version = _version;

    }

    function updateAnswer(int256 _answer) public onlyOwner{
        latestRound++;
        getAnswer[latestRound] = _answer;
        getTimestamp[latestRound] = block.timestamp;
        getStartedAt[latestRound] = block.timestamp;
    }


    function getRoundData(uint80 _roundId)
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    ){
      return ( _roundId,
            getAnswer[_roundId],
            getStartedAt[_roundId],
            getTimestamp[_roundId],
            _roundId
            );
    }

    function latestRoundData()
    external
    view
    returns (
      uint80 roundId,
      int256 answer,
      uint256 startedAt,
      uint256 updatedAt,
      uint80 answeredInRound
    ){
      return (
            latestRound,
            getAnswer[latestRound],
            getStartedAt[latestRound],
            getTimestamp[latestRound],
            latestRound
        );
    }
}
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;



contract RedeemVault {


    struct RewardSnapshot{
        uint256 reward;
        bool valid;
    }

    struct Redeem{
        uint256 start;
        uint256 end;
        uint256 fractionReward;
    }

    uint256 public lastSnapshot;
    mapping(uint256 => RewardSnapshot) public snapshots;

    mapping(address => Redeem) public redeems;


    address liquidityPool;
    address managerContract;
    address token;

    constructor(address _managerContract,address _liquidityPool,address _token) {
        liquidityPool = _liquidityPool;
        managerContract = _managerContract;
        token = _token;

        RewardSnapshot storage _firstSnapshot = snapshots[block.timestamp];
        _firstSnapshot.valid = true;

        lastSnapshot = block.timestamp;
    }

    function addRedeem(address _account,uint256 _fractionReward,uint256 _start,uint256 _end) external {

    }

}
//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RedeemTracker is ERC721 {
    error RedeemTracker__NotAllowed();
    error RedeemTracker__TimeNotPassed();
    error RedeemTracker__NotTheOwner();

    using Counters for Counters.Counter;

    struct RedeemInfo {
        uint256 redeemTime;
        uint256 tokenAmount;
    }

    /* === State Variables === */
    Counters.Counter public tokenIds;
    address public liquditiyPool;
    address public token;

    mapping(uint256 => RedeemInfo) public redeemInfos;

    /* === Events === */
    event RedeemFinished(address indexed account, uint256 tokenID, uint256 amount);
    event RedeemStarted(address indexed account, uint256 tokenID, uint256 redeemTime, uint256 amount);

    constructor(address _token, address _LiquidityPool) ERC721("LiquidityPoolBond", "LPB") {
        liquditiyPool = _LiquidityPool;
        token = _token;
    }

    function mintTokenForAccount(address _redeemer, uint256 _amount, uint256 _redeemTime) external {
        _isLiquidityPool();

        tokenIds.increment();
        uint256 newTokenId = tokenIds.current();

        redeemInfos[newTokenId] = RedeemInfo({redeemTime: _redeemTime, tokenAmount: _amount});

        _mint(_redeemer, newTokenId);

        emit RedeemStarted(_redeemer, newTokenId, _redeemTime, _amount);
    }

    function redeem(uint256 _tokenID) external {
        _isOwnerOfToken(_tokenID);
        _hasTimePassed(_tokenID);

        uint256 _amount = redeemInfos[_tokenID].tokenAmount;

        _burn(_tokenID);

        emit RedeemFinished(msg.sender, _tokenID, _amount);

        bool success = IERC20(token).transfer(msg.sender, _amount);

        require(success);
    }

    /* === Internal Functions === */
    function _isLiquidityPool() internal view {
        if (msg.sender != liquditiyPool) {
            revert RedeemTracker__NotAllowed();
        }
    }

    function _isOwnerOfToken(uint256 _tokenID) internal view {
        if (ownerOf(_tokenID) != msg.sender) {
            revert RedeemTracker__NotTheOwner();
        }
    }

    function _hasTimePassed(uint256 _tokenID) internal view {
        if (!timePassed(_tokenID)) {
            revert RedeemTracker__TimeNotPassed();
        }
    }

    /* === View Functions === */

    function timePassed(uint256 _tokenID) public view returns (bool) {
        return redeemInfos[_tokenID].redeemTime < block.timestamp;
    }
}

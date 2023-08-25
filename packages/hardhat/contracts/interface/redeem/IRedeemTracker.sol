//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";

interface IRedeemTracker is IERC721 {
    function startRedeemPeriod(address _redeemer, uint256 _amount, uint256 _redeemTime) external;

    function finishRedeemPeriod(uint256 _tokenID) external;
}

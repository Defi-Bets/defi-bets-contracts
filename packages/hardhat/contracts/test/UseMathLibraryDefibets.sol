//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Library import
import "../lib/MathLibraryDefibets.sol";

contract UseMathLibraryDefibets {
    constructor() {}

    function calculateProbabilityRange() external view returns (uint256){
        uint256 probability = MathLibraryDefibets.calculateProbabilityRange(
        25000, /* target price from BTC 25.000 $ */
        30000,      /* to BTC 30.000 $ */
        26000,      /* current price BTC 26.000 $ */
        200,        /* Implied Volatility 20% * 1000 */
        30,         /* Implied volatility is for 30 days */   
        50000);     /* 5 days untill expiry * 10000 */

        return probability;
    }

}

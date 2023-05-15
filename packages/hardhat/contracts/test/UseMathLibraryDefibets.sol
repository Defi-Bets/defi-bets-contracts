//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Library import
import "../lib/MathLibraryDefibets.sol";

contract UseMathLibraryDefibets {
    constructor() {}

    function calc_example_prob_range() external returns (uint256){
        uint256 probability = MathLibraryDefibets.calculate_probability_range(25000, /* target price from BTC 25.000 $ */
        30000,      /* to BTC 30.000 $ */
        29000,      /* current price BTC 29.000 $ */
        500,        /* Implied Volatility 50% * 1000 */
        30,         /* Implied volatility is for 30 days */   
        30000); /* 30 days untill expiry * 1000 */

        return probability;
    }

}

//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Library import
import "../lib/MathLibraryDefibets.sol";

contract UseMathLibraryDefibets {
    constructor() {}

    function calculateProbabilityRange() external view returns (uint256){
        uint256 probability = MathLibraryDefibets.calculateProbabilityRange(
        19000*10**18, /* target price from BTC 25.000 $ */
        24000*10**18,      /* to BTC 30.000 $ */
        20000*10**18,      /* current price BTC 26.000 $ */
        2000,        /* Implied Volatility 20% * 10000 */
        30*60*60*24,         /* Implied volatility is for 30 days */   
        15*60*60*24);     /* 5 days untill expiry  */

        return probability;
    }

}

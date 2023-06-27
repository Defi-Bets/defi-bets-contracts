//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";

error MathLibraryDefibets__WrongParameter();
error MathLibraryDefibets__StdDeviationOutOfBounds();

library MathLibraryDefibets {
    using SafeMath for uint256;

    // positive Z-Table probability values from standard deviation 0 to 3. Needed to get probability from standard deviation.
    bytes constant z_table_positive =
        hex"144F151615DC16A11763182318E0199A1A501B031BB01C591CFE1D9C1E361EC91F571FDF206120DD215321C3222D229122F02348239B23E82431247424B224EC25212552257F25A925CE25F12610262C2646265D26722685269626A526B226BE26C926D226DA26E126E826ED26F226F626FA26FD27002703";

    // negative Z-Table probability values from standard deviation -3 to -0.05. Needed to get probability from standard deviation.
    bytes constant z_table_negative =
        hex"000D001000130016001A001E00230028002F0036003E00470052005E006B007A008B009E00B300CA00E40100011F01420167019101BE01EF0224025E029C02DF0328037503C80420047F04E3054D05BD063306AF073107B9084708DA09740A120AB70B600C0D0CC00E300EED0FAD106F113411FA12C11388";

    uint256 public constant BILLION = 1000000000;
    uint256 public constant Z_TABLE_MAX = 59; // 60 values per table with each value 2 byte length

    function abs(int x) private pure returns (int) {
        return x >= 0 ? x : -x;
    }


    function calculateStandardDeviation(
        uint256 currPrice,
        uint256 impliedVolatility30,
        uint256 timeUntilEpxiry,
        uint256 impliedVolatitityTime
    ) internal view returns (uint256) {

        uint256 adjImpliedVol = (impliedVolatility30.mul(Math.sqrt(timeUntilEpxiry.mul(10**8).div(impliedVolatitityTime)))).div(10000);
        console.log("adjImplVol %i",adjImpliedVol);

        return (currPrice.mul(adjImpliedVol)).div(10000);
    }

    function toUint16(bytes memory _bytes, uint256 _start) internal pure returns (uint16) {
        require(_bytes.length >= _start + 2, "toUint16_outOfBounds");
        uint16 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x2), mul(_start,2)))
        }

        return tempUint;
    }

    /**
     * 
     * @dev - return the zScore with 4 decimals 
     */
    function calculateZScore(uint256 _delta,uint256 _stdDeviation) internal pure returns(uint256){

        return _delta.mul(10**4).div(_stdDeviation);

    }


    function lookupZtableFromStdDeviation(
        uint256 zScore,
        bool useNegativeZTable
    ) private view returns (uint16) {
        uint256 index = zScore.div(500);

        if(Z_TABLE_MAX < index)
        {
            index = Z_TABLE_MAX;
            
        }
        console.log("index %i",index);
        if (useNegativeZTable) {
            // use negative Z-Table
            index = Z_TABLE_MAX - index; /* Invert for negative Z-Table values */
            return toUint16(z_table_negative, index);
        } else {
            // use positive Z-Table
            return toUint16(z_table_positive, index);
        }
    }

    function calculateProbabilityForBetPrice(
        uint256 betPrice,
        uint256 currPrice,
        uint256 stdDeviation
    ) internal view returns (uint16) {
        uint256 delta = 0;
        bool isNegative = false;

        if (currPrice > betPrice) {
            isNegative = true;
            delta = currPrice.sub(betPrice); 
        }else{
            delta = betPrice.sub(currPrice); 
        }
        
        uint256 zScore = calculateZScore(delta,stdDeviation);
        console.log("zScore: %i", zScore);
        console.log("stdDeviation: %i %b", stdDeviation, isNegative);

        return lookupZtableFromStdDeviation(zScore, isNegative);
    }


    /**
     * 
     * @param lowerPrice - lower price of the price range with decimals
     * @param upperPrice - upper price of the price range with decimals
     * @param currPrice  - the current price of the underlying with decimals
     * @param impliedVolatility - the implied volatility for x days in promille => 30% = 3000
     * @param impliedVolatilityTime - the time of the volatility in seconds
     * @param timeUntilEpxiry - the remaining time until expiration in seconds
     */
    function calculateProbabilityRange(
        uint256 lowerPrice,
        uint256 upperPrice,
        uint256 currPrice,
        uint256 impliedVolatility ,
        uint256 impliedVolatilityTime,
        uint256 timeUntilEpxiry 
    ) public view returns (uint256) {

        // Sanity checks
        if((lowerPrice < 0) || (upperPrice < 0) || (currPrice < 0))
        {
            revert MathLibraryDefibets__WrongParameter();
        }

         uint256 stdDeviation = calculateStandardDeviation(
            currPrice,
            impliedVolatility,
            timeUntilEpxiry,
            impliedVolatilityTime
        );

        //-----------------------------------------------------
        // 1. calculate probability for lower range boundary
        //-----------------------------------------------------

        uint16 propability_lower_10000 = calculateProbabilityForBetPrice(lowerPrice, currPrice, stdDeviation);


        //-----------------------------------------------------
        // 2. calculate probability for higher range boundary
        //-----------------------------------------------------
        
        uint16 propability_higher_10000 = calculateProbabilityForBetPrice(upperPrice, currPrice, stdDeviation);


        //---------------------------------------------------------------
        // 3. calculate end probability for the range. (higher - lower)
        //---------------------------------------------------------------
        uint256 probability = propability_higher_10000 - propability_lower_10000;

        console.log("Probability: Lower %i, Higher: %i, Result: %i", propability_lower_10000, propability_higher_10000, probability);

        return (probability);
    }
}

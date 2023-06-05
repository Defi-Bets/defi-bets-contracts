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
        uint256 delta,
        uint256 curr_price,
        uint256 implied_volatility_1000,
        uint256 days_until_expiry_10000,
        uint256 implied_volatility_days
    ) internal pure returns (uint256) {
        return
            (delta * BILLION) /
            (curr_price * implied_volatility_1000 * Math.sqrt(days_until_expiry_10000 / implied_volatility_days));
    }

    function toUint16(bytes memory _bytes, uint256 _start) internal pure returns (uint16) {
        require(_bytes.length >= _start + 2, "toUint16_outOfBounds");
        uint16 tempUint;

        assembly {
            tempUint := mload(add(add(_bytes, 0x2), mul(_start,2)))
        }

        return tempUint;
    }


    function lookupZtableFromStdDeviation(
        uint256 std_deviation,
        bool use_negative_z_table
    ) private pure returns (uint16) {
        uint256 index = std_deviation / 500;

        if(Z_TABLE_MAX < index)
        {
            index = Z_TABLE_MAX;
        }

        if (use_negative_z_table) {
            // use negative Z-Table
            index = Z_TABLE_MAX - index; /* Invert for negative Z-Table values */
            return toUint16(z_table_negative, index);
        } else {
            // use positive Z-Table
            return toUint16(z_table_positive, index);
        }
    }

    function calculateProbabilityForBetPrice(
        uint256 bet_price,
        uint256 curr_price,
        uint256 implied_volatility_1000 /* multiplied by 1000 */,
        uint256 implied_volatility_days,
        uint256 days_until_expiry_10000 /* multiplied by 10.000 */
    ) public view returns (uint16) {
        uint256 delta = 0;
        bool use_negative_z_table = false;

        if (curr_price > bet_price) {
            use_negative_z_table = true;
            delta = curr_price - bet_price; /* calculate distance (delta) to current price */
        }else{
            delta = bet_price - curr_price; /* calculate distance (delta) to current price */
        }
        uint256 std_deviation = calculateStandardDeviation(
            uint256(delta),
            curr_price,
            implied_volatility_1000,
            days_until_expiry_10000,
            implied_volatility_days
        );

        console.log("std_deviation: %i %b", std_deviation, use_negative_z_table);

        return lookupZtableFromStdDeviation(std_deviation, use_negative_z_table);
    }

    function calculateProbabilityRange(
        uint256 bet_range_lower,
        uint256 bet_range_higher,
        uint256 curr_price,
        uint256 implied_volatility_1000 /* multiplied by 1000 */,
        uint256 implied_volatility_days,
        uint256 days_until_expiry_10000 /* multiplied by 10.000 */
    ) public view returns (uint256) {

        // Sanity checks
        if((bet_range_lower < 0) || (bet_range_higher < 0) || (curr_price < 0))
        {
            revert MathLibraryDefibets__WrongParameter();
        }

        //-----------------------------------------------------
        // 1. calculate probability for lower range boundary
        //-----------------------------------------------------

        uint16 propability_lower_10000 = calculateProbabilityForBetPrice(bet_range_lower, curr_price, implied_volatility_1000, implied_volatility_days, days_until_expiry_10000);


        //-----------------------------------------------------
        // 2. calculate probability for higher range boundary
        //-----------------------------------------------------
        
        uint16 propability_higher_10000 = calculateProbabilityForBetPrice(bet_range_higher, curr_price, implied_volatility_1000, implied_volatility_days, days_until_expiry_10000);


        //---------------------------------------------------------------
        // 3. calculate end probability for the range. (higher - lower)
        //---------------------------------------------------------------
        uint256 probability = propability_higher_10000 - propability_lower_10000;

        console.log("Probability: Lower %i, Higher: %i, Result: %i", propability_lower_10000, propability_higher_10000, probability);

        return (probability);
    }
}

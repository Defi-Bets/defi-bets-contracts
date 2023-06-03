//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

error MathLibraryDefibets__WrongParameter();

library MathLibraryDefibets {
    using SafeMath for uint256;

    // positive Z-Table probability values from standard deviation 0 to 3. Needed to get probability from standard deviation.
    bytes constant z_table_positive =
        "144F151615DC16A11763182318E0199A1A501B031BB01C591CFE1D9C1E361EC91F571FDF206120DD215321C3222D229122F02348239B23E82431247424B224EC25212552257F25A925CE25F12610262C2646265D26722685269626A526B226BE26C926D226DA26E126E826ED26F226F626FA26FD27002703";

    // negative Z-Table probability values from standard deviation -3 to -0.05. Needed to get probability from standard deviation.
    bytes constant z_table_negative =
        "000D001000130016001A001E00230028002F0036003E00470052005E006B007A008B009E00B300CA00E40100011F01420167019101BE01EF0224025E029C02DF0328037503C80420047F04E3054D05BD063306AF073107B9084708DA09740A120AB70B600C0D0CC00E300EED0FAD106F113411FA12C11388";

    uint256 public constant BILLION = 1000000000;
    uint256 public constant Z_TABLE_LENGTH = 60; // 60 values per table with each value 2 byte length

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

    function tableLookup(bytes memory table, uint256 index) internal pure returns (uint256) {
        require(table.length >= index + 2, "toUint16_outOfBounds");
        uint16 Uint16_val;

        assembly {
            Uint16_val := mload(add(add(table, 2), index))
        }

        return Uint16_val;
    }

    function lookupZtableFromStdDeviation(
        uint256 std_deviation,
        bool use_negative_z_table
    ) private pure returns (uint256) {
        uint256 index;

        if (use_negative_z_table) {
            // use negative Z-Table
            index = Z_TABLE_LENGTH - (std_deviation / 500);
            return tableLookup(z_table_negative, index);
        } else {
            // use positive Z-Table
            index = std_deviation / 500;
            return tableLookup(z_table_positive, index);
        }
    }

    function calculateProbabilityRange(
        int256 range_lower,
        int256 range_higher,
        uint256 curr_price,
        uint256 implied_volatility_1000 /* multiplied by 1000 */,
        uint256 implied_volatility_days,
        uint256 days_until_expiry_10000 /* multiplied by 10.000 */
    ) public pure returns (uint256) {
        int256 delta = 0;
        bool use_negative_z_table = false;

        // Sanity checks
        if((range_lower < 0) || (range_higher < 0) || (curr_price < 0))
        {
            revert MathLibraryDefibets__WrongParameter();
        }

        //-----------------------------------------------------
        // 1. calculate probability for lower range boundary
        //-----------------------------------------------------
        delta = range_lower - int256(curr_price); /* calculate distance (delta) to current price */
        if (delta < 0) {
            use_negative_z_table = true;
            delta = -delta; /* use absolute and no negative values for calculations */
        }
        uint256 std_deviation_lower = calculateStandardDeviation(
            uint256(delta),
            curr_price,
            implied_volatility_1000,
            days_until_expiry_10000,
            implied_volatility_days
        );

        uint256 propability_lower_10000 = lookupZtableFromStdDeviation(std_deviation_lower, use_negative_z_table);


        //-----------------------------------------------------
        // 2. calculate probability for higher range boundary
        //-----------------------------------------------------
        delta = range_higher - int256(curr_price); /* calculate distance (delta) to current price */
        if (delta < 0) {
            use_negative_z_table = true;
            delta = -delta; /* use absolute and no negative values for calculations */
        }
        uint256 std_deviation_higher = calculateStandardDeviation(
            uint256(delta),
            curr_price,
            implied_volatility_1000,
            days_until_expiry_10000,
            implied_volatility_days
        );

        uint256 propability_higher_10000 = lookupZtableFromStdDeviation(std_deviation_higher, use_negative_z_table);


        //---------------------------------------------------------------
        // 3. calculate end probability for the range. (higher - lower)
        //---------------------------------------------------------------
        uint256 probability = propability_higher_10000 - propability_lower_10000;


        return (probability);
    }
}

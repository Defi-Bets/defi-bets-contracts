//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

library MathLibraryDefibets {

    using SafeMath for uint256;

    bytes constant z_table = "00E40100011F01420167019101BE01EF0224025E029C02DF0328037503C80420047F04E3054D05BD063306AF073107B9084708DA09740A120AB70B600C0D0CC00E300EED0FAD106F113411FA12C11388144F151615DC16A11763182318E0199A1A501B031BB01C591CFE1D9C1E361EC91F571FDF206120DD215321C3222D229122F02348239B23E82431247424B224EC25212552257F25A925CE25F12610262C";

    function table_lookup(bytes memory table, uint256 index) internal pure returns (uint16) {
        require(table.length >= index + 2, "toUint16_outOfBounds");
        uint16 Uint16_val;

        assembly {
            Uint16_val := mload(add(add(table, 2), index))
        }

        return Uint16_val;
    }

    function lookup_ztable_from_std_deviation (uint256 std_deviation) private pure returns (uint16) {
        uint256 index = std_deviation /* TODO: Calc correct index from std_deviation */;
        return table_lookup(z_table, index);
    }

    function calculate_probability_range(uint256 range_lower,
        uint256 range_higher,
        uint256 curr_price,
        uint256 implied_volatility_1000 /* multiplied by 1000 */,
        uint256 implied_volatility_days,
        uint256 days_until_expiry_1000 /* multiplied by 1000 */)
        public returns (uint256) {
            uint256 std_deviation_lower = (range_lower - curr_price) / (curr_price * implied_volatility_1000 * Math.sqrt(days_until_expiry_1000/implied_volatility_days));
            uint256 std_deviation_higher = (range_higher - curr_price) / (curr_price * implied_volatility_1000 * Math.sqrt(days_until_expiry_1000/implied_volatility_days));

            uint256 propability_lower_10000 = lookup_ztable_from_std_deviation(std_deviation_lower);
            uint256 propability_higher_10000 = lookup_ztable_from_std_deviation(std_deviation_higher);

            uint256 probability = propability_higher_10000 - propability_lower_10000;

            return (probability);
      }
}
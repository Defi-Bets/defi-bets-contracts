const contracts = {
  31337: [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        FakeDUSD: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        MathLibraryDefibets: {
          address: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
          abi: [
            {
              inputs: [],
              name: "MathLibraryDefibets__WrongParameter",
              type: "error",
            },
            {
              inputs: [],
              name: "BILLION",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "Z_TABLE_MAX",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "lowerPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "upperPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "impliedVolatility",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "impliedVolatilityTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timeUntilEpxiry",
                  type: "uint256",
                },
              ],
              name: "calculateProbabilityRange",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        UseMathLibraryDefibets: {
          address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "calculateProbabilityRange",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        DefiBetsManager: {
          address: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_feePpm",
                  type: "uint256",
                },
                {
                  internalType: "uint8",
                  name: "_startPayoutFactor",
                  type: "uint8",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "DefiBetsManager__AccessForbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__FeeNotAllowed",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__FeeWouldBeTooSmall",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__NoLiquidity",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__NoValidUnderlying",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__NotValidRoundId",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__ParamNull",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "feePpm",
                  type: "uint256",
                },
              ],
              name: "FeeUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "underlying",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "feed",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "period",
                  type: "uint256",
                },
              ],
              name: "IVFeedUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Paused",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "payoutFactor",
                  type: "uint256",
                },
              ],
              name: "PayoutFactorUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "underlying",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "priceFeed",
                  type: "address",
                },
              ],
              name: "PriceFeedUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "underlying",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "underlyingHash",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "defiBets",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "vault",
                  type: "address",
                },
              ],
              name: "UnderlyingAdded",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Unpaused",
              type: "event",
            },
            {
              inputs: [],
              name: "MAX_FEE_PPM",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MILLION",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_feed",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_defiBets",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_vault",
                  type: "address",
                },
              ],
              name: "addUnderlyingToken",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "calculateFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_price",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_betSize",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "calculateWinning",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "claimWinnings",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_tokenHash",
                  type: "bytes32",
                },
              ],
              name: "createNewExpTime",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "defiBetsContracts",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
                {
                  internalType: "uint80",
                  name: "_roundId",
                  type: "uint80",
                },
              ],
              name: "executeExpiration",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "feePpm",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "getCurrPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "getImplVol",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLPTokenSupplies",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "_roundId",
                  type: "uint80",
                },
              ],
              name: "getPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_token",
                  type: "string",
                },
              ],
              name: "getUnderlyingByte",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "_startExpTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxWinMultiplier",
                  type: "uint256",
                },
              ],
              name: "initializeBets",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "liquidityPool",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "paused",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "payoutFactor",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "payoutRatioContract",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "provideLP",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "_withfees",
                  type: "bool",
                },
              ],
              name: "redeemLPTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_liquidityPool",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_payoutRatioContract",
                  type: "address",
                },
              ],
              name: "setAddresses",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_betSize",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
              ],
              name: "setBet",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxLossPerExpTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxWinMultiplier",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_timeDelta",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_dependentTimeStamp",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "setDefiBetsParameter",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newFee",
                  type: "uint256",
                },
              ],
              name: "setFeesPpm",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_payoutFactor",
                  type: "uint256",
                },
              ],
              name: "setNewPayoutFactor",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "underlyingIVFeeds",
              outputs: [
                {
                  internalType: "address",
                  name: "feedAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "period",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "underlyingPriceFeeds",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "_feed",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_period",
                  type: "uint256",
                },
              ],
              name: "updateIVFeed",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newMaxLoss",
                  type: "uint256",
                },
              ],
              name: "updateMaxLPLoss",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "_feed",
                  type: "address",
                },
              ],
              name: "updatePriceFeed",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "validUnderlying",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "vaults",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        DefiBets: {
          address: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
          abi: [
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_defiBetsManager",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "DefiBets_NoValidParamters",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__AlreadyClaimed",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__AlreadyInitialized",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__Forbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NoValidExpTime",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NoValidPrice",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NoValidWinningPrice",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NotActive",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NotEpxired",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NotExecutableTime",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NotTheTokenOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__OutOfActiveExpTimeRange",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__ParameterNotInitialized",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__TokenDontExists",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "minBetDuration",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "maxBetDuration",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "slot",
                  type: "uint256",
                },
              ],
              name: "BetParameterUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "betSize",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "profit",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expDate",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "minPrice",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "maxPrice",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "BetPlaced",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "profit",
                  type: "bool",
                },
              ],
              name: "Claimed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "maxLpLoss",
                  type: "uint256",
                },
              ],
              name: "EpxirationTimeCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "profit",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "delta",
                  type: "uint256",
                },
              ],
              name: "Expiration",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expirationDate",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalBets",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "maxUserWinnings",
                  type: "uint256",
                },
              ],
              name: "ExpiryTimeBetInfoUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "betsWinningSlots",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxUserWinnings",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_totalBets",
                  type: "uint256",
                },
              ],
              name: "calculateMaxLPLoss",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_winning",
                  type: "uint256",
                },
              ],
              name: "calculateMaxUserWinnings",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_tokenId",
                  type: "uint256",
                },
              ],
              name: "claimForAccount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "defiBetsManager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "expTimeInfos",
              outputs: [
                {
                  internalType: "uint256",
                  name: "maxUserWinning",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "totalBets",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxLossLimit",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "expPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deltaValue",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "slotSize",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "finished",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "profit",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "init",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_tokenId",
                  type: "uint256",
                },
              ],
              name: "getBetTokenData",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "expTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "betSize",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "profit",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "minPrice",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxPrice",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "claimed",
                      type: "bool",
                    },
                  ],
                  internalType: "struct DefiBets.Bet",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getDependentExpTime",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_dependentTimeStamp",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxLossPerExpTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxWinMultiplier",
                  type: "uint256",
                },
              ],
              name: "initializeData",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxLpLoss",
                  type: "uint256",
                },
              ],
              name: "initializeNewExpTime",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "isActive",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "lastActiveExpTime",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxBetDuration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxWinMultiplier",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "minBetDuration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expPrice",
                  type: "uint256",
                },
              ],
              name: "performExpiration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_betSize",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_winning",
                  type: "uint256",
                },
              ],
              name: "setBetForAccount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxLossPerExpTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxWinMultiplier",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_timeDelta",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_dependentTimeStamp",
                  type: "uint256",
                },
              ],
              name: "setBetParamater",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "slot",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "stop",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "timeDelta",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tokenIds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "underlying",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        DefiBetsVault: {
          address: "0x5FC8d32690cc91D4c39d9d3abcBD16989F875707",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_defibetsManager",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "DefiBetsVault__Forbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsVault__NotEnoughFunds",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "supply",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalFees",
                  type: "uint256",
                },
              ],
              name: "Deposit",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "FessWithdrawd",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newSupply",
                  type: "uint256",
                },
              ],
              name: "Withdraw",
              type: "event",
            },
            {
              inputs: [],
              name: "defiBetsManager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_from",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_fees",
                  type: "uint256",
                },
              ],
              name: "deposit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "depositFromLP",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "expTimeSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalFees",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawFees",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        LiquidityPool: {
          address: "0x0165878A594ca255338adfa4d48449f69242Eb8F",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_managerContract",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_betVault",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_maxLossPerTimePercent",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "LiquidityPool__AccessForbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "LiquidityPool__HasNoTokenSupply",
              type: "error",
            },
            {
              inputs: [],
              name: "LiquidityPool__NoRedeemTrackerSet",
              type: "error",
            },
            {
              inputs: [],
              name: "LiquidityPool__NotAllowedAmount",
              type: "error",
            },
            {
              inputs: [],
              name: "LiquidityPool__NotEnoughFreeSupply",
              type: "error",
            },
            {
              inputs: [],
              name: "LiquidityPool__VaultNotValid",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "shares",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalTokens",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalSupply",
                  type: "uint256",
                },
              ],
              name: "Deposit",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "lockedTokenSupply",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "lockedPerExpTime",
                  type: "uint256",
                },
              ],
              name: "LockedSupplyUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newMaxLoss",
                  type: "uint256",
                },
              ],
              name: "MaxLossPerTimeUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Paused",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "shares",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalTokens",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalSupply",
                  type: "uint256",
                },
              ],
              name: "Redeem",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "redeemFee",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "redeemPeriod",
                  type: "uint256",
                },
              ],
              name: "RedeemConditionsSetup",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "redeemTracker",
                  type: "address",
                },
              ],
              name: "SetRedeemTracker",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "TokenSupplyUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Unpaused",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "balanceTokens",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "calcSharesToMint",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_shares",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "_withFee",
                  type: "bool",
                },
              ],
              name: "calcTokensToWithdraw",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "depositForAccount",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "lockedPerExpTime",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "lockedTokenSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "managerContract",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxLPLost",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxLostPerTimeInPercent",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "paused",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "redeemFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "redeemPeriod",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_shares",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "_withFee",
                  type: "bool",
                },
              ],
              name: "redeemSharesForAccount",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "redeemTracker",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "resetLockedTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_redeemTracker",
                  type: "address",
                },
              ],
              name: "setRedeemTracker",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_redeemFee",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_redeemPeriod",
                  type: "uint256",
                },
              ],
              name: "setupRedeemConditions",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_vault",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "transferTokensToVault",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_delta",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "_increase",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "updateLockedTokenSupply",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newMaxLoss",
                  type: "uint256",
                },
              ],
              name: "updateMaxLoss",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "validVaults",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        DefiBetsPayoutRatio: {
          address: "0xa513E6E4b8f2a923D98304ec87F64353C4D5C853",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_managerContract",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_period",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_targetPayoutRatio",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_startTimeStamp",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "DefiBetsPayoutRatio__AccessForbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsPayoutRatio__NoValidExpTime",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currProfit",
                  type: "uint256",
                },
              ],
              name: "UpdateProfitLP",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currProfit",
                  type: "uint256",
                },
              ],
              name: "UpdateProfitPlayer",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "startIndex",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "endIndex",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currProfitsPeriodLP",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currProfitsPeriodPlayer",
                  type: "uint256",
                },
              ],
              name: "UpdateProfitsPeriod",
              type: "event",
            },
            {
              inputs: [],
              name: "MIN_PAYOUT_FACTOR",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "adjustmentFactor",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_timestamp",
                  type: "uint256",
                },
              ],
              name: "calulateAdjustedTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "currProfitsPeriodLP",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "currProfitsPeriodPlayer",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "delta",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "period",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_factor",
                  type: "uint256",
                },
              ],
              name: "setAdjustmentFactor",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_targetPayoutRatio",
                  type: "uint256",
                },
              ],
              name: "setTargetPayoutRatio",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "startTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "targetPayoutRatio",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "totalProfitLP",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "totalProfitPlayer",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "updateLPProfit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_currentPayoutFactor",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "updatePlayerProfit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        RedeemTracker: {
          address: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_LiquidityPool",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "RedeemTracker__NotAllowed",
              type: "error",
            },
            {
              inputs: [],
              name: "RedeemTracker__NotTheOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "RedeemTracker__TimeNotPassed",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenID",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "RedeemFinished",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenID",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "redeemTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "RedeemStarted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_tokenID",
                  type: "uint256",
                },
              ],
              name: "finishRedeemPeriod",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "liquditiyPool",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "redeemInfos",
              outputs: [
                {
                  internalType: "uint256",
                  name: "redeemTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "tokenAmount",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_redeemer",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_redeemTime",
                  type: "uint256",
                },
              ],
              name: "startRedeemPeriod",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_tokenID",
                  type: "uint256",
                },
              ],
              name: "timePassed",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tokenIds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        ImpliedVolatilityOracle: {
          address: "0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "_decimals",
                  type: "uint8",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_version",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_period",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "description",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getAnswer",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "_roundId",
                  type: "uint80",
                },
              ],
              name: "getRoundData",
              outputs: [
                {
                  internalType: "uint80",
                  name: "roundId",
                  type: "uint80",
                },
                {
                  internalType: "int256",
                  name: "answer",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "updatedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "answeredInRound",
                  type: "uint80",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getStartedAt",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "latestRoundData",
              outputs: [
                {
                  internalType: "uint80",
                  name: "roundId",
                  type: "uint80",
                },
                {
                  internalType: "int256",
                  name: "answer",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "updatedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "answeredInRound",
                  type: "uint80",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "period",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "underlying",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "int256",
                  name: "_answer",
                  type: "int256",
                },
              ],
              name: "updateAnswer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "version",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        BTCPriceOracle: {
          address: "0x9A676e781A523b5d0C0e43731313A708CB607508",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "_decimals",
                  type: "uint8",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_version",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "description",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getAnswer",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "_roundId",
                  type: "uint80",
                },
              ],
              name: "getRoundData",
              outputs: [
                {
                  internalType: "uint80",
                  name: "roundId",
                  type: "uint80",
                },
                {
                  internalType: "int256",
                  name: "answer",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "updatedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "answeredInRound",
                  type: "uint80",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getStartedAt",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "latestRoundData",
              outputs: [
                {
                  internalType: "uint80",
                  name: "roundId",
                  type: "uint80",
                },
                {
                  internalType: "int256",
                  name: "answer",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "updatedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "answeredInRound",
                  type: "uint80",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "underlying",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "int256",
                  name: "_answer",
                  type: "int256",
                },
              ],
              name: "updateAnswer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "version",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
  80001: [
    {
      name: "mumbai",
      chainId: "80001",
      contracts: {
        BTCPriceOracle: {
          address: "0x28bc1907aaF9f026133a0a4C4FcE33c515F7Cf2d",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "_decimals",
                  type: "uint8",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_version",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "description",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getAnswer",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "_roundId",
                  type: "uint80",
                },
              ],
              name: "getRoundData",
              outputs: [
                {
                  internalType: "uint80",
                  name: "roundId",
                  type: "uint80",
                },
                {
                  internalType: "int256",
                  name: "answer",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "updatedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "answeredInRound",
                  type: "uint80",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getStartedAt",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "latestRoundData",
              outputs: [
                {
                  internalType: "uint80",
                  name: "roundId",
                  type: "uint80",
                },
                {
                  internalType: "int256",
                  name: "answer",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "updatedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "answeredInRound",
                  type: "uint80",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "underlying",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "int256",
                  name: "_answer",
                  type: "int256",
                },
              ],
              name: "updateAnswer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "version",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        DefiBets: {
          address: "0xaE95eBa4FCfab4c0f3AA26235601ce32Da70562B",
          abi: [
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_defiBetsManager",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "DefiBets_NoValidParamters",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__AlreadyClaimed",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__AlreadyInitialized",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__Forbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NoValidExpTime",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NoValidPrice",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NoValidWinningPrice",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NotActive",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NotEpxired",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NotExecutableTime",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__NotTheTokenOwner",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__OutOfActiveExpTimeRange",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__ParameterNotInitialized",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBets__TokenDontExists",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "approved",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "ApprovalForAll",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "minBetDuration",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "maxBetDuration",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "slot",
                  type: "uint256",
                },
              ],
              name: "BetParameterUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "betSize",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "profit",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expDate",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "minPrice",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "maxPrice",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "BetPlaced",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "profit",
                  type: "bool",
                },
              ],
              name: "Claimed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "maxLpLoss",
                  type: "uint256",
                },
              ],
              name: "EpxirationTimeCreated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bool",
                  name: "profit",
                  type: "bool",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "delta",
                  type: "uint256",
                },
              ],
              name: "Expiration",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expirationDate",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalBets",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "maxUserWinnings",
                  type: "uint256",
                },
              ],
              name: "ExpiryTimeBetInfoUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "betsWinningSlots",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxUserWinnings",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_totalBets",
                  type: "uint256",
                },
              ],
              name: "calculateMaxLPLoss",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_winning",
                  type: "uint256",
                },
              ],
              name: "calculateMaxUserWinnings",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_tokenId",
                  type: "uint256",
                },
              ],
              name: "claimForAccount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "defiBetsManager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "expTimeInfos",
              outputs: [
                {
                  internalType: "uint256",
                  name: "maxUserWinning",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "totalBets",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "maxLossLimit",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "expPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "deltaValue",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "slotSize",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "finished",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "profit",
                  type: "bool",
                },
                {
                  internalType: "bool",
                  name: "init",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "getApproved",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_tokenId",
                  type: "uint256",
                },
              ],
              name: "getBetTokenData",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "expTime",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "betSize",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "profit",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "minPrice",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "maxPrice",
                      type: "uint256",
                    },
                    {
                      internalType: "bool",
                      name: "claimed",
                      type: "bool",
                    },
                  ],
                  internalType: "struct DefiBets.Bet",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getDependentExpTime",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_dependentTimeStamp",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxLossPerExpTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxWinMultiplier",
                  type: "uint256",
                },
              ],
              name: "initializeData",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxLpLoss",
                  type: "uint256",
                },
              ],
              name: "initializeNewExpTime",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "isActive",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
              ],
              name: "isApprovedForAll",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "lastActiveExpTime",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxBetDuration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxWinMultiplier",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "minBetDuration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "ownerOf",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expPrice",
                  type: "uint256",
                },
              ],
              name: "performExpiration",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "safeTransferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "operator",
                  type: "address",
                },
                {
                  internalType: "bool",
                  name: "approved",
                  type: "bool",
                },
              ],
              name: "setApprovalForAll",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_betSize",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_winning",
                  type: "uint256",
                },
              ],
              name: "setBetForAccount",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxLossPerExpTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxWinMultiplier",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_timeDelta",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_dependentTimeStamp",
                  type: "uint256",
                },
              ],
              name: "setBetParamater",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "slot",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "stop",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes4",
                  name: "interfaceId",
                  type: "bytes4",
                },
              ],
              name: "supportsInterface",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "timeDelta",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "tokenIds",
              outputs: [
                {
                  internalType: "uint256",
                  name: "_value",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "tokenURI",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "tokenId",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "underlying",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        DefiBetsManager: {
          address: "0xe02AF4b9b73a573E4F00816cf0D235a98DdEEc14",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_feePpm",
                  type: "uint256",
                },
                {
                  internalType: "uint8",
                  name: "_startPayoutFactor",
                  type: "uint8",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "DefiBetsManager__AccessForbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__FeeNotAllowed",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__FeeWouldBeTooSmall",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__NoLiquidity",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__NoValidUnderlying",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__NotValidRoundId",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsManager__ParamNull",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "feePpm",
                  type: "uint256",
                },
              ],
              name: "FeeUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "underlying",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "feed",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "period",
                  type: "uint256",
                },
              ],
              name: "IVFeedUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Paused",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "payoutFactor",
                  type: "uint256",
                },
              ],
              name: "PayoutFactorUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "underlying",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "priceFeed",
                  type: "address",
                },
              ],
              name: "PriceFeedUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "string",
                  name: "underlying",
                  type: "string",
                },
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "underlyingHash",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "defiBets",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "address",
                  name: "vault",
                  type: "address",
                },
              ],
              name: "UnderlyingAdded",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "Unpaused",
              type: "event",
            },
            {
              inputs: [],
              name: "MAX_FEE_PPM",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "MILLION",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
                {
                  internalType: "address",
                  name: "_feed",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_defiBets",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_vault",
                  type: "address",
                },
              ],
              name: "addUnderlyingToken",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "calculateFee",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_price",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_betSize",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "calculateWinning",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_tokenId",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "claimWinnings",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_tokenHash",
                  type: "bytes32",
                },
              ],
              name: "createNewExpTime",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "defiBetsContracts",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
                {
                  internalType: "uint80",
                  name: "_roundId",
                  type: "uint80",
                },
              ],
              name: "executeExpiration",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "feePpm",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "getCurrPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "getImplVol",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getLPTokenSupplies",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "_roundId",
                  type: "uint80",
                },
              ],
              name: "getPrice",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_token",
                  type: "string",
                },
              ],
              name: "getUnderlyingByte",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "pure",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
                {
                  internalType: "uint256",
                  name: "_startExpTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxWinMultiplier",
                  type: "uint256",
                },
              ],
              name: "initializeBets",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "liquidityPool",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "paused",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "payoutFactor",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "payoutRatioContract",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "provideLP",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "redeemLPTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_liquidityPool",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_payoutRatioContract",
                  type: "address",
                },
              ],
              name: "setAddresses",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_betSize",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
              ],
              name: "setBet",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_maxLossPerExpTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_minBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxBetDuration",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_slot",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_maxWinMultiplier",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_timeDelta",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_dependentTimeStamp",
                  type: "uint256",
                },
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
              ],
              name: "setDefiBetsParameter",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newFee",
                  type: "uint256",
                },
              ],
              name: "setFeesPpm",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_payoutFactor",
                  type: "uint256",
                },
              ],
              name: "setNewPayoutFactor",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "underlyingIVFeeds",
              outputs: [
                {
                  internalType: "address",
                  name: "feedAddress",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "period",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "underlyingPriceFeeds",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "_feed",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_period",
                  type: "uint256",
                },
              ],
              name: "updateIVFeed",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newMaxLoss",
                  type: "uint256",
                },
              ],
              name: "updateMaxLPLoss",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "_hash",
                  type: "bytes32",
                },
                {
                  internalType: "address",
                  name: "_feed",
                  type: "address",
                },
              ],
              name: "updatePriceFeed",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "validUnderlying",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              name: "vaults",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        DefiBetsPayoutRatio: {
          address: "0xbCE26f8AfDeB5c8EBba131001F34E227650B6e94",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_managerContract",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_period",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_targetPayoutRatio",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_startTimeStamp",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "DefiBetsPayoutRatio__AccessForbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsPayoutRatio__NoValidExpTime",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currProfit",
                  type: "uint256",
                },
              ],
              name: "UpdateProfitLP",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currProfit",
                  type: "uint256",
                },
              ],
              name: "UpdateProfitPlayer",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "startIndex",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "endIndex",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currProfitsPeriodLP",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "currProfitsPeriodPlayer",
                  type: "uint256",
                },
              ],
              name: "UpdateProfitsPeriod",
              type: "event",
            },
            {
              inputs: [],
              name: "MIN_PAYOUT_FACTOR",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "adjustmentFactor",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_timestamp",
                  type: "uint256",
                },
              ],
              name: "calulateAdjustedTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "currProfitsPeriodLP",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "currProfitsPeriodPlayer",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "delta",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "period",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_factor",
                  type: "uint256",
                },
              ],
              name: "setAdjustmentFactor",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_targetPayoutRatio",
                  type: "uint256",
                },
              ],
              name: "setTargetPayoutRatio",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "startTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "targetPayoutRatio",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "totalProfitLP",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "totalProfitPlayer",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "updateLPProfit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_currentPayoutFactor",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "updatePlayerProfit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        DefiBetsVault: {
          address: "0x2De4c9558eCA62973ca0BDC37c7a87c476D82486",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_defibetsManager",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "DefiBetsVault__Forbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "DefiBetsVault__NotEnoughFunds",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "supply",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalFees",
                  type: "uint256",
                },
              ],
              name: "Deposit",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "FessWithdrawd",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newSupply",
                  type: "uint256",
                },
              ],
              name: "Withdraw",
              type: "event",
            },
            {
              inputs: [],
              name: "defiBetsManager",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_from",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_fees",
                  type: "uint256",
                },
              ],
              name: "deposit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "depositFromLP",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "expTimeSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalFees",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "withdraw",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "withdrawFees",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        FakeDUSD: {
          address: "0xEAaDaE282b1131E80621Bba7AA4F754978C74962",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "mint",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        ImpliedVolatilityOracle: {
          address: "0x5B88Af642e17F350D2AA4eCb183340A9B40cD7aC",
          abi: [
            {
              inputs: [
                {
                  internalType: "uint8",
                  name: "_decimals",
                  type: "uint8",
                },
                {
                  internalType: "string",
                  name: "_description",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_version",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_underlying",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_period",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "previousOwner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "description",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getAnswer",
              outputs: [
                {
                  internalType: "int256",
                  name: "",
                  type: "int256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "_roundId",
                  type: "uint80",
                },
              ],
              name: "getRoundData",
              outputs: [
                {
                  internalType: "uint80",
                  name: "roundId",
                  type: "uint80",
                },
                {
                  internalType: "int256",
                  name: "answer",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "updatedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "answeredInRound",
                  type: "uint80",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getStartedAt",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint80",
                  name: "",
                  type: "uint80",
                },
              ],
              name: "getTimestamp",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "latestRoundData",
              outputs: [
                {
                  internalType: "uint80",
                  name: "roundId",
                  type: "uint80",
                },
                {
                  internalType: "int256",
                  name: "answer",
                  type: "int256",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "updatedAt",
                  type: "uint256",
                },
                {
                  internalType: "uint80",
                  name: "answeredInRound",
                  type: "uint80",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "period",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "renounceOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "newOwner",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "underlying",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "int256",
                  name: "_answer",
                  type: "int256",
                },
              ],
              name: "updateAnswer",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "version",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        LiquidityPool: {
          address: "0xD71e7375457AC8cE7E75171878F020f704df023E",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_managerContract",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_token",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "_betVault",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_maxLossPerTimePercent",
                  type: "uint256",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "LiquidityPool__AccessForbidden",
              type: "error",
            },
            {
              inputs: [],
              name: "LiquidityPool__NotAllowedAmount",
              type: "error",
            },
            {
              inputs: [],
              name: "LiquidityPool__NotEnoughFreeSuppy",
              type: "error",
            },
            {
              inputs: [],
              name: "LiquidityPool__VaultNotValid",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "shares",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalTokens",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalSupply",
                  type: "uint256",
                },
              ],
              name: "Deposit",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "lockedTokenSupply",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "expTime",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "lockedPerExpTime",
                  type: "uint256",
                },
              ],
              name: "LockedSupplyUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "newMaxLoss",
                  type: "uint256",
                },
              ],
              name: "MaxLossPerTimeUpdated",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "shares",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalTokens",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "totalSupply",
                  type: "uint256",
                },
              ],
              name: "Redeem",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "balanceTokens",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "calcSharesToMint",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_shares",
                  type: "uint256",
                },
              ],
              name: "calcTokensToWithdraw",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "depositForAccount",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "lockedPerExpTime",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "lockedTokenSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "managerContract",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxLPLost",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "maxLostPerTimeInPercent",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_account",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_shares",
                  type: "uint256",
                },
              ],
              name: "redeemSharesForAccount",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "resetLockedTokens",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "token",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalTokenSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_vault",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "transferTokensToVault",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_delta",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "_increase",
                  type: "bool",
                },
                {
                  internalType: "uint256",
                  name: "_expTime",
                  type: "uint256",
                },
              ],
              name: "updateLockedTokenSupply",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_newMaxLoss",
                  type: "uint256",
                },
              ],
              name: "updateMaxLoss",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_vault",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "bool",
                  name: "_profit",
                  type: "bool",
                },
              ],
              name: "updateTokenSupply",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              name: "validVaults",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        MathLibraryDefibets: {
          address: "0x22Ff558206262bB81ac350f03528b5d7944806ab",
          abi: [
            {
              inputs: [],
              name: "MathLibraryDefibets__WrongParameter",
              type: "error",
            },
            {
              inputs: [],
              name: "BILLION",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "Z_TABLE_MAX",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "lowerPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "upperPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "currPrice",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "impliedVolatility",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "impliedVolatilityTime",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "timeUntilEpxiry",
                  type: "uint256",
                },
              ],
              name: "calculateProbabilityRange",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
        UseMathLibraryDefibets: {
          address: "0xdB826BA52b788402D0c202Ba22e814CfD284c4a3",
          abi: [
            {
              inputs: [],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "calculateProbabilityRange",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;

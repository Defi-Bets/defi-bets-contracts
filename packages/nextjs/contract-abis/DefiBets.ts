const abi = [
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
    ],
    name: "BetPlaced",
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
        indexed: false,
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
    inputs: [],
    name: "EXP_TIME_DELTA",
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
    name: "getStartExpTime",
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
        name: "_startExpTime",
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
] as const;

export default abi;

# DefiBets Manager Contract

This smart contract controls the main functions of the protocol, allowing users to interact with the decentralized betting platform. It manages liquidity, bets, winnings, and expiration of bets.

## State Variables

- `liquidityPool`: The address of the liquidity pool contract.
- `mathContract`: The address of the math contract.
- `fee`: The fee percentage charged for placing bets.

## Events

- `UnderlyingAdded`: Triggered when a new underlying asset is added to the platform.
- `PriceFeedUpdated`: Triggered when the price feed for an underlying asset is updated.
- `FeeUpdated`: Triggered when the fee percentage is updated.

## Modifiers

- `whenNotPaused()`: Modifier to check if the platform is not paused.

## Functions

### provideLP

```solidity
function provideLP(uint256 _amount) external whenNotPaused()
```

Provides liquidity to the liquidity pool on behalf of a user.

- `_amount`: The amount of liquidity to be provided.

### redeemLPTokens

```solidity
function redeemLPTokens(uint256 _amount) external whenNotPaused()
```

_To be implemented_

### setBet

```solidity
function setBet(uint256 _betSize, uint256 _minPrice, uint256 _maxPrice, uint256 _expTime, string memory _underlying) external whenNotPaused()
```

Sets a bet for a user in the decentralized betting platform.

- `_betSize`: The size of the bet.
- `_minPrice`: The minimum price for the bet.
- `_maxPrice`: The maximum price for the bet.
- `_expTime`: The expiration time for the bet.
- `_underlying`: The underlying asset for the bet.

### claimWinnings

```solidity
function claimWinnings(uint256 _tokenId, bytes32 _hash) external whenNotPaused()
```

Claims the winnings for a user based on a specified token ID and underlying asset hash.

- `_tokenId`: The token ID representing the bet.
- `_hash`: The hash of the underlying asset for the bet.

### executeExpiration

```solidity
function executeExpiration(uint256 _expTime, string memory _underlying) external whenNotPaused()
```

Executes the expiration of a bet based on the specified expiration time and underlying asset.

- `_expTime`: The expiration time of the bet.
- `_underlying`: The underlying asset for the bet.

### createNewExpTime

```solidity
function createNewExpTime(bytes32 _tokenHash) external whenNotPaused()
```

Creates a new expiration time for a given token hash.

- `_tokenHash`: The hash of the token.

### setAddresses

```solidity
function setAddresses(address _liquidityPool, address _mathContract) external onlyOwner
```

Sets the addresses of the liquidity pool and math contract.

- `_liquidityPool`: The address of the liquidity pool contract.
- `_mathContract`: The address of the math contract.

### addUnderlyingToken

```solidity
function addUnderlyingToken(string memory _underlying, address _feed, address _defiBets, address _vault) external onlyOwner
```

Adds a new underlying token to the platform.

- `_underlying`: The name of the underlying asset.
- `_feed`: The address of the price feed for the underlying asset.
- `_defiBets`: The address of the DefiBets contract for the underlying asset.
- `_vault`: The address of the vault contract for the underlying asset.

### updatePriceFeed

```solidity
function updatePriceFeed(bytes32 _hash, address _feed) public onlyOwner
```

Updates the price feed

for a given underlying asset.

- `_hash`: The hash of the underlying asset.
- `_feed`: The address of the price feed.

### initializeBets

```solidity
function initializeBets(bytes32 _hash, uint256 _startExpTime, uint256 _minBetDuration, uint256 _maxBetDuration, uint256 _slot) external onlyOwner
```

Initializes the bets for a given underlying asset.

- `_hash`: The hash of the underlying asset.
- `_startExpTime`: The start expiration time for bets.
- `_minBetDuration`: The minimum duration for a bet.
- `_maxBetDuration`: The maximum duration for a bet.
- `_slot`: The slot for the bets.

### setFees

```solidity
function setFees(uint256 _newFee) external onlyOwner
```

Sets the fee percentage charged for placing bets.

- `_newFee`: The new fee percentage.

### getPrice

```solidity
function getPrice(bytes32 _hash, uint256 _expTime) public view returns(uint256)
```

Gets the price for a given underlying asset at a specific expiration time.

- `_hash`: The hash of the underlying asset.
- `_expTime`: The expiration time.

### getUnderlyingByte

```solidity
function getUnderlyingByte(string memory _token) public pure returns(bytes32)
```

Gets the hash (bytes32) of a given underlying asset (string).

- `_token`: The underlying asset.

### calculateFee

```solidity
function calculateFee(uint256 _amount) public view returns(uint256)
```

Calculates the fee to be charged based on the given amount.

- `_amount`: The amount for which the fee is calculated.

---

Please note that this is a partial documentation of the smart contract. Additional information regarding the missing functions and their purpose should be provided to complete the documentation.

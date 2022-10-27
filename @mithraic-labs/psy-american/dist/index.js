'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var anchor = require('@project-serum/anchor');
var splToken = require('@solana/spl-token');
var web3_js = require('@solana/web3.js');
var serum = require('@project-serum/serum');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var anchor__namespace = /*#__PURE__*/_interopNamespace(anchor);

const IDL = {
    "version": "0.2.6",
    "name": "psy_american",
    "instructions": [
        {
            "name": "initializeMarket",
            "accounts": [
                {
                    "name": "authority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "underlyingAssetMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "quoteAssetMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "optionMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "writerTokenMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quoteAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "optionMarket",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeOwner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "underlyingAmountPerContract",
                    "type": "u64"
                },
                {
                    "name": "quoteAmountPerContract",
                    "type": "u64"
                },
                {
                    "name": "expirationUnixTimestamp",
                    "type": "i64"
                },
                {
                    "name": "bumpSeed",
                    "type": "u8"
                }
            ]
        },
        {
            "name": "mintOption",
            "accounts": [
                {
                    "name": "userAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "underlyingAssetMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "optionMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintedOptionDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "writerTokenMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintedWriterTokenDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "optionMarket",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "feeOwner",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "associatedTokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "size",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "mintOptionV2",
            "accounts": [
                {
                    "name": "userAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "underlyingAssetMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "optionMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintedOptionDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "writerTokenMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "mintedWriterTokenDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "optionMarket",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "size",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "exerciseOption",
            "accounts": [
                {
                    "name": "userAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "optionAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "optionMarket",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "optionMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "exerciserOptionTokenSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quoteAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quoteAssetSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "feeOwner",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "size",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "exerciseOptionV2",
            "accounts": [
                {
                    "name": "userAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "optionAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "optionMarket",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "optionMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "exerciserOptionTokenSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quoteAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quoteAssetSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "size",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "closePostExpiration",
            "accounts": [
                {
                    "name": "userAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "optionMarket",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "writerTokenMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "writerTokenSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "clock",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "size",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "closeOptionPosition",
            "accounts": [
                {
                    "name": "userAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "optionMarket",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "writerTokenMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "writerTokenSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "optionTokenMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "optionTokenSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "underlyingAssetDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "size",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "burnWriterForQuote",
            "accounts": [
                {
                    "name": "userAuthority",
                    "isMut": false,
                    "isSigner": true
                },
                {
                    "name": "optionMarket",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "writerTokenMint",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "writerTokenSrc",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "quoteAssetPool",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "writerQuoteDest",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "size",
                    "type": "u64"
                }
            ]
        },
        {
            "name": "initSerumMarket",
            "accounts": [
                {
                    "name": "userAuthority",
                    "isMut": true,
                    "isSigner": true
                },
                {
                    "name": "optionMarket",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "serumMarket",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "systemProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "tokenProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "dexProgram",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "rent",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "pcMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "optionMint",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "requestQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "eventQueue",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "bids",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "asks",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "coinVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "pcVault",
                    "isMut": true,
                    "isSigner": false
                },
                {
                    "name": "vaultSigner",
                    "isMut": false,
                    "isSigner": false
                },
                {
                    "name": "marketAuthority",
                    "isMut": false,
                    "isSigner": false
                }
            ],
            "args": [
                {
                    "name": "marketSpace",
                    "type": "u64"
                },
                {
                    "name": "vaultSignerNonce",
                    "type": "u64"
                },
                {
                    "name": "coinLotSize",
                    "type": "u64"
                },
                {
                    "name": "pcLotSize",
                    "type": "u64"
                },
                {
                    "name": "pcDustThreshold",
                    "type": "u64"
                }
            ]
        }
    ],
    "accounts": [
        {
            "name": "optionMarket",
            "type": {
                "kind": "struct",
                "fields": [
                    {
                        "name": "optionMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "writerTokenMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "underlyingAssetMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "quoteAssetMint",
                        "type": "publicKey"
                    },
                    {
                        "name": "underlyingAmountPerContract",
                        "type": "u64"
                    },
                    {
                        "name": "quoteAmountPerContract",
                        "type": "u64"
                    },
                    {
                        "name": "expirationUnixTimestamp",
                        "type": "i64"
                    },
                    {
                        "name": "underlyingAssetPool",
                        "type": "publicKey"
                    },
                    {
                        "name": "quoteAssetPool",
                        "type": "publicKey"
                    },
                    {
                        "name": "mintFeeAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "exerciseFeeAccount",
                        "type": "publicKey"
                    },
                    {
                        "name": "expired",
                        "type": "bool"
                    },
                    {
                        "name": "bumpSeed",
                        "type": "u8"
                    }
                ]
            }
        }
    ],
    "errors": [
        {
            "code": 6000,
            "name": "ExpirationIsInThePast",
            "msg": "Expiration must be in the future"
        },
        {
            "code": 6001,
            "name": "QuoteAndUnderlyingAssetMustDiffer",
            "msg": "Same quote and underlying asset, cannot create market"
        },
        {
            "code": 6002,
            "name": "QuoteOrUnderlyingAmountCannotBe0",
            "msg": "Quote amount and underlying amount per contract must be > 0"
        },
        {
            "code": 6003,
            "name": "OptionMarketMustBeMintAuthority",
            "msg": "OptionMarket must be the mint authority"
        },
        {
            "code": 6004,
            "name": "OptionMarketMustOwnUnderlyingAssetPool",
            "msg": "OptionMarket must own the underlying asset pool"
        },
        {
            "code": 6005,
            "name": "OptionMarketMustOwnQuoteAssetPool",
            "msg": "OptionMarket must own the quote asset pool"
        },
        {
            "code": 6006,
            "name": "ExpectedSPLTokenProgramId",
            "msg": "Stop trying to spoof the SPL Token program! Shame on you"
        },
        {
            "code": 6007,
            "name": "MintFeeMustBeOwnedByFeeOwner",
            "msg": "Mint fee account must be owned by the FEE_OWNER"
        },
        {
            "code": 6008,
            "name": "ExerciseFeeMustBeOwnedByFeeOwner",
            "msg": "Exercise fee account must be owned by the FEE_OWNER"
        },
        {
            "code": 6009,
            "name": "MintFeeTokenMustMatchUnderlyingAsset",
            "msg": "Mint fee token must be the same as the underlying asset"
        },
        {
            "code": 6010,
            "name": "ExerciseFeeTokenMustMatchQuoteAsset",
            "msg": "Exercise fee token must be the same as the quote asset"
        },
        {
            "code": 6011,
            "name": "OptionMarketExpiredCantMint",
            "msg": "OptionMarket is expired, can't mint"
        },
        {
            "code": 6012,
            "name": "UnderlyingPoolAccountDoesNotMatchMarket",
            "msg": "Underlying pool account does not match the value on the OptionMarket"
        },
        {
            "code": 6013,
            "name": "OptionTokenMintDoesNotMatchMarket",
            "msg": "OptionToken mint does not match the value on the OptionMarket"
        },
        {
            "code": 6014,
            "name": "WriterTokenMintDoesNotMatchMarket",
            "msg": "WriterToken mint does not match the value on the OptionMarket"
        },
        {
            "code": 6015,
            "name": "MintFeeKeyDoesNotMatchOptionMarket",
            "msg": "MintFee key does not match the value on the OptionMarket"
        },
        {
            "code": 6016,
            "name": "SizeCantBeLessThanEqZero",
            "msg": "The size argument must be > 0"
        },
        {
            "code": 6017,
            "name": "ExerciseFeeKeyDoesNotMatchOptionMarket",
            "msg": "exerciseFee key does not match the value on the OptionMarket"
        },
        {
            "code": 6018,
            "name": "QuotePoolAccountDoesNotMatchMarket",
            "msg": "Quote pool account does not match the value on the OptionMarket"
        },
        {
            "code": 6019,
            "name": "UnderlyingDestMintDoesNotMatchUnderlyingAsset",
            "msg": "Underlying destination mint must match underlying asset mint address"
        },
        {
            "code": 6020,
            "name": "FeeOwnerDoesNotMatchProgram",
            "msg": "Fee owner does not match the program's fee owner"
        },
        {
            "code": 6021,
            "name": "OptionMarketExpiredCantExercise",
            "msg": "OptionMarket is expired, can't exercise"
        },
        {
            "code": 6022,
            "name": "OptionMarketNotExpiredCantClose",
            "msg": "OptionMarket has not expired, can't close"
        },
        {
            "code": 6023,
            "name": "NotEnoughQuoteAssetsInPool",
            "msg": "Not enough assets in the quote asset pool"
        },
        {
            "code": 6024,
            "name": "InvalidAuth",
            "msg": "Invalid auth token provided"
        },
        {
            "code": 6025,
            "name": "CoinMintIsNotOptionMint",
            "msg": "Coin mint must match option mint"
        },
        {
            "code": 6026,
            "name": "CannotPruneActiveMarket",
            "msg": "Cannot prune the market while it's still active"
        },
        {
            "code": 6027,
            "name": "NumberOverflow",
            "msg": "Numberical overflow"
        }
    ]
};

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

// TODO: does this need to change based on network?
/** The fee owner key for the Psy American program */
const FEE_OWNER_KEY = new web3_js.PublicKey("6c33US7ErPmLXZog9SyChQUYUrrJY51k4GmzdhrbhNnD");
/** The number of lamports the protocol takes as a fee when minting or
 * exercising an option on an asset that cannot take a 5bps fee. E.g a minting
 * a call option on an NFT */
const NFT_MINT_LAMPORTS = web3_js.LAMPORTS_PER_SOL / 2;
/**
 * Get the protocol's fee amount when minting or exercising. When minting this
 * should be the underlingAmountPerContract. When exercising this should be
 * the quoteAmountPerContract.
 *
 * @param assetQuantity - Quantity of the asset being used to mint or exercise
 * @returns
 */
const feeAmountPerContract = (assetQuantity) => {
    return assetQuantity.div(new anchor__namespace.BN(10000 / 5));
};

/**
 * Get the deterministic address for an Option based on its properties.
 * @returns
 */
const deriveOptionKeyFromParams = ({ expirationUnixTimestamp, programId, quoteAmountPerContract, quoteMint, underlyingAmountPerContract, underlyingMint, }) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js.PublicKey.findProgramAddress([
        underlyingMint.toBuffer(),
        quoteMint.toBuffer(),
        underlyingAmountPerContract.toArrayLike(Buffer, "le", 8),
        quoteAmountPerContract.toArrayLike(Buffer, "le", 8),
        expirationUnixTimestamp.toArrayLike(Buffer, "le", 8),
    ], programId);
});

/**
 * Returns a TransactionInstruction for creating the associated token account
 * if one deos not exist.
 *
 * @param associatedAddress - The associated token account address
 * @param mintKey - The SPL token mint address
 * @param provider - The Anchor provider that has the wallet
 * @param owner - The user's address that owns the associated token account
 * @returns
 */
const getOrAddAssociatedTokenAccountTx = (associatedAddress, mintKey, provider, owner = FEE_OWNER_KEY) => __awaiter(void 0, void 0, void 0, function* () {
    // This is the optimum logic, considering TX fee, client-side computation,
    // RPC roundtrips and guaranteed idempotent.
    // Sadly we can't do this atomically;
    const accountInfo = yield provider.connection.getAccountInfo(associatedAddress);
    if (accountInfo) {
        // accountInfo exists, so the associated token account has already
        // been initialized
        return null;
    }
    return splToken.Token.createAssociatedTokenAccountInstruction(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, mintKey, associatedAddress, owner, 
    // @ts-ignore
    provider.wallet.publicKey);
});

/**
 * This is needed for the permissioned serum markets.
 *
 * TODO can we replace this with PublicKey.findProgramAddress
 *
 * @param marketPublicKey
 * @param dexProgramId
 * @returns
 */
const getVaultOwnerAndNonce = (marketPublicKey, dexProgramId) => __awaiter(void 0, void 0, void 0, function* () {
    const nonce = new anchor.BN(0);
    while (nonce.toNumber() < 255) {
        try {
            const vaultOwner = yield web3_js.PublicKey.createProgramAddress([marketPublicKey.toBuffer(), nonce.toArrayLike(Buffer, "le", 8)], dexProgramId);
            return [vaultOwner, nonce];
        }
        catch (e) {
            nonce.iaddn(1);
        }
    }
    throw new Error("Unable to find nonce");
});

const getOptionByKey = (program, key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const optionAccount = (yield program.account.optionMarket.fetch(key));
        return Object.assign(Object.assign({}, optionAccount), { key });
    }
    catch (err) {
        return null;
    }
});

/**
 * Returns an array with arrays of the given size.
 *
 * @param myArray {Array} Array to split
 * @param chunkSize {Integer} Size of every group
 */
const chunkArray = (myArray, chunkSize) => {
    var index = 0;
    var arrayLength = myArray.length;
    var tempArray = [];
    for (index = 0; index < arrayLength; index += chunkSize) {
        const myChunk = myArray.slice(index, index + chunkSize);
        tempArray.push(myChunk);
    }
    return tempArray;
};

const idlErrors = anchor.parseIdlErrors(IDL);
const parseTransactionError = (error) => anchor.ProgramError.parse(error, idlErrors);

/**
 *
 * Creates a PsyAmerican program using the internal IDL. This helps with anchor version
 * descrepencies.
 *
 * @param pubkey - The public key for the PsyAmerican program
 * @param provider - An anchor provider
 * @returns
 */
const createProgram = (pubkey, provider) => {
    return new anchor.Program(IDL, pubkey, provider);
};

/**
 * Initialize a new OptionMarket
 *
 * @param program - The Psy American program
 * @param connection - Solana connection
 * @param params
 * @returns
 */
const initializeMarket = (program, { expirationUnixTimestamp, quoteAmountPerContract, quoteMint, underlyingAmountPerContract, underlyingMint, }) => __awaiter(void 0, void 0, void 0, function* () {
    const textEncoder = new TextEncoder();
    // generate Program Derived Address for the new option
    const [optionMarketKey, bumpSeed] = yield deriveOptionKeyFromParams({
        programId: program.programId,
        underlyingMint,
        quoteMint,
        underlyingAmountPerContract,
        quoteAmountPerContract,
        expirationUnixTimestamp,
    });
    // generate Program Derived Address for the Option Token
    const [optionMintKey] = yield anchor__namespace.web3.PublicKey.findProgramAddress([optionMarketKey.toBuffer(), textEncoder.encode("optionToken")], program.programId);
    // generate Program Derived Address for the Writer Token
    const [writerMintKey] = yield anchor__namespace.web3.PublicKey.findProgramAddress([optionMarketKey.toBuffer(), textEncoder.encode("writerToken")], program.programId);
    // generate Program Derived Address for the vault that will hold the quote asset
    const [quoteAssetPoolKey] = yield anchor__namespace.web3.PublicKey.findProgramAddress([optionMarketKey.toBuffer(), textEncoder.encode("quoteAssetPool")], program.programId);
    // generate Program Derived Address for the vault that will hold the underlying asset
    const [underlyingAssetPoolKey] = yield anchor__namespace.web3.PublicKey.findProgramAddress([optionMarketKey.toBuffer(), textEncoder.encode("underlyingAssetPool")], program.programId);
    // Determine whether the mint/exercise fee accounts need to be initialized.
    // Add the instructions and necessary accounts if the accounts need to
    // be created.
    const remainingAccounts = [];
    const instructions = [];
    const mintFeePerContract = feeAmountPerContract(underlyingAmountPerContract);
    if (mintFeePerContract.gtn(0)) {
        const mintFeeKey = yield splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, underlyingMint, FEE_OWNER_KEY);
        remainingAccounts.push({
            pubkey: mintFeeKey,
            isWritable: true,
            isSigner: false,
        });
        yield program.provider.connection.getAccountInfo(mintFeeKey);
        const ix = yield getOrAddAssociatedTokenAccountTx(mintFeeKey, underlyingMint, program.provider, FEE_OWNER_KEY);
        if (ix) {
            instructions.push(ix);
        }
    }
    const exerciseFeePerContract = feeAmountPerContract(quoteAmountPerContract);
    if (exerciseFeePerContract.gtn(0)) {
        const exerciseFeeKey = yield splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, quoteMint, FEE_OWNER_KEY);
        remainingAccounts.push({
            pubkey: exerciseFeeKey,
            isWritable: false,
            isSigner: false,
        });
        const ix = yield getOrAddAssociatedTokenAccountTx(exerciseFeeKey, quoteMint, program.provider, FEE_OWNER_KEY);
        if (ix) {
            instructions.push(ix);
        }
    }
    const tx = yield program.rpc.initializeMarket(underlyingAmountPerContract, quoteAmountPerContract, expirationUnixTimestamp, bumpSeed, {
        accounts: {
            // @ts-ignore
            authority: program.provider.wallet.publicKey,
            feeOwner: FEE_OWNER_KEY,
            optionMarket: optionMarketKey,
            optionMint: optionMintKey,
            quoteAssetMint: quoteMint,
            quoteAssetPool: quoteAssetPoolKey,
            underlyingAssetMint: underlyingMint,
            underlyingAssetPool: underlyingAssetPoolKey,
            writerTokenMint: writerMintKey,
            associatedTokenProgram: splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
            clock: web3_js.SYSVAR_CLOCK_PUBKEY,
            rent: web3_js.SYSVAR_RENT_PUBKEY,
            systemProgram: web3_js.SystemProgram.programId,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
        },
        instructions: instructions.length ? instructions : undefined,
        remainingAccounts,
    });
    return {
        optionMarketKey,
        optionMintKey,
        quoteAssetPoolKey,
        tx,
        underlyingAssetPoolKey,
        writerMintKey,
    };
});

const textEncoder$1 = new TextEncoder();
// b"open-orders-init"
const OPEN_ORDERS_INIT_SEED = textEncoder$1.encode("open-orders-init");
/**
 * Load the open orders for a user based on the Serum DEX and Serum Market
 * address.
 *
 * @param program - Anchor Psy American program
 * @param dexProgramId - Serum DEX program id
 * @param serumMarketAddress - Serum market address
 * @returns
 */
const findOpenOrdersAccountsForOwner = (program, dexProgramId, serumMarketAddress) => __awaiter(void 0, void 0, void 0, function* () {
    const [openOrdersAddressKey, openOrdersBump] = yield web3_js.PublicKey.findProgramAddress([
        textEncoder$1.encode("open-orders"),
        dexProgramId.toBuffer(),
        serumMarketAddress.toBuffer(),
        // @ts-ignore: TODO: Fix when Anchor accepts PR
        program.provider.wallet.publicKey.toBuffer(),
    ], program.programId);
    const filters = [
        {
            memcmp: {
                offset: serum.OpenOrders.getLayout(dexProgramId).offsetOf("market"),
                bytes: serumMarketAddress.toBase58(),
            },
        },
        {
            memcmp: {
                offset: serum.OpenOrders.getLayout(dexProgramId).offsetOf("owner"),
                bytes: openOrdersAddressKey.toBase58(),
            },
        },
        {
            dataSize: serum.OpenOrders.getLayout(dexProgramId).span,
        },
    ];
    const accounts = yield program.provider.connection.getProgramAccounts(dexProgramId, {
        filters,
    });
    return accounts.map(({ pubkey, account }) => serum.OpenOrders.fromAccountInfo(pubkey, account, dexProgramId));
});
/**
 * Load all the open orders for a user based on the Serum DEX and the option market keys.
 *
 * @param program - Anchor Psy American program
 * @param serumProgramId - Serum DEX program id
 * @param optionMarketKeys - Keys for the Psy American OptionMarket's to load the open orders from
 * @param priceCurrencyKey - Key of the pc (aka quote currency) from the serum markets
 * @param optionMetaList - Optional list of option meta data to pull serum market data from instead of deriving
 * the address. This is for backwards compatibility
 * @returns
 */
const findOpenOrdersForOptionMarkets = (program, serumProgramId, optionMarketKeys, priceCurrencyKey, optionMetaList) => __awaiter(void 0, void 0, void 0, function* () {
    const openOrdersKeys = yield Promise.all(optionMarketKeys.map((optionMarketKey) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        // TODO check if option market key exists on market meta
        let serumMarketKey;
        if (optionMetaList) {
            // default to the serum address in the provided list of options.
            // This is necessary to keep backwards compatibility for option
            // markets in 2021.
            const serumMarketAddress = (_a = optionMetaList.find((option) => option.optionMarketAddress === optionMarketKey.toString())) === null || _a === void 0 ? void 0 : _a.serumMarketAddress;
            if (serumMarketAddress) {
                serumMarketKey = new web3_js.PublicKey(serumMarketAddress);
            }
        }
        if (!serumMarketKey) {
            // Derive the serum market address from the OptionMarket key
            const [_serumMarketKey, _serumMarketBump] = yield deriveSerumMarketAddress(program, optionMarketKey, priceCurrencyKey);
            serumMarketKey = _serumMarketKey;
        }
        // Derive the user's OpenOrders account address from the Serum market data
        const [openOrdersAddressKey, openOrdersBump] = yield web3_js.PublicKey.findProgramAddress([
            textEncoder$1.encode("open-orders"),
            serumProgramId.toBuffer(),
            serumMarketKey.toBuffer(),
            // @ts-ignore
            program.provider.wallet.publicKey.toBuffer(),
        ], program.programId);
        return openOrdersAddressKey;
    })));
    // Batch load the raw OpenOrders data
    const groupOfOpenOrdersKeys = chunkArray(openOrdersKeys, 100);
    const getMultipleAccountsForOpenOrdersKeys = groupOfOpenOrdersKeys.map((openOrdersKeys) => {
        return program.provider.connection.getMultipleAccountsInfo(openOrdersKeys);
    });
    const results = yield Promise.all(getMultipleAccountsForOpenOrdersKeys);
    const openOrdersInfos = results.flat();
    const openOrdersByOptionMarket = {};
    // Deserialize the OpenOrders info and store mapped by Option key
    openOrdersInfos.forEach((info, index) => {
        if (!info)
            return;
        openOrdersByOptionMarket[optionMarketKeys[index].toString()] =
            new serum.OpenOrders(openOrdersKeys[index], serum.OpenOrders.getLayout(serumProgramId).decode(info.data), serumProgramId);
    });
    return openOrdersByOptionMarket;
});
const deriveSerumMarketAddress = (program, optionMarketKey, priceCurrencyKey) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js.PublicKey.findProgramAddress([
        optionMarketKey.toBuffer(),
        priceCurrencyKey.toBuffer(),
        textEncoder$1.encode("serumMarket"),
    ], program.programId);
});
const deriveMarketAuthority = (program, dexProgramId, serumMarketKey) => __awaiter(void 0, void 0, void 0, function* () {
    return web3_js.PublicKey.findProgramAddress([OPEN_ORDERS_INIT_SEED, dexProgramId.toBuffer(), serumMarketKey.toBuffer()], program.programId);
});
const deriveRequestQueue = (program, optionMarketKey, priceCurrencyKey) => web3_js.PublicKey.findProgramAddress([
    optionMarketKey.toBuffer(),
    priceCurrencyKey.toBuffer(),
    textEncoder$1.encode("requestQueue"),
], program.programId);
const deriveCoinVault = (program, optionMarketKey, priceCurrencyKey) => web3_js.PublicKey.findProgramAddress([
    optionMarketKey.toBuffer(),
    priceCurrencyKey.toBuffer(),
    textEncoder$1.encode("coinVault"),
], program.programId);
const derivePCVault = (program, optionMarketKey, priceCurrencyKey) => web3_js.PublicKey.findProgramAddress([
    optionMarketKey.toBuffer(),
    priceCurrencyKey.toBuffer(),
    textEncoder$1.encode("pcVault"),
], program.programId);
/**
 * Given an OptionMarket address and DEX program, generate the Serum market key,
 * market authority, and authority bump seed.
 *
 * @param {Program} program - PsyOptions American V1 Anchor program
 * @param {PublicKey} optionMarketKey - The key for the OptionMarket
 * @param {PublicKey} dexProgramId - Serum DEX public key
 * @returns
 */
const getMarketAndAuthorityInfo = (program, optionMarketKey, dexProgramId, priceCurrencyKey) => __awaiter(void 0, void 0, void 0, function* () {
    const [serumMarketKey, _serumMarketBump] = yield deriveSerumMarketAddress(program, optionMarketKey, priceCurrencyKey);
    const [marketAuthority, marketAuthorityBump] = yield deriveMarketAuthority(program, dexProgramId, serumMarketKey);
    return { serumMarketKey, marketAuthority, marketAuthorityBump };
});

var serumUtils = /*#__PURE__*/Object.freeze({
  __proto__: null,
  findOpenOrdersAccountsForOwner: findOpenOrdersAccountsForOwner,
  findOpenOrdersForOptionMarkets: findOpenOrdersForOptionMarkets,
  deriveSerumMarketAddress: deriveSerumMarketAddress,
  deriveMarketAuthority: deriveMarketAuthority,
  deriveRequestQueue: deriveRequestQueue,
  deriveCoinVault: deriveCoinVault,
  derivePCVault: derivePCVault,
  getMarketAndAuthorityInfo: getMarketAndAuthorityInfo
});

/**
 *
 * @param program - Anchor Psy American Program
 * @param param1
 * @returns
 */
const initializeSerumMarket = (program, { asks, bids, eventQueue, optionMarketKey, optionMint, pcDustThreshold, pcLotSize, pcMint, serumProgramKey, }) => __awaiter(void 0, void 0, void 0, function* () {
    const [requestQueue] = yield deriveRequestQueue(program, optionMarketKey, pcMint);
    const [coinVault] = yield deriveCoinVault(program, optionMarketKey, pcMint);
    const [pcVault] = yield derivePCVault(program, optionMarketKey, pcMint);
    const { serumMarketKey, marketAuthority } = yield getMarketAndAuthorityInfo(program, optionMarketKey, serumProgramKey, pcMint);
    const [vaultOwner, vaultSignerNonce] = yield getVaultOwnerAndNonce(serumMarketKey, serumProgramKey);
    // Create the optional accounts
    const instructions = [];
    const signers = [];
    if (!eventQueue) {
        const eventQueueKeys = new web3_js.Keypair();
        eventQueue = eventQueueKeys.publicKey;
        const ix = web3_js.SystemProgram.createAccount({
            // @ts-ignore
            fromPubkey: program.provider.wallet.publicKey,
            newAccountPubkey: eventQueue,
            lamports: yield program.provider.connection.getMinimumBalanceForRentExemption(262144 + 12),
            space: 262144 + 12,
            programId: serumProgramKey,
        });
        instructions.push(ix);
        signers.push(eventQueueKeys);
    }
    if (!bids) {
        const bidsKeys = new web3_js.Keypair();
        bids = bidsKeys.publicKey;
        const ix = web3_js.SystemProgram.createAccount({
            // @ts-ignore
            fromPubkey: program.provider.wallet.publicKey,
            newAccountPubkey: bids,
            lamports: yield program.provider.connection.getMinimumBalanceForRentExemption(65536 + 12),
            space: 65536 + 12,
            programId: serumProgramKey,
        });
        instructions.push(ix);
        signers.push(bidsKeys);
    }
    if (!asks) {
        const asksKeys = new web3_js.Keypair();
        asks = asksKeys.publicKey;
        const ix = web3_js.SystemProgram.createAccount({
            // @ts-ignore
            fromPubkey: program.provider.wallet.publicKey,
            newAccountPubkey: asks,
            lamports: yield program.provider.connection.getMinimumBalanceForRentExemption(65536 + 12),
            space: 65536 + 12,
            programId: serumProgramKey,
        });
        instructions.push(ix);
        signers.push(asksKeys);
    }
    // Options are only tradeable in increments of 1.
    const coinLotSize = new anchor.BN(1);
    const tx = yield program.rpc.initSerumMarket(new anchor.BN(serum.MARKET_STATE_LAYOUT_V3.span), vaultSignerNonce, coinLotSize, pcLotSize, pcDustThreshold, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            optionMarket: optionMarketKey,
            serumMarket: serumMarketKey,
            dexProgram: serumProgramKey,
            pcMint,
            optionMint,
            requestQueue,
            eventQueue,
            bids,
            asks,
            coinVault,
            pcVault,
            vaultSigner: vaultOwner,
            marketAuthority,
            rent: web3_js.SYSVAR_RENT_PUBKEY,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            systemProgram: web3_js.SystemProgram.programId,
        },
        instructions: instructions.length ? instructions : undefined,
        signers: signers.length ? signers : undefined
    });
    return {
        marketAuthority,
        serumMarketKey,
        tx,
    };
});

/**
 * Execute a transaction to mint _size_ options
 *
 * @param {anchor.Program} program - Anchor Program for the PsyAmerican program and the minter as the provider wallet
 * @param {PublicKey} minterOptionAcct - Where the OptionTokens will be sent
 * @param {PublicKey} minterWriterAcct - Where the WriterTokens will be sent
 * @param {PublicKey} minterUnderlyingAccount - Where the underlying asset tokens come from
 * @param {anchor.BN} size - The amount of contracts to mint
 * @param {OptionMarketWithKey} optionMarket - The OptionMarket data
 */
const mintOptionsTx = (program, minterOptionAcct, minterWriterAcct, minterUnderlyingAccount, size, optionMarket) => __awaiter(void 0, void 0, void 0, function* () {
    let mintFeeKey, remainingAccounts = [];
    // Add the mint fee account if the market requires one
    const mintFeePerContract = feeAmountPerContract(optionMarket.underlyingAmountPerContract);
    if (mintFeePerContract.gtn(0)) {
        mintFeeKey = yield splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, optionMarket.underlyingAssetMint, FEE_OWNER_KEY);
        remainingAccounts.push({
            pubkey: mintFeeKey,
            isWritable: true,
            isSigner: false,
        });
    }
    const tx = yield program.rpc.mintOption(size, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            underlyingAssetMint: optionMarket.underlyingAssetMint,
            underlyingAssetPool: optionMarket.underlyingAssetPool,
            underlyingAssetSrc: minterUnderlyingAccount,
            optionMint: optionMarket.optionMint,
            mintedOptionDest: minterOptionAcct,
            writerTokenMint: optionMarket.writerTokenMint,
            mintedWriterTokenDest: minterWriterAcct,
            optionMarket: optionMarket.key,
            feeOwner: FEE_OWNER_KEY,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            associatedTokenProgram: splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
            clock: web3_js.SYSVAR_CLOCK_PUBKEY,
            rent: web3_js.SYSVAR_RENT_PUBKEY,
            systemProgram: web3_js.SystemProgram.programId,
        },
        remainingAccounts,
    });
    return {
        tx,
    };
});
/**
 * Create a TransactionInstruction for minting _size_ option contracts
 *
 * @param {anchor.Program} program - Anchor Program for the PsyAmerican program and the minter as the provider wallet
 * @param {PublicKey} minterOptionAcct - Where the OptionTokens will be sent
 * @param {PublicKey} minterWriterAcct - Where the WriterTokens will be sent
 * @param {PublicKey} minterUnderlyingAccount - Where the underlying asset tokens come from
 * @param {anchor.BN} size - The amount of contracts to mint
 * @param {OptionMarket} optionMarket - The OptionMarket data
 */
const mintOptionInstruction = (program, minterOptionAcct, minterWriterAcct, minterUnderlyingAccount, size, optionMarket) => __awaiter(void 0, void 0, void 0, function* () {
    let mintFeeKey, remainingAccounts = [];
    // Add the mint fee account if the market requires one
    const mintFeePerContract = feeAmountPerContract(optionMarket.underlyingAmountPerContract);
    if (mintFeePerContract.gtn(0)) {
        mintFeeKey = yield splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, optionMarket.underlyingAssetMint, FEE_OWNER_KEY);
        remainingAccounts.push({
            pubkey: mintFeeKey,
            isWritable: true,
            isSigner: false,
        });
    }
    const signers = [];
    const ix = program.instruction.mintOption(size, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            underlyingAssetMint: optionMarket.underlyingAssetMint,
            underlyingAssetPool: optionMarket.underlyingAssetPool,
            underlyingAssetSrc: minterUnderlyingAccount,
            optionMint: optionMarket.optionMint,
            mintedOptionDest: minterOptionAcct,
            writerTokenMint: optionMarket.writerTokenMint,
            mintedWriterTokenDest: minterWriterAcct,
            optionMarket: optionMarket.key,
            feeOwner: FEE_OWNER_KEY,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            associatedTokenProgram: splToken.ASSOCIATED_TOKEN_PROGRAM_ID,
            clock: web3_js.SYSVAR_CLOCK_PUBKEY,
            rent: web3_js.SYSVAR_RENT_PUBKEY,
            systemProgram: web3_js.SystemProgram.programId,
        },
        remainingAccounts,
    });
    return { ix, signers };
});
/**
 * Create a TransactionInstruction for minting _size_ option contracts using V2 instruction
 *
 * @param {anchor.Program} program - Anchor Program for the PsyAmerican program and the minter as the provider wallet
 * @param {PublicKey} minterOptionAcct - Where the OptionTokens will be sent
 * @param {PublicKey} minterWriterAcct - Where the WriterTokens will be sent
 * @param {PublicKey} minterUnderlyingAccount - Where the underlying asset tokens come from
 * @param {anchor.BN} size - The amount of contracts to mint
 * @param {OptionMarket} optionMarket - The OptionMarket data
 */
const mintOptionV2Instruction = (program, minterOptionAcct, minterWriterAcct, minterUnderlyingAccount, size, optionMarket) => __awaiter(void 0, void 0, void 0, function* () {
    const signers = [];
    const ix = program.instruction.mintOptionV2(size, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            underlyingAssetMint: optionMarket === null || optionMarket === void 0 ? void 0 : optionMarket.underlyingAssetMint,
            underlyingAssetPool: optionMarket.underlyingAssetPool,
            underlyingAssetSrc: minterUnderlyingAccount,
            optionMint: optionMarket === null || optionMarket === void 0 ? void 0 : optionMarket.optionMint,
            mintedOptionDest: minterOptionAcct,
            writerTokenMint: optionMarket === null || optionMarket === void 0 ? void 0 : optionMarket.writerTokenMint,
            mintedWriterTokenDest: minterWriterAcct,
            optionMarket: optionMarket === null || optionMarket === void 0 ? void 0 : optionMarket.key,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
        },
    });
    return { ix, signers };
});

/**
 * Exercise OptionTokens you're holding
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of options to exercise
 * @param optionMarket - The OptionMarket data from the chain for the options to exercise
 * @param exerciserOptionTokenSrc - The SPL Token address holding the OptionTokens
 * @param underlyingAssetDest - The SPL Token address where the underlying assets will be sent
 * @param quoteAssetSrc - The SPL Token address holding the quote asset used to exercise
 * @param opts
 * @returns
 */
const exerciseOptionsInstruction = (program, size, optionMarket, exerciserOptionTokenSrc, underlyingAssetDest, quoteAssetSrc, opts = {}) => __awaiter(void 0, void 0, void 0, function* () {
    let exerciseFeeKey;
    let remainingAccounts = [];
    const exerciseFeePerContract = feeAmountPerContract(optionMarket.quoteAmountPerContract);
    if (exerciseFeePerContract.gtn(0)) {
        exerciseFeeKey = yield splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, optionMarket.quoteAssetMint, FEE_OWNER_KEY);
        remainingAccounts = [
            {
                pubkey: exerciseFeeKey,
                isWritable: true,
                isSigner: false,
            },
        ];
    }
    return program.instruction.exerciseOption(size, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            // @ts-ignore
            optionAuthority: opts.optionAuthority || program.provider.wallet.publicKey,
            optionMarket: optionMarket.key,
            optionMint: optionMarket.optionMint,
            exerciserOptionTokenSrc,
            underlyingAssetPool: optionMarket.underlyingAssetPool,
            underlyingAssetDest,
            quoteAssetPool: optionMarket.quoteAssetPool,
            quoteAssetSrc,
            feeOwner: FEE_OWNER_KEY,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            systemProgram: web3_js.SystemProgram.programId,
            clock: web3_js.SYSVAR_CLOCK_PUBKEY,
        },
        remainingAccounts,
    });
});
/**
 * Exercise OptionTokens you're holding without fees!
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of options to exercise
 * @param optionMarket - The OptionMarket data from the chain for the options to exercise
 * @param exerciserOptionTokenSrc - The SPL Token address holding the OptionTokens
 * @param underlyingAssetDest - The SPL Token address where the underlying assets will be sent
 * @param quoteAssetSrc - The SPL Token address holding the quote asset used to exercise
 * @param opts
 * @returns
 */
const exerciseOptionsV2Instruction = (program, size, optionMarket, exerciserOptionTokenSrc, underlyingAssetDest, quoteAssetSrc, opts = {}) => {
    return program.instruction.exerciseOptionV2(size, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            // @ts-ignore
            optionAuthority: opts.optionAuthority || program.provider.wallet.publicKey,
            optionMarket: optionMarket.key,
            optionMint: optionMarket.optionMint,
            exerciserOptionTokenSrc,
            underlyingAssetPool: optionMarket.underlyingAssetPool,
            underlyingAssetDest,
            quoteAssetPool: optionMarket.quoteAssetPool,
            quoteAssetSrc,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
        },
    });
};

/**
 * Close _size_ option positions by burning the OptionTokens and WriterTokens.
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of OptionTokens and WriterTokens to burn
 * @param optionMarket - The OptionMarket the OptionTokens and WriterTokens belong to
 * @param writerTokenSrc - The SPL Token address that holds the WriterTokens
 * @param optionTokenSrc - The SPL Token address that holds the OptionTokens
 * @param underlyingAssetDest - The SPL Token address destination for the returned underlying assets
 */
const closePositionInstruction = (program, size, optionMarket, writerTokenSrc, optionTokenSrc, underlyingAssetDest) => {
    return program.instruction.closeOptionPosition(size, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            optionMarket: optionMarket.key,
            writerTokenMint: optionMarket.writerTokenMint,
            writerTokenSrc,
            optionTokenMint: optionMarket.optionMint,
            optionTokenSrc,
            underlyingAssetPool: optionMarket.underlyingAssetPool,
            underlyingAssetDest,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
        },
    });
};

/**
 * Burn WriterTokens to get the `size * OptionMarket.quoteAmountPerContract` from the
 * OptionMarket's quote asset pool. This instruction will fail if no one has exercised
 * or the quote assets in the pool have already been claimed.
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of WriterTokens to burn and retrieve the quote assets for
 * @param optionMarket - The deserialized OptionMarket data
 * @param writerTokenSrc - The SPL Token account that holds the WriterTokens
 * @param writerQuoteDest - SPL Token account that is the destination for the quote assets
 */
const burnWriterForQuote = (program, size, optionMarket, writerTokenSrc, writerQuoteDest) => {
    return program.instruction.burnWriterForQuote(size, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            optionMarket: optionMarket.key,
            writerTokenMint: optionMarket.writerTokenMint,
            writerTokenSrc,
            quoteAssetPool: optionMarket.quoteAssetPool,
            writerQuoteDest,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
        }
    });
};

/**
 * After a market has expired, burn WriterTokens to get the underlying assets back from
 * the contract(s).
 *
 * @param program - Anchor Program for Psy American
 * @param size - The amount of options to exercise
 * @param optionMarket - The OptionMarket data from the chain for the options to exercise
 * @param writerTokenSrc - The SPL Token address holding the WriterTokens
 * @param underlyingAssetDest - The SPL Token address where the underlying assets will be sent
 */
const closePostExpirationInstruction = (program, size, optionMarket, writerTokenSrc, underlyingAssetDest) => {
    return program.instruction.closePostExpiration(size, {
        accounts: {
            // @ts-ignore
            userAuthority: program.provider.wallet.publicKey,
            optionMarket: optionMarket.key,
            writerTokenMint: optionMarket.writerTokenMint,
            writerTokenSrc,
            underlyingAssetPool: optionMarket.underlyingAssetPool,
            underlyingAssetDest,
            tokenProgram: splToken.TOKEN_PROGRAM_ID,
            clock: web3_js.SYSVAR_CLOCK_PUBKEY,
        },
    });
};

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  initializeMarket: initializeMarket,
  initializeSerumMarket: initializeSerumMarket,
  mintOptionsTx: mintOptionsTx,
  mintOptionInstruction: mintOptionInstruction,
  mintOptionV2Instruction: mintOptionV2Instruction,
  exerciseOptionsInstruction: exerciseOptionsInstruction,
  exerciseOptionsV2Instruction: exerciseOptionsV2Instruction,
  closePositionInstruction: closePositionInstruction,
  burnWriterForQuote: burnWriterForQuote,
  closePostExpirationInstruction: closePostExpirationInstruction
});

/**
 * Create a MarketProxy for the Psy American V 1.1 program
 *
 * @param program - Anchor Psy American program
 * @param optionMarketKey - The OptionMarket address
 * @param marketAuthorityBump - The marketAuthority bump seed
 * @param dexProgramId - The Serum DEX program id
 * @param marketKey - The Serum market address
 * @returns
 */
const marketLoader = (program, optionMarketKey, marketAuthorityBump, dexProgramId, marketKey, opts = {
    enableLogger: false
}) => __awaiter(void 0, void 0, void 0, function* () {
    let marketProxy = new serum.MarketProxyBuilder()
        .middleware(new serum.OpenOrdersPda({
        proxyProgramId: program.programId,
        dexProgramId: dexProgramId,
    }))
        .middleware(new serum.ReferralFees())
        .middleware(new Validation(optionMarketKey, marketAuthorityBump));
    if (opts.enableLogger) {
        marketProxy = marketProxy.middleware(new serum.Logger());
    }
    return marketProxy.load({
        connection: program.provider.connection,
        market: marketKey,
        dexProgramId: dexProgramId,
        proxyProgramId: program.programId,
        options: { commitment: "recent" },
    });
});
class Validation {
    constructor(optionMarketKey, marketAuthorityBump) {
        this.optionMarketKey = optionMarketKey;
        this.marketAuthorityBump = marketAuthorityBump;
    }
    initOpenOrders(ix) {
        ix.data = Buffer.concat([Buffer.from([0]), ix.data]);
    }
    newOrderV3(ix) {
        ix.data = Buffer.concat([Buffer.from([1]), ix.data]);
    }
    cancelOrderV2(ix) {
        ix.data = Buffer.concat([Buffer.from([2]), ix.data]);
    }
    cancelOrderByClientIdV2(ix) {
        ix.data = Buffer.concat([Buffer.from([3]), ix.data]);
    }
    settleFunds(ix) {
        ix.data = Buffer.concat([Buffer.from([4]), ix.data]);
    }
    closeOpenOrders(ix) {
        ix.data = Buffer.concat([Buffer.from([5]), ix.data]);
    }
    prune(ix) {
        // prepend a discriminator and the marketAuthorityBump
        const bumpBuffer = new anchor.BN(this.marketAuthorityBump).toBuffer("le", 1);
        ix.data = Buffer.concat([Buffer.from([6]), bumpBuffer, ix.data]);
        // prepend the optionMarket key
        ix.keys = [
            { pubkey: this.optionMarketKey, isWritable: false, isSigner: false },
            ...ix.keys,
        ];
    }
    consumeEvents(ix) {
        ix.data = Buffer.concat([Buffer.from([7]), ix.data]);
    }
    consumeEventsPermissioned(ix) {
        ix.data = Buffer.concat([Buffer.from([8]), ix.data]);
    }
}

/**
 * Create a TransactionInstruction for canceling a specific _order_
 *
 * @param program - Anchor Program for Psy American
 * @param optionMarketKey - The address of the OptionMarket for the option in the Seurm Market
 * @param dexProgramId - The PublicKey of the DEX program
 * @param serumMarketKey - The PublicKey of the Serum market
 * @param order - The Serum Order to cancel
 * @param marketAuthorityBump - Optional: bump seed for the Serum market
 * @returns
 */
const cancelOrderInstructionV2 = (program, optionMarketKey, dexProgramId, serumMarketKey, order, marketAuthorityBump = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    let _marketAuthorityBump = marketAuthorityBump;
    if (!_marketAuthorityBump) {
        const [marketAuthority, bump] = yield deriveMarketAuthority(program, dexProgramId, serumMarketKey);
        _marketAuthorityBump = bump;
    }
    const marketProxy = yield marketLoader(program, optionMarketKey, _marketAuthorityBump, dexProgramId, serumMarketKey);
    return marketProxy.instruction.cancelOrder(
    // @ts-ignore
    program.provider.wallet.publicKey, order);
});
/**
 * Generate a `TransactionInstruction` for canceling an open order by the set clientId
 *
 * @param program - Anchor Program for Psy American
 * @param optionMarketKey - The address of the OptionMarket for the option in the Seurm Market
 * @param dexProgramId - The PublicKey of the DEX program
 * @param serumMarketKey - The PublicKey of the Serum market
 * @param order - The Serum Order to cancel
 * @param marketAuthorityBump - Optional: bump seed for the Serum market
 * @returns
 */
const cancelOrderByClientId = (program, optionMarketKey, dexProgramId, serumMarketKey, order, marketAuthorityBump = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    let _marketAuthorityBump = marketAuthorityBump;
    if (!marketAuthorityBump) {
        const [marketAuthority, bump] = yield deriveMarketAuthority(program, dexProgramId, serumMarketKey);
        _marketAuthorityBump = bump;
    }
    const marketProxy = yield marketLoader(program, optionMarketKey, _marketAuthorityBump, dexProgramId, serumMarketKey);
    return marketProxy.instruction.cancelOrderByClientId(
    // @ts-ignore
    program.provider.wallet.publicKey, order.openOrdersAddress, order.clientId);
});
const one = new anchor.BN(1);
/**
 * Create an array of TransactionInstructions to cancel all of the wallet's orders for a given
 * OptionMarket and SerumMarket.
 *
 * NOTE: Current implementation does not account for Transaction packet size limitations. It
 * is on the client to slice the instructions to be within the limits.
 *
 * @param program - Anchor Program for Psy American
 * @param optionMarketKey - The address of the OptionMarket for the option in the Seurm Market
 * @param dexProgramId - The PublicKey of the DEX program
 * @param serumMarketKey - The PublicKey of the Serum market
 * @returns
 */
const cancelAllOpenOrders = (program, optionMarketKey, dexProgramId, serumMarketKey) => __awaiter(void 0, void 0, void 0, function* () {
    const instructions = [];
    // get the provider's open orders for the market
    const openOrdersAccounts = yield findOpenOrdersAccountsForOwner(program, dexProgramId, serumMarketKey);
    // create array of instructions to cancel the orders.
    yield Promise.all(openOrdersAccounts.map((openOrders) => __awaiter(void 0, void 0, void 0, function* () {
        yield Promise.all(openOrders.orders.map((orderId, index) => __awaiter(void 0, void 0, void 0, function* () {
            if (!orderId.isZero()) {
                const oneClone = one.clone().shln(index);
                // @ts-ignore: isBidBits issue
                const isAsk = oneClone.and(openOrders.isBidBits).isZero();
                const orderInfo = {
                    orderId: orderId,
                    openOrdersAddress: openOrders.address,
                    openOrdersSlot: index,
                    side: isAsk ? "sell" : "buy",
                };
                instructions.push(yield cancelOrderInstructionV2(program, optionMarketKey, dexProgramId, serumMarketKey, orderInfo));
            }
        })));
    })));
    return instructions;
});

/**
 * Create instruction to close OpenOrders account.
 *
 * @param program - Anchor Psy American Program
 * @param optionMarketKey - The OptionMarket address
 * @param dexProgramId - The Serum DEX program ID
 * @param serumMarketKey - The Serum market address
 * @param openOrdersKey - The open orders key for the account we're closing
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @param solWallet - OPTIONAL: pass in a different address to send the unlocked Sol to
 * @returns
 */
const closeOpenOrdersInstruction = (program, optionMarketKey, dexProgramId, serumMarketKey, openOrdersKey, marketAuthorityBump, solWallet) => __awaiter(void 0, void 0, void 0, function* () {
    let _marketAuthorityBump = marketAuthorityBump;
    if (!marketAuthorityBump) {
        const [, bump] = yield deriveMarketAuthority(program, dexProgramId, serumMarketKey);
        _marketAuthorityBump = bump;
    }
    const marketProxy = yield marketLoader(program, optionMarketKey, _marketAuthorityBump, dexProgramId, serumMarketKey);
    return marketProxy.instruction.closeOpenOrders(openOrdersKey, 
    // @ts-ignore
    program.provider.wallet.publicKey, 
    // @ts-ignore
    solWallet !== null && solWallet !== void 0 ? solWallet : program.provider.wallet.publicKey);
});

/**
 * Create a proxied InitOpenOrdersInstruction
 *
 * @param program - Anchor Psy American program
 * @param owner - The user's wallet address
 * @param optionMarketKey - The OptionMarket address key
 * @param dexProgramId - Serum DEX id
 * @param serumMarketKey - The Serum market address
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @returns
 */
const initOpenOrdersInstruction = (program, owner, optionMarketKey, dexProgramId, serumMarketKey, marketAuthorityBump = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    let _marketAuthorityBump = marketAuthorityBump;
    if (!_marketAuthorityBump) {
        const [marketAuthority, bump] = yield deriveMarketAuthority(program, dexProgramId, serumMarketKey);
        _marketAuthorityBump = bump;
    }
    const marketProxy = yield marketLoader(program, optionMarketKey, _marketAuthorityBump, dexProgramId, serumMarketKey);
    const ix = marketProxy.instruction.initOpenOrders(owner, marketProxy.market.address, 
    // dummy key, Serum middleware replaces it
    web3_js.SystemProgram.programId, 
    // dummy key, Serum middleware replaces it
    web3_js.SystemProgram.programId);
    return { ix };
});

const textEncoder = new TextEncoder();
/**
 * Create a new order proxied through the Psy American Protocol
 *
 * @param program - Anchor Psy American program
 * @param optionMarketKey - The OptionMarket address
 * @param dexProgramId - The Serum DEX program ID
 * @param serumMarketKey - The Serum market address
 * @param orderArguments - The Serum OrderParams
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @returns
 */
const newOrderInstruction = (program, optionMarketKey, dexProgramId, serumMarketKey, orderArguments, marketAuthorityBump = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = new web3_js.Transaction();
    let _openOrdersKey = orderArguments.openOrdersAddressKey;
    let _marketAuthorityBump = marketAuthorityBump;
    if (!_marketAuthorityBump) {
        const [marketAuthority, bump] = yield deriveMarketAuthority(program, dexProgramId, serumMarketKey);
        _marketAuthorityBump = bump;
    }
    const marketProxy = yield marketLoader(program, optionMarketKey, _marketAuthorityBump, dexProgramId, serumMarketKey);
    // create OpenOrders account
    if (!_openOrdersKey) {
        // Check that the OpenOrders account does not exist
        [_openOrdersKey] = yield web3_js.PublicKey.findProgramAddress([
            textEncoder.encode("open-orders"),
            dexProgramId.toBuffer(),
            marketProxy.market.address.toBuffer(),
            // @ts-ignore
            program.provider.wallet.publicKey.toBuffer(),
        ], program.programId);
        const accountInfo = yield program.provider.connection.getAccountInfo(_openOrdersKey, "recent");
        orderArguments.openOrdersAddressKey = _openOrdersKey;
        if (!accountInfo) {
            const { ix } = yield initOpenOrdersInstruction(program, 
            // @ts-ignore
            program.provider.wallet.publicKey, optionMarketKey, dexProgramId, serumMarketKey, _marketAuthorityBump);
            transaction.add(ix);
        }
    }
    if (orderArguments.feeRate) {
        orderArguments.price = orderArguments.price * (1 + orderArguments.feeRate);
    }
    const ix = marketProxy.instruction.newOrderV3(orderArguments);
    transaction.add(ix);
    return { openOrdersKey: _openOrdersKey, tx: transaction };
});

/**
 * Create a TransactionInstruction for the settleFunds instruction
 *
 * @param program - Anchor Psy American Program
 * @param optionMarketKey - The OptionMarket address
 * @param dexProgramId - The Serum DEX program ID
 * @param serumMarketKey - The Serum market address
 * @param baseWallet - The wallet address that contains the user's base asset tokens
 * @param quoteWallet - The wallet address that contains the user's quote asset tokens
 * @param serumReferralKey - The Psy American referral address for the quote asset
 * @param openOrdersKey - The open orders keys
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @returns
 */
const settleFundsInstruction = (program, optionMarketKey, dexProgramId, serumMarketKey, baseWallet, quoteWallet, serumReferralKey, openOrdersKey, marketAuthorityBump = undefined) => __awaiter(void 0, void 0, void 0, function* () {
    let _marketAuthorityBump = marketAuthorityBump;
    if (!marketAuthorityBump) {
        const [marketAuthority, bump] = yield deriveMarketAuthority(program, dexProgramId, serumMarketKey);
        _marketAuthorityBump = bump;
    }
    const marketProxy = yield marketLoader(program, optionMarketKey, _marketAuthorityBump, dexProgramId, serumMarketKey);
    return marketProxy.instruction.settleFunds(openOrdersKey, 
    // @ts-ignore
    program.provider.wallet.publicKey, baseWallet, quoteWallet, serumReferralKey);
});
/**
 * Create a TransactionInstruction for the settleFunds instruction
 *
 * Note: this API abstracts the complexity of the serumReferralKey away.
 *
 * @param program - Anchor Psy American Program
 * @param optionMarketKey - The OptionMarket address
 * @param dexProgramId - The Serum DEX program ID
 * @param serumMarket - The Serum market
 * @param baseWallet - The wallet address that contains the user's base asset tokens
 * @param quoteWallet - The wallet address that contains the user's quote asset tokens
 * @param openOrdersKey - The open orders keys
 * @param marketAuthorityBump - OPTIONAL: pass in the market authority bump seed
 * @returns
 */
const settleMarketFundsInstruction = (program, optionMarketKey, dexProgramId, serumMarket, baseWallet, quoteWallet, openOrdersKey) => __awaiter(void 0, void 0, void 0, function* () {
    // Get the associated address for a referral
    const owner = FEE_OWNER_KEY;
    const associatedAddress = yield splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, serumMarket.quoteMintAddress, owner);
    const accountInfo = yield program.provider.connection.getAccountInfo(associatedAddress);
    if (!accountInfo) {
        throw new Error(`Referral account does not exist for ${serumMarket.quoteMintAddress.toString()}. Please create one.`);
    }
    return settleFundsInstruction(program, optionMarketKey, dexProgramId, serumMarket.address, baseWallet, quoteWallet, associatedAddress, openOrdersKey, undefined);
});

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  cancelOrderInstructionV2: cancelOrderInstructionV2,
  cancelOrderByClientId: cancelOrderByClientId,
  cancelAllOpenOrders: cancelAllOpenOrders,
  closeOpenOrdersInstruction: closeOpenOrdersInstruction,
  initOpenOrdersInstruction: initOpenOrdersInstruction,
  marketLoader: marketLoader,
  Validation: Validation,
  newOrderInstruction: newOrderInstruction,
  settleFundsInstruction: settleFundsInstruction,
  settleMarketFundsInstruction: settleMarketFundsInstruction
});

/**
 * Load all OptionMarkets owned by the given program from the blockchain.
 *
 * @param program - Anchor Psy American program
 * @returns
 */
const getAllOptionAccounts = (program) => __awaiter(void 0, void 0, void 0, function* () {
    const accts = (yield program.account.optionMarket.all());
    return accts.map(acct => (Object.assign(Object.assign({}, acct.account), { key: acct.publicKey })));
});

exports.ClusterName = void 0;
(function (ClusterName) {
    ClusterName["devnet"] = "Devnet";
    ClusterName["mainnet"] = "Mainnet";
    ClusterName["testnet"] = "Testnet";
    ClusterName["localhost"] = "localhost";
})(exports.ClusterName || (exports.ClusterName = {}));
/**
 * An enumeration to keep track of the different program versions released.
 */
exports.ProgramVersions = void 0;
(function (ProgramVersions) {
    ProgramVersions[ProgramVersions["V1"] = 0] = "V1";
    ProgramVersions[ProgramVersions["V1_1"] = 1] = "V1_1";
})(exports.ProgramVersions || (exports.ProgramVersions = {}));

/**
 * All prior Psy American programIds for all networks so clients that require
 * backwards compatability can maintain it.
 */
const PSY_AMERICAN_PROGRAM_IDS = {
    "GDvqQy3FkDB2wyNwgZGp5YkmRMUmWbhNNWDMYKbLSZ5N": exports.ProgramVersions.V1,
    "AAcHauRu6eUDePN3hDDAUTbgyRq5xFbRZJCLsUdpBCJb": exports.ProgramVersions.V1,
    "3KAqLcLAY8W7ZxGT1MJcFPDMNJKJsXaE1m9i1JPahfmH": exports.ProgramVersions.V1_1
};

/**
 * The Anchor IDL for the Psy American program. Used when creating an Anchor Program.
 *
 * ````typescript
 * const program = new Program(PsyAmericanIdl, psyAmericanProgramId, provider);
 * ````
 */
const PsyAmericanIdl = IDL;

exports.FEE_OWNER_KEY = FEE_OWNER_KEY;
exports.NFT_MINT_LAMPORTS = NFT_MINT_LAMPORTS;
exports.PSY_AMERICAN_PROGRAM_IDS = PSY_AMERICAN_PROGRAM_IDS;
exports.PsyAmericanIdl = PsyAmericanIdl;
exports.chunkArray = chunkArray;
exports.createProgram = createProgram;
exports.deriveOptionKeyFromParams = deriveOptionKeyFromParams;
exports.feeAmountPerContract = feeAmountPerContract;
exports.getAllOptionAccounts = getAllOptionAccounts;
exports.getOptionByKey = getOptionByKey;
exports.getOrAddAssociatedTokenAccountTx = getOrAddAssociatedTokenAccountTx;
exports.getVaultOwnerAndNonce = getVaultOwnerAndNonce;
exports.instructions = index$1;
exports.parseTransactionError = parseTransactionError;
exports.serumInstructions = index;
exports.serumUtils = serumUtils;

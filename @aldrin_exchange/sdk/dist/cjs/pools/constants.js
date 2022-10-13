"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOLANA_RPC_ENDPOINT = exports.SWAP_FEE_DENOMINATOR = exports.SWAP_FEE_NUMERATOR = exports.VESTING_DENOMINATOR = exports.VESTING_NUMERATOR = exports.PRE_VESTING_DENOMINATOR = exports.PRE_VESTING_NUMERATOR = exports.PERMISSIONLESS_POOLS = exports.AUTHORIZED_POOLS = exports.SOL_MINT = exports.Side = void 0;
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = __importDefault(require("bn.js"));
exports.Side = {
    Bid: { bid: {} },
    Ask: { ask: {} },
};
exports.SOL_MINT = new web3_js_1.PublicKey('So11111111111111111111111111111111111111112');
var POOLS = {
    RIN_USDC: {
        poolMint: new web3_js_1.PublicKey('Gathk79qZfJ4G36M7hiL3Ef1P5SDt7Xhm2C1vPhtWkrw'),
        poolPublicKey: new web3_js_1.PublicKey('Gubmyfw5Ekdp4pkXk9be5yNckSgCdgd7JEThx8SFzCQQ'),
        baseTokenMint: new web3_js_1.PublicKey('E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp'),
        quoteTokenMint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        baseTokenVault: new web3_js_1.PublicKey('8YuEKfvSwcfNKvdoHijzrUAgEeevj4529m8SddSYQ8FV'),
        quoteTokenVault: new web3_js_1.PublicKey('5P7J5sPvJmdnNX4JuhGDsNRnTihVMY8q4dHHbbmQUouJ'),
        curveType: 0,
        poolVersion: 1,
    },
    RIN_SOL: {
        poolMint: new web3_js_1.PublicKey('HFNv9CeUtKFKm7gPoX1QG1NnrPnDhA5W6xqHGxmV6kxX'),
        poolPublicKey: new web3_js_1.PublicKey('7nrkzur3LUxgfxr3TBj9GpUsiABCwMgzwtNhHKG4hPYz'),
        baseTokenMint: new web3_js_1.PublicKey('E5ndSkaB17Dm7CsD22dvcjfrYSDLCxFcMd6z8ddCk5wp'),
        quoteTokenMint: new web3_js_1.PublicKey('So11111111111111111111111111111111111111112'),
        baseTokenVault: new web3_js_1.PublicKey('3reyueV93V8CxXakMk4FF96uqBibDS9Di7zWgjxhkqt7'),
        quoteTokenVault: new web3_js_1.PublicKey('3LX2NHkUux6gGjiQXY2nMCnLTr9QuCjguqh7KTwaupV5'),
        curveType: 0,
        poolVersion: 1,
    },
    mSOL_USDT: {
        poolMint: new web3_js_1.PublicKey('77qHkg6TEe4FuZAr35bthTEadmT4ueWe1xomFFZkwiGQ'),
        poolPublicKey: new web3_js_1.PublicKey('FC4sYMpsMvdsq8hHMEtmWA8xN25W71t2c7RycU5juX35'),
        baseTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        quoteTokenMint: new web3_js_1.PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
        baseTokenVault: new web3_js_1.PublicKey('4aiKnDHFmNnLsopVsDyRBh8sbVohZYgdGzh3P9orpqNB'),
        quoteTokenVault: new web3_js_1.PublicKey('HFHGsYQyni5gFMGudaHWpRzN5CejNpHr42PfQ4D6aGZM'),
        curveType: 0,
        poolVersion: 1,
    },
    mSOL_ETH: {
        poolMint: new web3_js_1.PublicKey('4KeZGuXPq9fyZdt5sfzHMM36mxTf3oSkDaa4Y4gHm9Hz'),
        poolPublicKey: new web3_js_1.PublicKey('2JANvFVV2M8dv7twzL1EF3PhEJaoJpvSt6PhnjW6AHG6'),
        baseTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        quoteTokenMint: new web3_js_1.PublicKey('2FPyTwcZLUg1MDrwsyoP4D6s1tM7hAkHYRjkNb5w6Pxk'),
        baseTokenVault: new web3_js_1.PublicKey('9MaVbwbZw3LgFTNAPfDj4viRAffXFGaAdJWfX3ifouHf'),
        quoteTokenVault: new web3_js_1.PublicKey('6YwwwDQcQz5qAEipFJXHe3vBMKDcs9nfZXLitEubMxFc'),
        curveType: 0,
        poolVersion: 1,
    },
    mSOL_BTC: {
        poolMint: new web3_js_1.PublicKey('9hkYqNM8QSx2vTwspaNg5VvW1LBxKWWgud8pCVdxKYZU'),
        poolPublicKey: new web3_js_1.PublicKey('13FjT6LMUH9LQLQn6KGjJ1GNXKvgzoDSdxvHvAd4hcan'),
        baseTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        quoteTokenMint: new web3_js_1.PublicKey('9n4nbM75f5Ui33ZbPYXn59EwSgE8CGsHtAeTH5YFeJ9E'),
        baseTokenVault: new web3_js_1.PublicKey('EhWAErmyrX8nT1eT8HVFw37amsEkm5VjKZH4ZUreDRCs'),
        quoteTokenVault: new web3_js_1.PublicKey('Fpy5DXqdz7mfLDF8PYKVzxQrYtsaiQu36fLpv6gmGseH'),
        curveType: 0,
        poolVersion: 1,
    },
    mSOL_USDC: {
        poolMint: new web3_js_1.PublicKey('H37kHxy82uLoF8t86wK414KzpVJy7uVJ9Kvt5wYsTGPh'),
        poolPublicKey: new web3_js_1.PublicKey('Af4TpzGpo8Yc61bCNwactPKH9F951tHPzp8XGxWRLNE1'),
        baseTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        quoteTokenMint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        baseTokenVault: new web3_js_1.PublicKey('BEPiCaDinG2uLSBKjiVGAdDV32dwiemANKJYejtpbT2h'),
        quoteTokenVault: new web3_js_1.PublicKey('9CDfE5NfRcQomM7bZ2fCBLe9XKebmu8QY5tBHzojS8d8'),
        curveType: 0,
        poolVersion: 1,
    },
    SOL_USDC: {
        poolMint: new web3_js_1.PublicKey('3sbMDzGtyHAzJqzxE7DPdLMhrsxQASYoKLkHMYJPuWkp'),
        poolPublicKey: new web3_js_1.PublicKey('4GUniSDrCAZR3sKtLa1AWC8oyYubZeKJQ8KraQmy3Wt5'),
        baseTokenMint: new web3_js_1.PublicKey('So11111111111111111111111111111111111111112'),
        quoteTokenMint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        baseTokenVault: new web3_js_1.PublicKey('CLt1DtCioiByTizqLhxLAXweXr2g9D4ZEAStibACBg4L'),
        quoteTokenVault: new web3_js_1.PublicKey('2M1JTZsc71V6FhRNjCDSttcs17HewC4KNNNkkc81L3gB'),
        curveType: 0,
        poolVersion: 1,
    },
    mSOL_UST: {
        poolMint: new web3_js_1.PublicKey('BE7eTJ8DB7xTu6sKsch4gWDCXbD48PLGesRLx7E1Qce4'),
        poolPublicKey: new web3_js_1.PublicKey('EnKhda5n5LYbZjPv7d7WChkSXzo5RgV8eSVVkGCXsQUn'),
        baseTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        quoteTokenMint: new web3_js_1.PublicKey('9vMJfxuKxXBoEa7rM12mYLMwTacLMLDJqHozw96WQL8i'),
        baseTokenVault: new web3_js_1.PublicKey('29jNBEn9VEvM5ppVLGThrGc7ExnT3WyNhYyqbizpyNFK'),
        quoteTokenVault: new web3_js_1.PublicKey('6RmiUpwLquyQWVMeYx4oktQvtCuUH48fzRMwbC5kUa4h'),
        curveType: 0,
        poolVersion: 1,
    },
    mSOL_MNGO: {
        poolMint: new web3_js_1.PublicKey('EotLYRsnRVqR3euN24P9PMXCqJv1WLsV8kJxR9o1y4U7'),
        poolPublicKey: new web3_js_1.PublicKey('CAHchWN1xoxNvXmqmmj6U834ip585rXZbh9NkvE9vTea'),
        baseTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        quoteTokenMint: new web3_js_1.PublicKey('MangoCzJ36AjZyKwVj3VnYU4GTonjfVEnJmvvWaxLac'),
        baseTokenVault: new web3_js_1.PublicKey('FE3PR8sbojxrxWoTzuLHhDX5hAXfPocS9wCruSJ2y7BF'),
        quoteTokenVault: new web3_js_1.PublicKey('CJzgYvbf2pv6HiTu13ymSVDSRmVQFoF8rkFYvwDNWVJL'),
        curveType: 0,
        poolVersion: 1,
    },
    LARIX_mSOL: {
        poolMint: new web3_js_1.PublicKey('9X5EdjWCXsnu41EQBFbrpWvfjjftwFR2SVB1YRMEt1sF'),
        poolPublicKey: new web3_js_1.PublicKey('3taPGAR6qVnDNtaRXvuWQUfiQCGFVpiDLNuCkYLqrv9N'),
        baseTokenMint: new web3_js_1.PublicKey('Lrxqnh6ZHKbGy3dcrCED43nsoLkM1LTzU2jRfWe8qUC'),
        quoteTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        baseTokenVault: new web3_js_1.PublicKey('2DByjmqChVBtLi6rbQRMbfRbddNSgJ7BodtgCBvTbd7d'),
        quoteTokenVault: new web3_js_1.PublicKey('3FcohJaEgNrR3WQF8Da7k4yPzANSBoEjiEJkj2kzB5st'),
        curveType: 0,
        poolVersion: 1,
    },
    MEAN_mSOL: {
        poolMint: new web3_js_1.PublicKey('5gpA85kbXyq6EwMftVgVVGWxoxwXu8Z8VvipNAqGPEpU'),
        poolPublicKey: new web3_js_1.PublicKey('jzE2xMiQgVT5ku2nyQqZExPrQHQP6pJ4i29JSw72HCf'),
        baseTokenMint: new web3_js_1.PublicKey('MEANeD3XDdUmNMsRGjASkSWdC8prLYsoRJ61pPeHctD'),
        quoteTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        baseTokenVault: new web3_js_1.PublicKey('8acWiMKaRHgviDDWhym88TkWXaMJDUuBEYiSy58kazw'),
        quoteTokenVault: new web3_js_1.PublicKey('8rdkCpqT2rZfUEwYQAGecVFJPjnQsUZjx4RB3LYXUCda'),
        curveType: 0,
        poolVersion: 1,
    },
    USDC_USDT: {
        poolMint: new web3_js_1.PublicKey('2o83TXtZrgzub691p3tKnyFC67qVnQN8yCCW925WuBs6'),
        poolPublicKey: new web3_js_1.PublicKey('3wpyb9CnJ9tcMHrUvwFqsPzdUhAtYZU8F4bxJRr2qd1P'),
        baseTokenMint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        quoteTokenMint: new web3_js_1.PublicKey('Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB'),
        baseTokenVault: new web3_js_1.PublicKey('2jmbKwqVJnwV5zqFNAiVSTAqzuYXj3KJuKMNboXVa2EY'),
        quoteTokenVault: new web3_js_1.PublicKey('CHWKoACMrbjAk2YuY54EL5GxQvVEoqioFHvYpKQotX67'),
        curveType: 1,
        poolVersion: 2,
    },
    mSOL_SOL: {
        poolMint: new web3_js_1.PublicKey('CCJ73enCHai27dS79uhqMYMGoehVQsP1YECyDq9xvyt9'),
        poolPublicKey: new web3_js_1.PublicKey('2gCzKgSTPSy4fL7z9NQhJAKvumEofTa2DFJU4wGhQ5Jt'),
        baseTokenMint: new web3_js_1.PublicKey('mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So'),
        quoteTokenMint: new web3_js_1.PublicKey('So11111111111111111111111111111111111111112'),
        baseTokenVault: new web3_js_1.PublicKey('3VwacVEwZWLaGCjhWdkfnYhfLWMdfhRaoHJkouUVwKub'),
        quoteTokenVault: new web3_js_1.PublicKey('FARYkuYJfe9putyXajbS3sAngXSMxk97kqRHT7iQhoV4'),
        curveType: 1,
        poolVersion: 2,
    },
};
var PERM_POOLS = {
    SLX_USDC: {
        poolMint: new web3_js_1.PublicKey('E3XeF4QCTMMo8P5yrgqNMvoRJMyVPTNHhWkbRCgoeAfC'),
        poolPublicKey: new web3_js_1.PublicKey('Hv5F48Br7dbZvUpKFuyxxuaC4v95C1uyDGhdkFFCc9Gf'),
        baseTokenMint: new web3_js_1.PublicKey('AASdD9rAefJ4PP7iM89MYUsQEyCQwvBofhceZUGDh5HZ'),
        quoteTokenMint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        baseTokenVault: new web3_js_1.PublicKey('BWwtpKxkKJSe4Vv9Ha6iGxdgWwxvy2k6qwooE6WjwUhG'),
        quoteTokenVault: new web3_js_1.PublicKey('EF9M6hDSSTZhwdSrpKvkHn33EafZfRtaFQ9rq6MfqALm'),
    },
    DATE_USDC: {
        poolMint: new web3_js_1.PublicKey('3gigDvmgCuz2gWRhr6iSxH1gCd1k4LpYoUsxEjLWJcLB'),
        poolPublicKey: new web3_js_1.PublicKey('F5MWosWE681D32N5QHbWWaJrXaMAD2PHhDsEr2Sac56X'),
        baseTokenMint: new web3_js_1.PublicKey('Ce3PSQfkxT5ua4r2JqCoWYrMwKWC5hEzwsrT9Hb7mAz9'),
        quoteTokenMint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        baseTokenVault: new web3_js_1.PublicKey('A9FRb9MyAipfzEwkbF5euJ2dE7Bcj1GHBhdSdN8KBkoE'),
        quoteTokenVault: new web3_js_1.PublicKey('EVdVfqSEhumJmL3adAs4qCpEGGBGUoTdqG1krqMDboi4'),
    },
    OOGI_USDC: {
        poolMint: new web3_js_1.PublicKey('46EsyeSzs6tBoTRmFiGfDzGQe13LP337C7mMtdNMkgcU'),
        poolPublicKey: new web3_js_1.PublicKey('6sKC96Z35vCNcDmA3ZbBd9Syx5gnTJdyNKVEdzpBE5uX'),
        baseTokenMint: new web3_js_1.PublicKey('H7Qc9APCWWGDVxGD5fJHmLTmdEgT9GFatAKFNg6sHh8A'),
        quoteTokenMint: new web3_js_1.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'),
        baseTokenVault: new web3_js_1.PublicKey('8fJUjr1o5i48R4URoQXDVbXmjrAUcRZWFkc2U2TMvgEd'),
        quoteTokenVault: new web3_js_1.PublicKey('AdgHaAavPxwjBVw966dZPA9h9MbkbYXAXViGiQRBXMNJ'),
    },
};
exports.AUTHORIZED_POOLS = POOLS;
exports.PERMISSIONLESS_POOLS = PERM_POOLS;
exports.PRE_VESTING_NUMERATOR = new bn_js_1.default(1); // User receive 1/3 of reward if vesting not ended
exports.PRE_VESTING_DENOMINATOR = new bn_js_1.default(3); // User receive 1/3 of reward if vesting not ended
exports.VESTING_NUMERATOR = new bn_js_1.default(2); // User receive another 2/3 of reward if vesting  ended
exports.VESTING_DENOMINATOR = new bn_js_1.default(3); // User receive another 2/3 of reward if vesting not ended
exports.SWAP_FEE_NUMERATOR = new bn_js_1.default(3);
exports.SWAP_FEE_DENOMINATOR = new bn_js_1.default(1000);
// export const SOLANA_RPC_ENDPOINT = 'https://api.mainnet-beta.solana.com'
exports.SOLANA_RPC_ENDPOINT = 'https://api-cryptocurrencies-ai.rpcpool.com';

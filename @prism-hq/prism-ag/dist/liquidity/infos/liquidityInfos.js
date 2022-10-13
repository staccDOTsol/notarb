"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadLiquidityInfos = void 0;
const types_1 = require("../../types/types");
const aldrin_1 = require("./aldrin");
const crema_1 = require("./crema");
const cropper_1 = require("./cropper");
const lifinity_1 = require("./lifinity");
const orca_1 = require("./orca");
const raydium_1 = require("./raydium");
const saber_1 = require("./saber");
const serum_1 = require("./serum");
const sencha_1 = require("./sencha");
const symmetry_1 = require("./symmetry");
const saros_1 = require("./saros");
const step_1 = require("./step");
const penguin_1 = require("./penguin");
const mercurial_1 = require("./mercurial");
const cykura_1 = require("./cykura");
const stepn_1 = require("./stepn");
const marinade_1 = require("./marinade");
const gooseFx_1 = require("./gooseFx");
function loadLiquidityInfos(fromCoin, toCoin, LI, connection, knownPairs, tokenMap, direct, reverse) {
    return __awaiter(this, void 0, void 0, function* () {
        let directOptions = [];
        let allFromOptions = {};
        let allToOptions = {};
        if (LI[fromCoin.mintAddress])
            for (let i = 0; i < LI[fromCoin.mintAddress].length; i++) {
                let other = LI[fromCoin.mintAddress][i].other;
                if (other == fromCoin.mintAddress)
                    continue;
                // if (unKnownSerumMarket(fromCoin.mintAddress, other, knownPairs, LI[fromCoin.mintAddress][i]))
                //     continue;
                if (other == toCoin.mintAddress) {
                    directOptions.push(LI[fromCoin.mintAddress][i]);
                    continue;
                }
                if (direct)
                    continue;
                if (LI[fromCoin.mintAddress][i].provider == "serum" &&
                    !types_1.MIDDLE_COINS.find(object => object.mintAddress == other))
                    continue;
                (allFromOptions[other] || (allFromOptions[other] = []))
                    .push(LI[fromCoin.mintAddress][i]);
            }
        if (LI[toCoin.mintAddress])
            for (let i = 0; i < LI[toCoin.mintAddress].length; i++) {
                let other = LI[toCoin.mintAddress][i].other;
                if (other == fromCoin.mintAddress || other == toCoin.mintAddress)
                    continue;
                if (!allFromOptions[other])
                    continue;
                // if (unKnownSerumMarket(toCoin.mintAddress, other, knownPairs, LI[toCoin.mintAddress][i]))
                //     continue;
                if (LI[toCoin.mintAddress][i].provider == "serum" &&
                    !types_1.MIDDLE_COINS.find(object => object.mintAddress == other))
                    continue;
                (allToOptions[other] || (allToOptions[other] = []))
                    .push(LI[toCoin.mintAddress][i]);
            }
        let toLoad = {
            serum: [],
            aldrin: [],
            orca: [],
            saber: [],
            raydium: [],
            crema: [],
            lifinity: [],
            symmetry: [],
            cropper: [],
            sencha: [],
            saros: [],
            step: [],
            penguin: [],
            mercurial: [],
            cykura: [],
            stepn: [],
            marinade: [],
            gooseFx: [],
        };
        let routes = {};
        for (let [middleMint, options] of Object.entries(allToOptions)) {
            let midCoin = tokenMap[middleMint];
            if (!midCoin)
                continue;
            // if (midCoin.decimals == 0)continue;
            if (!routes[middleMint])
                routes[middleMint] = { from: [], to: [], coin: midCoin };
            for (let i = 0; i < allFromOptions[middleMint].length; i++) {
                toLoad[allFromOptions[middleMint][i].provider].push(Object.assign(Object.assign({}, allFromOptions[middleMint][i]), { middleCoin: middleMint, side: "from" }));
                routes[middleMint].from.push(allFromOptions[middleMint][i]);
            }
            //@ts-ignore
            for (let i = 0; i < options.length; i++) {
                //@ts-ignore
                toLoad[options[i].provider].push(Object.assign(Object.assign({}, options[i]), { middleMint: middleMint, side: "to" }));
                //@ts-ignore
                routes[middleMint].to.push(options[i]);
            }
        }
        routes.direct = { direct: [] };
        for (let i = 0; i < directOptions.length; i++) {
            toLoad[directOptions[i].provider].push(Object.assign(Object.assign({}, directOptions[i]), { middleMint: "direct", side: "direct" }));
            routes.direct.direct.push(directOptions[i]);
        }
        let liquidityData = {};
        if (reverse) {
            return routes;
        }
        yield Promise.all([
            (0, serum_1.loadSerum)(toLoad.serum, connection, tokenMap),
            (0, raydium_1.loadRaydium)(toLoad.raydium, connection),
            (0, saber_1.loadSaber)(toLoad.saber, connection),
            (0, aldrin_1.loadAldrin)(toLoad.aldrin, connection),
            (0, orca_1.loadOrca)(toLoad.orca, connection),
            (0, crema_1.loadCrema)(toLoad.crema, connection),
            (0, lifinity_1.loadLifinity)(toLoad.lifinity, connection),
            (0, symmetry_1.loadSymmetry)(toLoad.symmetry, connection),
            (0, cropper_1.loadCropper)(toLoad.cropper, connection),
            (0, sencha_1.loadSencha)(toLoad.sencha, connection),
            (0, saros_1.loadSaros)(toLoad.saros, connection),
            (0, step_1.loadStep)(toLoad.step, connection),
            (0, penguin_1.loadPenguin)(toLoad.penguin, connection),
            (0, mercurial_1.loadMercurial)(toLoad.mercurial, connection),
            (0, cykura_1.loadCykura)(toLoad.cykura, connection),
            (0, stepn_1.loadStepn)(toLoad.stepn, connection),
            (0, marinade_1.loadMarinade)(toLoad.marinade, connection),
            (0, gooseFx_1.loadGooseFx)(toLoad.gooseFx, connection),
        ]).then(results => {
            liquidityData = {
                serumData: results[0],
                raydiumData: results[1],
                saberData: results[2],
                aldrinData: results[3],
                orcaData: results[4],
                cremaData: results[5],
                lifinityData: results[6],
                symmetryData: results[7],
                cropperData: results[8],
                senchaData: results[9],
                sarosData: results[10],
                stepData: results[11],
                penguinData: results[12],
                mercurialData: results[13],
                cykuraData: results[14],
                stepnData: results[15],
                marinadeData: results[16],
                gooseFxData: results[17],
            };
        });
        return {
            routes: routes,
            liquidityData: liquidityData,
        };
    });
}
exports.loadLiquidityInfos = loadLiquidityInfos;

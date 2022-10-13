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
exports.loadLiquidityProviders = void 0;
const aldrin_1 = require("./aldrin");
const cropper_1 = require("./cropper");
const cykura_1 = require("./cykura");
const gooseFx_1 = require("./gooseFx");
const lifinity_1 = require("./lifinity");
const marinade_1 = require("./marinade");
const orca_1 = require("./orca");
const penguin_1 = require("./penguin");
const raydium_1 = require("./raydium");
const saber_1 = require("./saber");
const saros_1 = require("./saros");
const sencha_1 = require("./sencha");
const serum_1 = require("./serum");
const step_1 = require("./step");
const stepn_1 = require("./stepn");
const symmetry_1 = require("./symmetry");
function loadLiquidityProviders(connection) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.all([
            (0, serum_1.getSerumMarkets)(connection),
            (0, saber_1.getSaberPools)(connection),
            (0, raydium_1.getRaydiumAmms)(connection),
            (0, aldrin_1.getAldrinPools)(connection),
            (0, orca_1.getOrcaPools)(connection),
            // getCremaPools(connection),
            (0, lifinity_1.getLifinityPools)(connection),
            (0, symmetry_1.getSymmetryFunds)(connection),
            (0, cropper_1.getCropperPools)(connection),
            (0, sencha_1.getSenchaPools)(connection),
            (0, saros_1.getSarosPools)(connection),
            (0, step_1.getStepPools)(connection),
            (0, penguin_1.getPenguinPools)(connection),
            // getMercurialPools(connection),
            (0, cykura_1.getCykuraPools)(connection),
            (0, stepn_1.getStepnPools)(connection),
            (0, marinade_1.getMarinadePools)(connection),
            (0, gooseFx_1.getGooseFxPools)(connection),
        ]).then(results => {
            let combinedOptions = { all: {} };
            for (let i = 0; i < results.length; i++)
                for (let [mint, info] of Object.entries(results[i])) {
                    if (mint == "all") {
                        combinedOptions.all = info;
                        continue;
                    }
                    //@ts-ignore
                    for (let j = 0; j < info.length; j++)
                        //@ts-ignore
                        (combinedOptions[mint] || (combinedOptions[mint] = [])).push(info[j]);
                }
            return combinedOptions;
        });
    });
}
exports.loadLiquidityProviders = loadLiquidityProviders;

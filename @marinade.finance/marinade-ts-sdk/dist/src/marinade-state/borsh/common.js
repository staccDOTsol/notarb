"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonBorshSchema = exports.deserializeF64 = exports.deserializePublicKey = void 0;
const anchor_1 = require("@project-serum/anchor");
function deserializePublicKey({ publicKey }) {
    return new anchor_1.web3.PublicKey(publicKey);
}
exports.deserializePublicKey = deserializePublicKey;
function deserializeF64({ bytes }) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    const bytesArray = [...new Uint8Array(bytes)];
    bytesArray.forEach(function (byte, index) {
        view.setUint8(index, byte);
    });
    return { value: new DataView(buffer).getFloat64(0, true) };
}
exports.deserializeF64 = deserializeF64;
exports.commonBorshSchema = [
    [deserializePublicKey, {
            kind: 'struct',
            fields: [
                ['publicKey', [32]],
            ],
        }],
    [deserializeF64, {
            kind: 'struct',
            fields: [
                ['bytes', [8]],
            ],
        }],
];
//# sourceMappingURL=common.js.map
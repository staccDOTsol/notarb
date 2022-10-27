"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.struct = exports.Structure = exports.publicKey = exports.WrappedLayout = exports.u128 = exports.u64 = exports.u32 = exports.u8 = exports.BNLayout = exports.blob = void 0;
const web3_js_1 = require("@solana/web3.js");
const bn_js_1 = __importDefault(require("bn.js"));
const buffer_layout_1 = require("./buffer-layout");
Object.defineProperty(exports, "blob", { enumerable: true, get: function () { return buffer_layout_1.blob; } });
__exportStar(require("./buffer-layout"), exports);
class BNLayout extends buffer_layout_1.Layout {
    constructor(span, signed, property) {
        //@ts-expect-error type wrong for super()'s type different from extends, but it desn't matter
        super(span, property);
        this.blob = (0, buffer_layout_1.blob)(span);
        this.signed = signed;
    }
    /** @override */
    decode(b, offset = 0) {
        const num = new bn_js_1.default(this.blob.decode(b, offset), 10, 'le');
        if (this.signed) {
            return num.fromTwos(this.span * 8).clone();
        }
        return num;
    }
    /** @override */
    encode(src, b, offset = 0) {
        if (typeof src === 'number')
            src = new bn_js_1.default(src); // src will pass a number accidently in union
        if (this.signed) {
            src = src.toTwos(this.span * 8);
        }
        return this.blob.encode(src.toArrayLike(Buffer, 'le', this.span), b, offset);
    }
}
exports.BNLayout = BNLayout;
function u8(property) {
    return new buffer_layout_1.UInt(1, property);
}
exports.u8 = u8;
function u32(property) {
    return new buffer_layout_1.UInt(4, property);
}
exports.u32 = u32;
function u64(property) {
    return new BNLayout(8, false, property);
}
exports.u64 = u64;
function u128(property) {
    return new BNLayout(16, false, property);
}
exports.u128 = u128;
class WrappedLayout extends buffer_layout_1.Layout {
    constructor(layout, decoder, encoder, property) {
        //@ts-expect-error type wrong for super()'s type different from extends , but it desn't matter
        super(layout.span, property);
        this.layout = layout;
        this.decoder = decoder;
        this.encoder = encoder;
    }
    decode(b, offset) {
        return this.decoder(this.layout.decode(b, offset));
    }
    encode(src, b, offset) {
        return this.layout.encode(this.encoder(src), b, offset);
    }
    getSpan(b, offset) {
        return this.layout.getSpan(b, offset);
    }
}
exports.WrappedLayout = WrappedLayout;
function publicKey(property) {
    return new WrappedLayout((0, buffer_layout_1.blob)(32), (b) => new web3_js_1.PublicKey(b), (key) => key.toBuffer(), property);
}
exports.publicKey = publicKey;
class Structure extends buffer_layout_1.Structure {
    /** @override */
    decode(b, offset) {
        return super.decode(b, offset);
    }
}
exports.Structure = Structure;
function struct(fields, property, decodePrefixes) {
    //@ts-expect-error this type is not quite satisfied the define, but, never no need to worry about.
    return new Structure(fields, property, decodePrefixes);
}
exports.struct = struct;

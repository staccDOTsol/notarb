"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bool = exports.rustEnum = exports.int64 = exports.uint64 = exports.publicKey = void 0;
var buffer_layout_1 = require("@solana/buffer-layout");
var web3_js_1 = require("@solana/web3.js");
var bn_js_1 = __importDefault(require("bn.js"));
var PublicKeyLayout = /** @class */ (function (_super) {
    __extends(PublicKeyLayout, _super);
    function PublicKeyLayout(property) {
        var _this = this;
        var layout = (0, buffer_layout_1.blob)(32);
        _this = _super.call(this, layout.span, property) || this;
        _this.layout = layout;
        return _this;
    }
    PublicKeyLayout.prototype.getSpan = function (b, offset) {
        return this.layout.getSpan(b, offset);
    };
    PublicKeyLayout.prototype.decode = function (b, offset) {
        return new web3_js_1.PublicKey(this.layout.decode(b, offset));
    };
    PublicKeyLayout.prototype.encode = function (src, b, offset) {
        return this.layout.encode(src.toBuffer(), b, offset);
    };
    return PublicKeyLayout;
}(buffer_layout_1.Layout));
/**
 * Layout for a public key
 */
var publicKey = function (property) { return new PublicKeyLayout(property); };
exports.publicKey = publicKey;
// export const publicKey = (property: string) => blob(32, property);
var U64Layout = /** @class */ (function (_super) {
    __extends(U64Layout, _super);
    function U64Layout(property, signed, toNumber) {
        var _this = this;
        var layout = (0, buffer_layout_1.blob)(8);
        _this = _super.call(this, layout.span, property) || this;
        _this.layout = layout;
        _this.toNumber = toNumber;
        _this.signed = signed;
        return _this;
    }
    U64Layout.prototype.getSpan = function (b, offset) {
        return this.layout.getSpan(b, offset);
    };
    U64Layout.prototype.decode = function (b, offset) {
        var bn = new bn_js_1.default(this.layout.decode(b, offset), 10, 'le');
        if (this.signed) {
            bn = bn.fromTwos(this.span * 8).clone();
        }
        if (this.toNumber) {
            return bn.toNumber();
        }
        return bn;
    };
    U64Layout.prototype.encode = function (src, b, offset) {
        return this.layout.encode(src.toArrayLike(Buffer, 'le', this.layout.span), b, offset);
    };
    return U64Layout;
}(buffer_layout_1.Layout));
/**
 * Layout for a 64bit unsigned value
 */
var uint64 = function (property, toNumber) {
    if (toNumber === void 0) { toNumber = false; }
    return new U64Layout(property, false, toNumber);
};
exports.uint64 = uint64;
var int64 = function (property, toNumber) {
    if (toNumber === void 0) { toNumber = false; }
    return new U64Layout(property, true, toNumber);
};
exports.int64 = int64;
var rustEnum = function (variants, property) {
    var unionLayout = (0, buffer_layout_1.union)((0, buffer_layout_1.u8)(), (0, buffer_layout_1.blob)(0), property);
    variants.forEach(function (variant, index) {
        return unionLayout.addVariant(index, variant, variant.property || '');
    });
    return unionLayout;
};
exports.rustEnum = rustEnum;
var BoolLayout = /** @class */ (function (_super) {
    __extends(BoolLayout, _super);
    function BoolLayout(property) {
        var _this = this;
        var layout = (0, buffer_layout_1.blob)(1);
        _this = _super.call(this, layout.span, property) || this;
        _this.layout = layout;
        return _this;
    }
    BoolLayout.prototype.getSpan = function (b, offset) {
        return this.layout.getSpan(b, offset);
    };
    BoolLayout.prototype.decode = function (b, offset) {
        var value = this.layout.decode(b, offset);
        return !!value[0];
    };
    BoolLayout.prototype.encode = function (src, b, offset) {
        return this.layout.encode(src ? 1 : 0, b, offset);
    };
    return BoolLayout;
}(buffer_layout_1.Layout));
var bool = function (property) { return new BoolLayout(property); };
exports.bool = bool;

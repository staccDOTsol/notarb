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
import { blob, Layout, u8, union } from '@solana/buffer-layout';
import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
var PublicKeyLayout = /** @class */ (function (_super) {
    __extends(PublicKeyLayout, _super);
    function PublicKeyLayout(property) {
        var _this = this;
        var layout = blob(32);
        _this = _super.call(this, layout.span, property) || this;
        _this.layout = layout;
        return _this;
    }
    PublicKeyLayout.prototype.getSpan = function (b, offset) {
        return this.layout.getSpan(b, offset);
    };
    PublicKeyLayout.prototype.decode = function (b, offset) {
        return new PublicKey(this.layout.decode(b, offset));
    };
    PublicKeyLayout.prototype.encode = function (src, b, offset) {
        return this.layout.encode(src.toBuffer(), b, offset);
    };
    return PublicKeyLayout;
}(Layout));
/**
 * Layout for a public key
 */
export var publicKey = function (property) { return new PublicKeyLayout(property); };
// export const publicKey = (property: string) => blob(32, property);
var U64Layout = /** @class */ (function (_super) {
    __extends(U64Layout, _super);
    function U64Layout(property, signed, toNumber) {
        var _this = this;
        var layout = blob(8);
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
        var bn = new BN(this.layout.decode(b, offset), 10, 'le');
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
}(Layout));
/**
 * Layout for a 64bit unsigned value
 */
export var uint64 = function (property, toNumber) {
    if (toNumber === void 0) { toNumber = false; }
    return new U64Layout(property, false, toNumber);
};
export var int64 = function (property, toNumber) {
    if (toNumber === void 0) { toNumber = false; }
    return new U64Layout(property, true, toNumber);
};
export var rustEnum = function (variants, property) {
    var unionLayout = union(u8(), blob(0), property);
    variants.forEach(function (variant, index) {
        return unionLayout.addVariant(index, variant, variant.property || '');
    });
    return unionLayout;
};
var BoolLayout = /** @class */ (function (_super) {
    __extends(BoolLayout, _super);
    function BoolLayout(property) {
        var _this = this;
        var layout = blob(1);
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
}(Layout));
export var bool = function (property) { return new BoolLayout(property); };

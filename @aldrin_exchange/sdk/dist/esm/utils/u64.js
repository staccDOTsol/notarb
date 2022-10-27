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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import BN from 'bn.js';
/**
 * 64-bit value
 */
var u64 = /** @class */ (function (_super) {
    __extends(u64, _super);
    function u64() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Convert to Buffer representation
     */
    u64.prototype.toBuffer = function () {
        var a = _super.prototype.toArray.call(this).reverse();
        var b = Buffer.from(a);
        if (b.length === 8) {
            return b;
        }
        if (b.length > 8) {
            throw new Error('u64 too large');
        }
        var zeroPad = Buffer.alloc(8);
        b.copy(zeroPad);
        return zeroPad;
    };
    /**
     * Construct a u64 from Buffer representation
     */
    u64.fromBuffer = function (buffer) {
        if (buffer.length !== 8) {
            throw new Error("Invalid buffer length: " + buffer.length);
        }
        return new u64(__spreadArray([], Array.from(buffer), true).reverse()
            .map(function (i) { return ("00" + i.toString(16)).slice(-2); })
            .join(''), 16);
    };
    return u64;
}(BN));
export { u64 };

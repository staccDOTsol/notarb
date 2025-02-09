import { MaxUint128, CurrencyAmount, Price, sqrt, Percent, TradeType, Fraction, sortedInsert } from '@cykura/sdk-core';
import JSBI from 'jsbi';
import invariant from 'tiny-invariant';
import { web3, BN } from '@project-serum/anchor';

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _createForOfIteratorHelperLoose(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (it) return (it = it.call(o)).next.bind(it);

  if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
    if (it) o = it;
    var i = 0;
    return function () {
      if (i >= o.length) return {
        done: true
      };
      return {
        done: false,
        value: o[i++]
      };
    };
  }

  throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var _TICK_SPACINGS;
var FACTORY_ADDRESS = /*#__PURE__*/new web3.PublicKey('cysPXAjehMpVKUapzbMCCnpFxUFFryEWEaLgnb9NrR8');
var ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';
/**
 * The default factory enabled fee amounts, denominated in hundredths of bips.
 */

var FeeAmount;

(function (FeeAmount) {
  FeeAmount[FeeAmount["SUPER_STABLE"] = 20] = "SUPER_STABLE";
  FeeAmount[FeeAmount["TURBO_SPL"] = 80] = "TURBO_SPL";
  FeeAmount[FeeAmount["LOW"] = 500] = "LOW";
  FeeAmount[FeeAmount["MEDIUM"] = 3000] = "MEDIUM";
  FeeAmount[FeeAmount["HIGH"] = 10000] = "HIGH"; // deprecated
})(FeeAmount || (FeeAmount = {}));
/**
 * The default factory tick spacings by fee amount.
 */


var TICK_SPACINGS = (_TICK_SPACINGS = {}, _TICK_SPACINGS[FeeAmount.SUPER_STABLE] = 1, _TICK_SPACINGS[FeeAmount.TURBO_SPL] = 60, _TICK_SPACINGS[FeeAmount.LOW] = 10, _TICK_SPACINGS[FeeAmount.MEDIUM] = 60, _TICK_SPACINGS[FeeAmount.HIGH] = 200, _TICK_SPACINGS);

var NEGATIVE_ONE = /*#__PURE__*/JSBI.BigInt(-1);
var ZERO = /*#__PURE__*/JSBI.BigInt(0);
var ONE = /*#__PURE__*/JSBI.BigInt(1); // used in liquidity amount math

var Q32 = /*#__PURE__*/JSBI.exponentiate( /*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(32));
var Q64 = /*#__PURE__*/JSBI.exponentiate( /*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(64));
var MaxUint32 = /*#__PURE__*/JSBI.subtract(Q32, ONE);
var MaxUint64 = /*#__PURE__*/JSBI.subtract(Q64, ONE);
var U32Resolution = /*#__PURE__*/JSBI.BigInt(32);

var BITMAP_SEED = /*#__PURE__*/Buffer.from('b');
var POOL_SEED = /*#__PURE__*/Buffer.from('p');
var POSITION_SEED = /*#__PURE__*/Buffer.from('ps');
var OBSERVATION_SEED = /*#__PURE__*/Buffer.from('o');
var TICK_SEED = /*#__PURE__*/Buffer.from('t');
var FEE_SEED = /*#__PURE__*/Buffer.from('f');
function u16ToSeed(num) {
  var arr = new ArrayBuffer(2);
  var view = new DataView(arr);
  view.setUint16(0, num, false);
  return new Uint8Array(arr);
}
function i16ToSeed(num) {
  var arr = new ArrayBuffer(2);
  var view = new DataView(arr);
  view.setInt16(0, num, false);
  return new Uint8Array(arr);
} // Export to commons later?
// Generate seed buffer from a u32 number

function u32ToSeed(num) {
  var arr = new ArrayBuffer(4);
  var view = new DataView(arr);
  view.setUint32(0, num, false);
  return new Uint8Array(arr);
}
function i32ToSeed(num) {
  var arr = new ArrayBuffer(4);
  var view = new DataView(arr);
  view.setInt32(0, num, false);
  return new Uint8Array(arr);
}

/**
 * Computes a pool address
 * @param factoryAddress The Uniswap V3 factory address
 * @param tokenA The first token of the pair, irrespective of sort order
 * @param tokenB The second token of the pair, irrespective of sort order
 * @param fee The fee tier of the pool
 * @returns The pool address
 */

function computePoolAddress(_ref) {
  var factoryAddress = _ref.factoryAddress,
      tokenA = _ref.tokenA,
      tokenB = _ref.tokenB,
      fee = _ref.fee;

  var _ref2 = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA],
      token0 = _ref2[0],
      token1 = _ref2[1]; // does safety checks


  var token0Key = new web3.PublicKey(token0.address);
  var token1Key = new web3.PublicKey(token1.address);
  return web3.PublicKey.findProgramAddress([POOL_SEED, token0Key.toBuffer(), token1Key.toBuffer(), u32ToSeed(fee)], factoryAddress).then(function (_ref3) {
    var poolState = _ref3[0];
    return poolState;
  });
}

var LiquidityMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function LiquidityMath() {}

  LiquidityMath.addDelta = function addDelta(x, y) {
    var z;

    if (JSBI.lessThan(y, ZERO)) {
      z = JSBI.subtract(x, JSBI.multiply(y, NEGATIVE_ONE)); // invariant(z < x, 'LIQUIDITY_SUB')
    } else {
      z = JSBI.add(x, y); // invariant(z >= x, 'LIQUIDITY_ADD')
    }

    return z;
  };

  return LiquidityMath;
}();

var FullMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function FullMath() {}

  FullMath.mulDivRoundingUp = function mulDivRoundingUp(a, b, denominator) {
    var product = JSBI.multiply(a, b);
    var result = JSBI.divide(product, denominator);
    if (JSBI.notEqual(JSBI.remainder(product, denominator), ZERO)) result = JSBI.add(result, ONE);
    return result;
  };

  FullMath.mulDivFloor = function mulDivFloor(a, b, denominator) {
    !JSBI.notEqual(denominator, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'DIVISION_BY_0') : invariant(false) : void 0;
    var product = JSBI.multiply(a, b);
    return JSBI.divide(product, denominator);
  };

  FullMath.mulDivCeil = function mulDivCeil(a, b, denominator) {
    !JSBI.notEqual(denominator, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'DIVISION_BY_0') : invariant(false) : void 0;
    var product = JSBI.multiply(a, b);
    return JSBI.divide(JSBI.add(product, JSBI.subtract(denominator, ONE)), denominator);
  };

  return FullMath;
}();

function multiplyIn128(x, y) {
  var product = JSBI.multiply(x, y);
  return JSBI.bitwiseAnd(product, MaxUint128);
}

function addIn128(x, y) {
  var sum = JSBI.add(x, y);
  return JSBI.bitwiseAnd(sum, MaxUint128);
}

var SqrtPriceMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SqrtPriceMath() {}

  SqrtPriceMath.getAmount0Delta = function getAmount0Delta(sqrtRatioAX32, sqrtRatioBX32, liquidity, roundUp) {
    if (JSBI.greaterThan(sqrtRatioAX32, sqrtRatioBX32)) {
      var _ref = [sqrtRatioBX32, sqrtRatioAX32];
      sqrtRatioAX32 = _ref[0];
      sqrtRatioBX32 = _ref[1];
    }

    var numerator1 = JSBI.leftShift(liquidity, U32Resolution);
    var numerator2 = JSBI.subtract(sqrtRatioBX32, sqrtRatioAX32);
    !JSBI.greaterThan(sqrtRatioAX32, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SQRTA32_GT_0') : invariant(false) : void 0;
    return roundUp ? FullMath.mulDivRoundingUp(FullMath.mulDivCeil(numerator1, numerator2, sqrtRatioBX32), ONE, sqrtRatioAX32) : JSBI.divide(FullMath.mulDivFloor(numerator1, numerator2, sqrtRatioBX32), sqrtRatioAX32);
  };

  SqrtPriceMath.getAmount1Delta = function getAmount1Delta(sqrtRatioAX32, sqrtRatioBX32, liquidity, roundUp) {
    if (JSBI.greaterThan(sqrtRatioAX32, sqrtRatioBX32)) {
      var _ref2 = [sqrtRatioBX32, sqrtRatioAX32];
      sqrtRatioAX32 = _ref2[0];
      sqrtRatioBX32 = _ref2[1];
    }

    return roundUp ? FullMath.mulDivCeil(liquidity, JSBI.subtract(sqrtRatioBX32, sqrtRatioAX32), Q32) : FullMath.mulDivFloor(liquidity, JSBI.subtract(sqrtRatioBX32, sqrtRatioAX32), Q32);
  };

  SqrtPriceMath.getNextSqrtPriceFromInput = function getNextSqrtPriceFromInput(sqrtPX32, liquidity, amountIn, zeroForOne) {
    !JSBI.greaterThan(sqrtPX32, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
    !JSBI.greaterThan(liquidity, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
    return zeroForOne ? this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX32, liquidity, amountIn, true) : this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX32, liquidity, amountIn, true);
  };

  SqrtPriceMath.getNextSqrtPriceFromOutput = function getNextSqrtPriceFromOutput(sqrtPX32, liquidity, amountOut, zeroForOne) {
    !JSBI.greaterThan(sqrtPX32, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
    !JSBI.greaterThan(liquidity, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
    return zeroForOne ? this.getNextSqrtPriceFromAmount1RoundingDown(sqrtPX32, liquidity, amountOut, false) : this.getNextSqrtPriceFromAmount0RoundingUp(sqrtPX32, liquidity, amountOut, false);
  };

  SqrtPriceMath.getNextSqrtPriceFromAmount0RoundingUp = function getNextSqrtPriceFromAmount0RoundingUp(sqrtPX32, liquidity, amount, add) {
    if (JSBI.equal(amount, ZERO)) return sqrtPX32;
    var numerator1 = JSBI.leftShift(liquidity, U32Resolution);

    if (add) {
      var product = multiplyIn128(amount, sqrtPX32);
      var denominator = addIn128(numerator1, product);

      if (JSBI.greaterThanOrEqual(denominator, numerator1)) {
        return FullMath.mulDivCeil(numerator1, sqrtPX32, denominator);
      }

      return FullMath.mulDivRoundingUp(numerator1, ONE, JSBI.add(JSBI.divide(numerator1, sqrtPX32), amount));
    } else {
      var _product = multiplyIn128(amount, sqrtPX32); // invariant(JSBI.equal(JSBI.divide(product, amount), sqrtPX32))


      !JSBI.greaterThan(numerator1, _product) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;

      var _denominator = JSBI.subtract(numerator1, _product);

      return FullMath.mulDivCeil(numerator1, sqrtPX32, _denominator);
    }
  };

  SqrtPriceMath.getNextSqrtPriceFromAmount1RoundingDown = function getNextSqrtPriceFromAmount1RoundingDown(sqrtPX32, liquidity, amount, add) {
    if (add) {
      var quotient = JSBI.lessThanOrEqual(amount, MaxUint32) ? JSBI.divide(JSBI.leftShift(amount, U32Resolution), liquidity) : FullMath.mulDivFloor(amount, Q32, liquidity);
      return JSBI.add(sqrtPX32, quotient);
    } else {
      var _quotient = JSBI.lessThanOrEqual(amount, MaxUint32) ? FullMath.mulDivRoundingUp(JSBI.leftShift(amount, U32Resolution), ONE, liquidity) : FullMath.mulDivCeil(amount, Q32, liquidity);

      !JSBI.greaterThan(sqrtPX32, _quotient) ? process.env.NODE_ENV !== "production" ? invariant(false) : invariant(false) : void 0;
      return JSBI.subtract(sqrtPX32, _quotient);
    }
  };

  return SqrtPriceMath;
}();

var MAX_FEE = /*#__PURE__*/JSBI.exponentiate( /*#__PURE__*/JSBI.BigInt(10), /*#__PURE__*/JSBI.BigInt(6));
var SwapMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function SwapMath() {}

  SwapMath.computeSwapStep = function computeSwapStep(sqrtRatioCurrentX32, sqrtRatioTargetX32, liquidity, amountRemaining, feePips) {
    var swapStep = {};
    var zeroForOne = JSBI.greaterThanOrEqual(sqrtRatioCurrentX32, sqrtRatioTargetX32);
    var exactIn = JSBI.greaterThanOrEqual(amountRemaining, ZERO);

    if (exactIn) {
      var amountRemainingLessFee = FullMath.mulDivFloor(amountRemaining, JSBI.subtract(MAX_FEE, JSBI.BigInt(feePips)), MAX_FEE);
      swapStep.amountIn = zeroForOne ? SqrtPriceMath.getAmount0Delta(sqrtRatioTargetX32, sqrtRatioCurrentX32, liquidity, true) : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX32, sqrtRatioTargetX32, liquidity, true);

      if (JSBI.greaterThanOrEqual(amountRemainingLessFee, swapStep.amountIn)) {
        swapStep.sqrtRatioNextX32 = sqrtRatioTargetX32;
      } else {
        swapStep.sqrtRatioNextX32 = SqrtPriceMath.getNextSqrtPriceFromInput(sqrtRatioCurrentX32, liquidity, amountRemainingLessFee, zeroForOne);
      }
    } else {
      swapStep.amountOut = zeroForOne ? SqrtPriceMath.getAmount1Delta(sqrtRatioTargetX32, sqrtRatioCurrentX32, liquidity, false) : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX32, sqrtRatioTargetX32, liquidity, false);

      if (JSBI.greaterThanOrEqual(JSBI.multiply(amountRemaining, NEGATIVE_ONE), swapStep.amountOut)) {
        swapStep.sqrtRatioNextX32 = sqrtRatioTargetX32;
      } else {
        swapStep.sqrtRatioNextX32 = SqrtPriceMath.getNextSqrtPriceFromOutput(sqrtRatioCurrentX32, liquidity, JSBI.multiply(amountRemaining, NEGATIVE_ONE), zeroForOne);
      }
    }

    var max = JSBI.equal(sqrtRatioTargetX32, swapStep.sqrtRatioNextX32);

    if (zeroForOne) {
      swapStep.amountIn = max && exactIn ? swapStep.amountIn : SqrtPriceMath.getAmount0Delta(swapStep.sqrtRatioNextX32, sqrtRatioCurrentX32, liquidity, true);
      swapStep.amountOut = max && !exactIn ? swapStep.amountOut : SqrtPriceMath.getAmount1Delta(swapStep.sqrtRatioNextX32, sqrtRatioCurrentX32, liquidity, false);
    } else {
      swapStep.amountIn = max && exactIn ? swapStep.amountIn : SqrtPriceMath.getAmount1Delta(sqrtRatioCurrentX32, swapStep.sqrtRatioNextX32, liquidity, true);
      swapStep.amountOut = max && !exactIn ? swapStep.amountOut : SqrtPriceMath.getAmount0Delta(sqrtRatioCurrentX32, swapStep.sqrtRatioNextX32, liquidity, false);
    }

    if (!exactIn && JSBI.greaterThan(swapStep.amountOut, JSBI.multiply(amountRemaining, NEGATIVE_ONE))) {
      swapStep.amountOut = JSBI.multiply(amountRemaining, NEGATIVE_ONE);
    }

    if (exactIn && JSBI.notEqual(swapStep.sqrtRatioNextX32, sqrtRatioTargetX32)) {
      // we didn't reach the target, so take the remainder of the maximum input as fee
      swapStep.feeAmount = JSBI.subtract(amountRemaining, swapStep.amountIn);
    } else {
      swapStep.feeAmount = FullMath.mulDivCeil(swapStep.amountIn, JSBI.BigInt(feePips), JSBI.subtract(MAX_FEE, JSBI.BigInt(feePips)));
    }

    return [swapStep.sqrtRatioNextX32, swapStep.amountIn, swapStep.amountOut, swapStep.feeAmount];
  };

  return SwapMath;
}();

/**
 * Decodes the 256 bit bitmap stored in a bitmap account
 * @param x Bitmap encoded as [u64; 4]
 * @returns 256 bit word
 */

function generateBitmapWord(x) {
  return x[0].add(x[1].shln(64)).add(x[2].shln(128)).add(x[3].shln(192));
}
/**
 * Returns the most significant non-zero bit in the word
 * @param x
 * @returns
 */

function msb(x) {
  return x.bitLength() - 1;
}
/**
 * Returns the least significant non-zero bit in the word
 * @param x
 * @returns
 */

function lsb(x) {
  return x.zeroBits();
}
/**
 * Returns the bitmap index (0 - 255) for the next initialized tick.
 *
 * If no initialized tick is available, returns the first bit (index 0) the word in lte case,
 * and the last bit in gte case.
 * @param word The bitmap word as a u256 number
 * @param bitPos The starting bit position
 * @param lte Whether to search for the next initialized tick to the left (less than or equal to the starting tick),
 * or to the right (greater than or equal to)
 * @returns Bit index and whether it is initialized
 */

function nextInitializedBit(word, bitPos, lte) {
  if (lte) {
    // all the 1s at or to the right of the current bit_pos
    var mask = new BN(1).shln(bitPos).subn(1).add(new BN(1).shln(bitPos));
    var masked = word.and(mask);
    var initialized = !masked.eqn(0);
    var next = initialized ? msb(masked) : 0;
    return {
      next: next,
      initialized: initialized
    };
  } else {
    // all the 1s at or to the left of the bit_pos
    var _mask = new BN(1).shln(bitPos).subn(1).notn(256);

    var _masked = word.and(_mask);

    var _initialized = !_masked.eqn(0);

    var _next = _initialized ? lsb(_masked) : 255;

    return {
      next: _next,
      initialized: _initialized
    };
  }
}
function buildTick(wordPos, nextBit, tickSpacing) {
  return ((wordPos << 8) + nextBit) * tickSpacing;
}

function mulShift(val, mulBy) {
  return JSBI.signedRightShift(JSBI.multiply(val, JSBI.BigInt(mulBy)), JSBI.BigInt(64));
}

var Q32$1 = /*#__PURE__*/JSBI.exponentiate( /*#__PURE__*/JSBI.BigInt(2), /*#__PURE__*/JSBI.BigInt(32));
var TickMath = /*#__PURE__*/function () {
  /**
   * Cannot be constructed.
   */
  function TickMath() {}
  /**
   * Returns the sqrt ratio as a Q32.32 for the given tick. The sqrt ratio is computed as sqrt(1.0001)^tick
   * @param tick the tick for which to compute the sqrt ratio
   */


  TickMath.getSqrtRatioAtTick = function getSqrtRatioAtTick(tick) {
    !(tick >= TickMath.MIN_TICK && tick <= TickMath.MAX_TICK && Number.isInteger(tick)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK') : invariant(false) : void 0;
    var absTick = tick < 0 ? tick * -1 : tick;
    var ratio = (absTick & 0x1) != 0 ? JSBI.BigInt('0xfffcb933bd6fb800') : JSBI.BigInt('0x10000000000000000');
    if ((absTick & 0x2) != 0) ratio = mulShift(ratio, '0xfff97272373d4000');
    if ((absTick & 0x4) != 0) ratio = mulShift(ratio, '0xfff2e50f5f657000');
    if ((absTick & 0x8) != 0) ratio = mulShift(ratio, '0xffe5caca7e10f000');
    if ((absTick & 0x10) != 0) ratio = mulShift(ratio, '0xffcb9843d60f7000');
    if ((absTick & 0x20) != 0) ratio = mulShift(ratio, '0xff973b41fa98e800');
    if ((absTick & 0x40) != 0) ratio = mulShift(ratio, '0xff2ea16466c9b000');
    if ((absTick & 0x80) != 0) ratio = mulShift(ratio, '0xfe5dee046a9a3800');
    if ((absTick & 0x100) != 0) ratio = mulShift(ratio, '0xfcbe86c7900bb000');
    if ((absTick & 0x200) != 0) ratio = mulShift(ratio, '0xf987a7253ac65800');
    if ((absTick & 0x400) != 0) ratio = mulShift(ratio, '0xf3392b0822bb6000');
    if ((absTick & 0x800) != 0) ratio = mulShift(ratio, '0xe7159475a2caf000');
    if ((absTick & 0x1000) != 0) ratio = mulShift(ratio, '0xd097f3bdfd2f2000');
    if ((absTick & 0x2000) != 0) ratio = mulShift(ratio, '0xa9f746462d9f8000');
    if ((absTick & 0x4000) != 0) ratio = mulShift(ratio, '0x70d869a156f31c00');
    if ((absTick & 0x8000) != 0) ratio = mulShift(ratio, '0x31be135f97ed3200');
    if ((absTick & 0x10000) != 0) ratio = mulShift(ratio, '0x9aa508b5b85a500');
    if ((absTick & 0x20000) != 0) ratio = mulShift(ratio, '0x5d6af8dedc582c');
    if (tick > 0) ratio = JSBI.divide(MaxUint128, ratio); // back to Q32

    return JSBI.greaterThan(JSBI.remainder(ratio, Q32$1), ZERO) ? JSBI.add(JSBI.divide(ratio, Q32$1), ONE) : JSBI.divide(ratio, Q32$1);
  }
  /**
   * Returns the tick corresponding to a given sqrt ratio, s.t. #getSqrtRatioAtTick(tick) <= sqrtRatioX32
   * and #getSqrtRatioAtTick(tick + 1) > sqrtRatioX32
   * @param sqrtRatioX32 the sqrt ratio as a Q32.32 for which to compute the tick
   */
  ;

  TickMath.getTickAtSqrtRatio = function getTickAtSqrtRatio(sqrtRatioX32) {
    !(JSBI.greaterThanOrEqual(sqrtRatioX32, TickMath.MIN_SQRT_RATIO) && JSBI.lessThan(sqrtRatioX32, TickMath.MAX_SQRT_RATIO)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SQRT_RATIO') : invariant(false) : void 0;
    var msb$1 = msb(new BN(sqrtRatioX32.toString()));
    var r;

    if (JSBI.greaterThanOrEqual(JSBI.BigInt(msb$1), JSBI.BigInt(32))) {
      r = JSBI.signedRightShift(sqrtRatioX32, JSBI.BigInt(msb$1 - 31));
    } else {
      r = JSBI.leftShift(sqrtRatioX32, JSBI.BigInt(31 - msb$1));
    } // 128,64 changed to 32,16


    var log_2 = JSBI.leftShift(JSBI.subtract(JSBI.BigInt(msb$1), JSBI.BigInt(32)), JSBI.BigInt(16));

    for (var i = 0; i < 14; i++) {
      r = JSBI.signedRightShift(JSBI.multiply(r, r), JSBI.BigInt(31));
      var f = JSBI.signedRightShift(r, JSBI.BigInt(32));
      log_2 = JSBI.bitwiseOr(log_2, JSBI.leftShift(f, JSBI.BigInt(15 - i)));
      r = JSBI.signedRightShift(r, f);
    }

    var log_sqrt10001 = JSBI.multiply(log_2, JSBI.BigInt('908567298'));
    var tickLow = JSBI.toNumber(JSBI.signedRightShift(JSBI.subtract(log_sqrt10001, JSBI.BigInt('42949672')), JSBI.BigInt(32)));
    var tickHigh = JSBI.toNumber(JSBI.signedRightShift(JSBI.add(log_sqrt10001, JSBI.BigInt('3677218864')), JSBI.BigInt(32)));
    return tickLow === tickHigh ? tickLow : JSBI.lessThanOrEqual(TickMath.getSqrtRatioAtTick(tickHigh), sqrtRatioX32) ? tickHigh : tickLow;
  };

  return TickMath;
}();
/**
 * The minimum tick that can be used on any pool.
 */

TickMath.MIN_TICK = -221818;
/**
 * The maximum tick that can be used on any pool.
 */

TickMath.MAX_TICK = -TickMath.MIN_TICK;
/**
 * The sqrt ratio corresponding to the minimum tick that could be used on any pool.
 */

TickMath.MIN_SQRT_RATIO = /*#__PURE__*/JSBI.BigInt('65537');
/**
 * The sqrt ratio corresponding to the maximum tick that could be used on any pool.
 */

TickMath.MAX_SQRT_RATIO = /*#__PURE__*/JSBI.BigInt('281472331703918');

/**
 * This tick data provider does not know how to fetch any tick data. It throws whenever it is required. Useful if you
 * do not need to load tick data for your use case.
 */
var NoTickDataProvider = /*#__PURE__*/function () {
  function NoTickDataProvider() {}

  var _proto = NoTickDataProvider.prototype;

  _proto.getTickAddress = function getTickAddress(tick) {
    throw new Error('Method not implemented.');
  };

  _proto.getTick = function getTick(_tick) {
    throw new Error(NoTickDataProvider.ERROR_MESSAGE);
  };

  _proto.nextInitializedTickWithinOneWord = function nextInitializedTickWithinOneWord(_tick, _lte, _tickSpacing) {
    throw new Error(NoTickDataProvider.ERROR_MESSAGE);
  };

  return NoTickDataProvider;
}();
NoTickDataProvider.ERROR_MESSAGE = 'No tick data provider was given';

/**
 * By default, pools will not allow operations that require ticks.
 */

var NO_TICK_DATA_PROVIDER_DEFAULT = /*#__PURE__*/new NoTickDataProvider();
/**
 * Represents a V3 pool
 */

var Pool = /*#__PURE__*/function () {
  /**
   * Construct a pool
   * @param tokenA One of the tokens in the pool
   * @param tokenB The other token in the pool
   * @param fee The fee in hundredths of a bips of the input amount of every swap that is collected by the pool
   * @param sqrtRatioX32 The sqrt of the current ratio of amounts of token1 to token0
   * @param liquidity The current value of in range liquidity
   * @param tickCurrent The current tick of the pool
   * @param tickDataProvider The current state of the pool ticks or a data provider that can return tick data
   */
  function Pool(tokenA, tokenB, fee, sqrtRatioX32, liquidity, tickCurrent, tickDataProvider) {
    if (tickDataProvider === void 0) {
      tickDataProvider = NO_TICK_DATA_PROVIDER_DEFAULT;
    }

    !(Number.isInteger(fee) && fee < 1000000) ? process.env.NODE_ENV !== "production" ? invariant(false, 'FEE') : invariant(false) : void 0;
    var tickCurrentSqrtRatioX32 = TickMath.getSqrtRatioAtTick(tickCurrent);
    var nextTickSqrtRatioX32 = TickMath.getSqrtRatioAtTick(tickCurrent + 1);
    !(JSBI.greaterThanOrEqual(sqrtRatioX32, tickCurrentSqrtRatioX32) && JSBI.lessThanOrEqual(sqrtRatioX32, nextTickSqrtRatioX32)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PRICE_BOUNDS') : invariant(false) : void 0;

    var _ref = tokenA.sortsBefore(tokenB) ? [tokenA, tokenB] : [tokenB, tokenA];

    this.token0 = _ref[0];
    this.token1 = _ref[1];
    this.fee = fee;
    this.sqrtRatioX32 = sqrtRatioX32;
    this.liquidity = liquidity;
    this.tickCurrent = tickCurrent;
    this.tickDataProvider = tickDataProvider;
  }

  Pool.getAddress = function getAddress(tokenA, tokenB, fee) {
    return computePoolAddress({
      factoryAddress: FACTORY_ADDRESS,
      fee: fee,
      tokenA: tokenA,
      tokenB: tokenB
    });
  }
  /**
   * Returns true if the token is either token0 or token1
   * @param token The token to check
   * @returns True if token is either token0 or token
   */
  ;

  var _proto = Pool.prototype;

  _proto.involvesToken = function involvesToken(token) {
    return token.equals(this.token0) || token.equals(this.token1);
  }
  /**
   * Returns the current mid price of the pool in terms of token0, i.e. the ratio of token1 over token0
   */
  ;

  /**
   * Return the price of the given token in terms of the other token in the pool.
   * @param token The token to return price of
   * @returns The price of the given token, in terms of the other.
   */
  _proto.priceOf = function priceOf(token) {
    !this.involvesToken(token) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    return token.equals(this.token0) ? this.token0Price : this.token1Price;
  }
  /**
   * Returns the chain ID of the tokens in the pool.
   */
  ;

  /**
   * Given an input amount of a token, return the computed output amount, and a pool with state updated after the trade
   * @param inputAmount The input amount for which to quote the output amount
   * @param sqrtPriceLimitX32 The Q32.32 sqrt price limit
   * @returns The output amount and the pool with updated state
   */
  _proto.getOutputAmount = function getOutputAmount(inputAmount, sqrtPriceLimitX32) {
    !this.involvesToken(inputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    var zeroForOne = inputAmount.currency.equals(this.token0);

    var _this$swap = this.swap(zeroForOne, inputAmount.quotient, sqrtPriceLimitX32),
        outputAmount = _this$swap.amountCalculated,
        sqrtRatioX32 = _this$swap.sqrtRatioX32,
        liquidity = _this$swap.liquidity,
        tickCurrent = _this$swap.tickCurrent,
        accounts = _this$swap.accounts;

    var outputToken = zeroForOne ? this.token1 : this.token0;
    return [CurrencyAmount.fromRawAmount(outputToken, JSBI.multiply(outputAmount, NEGATIVE_ONE)), new Pool(this.token0, this.token1, this.fee, sqrtRatioX32, liquidity, tickCurrent, this.tickDataProvider), accounts];
  }
  /**
   * Given a desired output amount of a token, return the computed input amount and a pool with state updated after the trade
   * @param outputAmount the output amount for which to quote the input amount
   * @param sqrtPriceLimitX32 The Q32.32 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns The input amount and the pool with updated state
   */
  ;

  _proto.getInputAmount = function getInputAmount(outputAmount, sqrtPriceLimitX32) {
    !(outputAmount.currency.isToken && this.involvesToken(outputAmount.currency)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TOKEN') : invariant(false) : void 0;
    var zeroForOne = outputAmount.currency.equals(this.token1);

    var _this$swap2 = this.swap(zeroForOne, JSBI.multiply(outputAmount.quotient, NEGATIVE_ONE), sqrtPriceLimitX32),
        inputAmount = _this$swap2.amountCalculated,
        sqrtRatioX32 = _this$swap2.sqrtRatioX32,
        liquidity = _this$swap2.liquidity,
        tickCurrent = _this$swap2.tickCurrent;

    var inputToken = zeroForOne ? this.token0 : this.token1;
    return [CurrencyAmount.fromRawAmount(inputToken, inputAmount), new Pool(this.token0, this.token1, this.fee, sqrtRatioX32, liquidity, tickCurrent, this.tickDataProvider)];
  }
  /**
   * Simulate a swap
   * @param zeroForOne Whether the amount in is token0 or token1
   * @param amountSpecified The amount of the swap, which implicitly configures the swap as exact input (positive), or exact output (negative)
   * @param sqrtPriceLimitX32 The Q32.32 sqrt price limit. If zero for one, the price cannot be less than this value after the swap. If one for zero, the price cannot be greater than this value after the swap
   * @returns amountCalculated
   * @returns sqrtRatioX32
   * @returns liquidity
   * @returns tickCurrent
   * @returns accounts Tick accounts flipped and bitmaps traversed
   */
  ;

  _proto.swap = function swap(zeroForOne, amountSpecified, sqrtPriceLimitX32) {
    !JSBI.notEqual(amountSpecified, ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'AMOUNT_LESS_THAN_0') : invariant(false) : void 0;
    if (!sqrtPriceLimitX32) sqrtPriceLimitX32 = zeroForOne ? JSBI.add(TickMath.MIN_SQRT_RATIO, ONE) : JSBI.subtract(TickMath.MAX_SQRT_RATIO, ONE);

    if (zeroForOne) {
      !JSBI.greaterThan(sqrtPriceLimitX32, TickMath.MIN_SQRT_RATIO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RATIO_MIN') : invariant(false) : void 0;
      !JSBI.lessThan(sqrtPriceLimitX32, this.sqrtRatioX32) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RATIO_CURRENT') : invariant(false) : void 0;
    } else {
      !JSBI.lessThan(sqrtPriceLimitX32, TickMath.MAX_SQRT_RATIO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RATIO_MAX') : invariant(false) : void 0;
      !JSBI.greaterThan(sqrtPriceLimitX32, this.sqrtRatioX32) ? process.env.NODE_ENV !== "production" ? invariant(false, 'RATIO_CURRENT') : invariant(false) : void 0;
    }

    var exactInput = JSBI.greaterThanOrEqual(amountSpecified, ZERO);
    var state = {
      amountSpecifiedRemaining: amountSpecified,
      amountCalculated: ZERO,
      sqrtPriceX32: this.sqrtRatioX32,
      tick: this.tickCurrent,
      accounts: [],
      liquidity: this.liquidity
    };
    var lastSavedWordPos;
    var loopCount = 0; // loop across ticks until input liquidity is consumed, or the limit price is reached

    while (JSBI.notEqual(state.amountSpecifiedRemaining, ZERO) && state.sqrtPriceX32 != sqrtPriceLimitX32 && state.tick < TickMath.MAX_TICK && state.tick > TickMath.MIN_TICK) {
      if (loopCount > 8) {
        throw Error('account limit');
      }

      var step = {};
      step.sqrtPriceStartX32 = state.sqrtPriceX32; // save the bitmap, and the tick account if it is initialized

      var nextInitTick = this.tickDataProvider.nextInitializedTickWithinOneWord(state.tick, zeroForOne, this.tickSpacing);
      step.tickNext = nextInitTick[0];
      step.initialized = nextInitTick[1];
      var wordPos = nextInitTick[2];
      var bitmapAddress = nextInitTick[4];

      if (lastSavedWordPos !== wordPos) {
        state.accounts.push({
          pubkey: bitmapAddress,
          isWritable: false,
          isSigner: false
        });
        lastSavedWordPos = wordPos;
      }

      if (step.tickNext < TickMath.MIN_TICK) {
        step.tickNext = TickMath.MIN_TICK;
      } else if (step.tickNext > TickMath.MAX_TICK) {
        step.tickNext = TickMath.MAX_TICK;
      }

      step.sqrtPriceNextX32 = TickMath.getSqrtRatioAtTick(step.tickNext);

      var _SwapMath$computeSwap = SwapMath.computeSwapStep(state.sqrtPriceX32, (zeroForOne ? JSBI.lessThan(step.sqrtPriceNextX32, sqrtPriceLimitX32) : JSBI.greaterThan(step.sqrtPriceNextX32, sqrtPriceLimitX32)) ? sqrtPriceLimitX32 : step.sqrtPriceNextX32, state.liquidity, state.amountSpecifiedRemaining, this.fee);

      state.sqrtPriceX32 = _SwapMath$computeSwap[0];
      step.amountIn = _SwapMath$computeSwap[1];
      step.amountOut = _SwapMath$computeSwap[2];
      step.feeAmount = _SwapMath$computeSwap[3];

      if (exactInput) {
        // subtract the input amount. The loop exits if remaining amount becomes 0
        state.amountSpecifiedRemaining = JSBI.subtract(state.amountSpecifiedRemaining, JSBI.add(step.amountIn, step.feeAmount));
        state.amountCalculated = JSBI.subtract(state.amountCalculated, step.amountOut);
      } else {
        state.amountSpecifiedRemaining = JSBI.add(state.amountSpecifiedRemaining, step.amountOut);
        state.amountCalculated = JSBI.add(state.amountCalculated, JSBI.add(step.amountIn, step.feeAmount));
      } // TODO


      if (JSBI.equal(state.sqrtPriceX32, step.sqrtPriceNextX32)) {
        // if the tick is initialized, run the tick transition
        if (step.initialized) {
          var tickNext = this.tickDataProvider.getTick(step.tickNext); // push the crossed tick to accounts array

          state.accounts.push({
            pubkey: tickNext.address,
            isWritable: true,
            isSigner: false
          }); // get the liquidity at this tick

          var liquidityNet = tickNext.liquidityNet; // if we're moving leftward, we interpret liquidityNet as the opposite sign
          // safe because liquidityNet cannot be type(int128).min

          if (zeroForOne) liquidityNet = JSBI.multiply(liquidityNet, NEGATIVE_ONE);
          state.liquidity = LiquidityMath.addDelta(state.liquidity, liquidityNet);
        }

        state.tick = zeroForOne ? step.tickNext - 1 : step.tickNext;
      } else if (state.sqrtPriceX32 != step.sqrtPriceStartX32) {
        // recompute unless we're on a lower tick boundary (i.e. already transitioned ticks), and haven't moved
        state.tick = TickMath.getTickAtSqrtRatio(state.sqrtPriceX32);
      }

      ++loopCount;
    }

    return {
      amountCalculated: state.amountCalculated,
      sqrtRatioX32: state.sqrtPriceX32,
      liquidity: state.liquidity,
      tickCurrent: state.tick,
      accounts: state.accounts
    };
  };

  _createClass(Pool, [{
    key: "token0Price",
    get: function get() {
      var _this$_token0Price;

      return (_this$_token0Price = this._token0Price) != null ? _this$_token0Price : this._token0Price = new Price(this.token0, this.token1, Q64, JSBI.multiply(this.sqrtRatioX32, this.sqrtRatioX32));
    }
    /**
     * Returns the current mid price of the pool in terms of token1, i.e. the ratio of token0 over token1
     */

  }, {
    key: "token1Price",
    get: function get() {
      var _this$_token1Price;

      return (_this$_token1Price = this._token1Price) != null ? _this$_token1Price : this._token1Price = new Price(this.token1, this.token0, JSBI.multiply(this.sqrtRatioX32, this.sqrtRatioX32), Q64);
    }
  }, {
    key: "chainId",
    get: function get() {
      return this.token0.chainId;
    }
  }, {
    key: "tickSpacing",
    get: function get() {
      return TICK_SPACINGS[this.fee];
    }
  }]);

  return Pool;
}();

/**
 * Returns an imprecise maximum amount of liquidity received for a given amount of token 0.
 * This function is available to accommodate LiquidityAmounts#getLiquidityForAmount0 in the v3 periphery,
 * which could be more precise by at least 32 bits by dividing by Q64 instead of Q96 in the intermediate step,
 * and shifting the subtracted ratio left by 32 bits. This imprecise calculation will likely be replaced in a future
 * v3 router contract.
 * @param sqrtRatioAX32 The price at the lower boundary
 * @param sqrtRatioBX32 The price at the upper boundary
 * @param amount0 The token0 amount
 * @returns liquidity for amount0, imprecise
 */

function maxLiquidityForAmount0Imprecise(sqrtRatioAX32, sqrtRatioBX32, amount0) {
  if (JSBI.greaterThan(sqrtRatioAX32, sqrtRatioBX32)) {
    var _ref = [sqrtRatioBX32, sqrtRatioAX32];
    sqrtRatioAX32 = _ref[0];
    sqrtRatioBX32 = _ref[1];
  }

  var intermediate = FullMath.mulDivFloor(sqrtRatioAX32, sqrtRatioBX32, MaxUint32);
  return FullMath.mulDivFloor(JSBI.BigInt(amount0), intermediate, JSBI.subtract(sqrtRatioBX32, sqrtRatioAX32));
}
/**
 * Computes the maximum amount of liquidity received for a given amount of token1
 * @param sqrtRatioAX32 The price at the lower tick boundary
 * @param sqrtRatioBX32 The price at the upper tick boundary
 * @param amount1 The token1 amount
 * @returns liquidity for amount1
 */


function maxLiquidityForAmount1(sqrtRatioAX32, sqrtRatioBX32, amount1) {
  if (JSBI.greaterThan(sqrtRatioAX32, sqrtRatioBX32)) {
    var _ref3 = [sqrtRatioBX32, sqrtRatioAX32];
    sqrtRatioAX32 = _ref3[0];
    sqrtRatioBX32 = _ref3[1];
  }

  return FullMath.mulDivFloor(JSBI.BigInt(amount1), MaxUint32, JSBI.subtract(sqrtRatioBX32, sqrtRatioAX32));
}
/**
 * Computes the maximum amount of liquidity received for a given amount of token0, token1,
 * and the prices at the tick boundaries.
 * @param sqrtRatioCurrentX32 the current price
 * @param sqrtRatioAX32 price at lower boundary
 * @param sqrtRatioBX32 price at upper boundary
 * @param amount0 token0 amount
 * @param amount1 token1 amount
 * @param useFullPrecision if false, liquidity will be maximized according to what the router can calculate,
 * not what core can theoretically support
 */


function maxLiquidityForAmounts(sqrtRatioCurrentX32, sqrtRatioAX32, sqrtRatioBX32, amount0, amount1, useFullPrecision) {
  if (JSBI.greaterThan(sqrtRatioAX32, sqrtRatioBX32)) {
    var _ref4 = [sqrtRatioBX32, sqrtRatioAX32];
    sqrtRatioAX32 = _ref4[0];
    sqrtRatioBX32 = _ref4[1];
  } // trying this out?
  var maxLiquidityForAmount0 = maxLiquidityForAmount0Imprecise;

  if (JSBI.lessThanOrEqual(sqrtRatioCurrentX32, sqrtRatioAX32)) {
    return maxLiquidityForAmount0(sqrtRatioAX32, sqrtRatioBX32, amount0);
  } else if (JSBI.lessThan(sqrtRatioCurrentX32, sqrtRatioBX32)) {
    var liquidity0 = maxLiquidityForAmount0(sqrtRatioCurrentX32, sqrtRatioBX32, amount0);
    var liquidity1 = maxLiquidityForAmount1(sqrtRatioAX32, sqrtRatioCurrentX32, amount1);
    return JSBI.lessThan(liquidity0, liquidity1) ? liquidity0 : liquidity1;
  } else {
    return maxLiquidityForAmount1(sqrtRatioAX32, sqrtRatioBX32, amount1);
  }
}

/**
 * Returns the sqrt ratio as a Q32.32 corresponding to a given ratio of amount1 and amount0
 * @param amount1 The numerator amount i.e., the amount of token1
 * @param amount0 The denominator amount i.e., the amount of token0
 * @returns The sqrt ratio
 */

function encodeSqrtRatioX32(amount1, amount0) {
  var numerator = JSBI.leftShift(JSBI.BigInt(amount1), JSBI.BigInt(64));
  var denominator = JSBI.BigInt(amount0);
  var ratioX64 = JSBI.divide(numerator, denominator);
  return sqrt(ratioX64);
}

/**
 * Returns a price object corresponding to the input tick and the base/quote token
 * Inputs must be tokens because the address order is used to interpret the price represented by the tick
 * @param baseToken the base token of the price
 * @param quoteToken the quote token of the price
 * @param tick the tick for which to return the price
 */

function tickToPrice(baseToken, quoteToken, tick) {
  var sqrtRatioX32 = TickMath.getSqrtRatioAtTick(tick);
  var ratioX64 = JSBI.multiply(sqrtRatioX32, sqrtRatioX32);
  return baseToken.sortsBefore(quoteToken) ? new Price(baseToken, quoteToken, Q64, ratioX64) : new Price(baseToken, quoteToken, ratioX64, Q64);
}
/**
 * Returns the first tick for which the given price is greater than or equal to the tick price
 * @param price for which to return the closest tick that represents a price less than or equal to the input price,
 * i.e. the price of the returned tick is less than or equal to the input price
 */

function priceToClosestTick(price) {
  var sorted = price.baseCurrency.sortsBefore(price.quoteCurrency);
  var sqrtRatioX96 = sorted ? encodeSqrtRatioX32(price.numerator, price.denominator) : encodeSqrtRatioX32(price.denominator, price.numerator);
  var tick = TickMath.getTickAtSqrtRatio(sqrtRatioX96);
  var nextTickPrice = tickToPrice(price.baseCurrency, price.quoteCurrency, tick + 1);

  if (sorted) {
    if (!price.lessThan(nextTickPrice)) {
      tick++;
    }
  } else {
    if (!price.greaterThan(nextTickPrice)) {
      tick++;
    }
  }

  return tick;
}

/**
 * Represents a position on a Uniswap V3 Pool
 */

var Position = /*#__PURE__*/function () {
  /**
   * Constructs a position for a given pool with the given liquidity
   * @param pool For which pool the liquidity is assigned
   * @param liquidity The amount of liquidity that is in the position
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   */
  function Position(_ref) {
    var pool = _ref.pool,
        liquidity = _ref.liquidity,
        tickLower = _ref.tickLower,
        tickUpper = _ref.tickUpper;
    // cached resuts for the getters
    this._token0Amount = null;
    this._token1Amount = null;
    this._mintAmounts = null;
    !(tickLower < tickUpper) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_ORDER') : invariant(false) : void 0;
    !(tickLower >= TickMath.MIN_TICK && tickLower % pool.tickSpacing === 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_LOWER') : invariant(false) : void 0;
    !(tickUpper <= TickMath.MAX_TICK && tickUpper % pool.tickSpacing === 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_UPPER') : invariant(false) : void 0;
    this.pool = pool;
    this.tickLower = tickLower;
    this.tickUpper = tickUpper;
    this.liquidity = JSBI.BigInt(liquidity);
  }
  /**
   * Returns the price of token0 at the lower tick
   */


  var _proto = Position.prototype;

  /**
   * Returns the lower and upper sqrt ratios if the price 'slips' up to slippage tolerance percentage
   * @param slippageTolerance The amount by which the price can 'slip' before the transaction will revert
   * @returns The sqrt ratios after slippage
   */
  _proto.ratiosAfterSlippage = function ratiosAfterSlippage(slippageTolerance) {
    var priceLower = this.pool.token0Price.asFraction.multiply(new Percent(1).subtract(slippageTolerance));
    var priceUpper = this.pool.token0Price.asFraction.multiply(slippageTolerance.add(1));
    var sqrtRatioX32Lower = encodeSqrtRatioX32(priceLower.numerator, priceLower.denominator);

    if (JSBI.lessThanOrEqual(sqrtRatioX32Lower, TickMath.MIN_SQRT_RATIO)) {
      sqrtRatioX32Lower = JSBI.add(TickMath.MIN_SQRT_RATIO, JSBI.BigInt(1));
    }

    var sqrtRatioX32Upper = encodeSqrtRatioX32(priceUpper.numerator, priceUpper.denominator);

    if (JSBI.greaterThanOrEqual(sqrtRatioX32Upper, TickMath.MAX_SQRT_RATIO)) {
      sqrtRatioX32Upper = JSBI.subtract(TickMath.MAX_SQRT_RATIO, JSBI.BigInt(1));
    }

    return {
      sqrtRatioX32Lower: sqrtRatioX32Lower,
      sqrtRatioX32Upper: sqrtRatioX32Upper
    };
  }
  /**
   * Returns the minimum amounts that must be sent in order to safely mint the amount of liquidity held by the position
   * with the given slippage tolerance
   * @param slippageTolerance Tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */
  ;

  _proto.mintAmountsWithSlippage = function mintAmountsWithSlippage(slippageTolerance) {
    // get lower/upper prices
    var _this$ratiosAfterSlip = this.ratiosAfterSlippage(slippageTolerance),
        sqrtRatioX32Upper = _this$ratiosAfterSlip.sqrtRatioX32Upper,
        sqrtRatioX32Lower = _this$ratiosAfterSlip.sqrtRatioX32Lower; // construct counterfactual pools


    var poolLower = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX32Lower, JSBI.BigInt(0)
    /* liquidity doesn't matter */
    , TickMath.getTickAtSqrtRatio(sqrtRatioX32Lower));
    var poolUpper = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX32Upper, JSBI.BigInt(0)
    /* liquidity doesn't matter */
    , TickMath.getTickAtSqrtRatio(sqrtRatioX32Upper)); // because the router is imprecise, we need to calculate the position that will be created (assuming no slippage)

    var positionThatWillBeCreated = Position.fromAmounts(_extends({
      pool: this.pool,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }, this.mintAmounts, {
      useFullPrecision: false
    })); // we want the smaller amounts...
    // ...which occurs at the upper price for amount0...

    var amount0 = new Position({
      pool: poolUpper,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts.amount0; // ...and the lower for amount1

    var amount1 = new Position({
      pool: poolLower,
      liquidity: positionThatWillBeCreated.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).mintAmounts.amount1;
    return {
      amount0: amount0,
      amount1: amount1
    };
  }
  /**
   * Returns the minimum amounts that should be requested in order to safely burn the amount of liquidity held by the
   * position with the given slippage tolerance
   * @param slippageTolerance tolerance of unfavorable slippage from the current price
   * @returns The amounts, with slippage
   */
  ;

  _proto.burnAmountsWithSlippage = function burnAmountsWithSlippage(slippageTolerance) {
    // get lower/upper prices
    var _this$ratiosAfterSlip2 = this.ratiosAfterSlippage(slippageTolerance),
        sqrtRatioX32Upper = _this$ratiosAfterSlip2.sqrtRatioX32Upper,
        sqrtRatioX32Lower = _this$ratiosAfterSlip2.sqrtRatioX32Lower; // construct counterfactual pools


    var poolLower = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX32Lower, JSBI.BigInt(0)
    /* liquidity doesn't matter */
    , TickMath.getTickAtSqrtRatio(sqrtRatioX32Lower));
    var poolUpper = new Pool(this.pool.token0, this.pool.token1, this.pool.fee, sqrtRatioX32Upper, JSBI.BigInt(0)
    /* liquidity doesn't matter */
    , TickMath.getTickAtSqrtRatio(sqrtRatioX32Upper)); // we want the smaller amounts...
    // ...which occurs at the upper price for amount0...

    var amount0 = new Position({
      pool: poolUpper,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount0; // ...and the lower for amount1

    var amount1 = new Position({
      pool: poolLower,
      liquidity: this.liquidity,
      tickLower: this.tickLower,
      tickUpper: this.tickUpper
    }).amount1;
    return {
      amount0: amount0.quotient,
      amount1: amount1.quotient
    };
  }
  /**
   * Returns the minimum amounts that must be sent in order to mint the amount of liquidity held by the position at
   * the current price for the pool
   */
  ;

  /**
   * Computes the maximum amount of liquidity received for a given amount of token0, token1,
   * and the prices at the tick boundaries.
   * @param pool The pool for which the position should be created
   * @param tickLower The lower tick of the position
   * @param tickUpper The upper tick of the position
   * @param amount0 token0 amount
   * @param amount1 token1 amount
   * @param useFullPrecision If false, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The amount of liquidity for the position
   */
  Position.fromAmounts = function fromAmounts(_ref2) {
    var pool = _ref2.pool,
        tickLower = _ref2.tickLower,
        tickUpper = _ref2.tickUpper,
        amount0 = _ref2.amount0,
        amount1 = _ref2.amount1;
    var sqrtRatioAX32 = TickMath.getSqrtRatioAtTick(tickLower);
    var sqrtRatioBX32 = TickMath.getSqrtRatioAtTick(tickUpper);
    return new Position({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      liquidity: maxLiquidityForAmounts(pool.sqrtRatioX32, sqrtRatioAX32, sqrtRatioBX32, amount0, amount1)
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token0, assuming an unlimited amount of token1
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount0 The desired amount of token0
   * @param useFullPrecision If true, liquidity will be maximized according to what the router can calculate,
   * not what core can theoretically support
   * @returns The position
   */
  ;

  Position.fromAmount0 = function fromAmount0(_ref3) {
    var pool = _ref3.pool,
        tickLower = _ref3.tickLower,
        tickUpper = _ref3.tickUpper,
        amount0 = _ref3.amount0,
        useFullPrecision = _ref3.useFullPrecision;
    return Position.fromAmounts({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0: amount0,
      amount1: MaxUint64,
      useFullPrecision: useFullPrecision
    });
  }
  /**
   * Computes a position with the maximum amount of liquidity received for a given amount of token1, assuming an unlimited amount of token0
   * @param pool The pool for which the position is created
   * @param tickLower The lower tick
   * @param tickUpper The upper tick
   * @param amount1 The desired amount of token1
   * @returns The position
   */
  ;

  Position.fromAmount1 = function fromAmount1(_ref4) {
    var pool = _ref4.pool,
        tickLower = _ref4.tickLower,
        tickUpper = _ref4.tickUpper,
        amount1 = _ref4.amount1;
    // this function always uses full precision,
    return Position.fromAmounts({
      pool: pool,
      tickLower: tickLower,
      tickUpper: tickUpper,
      amount0: MaxUint64,
      amount1: amount1,
      useFullPrecision: true
    });
  };

  _createClass(Position, [{
    key: "token0PriceLower",
    get: function get() {
      return tickToPrice(this.pool.token0, this.pool.token1, this.tickLower);
    }
    /**
     * Returns the price of token0 at the upper tick
     */

  }, {
    key: "token0PriceUpper",
    get: function get() {
      return tickToPrice(this.pool.token0, this.pool.token1, this.tickUpper);
    }
    /**
     * Returns the amount of token0 that this position's liquidity could be burned for at the current pool price
     */

  }, {
    key: "amount0",
    get: function get() {
      if (this._token0Amount === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, SqrtPriceMath.getAmount0Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        } else if (this.pool.tickCurrent < this.tickUpper) {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, SqrtPriceMath.getAmount0Delta(this.pool.sqrtRatioX32, TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        } else {
          this._token0Amount = CurrencyAmount.fromRawAmount(this.pool.token0, ZERO);
        }
      }

      return this._token0Amount;
    }
    /**
     * Returns the amount of token1 that this position's liquidity could be burned for at the current pool price
     */

  }, {
    key: "amount1",
    get: function get() {
      if (this._token1Amount === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, ZERO);
        } else if (this.pool.tickCurrent < this.tickUpper) {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), this.pool.sqrtRatioX32, this.liquidity, false));
        } else {
          this._token1Amount = CurrencyAmount.fromRawAmount(this.pool.token1, SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, false));
        }
      }

      return this._token1Amount;
    }
  }, {
    key: "mintAmounts",
    get: function get() {
      if (this._mintAmounts === null) {
        if (this.pool.tickCurrent < this.tickLower) {
          return {
            amount0: SqrtPriceMath.getAmount0Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true),
            amount1: ZERO
          };
        } else if (this.pool.tickCurrent < this.tickUpper) {
          return {
            amount0: SqrtPriceMath.getAmount0Delta(this.pool.sqrtRatioX32, TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true),
            amount1: SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), this.pool.sqrtRatioX32, this.liquidity, true)
          };
        } else {
          return {
            amount0: ZERO,
            amount1: SqrtPriceMath.getAmount1Delta(TickMath.getSqrtRatioAtTick(this.tickLower), TickMath.getSqrtRatioAtTick(this.tickUpper), this.liquidity, true)
          };
        }
      }

      return this._mintAmounts;
    }
  }]);

  return Position;
}();

/**
 * Represents a list of pools through which a swap can occur
 * @template TInput The input token
 * @template TOutput The output token
 */

var Route = /*#__PURE__*/function () {
  /**
   * Creates an instance of route.
   * @param pools An array of `Pool` objects, ordered by the route the swap will take
   * @param input The input token
   * @param output The output token
   */
  function Route(pools, input, output) {
    this._midPrice = null;
    !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
    var chainId = pools[0].chainId;
    var allOnSameChain = pools.every(function (pool) {
      return pool.chainId === chainId;
    });
    !allOnSameChain ? process.env.NODE_ENV !== "production" ? invariant(false, 'CHAIN_IDS') : invariant(false) : void 0;
    var wrappedInput = input.wrapped;
    !pools[0].involvesToken(wrappedInput) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
    !pools[pools.length - 1].involvesToken(output.wrapped) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
    /**
     * Normalizes token0-token1 order and selects the next token/fee step to add to the path
     * */

    var tokenPath = [wrappedInput];

    for (var _iterator = _createForOfIteratorHelperLoose(pools.entries()), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          i = _step$value[0],
          pool = _step$value[1];
      var currentInputToken = tokenPath[i];
      !(currentInputToken.equals(pool.token0) || currentInputToken.equals(pool.token1)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'PATH') : invariant(false) : void 0;
      var nextToken = currentInputToken.equals(pool.token0) ? pool.token1 : pool.token0;
      tokenPath.push(nextToken);
    }

    this.pools = pools;
    this.tokenPath = tokenPath;
    this.input = input;
    this.output = output != null ? output : tokenPath[tokenPath.length - 1];
  }

  _createClass(Route, [{
    key: "chainId",
    get: function get() {
      return this.pools[0].chainId;
    }
    /**
     * Returns the mid price of the route
     */

  }, {
    key: "midPrice",
    get: function get() {
      if (this._midPrice !== null) return this._midPrice;
      var price = this.pools.slice(1).reduce(function (_ref, pool) {
        var nextInput = _ref.nextInput,
            price = _ref.price;
        return nextInput.equals(pool.token0) ? {
          nextInput: pool.token1,
          price: price.multiply(pool.token0Price)
        } : {
          nextInput: pool.token0,
          price: price.multiply(pool.token1Price)
        };
      }, this.pools[0].token0.equals(this.input.wrapped) ? {
        nextInput: this.pools[0].token1,
        price: this.pools[0].token0Price
      } : {
        nextInput: this.pools[0].token0,
        price: this.pools[0].token1Price
      }).price;
      return this._midPrice = new Price(this.input, this.output, price.denominator, price.numerator);
    }
  }]);

  return Route;
}();

/**
 * Converts a big int to a hex string
 * @param bigintIsh
 * @returns The hex encoded calldata
 */

function toHex(bigintIsh) {
  var bigInt = JSBI.BigInt(bigintIsh);
  var hex = bigInt.toString(16);

  if (hex.length % 2 !== 0) {
    hex = "0" + hex;
  }

  return "0x" + hex;
}

/**
 * Determines if a tick list is sorted
 * @param list The tick list
 * @param comparator The comparator
 * @returns true if sorted
 */
function isSorted(list, comparator) {
  for (var i = 0; i < list.length - 1; i++) {
    if (comparator(list[i], list[i + 1]) > 0) {
      return false;
    }
  }

  return true;
}

/**
 * Returns the closest tick that is nearest a given tick and usable for the given tick spacing
 * @param tick the target tick
 * @param tickSpacing the spacing of the pool
 */

function nearestUsableTick(tick, tickSpacing) {
  !(Number.isInteger(tick) && Number.isInteger(tickSpacing)) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INTEGERS') : invariant(false) : void 0;
  !(tickSpacing > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_SPACING') : invariant(false) : void 0;
  !(tick >= TickMath.MIN_TICK && tick <= TickMath.MAX_TICK) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_BOUND') : invariant(false) : void 0;
  var rounded = Math.round(tick / tickSpacing) * tickSpacing;
  if (rounded < TickMath.MIN_TICK) return rounded + tickSpacing;else if (rounded > TickMath.MAX_TICK) return rounded - tickSpacing;else return rounded;
}

function tickComparator(a, b) {
  return a.index - b.index;
}
/**
 * Utility methods for interacting with sorted lists of ticks
 */


var TickList = /*#__PURE__*/function () {
  /**
   * Cannot be constructed
   */
  function TickList() {}

  TickList.validateList = function validateList(ticks, tickSpacing) {
    !(tickSpacing > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_SPACING_NONZERO') : invariant(false) : void 0; // ensure ticks are spaced appropriately

    !ticks.every(function (_ref) {
      var index = _ref.index;
      return index % tickSpacing === 0;
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK_SPACING') : invariant(false) : void 0; // ensure tick liquidity deltas sum to 0

    !JSBI.equal(ticks.reduce(function (accumulator, _ref2) {
      var liquidityNet = _ref2.liquidityNet;
      return JSBI.add(accumulator, liquidityNet);
    }, ZERO), ZERO) ? process.env.NODE_ENV !== "production" ? invariant(false, 'ZERO_NET') : invariant(false) : void 0;
    !isSorted(ticks, tickComparator) ? process.env.NODE_ENV !== "production" ? invariant(false, 'SORTED') : invariant(false) : void 0;
  };

  TickList.isBelowSmallest = function isBelowSmallest(ticks, tick) {
    !(ticks.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LENGTH') : invariant(false) : void 0;
    return tick < ticks[0].index;
  };

  TickList.isAtOrAboveLargest = function isAtOrAboveLargest(ticks, tick) {
    !(ticks.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'LENGTH') : invariant(false) : void 0;
    return tick >= ticks[ticks.length - 1].index;
  };

  TickList.getTick = function getTick(ticks, index) {
    var tick = ticks[this.binarySearch(ticks, index)];
    !(tick.index === index) ? process.env.NODE_ENV !== "production" ? invariant(false, 'NOT_CONTAINED') : invariant(false) : void 0;
    return tick;
  }
  /**
   * Finds the largest tick in the list of ticks that is less than or equal to tick
   * @param ticks list of ticks
   * @param tick tick to find the largest tick that is less than or equal to tick
   * @private
   */
  ;

  TickList.binarySearch = function binarySearch(ticks, tick) {
    !!this.isBelowSmallest(ticks, tick) ? process.env.NODE_ENV !== "production" ? invariant(false, 'BELOW_SMALLEST') : invariant(false) : void 0;
    var l = 0;
    var r = ticks.length - 1;
    var i;

    while (true) {
      i = Math.floor((l + r) / 2);

      if (ticks[i].index <= tick && (i === ticks.length - 1 || ticks[i + 1].index > tick)) {
        return i;
      }

      if (ticks[i].index < tick) {
        l = i + 1;
      } else {
        r = i - 1;
      }
    }
  };

  TickList.nextInitializedTick = function nextInitializedTick(ticks, tick, lte) {
    if (lte) {
      !!TickList.isBelowSmallest(ticks, tick) ? process.env.NODE_ENV !== "production" ? invariant(false, 'BELOW_SMALLEST') : invariant(false) : void 0;

      if (TickList.isAtOrAboveLargest(ticks, tick)) {
        return ticks[ticks.length - 1];
      }

      var index = this.binarySearch(ticks, tick);
      return ticks[index];
    } else {
      !!this.isAtOrAboveLargest(ticks, tick) ? process.env.NODE_ENV !== "production" ? invariant(false, 'AT_OR_ABOVE_LARGEST') : invariant(false) : void 0;

      if (this.isBelowSmallest(ticks, tick)) {
        return ticks[0];
      }

      var _index = this.binarySearch(ticks, tick);

      return ticks[_index + 1];
    }
  };

  TickList.nextInitializedTickWithinOneWord = function nextInitializedTickWithinOneWord(ticks, tick, lte, tickSpacing) {
    var compressed = Math.floor(tick / tickSpacing); // matches rounding in the code

    if (lte) {
      var wordPos = compressed >> 8;
      var minimum = (wordPos << 8) * tickSpacing;

      if (TickList.isBelowSmallest(ticks, tick)) {
        return [minimum, false];
      }

      var index = TickList.nextInitializedTick(ticks, tick, lte).index;
      var nextInitializedTick = Math.max(minimum, index);
      return [nextInitializedTick, nextInitializedTick === index];
    } else {
      var _wordPos = compressed + 1 >> 8;

      var maximum = (_wordPos + 1 << 8) * tickSpacing - 1;

      if (this.isAtOrAboveLargest(ticks, tick)) {
        return [maximum, false];
      }

      var _index2 = this.nextInitializedTick(ticks, tick, lte).index;

      var _nextInitializedTick = Math.min(maximum, _index2);

      return [_nextInitializedTick, _nextInitializedTick === _index2];
    }
  };

  return TickList;
}();

function transformObservation(_ref) {
  var observation = _ref.observation,
      blockTimestamp = _ref.blockTimestamp,
      tick = _ref.tick,
      liquidity = _ref.liquidity;
  var delta = new BN(blockTimestamp - observation.blockTimestamp);
  return _extends({}, observation, {
    tickCumulative: observation.tickCumulative.add(delta.muln(tick)),
    secondsPerLiquidityCumulativeX32: observation.secondsPerLiquidityCumulativeX32.add(delta.shln(32).div(liquidity.gtn(0) ? liquidity : new BN(1))),
    initialized: true
  });
}
function snapshotCumulativesInside(_ref2) {
  var poolState = _ref2.poolState,
      tickLower = _ref2.tickLower,
      tickUpper = _ref2.tickUpper,
      latestObservation = _ref2.latestObservation,
      time = _ref2.time;

  if (poolState.tick < tickLower.tick) {
    return {
      tickCumulativeInside: tickLower.tickCumulativeOutside.sub(tickUpper.tickCumulativeOutside),
      secondsPerLiquidityInsideX32: tickLower.secondsPerLiquidityOutsideX32.sub(tickUpper.secondsPerLiquidityOutsideX32),
      secondsInside: tickLower.secondsOutside - tickUpper.secondsOutside
    };
  } else if (poolState.tick < tickUpper.tick) {
    var _ref3 = latestObservation.blockTimestamp == time ? latestObservation : transformObservation({
      observation: latestObservation,
      blockTimestamp: time,
      tick: poolState.tick,
      liquidity: poolState.liquidity
    }),
        tickCumulative = _ref3.tickCumulative,
        secondsPerLiquidityCumulativeX32 = _ref3.secondsPerLiquidityCumulativeX32;

    return {
      tickCumulativeInside: tickCumulative.sub(tickLower.tickCumulativeOutside).sub(tickUpper.tickCumulativeOutside),
      secondsPerLiquidityInsideX32: secondsPerLiquidityCumulativeX32.sub(tickLower.secondsPerLiquidityOutsideX32).sub(tickUpper.secondsPerLiquidityOutsideX32),
      secondsInside: time - tickLower.secondsOutside - tickUpper.secondsOutside
    };
  } else {
    return {
      tickCumulativeInside: tickUpper.tickCumulativeOutside.sub(tickLower.tickCumulativeOutside),
      secondsPerLiquidityInsideX32: tickUpper.secondsPerLiquidityOutsideX32.sub(tickLower.secondsPerLiquidityOutsideX32),
      secondsInside: tickUpper.secondsOutside - tickLower.secondsOutside
    };
  }
}

var Tick = function Tick(_ref) {
  var index = _ref.index,
      liquidityGross = _ref.liquidityGross,
      liquidityNet = _ref.liquidityNet;
  !(index >= TickMath.MIN_TICK && index <= TickMath.MAX_TICK) ? process.env.NODE_ENV !== "production" ? invariant(false, 'TICK') : invariant(false) : void 0;
  this.index = index;
  this.liquidityGross = JSBI.BigInt(liquidityGross);
  this.liquidityNet = JSBI.BigInt(liquidityNet);
};
/**
 * Computes the bitmap position for a bit.
 * @param tickBySpacing Tick divided by spacing
 * @returns the word and bit position for the given tick
 */

function tickPosition(tickBySpacing) {
  return {
    wordPos: tickBySpacing >> 8,
    bitPos: tickBySpacing % 256 & 255 // mask with 255 to get the output

  };
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}
});

/**
 * Trades comparator, an extension of the input output comparator that also considers other dimensions of the trade in ranking them
 * @template TInput The input token, either Ether or an ERC-20
 * @template TOutput The output token, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 * @param a The first trade to compare
 * @param b The second trade to compare
 * @returns A sorted ordering for two neighboring elements in a trade array
 */

function tradeComparator(a, b) {
  // must have same input and output token for comparison
  !a.inputAmount.currency.equals(b.inputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY') : invariant(false) : void 0;
  !a.outputAmount.currency.equals(b.outputAmount.currency) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY') : invariant(false) : void 0;

  if (a.outputAmount.equalTo(b.outputAmount)) {
    if (a.inputAmount.equalTo(b.inputAmount)) {
      // consider the number of hops since each hop costs gas
      var aHops = a.swaps.reduce(function (total, cur) {
        return total + cur.route.tokenPath.length;
      }, 0);
      var bHops = b.swaps.reduce(function (total, cur) {
        return total + cur.route.tokenPath.length;
      }, 0);
      return aHops - bHops;
    } // trade A requires less input than trade B, so A should come first


    if (a.inputAmount.lessThan(b.inputAmount)) {
      return -1;
    } else {
      return 1;
    }
  } else {
    // tradeA has less output than trade B, so should come second
    if (a.outputAmount.lessThan(b.outputAmount)) {
      return 1;
    } else {
      return -1;
    }
  }
}
/**
 * Represents a trade executed against a set of routes where some percentage of the input is
 * split across each route.
 *
 * Each route has its own set of pools. Pools can not be re-used across routes.
 *
 * Does not account for slippage, i.e., changes in price environment that can occur between
 * the time the trade is submitted and when it is executed.
 * @template TInput The input token, either Ether or an ERC-20
 * @template TOutput The output token, either Ether or an ERC-20
 * @template TTradeType The trade type, either exact input or exact output
 */

var Trade = /*#__PURE__*/function () {
  /**
   * Construct a trade by passing in the pre-computed property values
   * @param routes The routes through which the trade occurs
   * @param tradeType The type of trade, exact input or exact output
   */
  function Trade(_ref) {
    var routes = _ref.routes,
        tradeType = _ref.tradeType;
    var inputCurrency = routes[0].inputAmount.currency;
    var outputCurrency = routes[0].outputAmount.currency;
    !routes.every(function (_ref2) {
      var route = _ref2.route;
      return inputCurrency.wrapped.equals(route.input.wrapped);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT_CURRENCY_MATCH') : invariant(false) : void 0;
    !routes.every(function (_ref3) {
      var route = _ref3.route;
      return outputCurrency.wrapped.equals(route.output.wrapped);
    }) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT_CURRENCY_MATCH') : invariant(false) : void 0; // Ignoring these checks for now, but will need to add them back later
    // const numPools = routes.map(({ route }) => route.pools.length).reduce((total, cur) => total + cur, 0)
    // const poolAddressSet = new Set<string>()
    // for (const { route } of routes) {
    //   for (const pool of route.pools) {
    //     Pool.getAddress(pool.token0, pool.token1, pool.fee).then(address => {
    //       poolAddressSet.add(address)
    //     })
    //   }
    // }
    // console.log(numPools, poolAddressSet.size)
    // invariant(numPools == poolAddressSet.size, 'POOLS_DUPLICATED')

    this.swaps = routes;
    this.tradeType = tradeType;
  }
  /**
   * @deprecated Deprecated in favor of 'swaps' property. If the trade consists of multiple routes
   * this will return an error.
   *
   * When the trade consists of just a single route, this returns the route of the trade,
   * i.e. which pools the trade goes through.
   */


  /**
   * Constructs an exact in trade with the given amount in and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact in trade
   * @param amountIn The amount being passed in
   * @returns The exact in trade
   */
  Trade.exactIn =
  /*#__PURE__*/
  function () {
    var _exactIn = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(route, amountIn) {
      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", Trade.fromRoute(route, amountIn, TradeType.EXACT_INPUT));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    function exactIn(_x, _x2) {
      return _exactIn.apply(this, arguments);
    }

    return exactIn;
  }()
  /**
   * Constructs an exact out trade with the given amount out and route
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @param route The route of the exact out trade
   * @param amountOut The amount returned by the trade
   * @returns The exact out trade
   */
  ;

  Trade.exactOut =
  /*#__PURE__*/
  function () {
    var _exactOut = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(route, amountOut) {
      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", Trade.fromRoute(route, amountOut, TradeType.EXACT_OUTPUT));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function exactOut(_x3, _x4) {
      return _exactOut.apply(this, arguments);
    }

    return exactOut;
  }()
  /**
   * Constructs a trade by simulating swaps through the given route
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param route route to swap through
   * @param amount the amount specified, either input or output, depending on tradeType
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The route
   */
  ;

  Trade.fromRoute =
  /*#__PURE__*/
  function () {
    var _fromRoute = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(route, amount, tradeType) {
      var amounts, inputAmount, outputAmount, i, pool, _yield$pool$getOutput, _outputAmount, _i, _pool, _yield$_pool$getInput, _inputAmount;

      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              amounts = new Array(route.tokenPath.length);

              if (!(tradeType === TradeType.EXACT_INPUT)) {
                _context3.next = 19;
                break;
              }

              !amount.currency.equals(route.input) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
              amounts[0] = amount.wrapped;
              i = 0;

            case 5:
              if (!(i < route.tokenPath.length - 1)) {
                _context3.next = 15;
                break;
              }

              pool = route.pools[i];
              _context3.next = 9;
              return pool.getOutputAmount(amounts[i]);

            case 9:
              _yield$pool$getOutput = _context3.sent;
              _outputAmount = _yield$pool$getOutput[0];
              amounts[i + 1] = _outputAmount;

            case 12:
              i++;
              _context3.next = 5;
              break;

            case 15:
              inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
              outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amounts[amounts.length - 1].numerator, amounts[amounts.length - 1].denominator);
              _context3.next = 34;
              break;

            case 19:
              !amount.currency.equals(route.output) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
              amounts[amounts.length - 1] = amount.wrapped;
              _i = route.tokenPath.length - 1;

            case 22:
              if (!(_i > 0)) {
                _context3.next = 32;
                break;
              }

              _pool = route.pools[_i - 1];
              _context3.next = 26;
              return _pool.getInputAmount(amounts[_i]);

            case 26:
              _yield$_pool$getInput = _context3.sent;
              _inputAmount = _yield$_pool$getInput[0];
              amounts[_i - 1] = _inputAmount;

            case 29:
              _i--;
              _context3.next = 22;
              break;

            case 32:
              inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator);
              outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);

            case 34:
              return _context3.abrupt("return", new Trade({
                routes: [{
                  inputAmount: inputAmount,
                  outputAmount: outputAmount,
                  route: route
                }],
                tradeType: tradeType
              }));

            case 35:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    function fromRoute(_x5, _x6, _x7) {
      return _fromRoute.apply(this, arguments);
    }

    return fromRoute;
  }()
  /**
   * Constructs a trade from routes by simulating swaps
   *
   * @template TInput The input token, either Ether or an ERC-20.
   * @template TOutput The output token, either Ether or an ERC-20.
   * @template TTradeType The type of the trade, either exact in or exact out.
   * @param routes the routes to swap through and how much of the amount should be routed through each
   * @param tradeType whether the trade is an exact input or exact output swap
   * @returns The trade
   */
  ;

  Trade.fromRoutes =
  /*#__PURE__*/
  function () {
    var _fromRoutes = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(routes, tradeType) {
      var populatedRoutes, _iterator, _step, _step$value, route, amount, amounts, inputAmount, outputAmount, i, pool, _yield$pool$getOutput2, _outputAmount2, _i2, _pool2, _yield$_pool2$getInpu, _inputAmount2;

      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              populatedRoutes = [];
              _iterator = _createForOfIteratorHelperLoose(routes);

            case 2:
              if ((_step = _iterator()).done) {
                _context4.next = 43;
                break;
              }

              _step$value = _step.value, route = _step$value.route, amount = _step$value.amount;
              amounts = new Array(route.tokenPath.length);
              inputAmount = void 0;
              outputAmount = void 0;

              if (!(tradeType === TradeType.EXACT_INPUT)) {
                _context4.next = 25;
                break;
              }

              !amount.currency.equals(route.input) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INPUT') : invariant(false) : void 0;
              inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amount.numerator, amount.denominator);
              amounts[0] = CurrencyAmount.fromFractionalAmount(route.input.wrapped, amount.numerator, amount.denominator);
              i = 0;

            case 12:
              if (!(i < route.tokenPath.length - 1)) {
                _context4.next = 22;
                break;
              }

              pool = route.pools[i];
              _context4.next = 16;
              return pool.getOutputAmount(amounts[i]);

            case 16:
              _yield$pool$getOutput2 = _context4.sent;
              _outputAmount2 = _yield$pool$getOutput2[0];
              amounts[i + 1] = _outputAmount2;

            case 19:
              i++;
              _context4.next = 12;
              break;

            case 22:
              outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amounts[amounts.length - 1].numerator, amounts[amounts.length - 1].denominator);
              _context4.next = 40;
              break;

            case 25:
              !amount.currency.equals(route.output) ? process.env.NODE_ENV !== "production" ? invariant(false, 'OUTPUT') : invariant(false) : void 0;
              outputAmount = CurrencyAmount.fromFractionalAmount(route.output, amount.numerator, amount.denominator);
              amounts[amounts.length - 1] = CurrencyAmount.fromFractionalAmount(route.output.wrapped, amount.numerator, amount.denominator);
              _i2 = route.tokenPath.length - 1;

            case 29:
              if (!(_i2 > 0)) {
                _context4.next = 39;
                break;
              }

              _pool2 = route.pools[_i2 - 1];
              _context4.next = 33;
              return _pool2.getInputAmount(amounts[_i2]);

            case 33:
              _yield$_pool2$getInpu = _context4.sent;
              _inputAmount2 = _yield$_pool2$getInpu[0];
              amounts[_i2 - 1] = _inputAmount2;

            case 36:
              _i2--;
              _context4.next = 29;
              break;

            case 39:
              inputAmount = CurrencyAmount.fromFractionalAmount(route.input, amounts[0].numerator, amounts[0].denominator);

            case 40:
              populatedRoutes.push({
                route: route,
                inputAmount: inputAmount,
                outputAmount: outputAmount
              });

            case 41:
              _context4.next = 2;
              break;

            case 43:
              return _context4.abrupt("return", new Trade({
                routes: populatedRoutes,
                tradeType: tradeType
              }));

            case 44:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4);
    }));

    function fromRoutes(_x8, _x9) {
      return _fromRoutes.apply(this, arguments);
    }

    return fromRoutes;
  }()
  /**
   * Creates a trade without computing the result of swapping through the route. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  ;

  Trade.createUncheckedTrade = function createUncheckedTrade(constructorArguments) {
    return new Trade(_extends({}, constructorArguments, {
      routes: [{
        inputAmount: constructorArguments.inputAmount,
        outputAmount: constructorArguments.outputAmount,
        route: constructorArguments.route
      }]
    }));
  }
  /**
   * Creates a trade without computing the result of swapping through the routes. Useful when you have simulated the trade
   * elsewhere and do not have any tick data
   * @template TInput The input token, either Ether or an ERC-20
   * @template TOutput The output token, either Ether or an ERC-20
   * @template TTradeType The type of the trade, either exact in or exact out
   * @param constructorArguments The arguments passed to the trade constructor
   * @returns The unchecked trade
   */
  ;

  Trade.createUncheckedTradeWithMultipleRoutes = function createUncheckedTradeWithMultipleRoutes(constructorArguments) {
    return new Trade(constructorArguments);
  }
  /**
   * Get the minimum amount that must be received from this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount out
   */
  ;

  var _proto = Trade.prototype;

  _proto.minimumAmountOut = function minimumAmountOut(slippageTolerance, amountOut) {
    if (amountOut === void 0) {
      amountOut = this.outputAmount;
    }

    !!slippageTolerance.lessThan('0') ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;

    if (this.tradeType === TradeType.EXACT_OUTPUT) {
      return amountOut;
    } else {
      var slippageAdjustedAmountOut = new Fraction('1').add(slippageTolerance).invert().multiply(amountOut.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountOut.currency, slippageAdjustedAmountOut);
    }
  }
  /**
   * Get the maximum amount in that can be spent via this trade for the given slippage tolerance
   * @param slippageTolerance The tolerance of unfavorable slippage from the execution price of this trade
   * @returns The amount in
   */
  ;

  _proto.maximumAmountIn = function maximumAmountIn(slippageTolerance, amountIn) {
    if (amountIn === void 0) {
      amountIn = this.inputAmount;
    }

    !!slippageTolerance.lessThan('0') ? process.env.NODE_ENV !== "production" ? invariant(false, 'SLIPPAGE_TOLERANCE') : invariant(false) : void 0;

    if (this.tradeType === TradeType.EXACT_INPUT) {
      return amountIn;
    } else {
      var slippageAdjustedAmountIn = new Fraction('1').add(slippageTolerance).multiply(amountIn.quotient).quotient;
      return CurrencyAmount.fromRawAmount(amountIn.currency, slippageAdjustedAmountIn);
    }
  }
  /**
   * Return the execution price after accounting for slippage tolerance
   * @param slippageTolerance the allowed tolerated slippage
   * @returns The execution price
   */
  ;

  _proto.worstExecutionPrice = function worstExecutionPrice(slippageTolerance) {
    return new Price(this.inputAmount.currency, this.outputAmount.currency, this.maximumAmountIn(slippageTolerance).quotient, this.minimumAmountOut(slippageTolerance).quotient);
  }
  /**
   * Given a list of pools, and a fixed amount in, returns the top `maxNumResults` trades that go from an input token
   * amount to an output token, making at most `maxHops` hops.
   * Note this does not consider aggregation, as routes are linear. It's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param nextAmountIn exact amount of input currency to spend
   * @param currencyOut the desired currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param currencyAmountIn used in recursion; the original value of the currencyAmountIn parameter
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact in trade
   */
  ;

  Trade.bestTradeExactIn =
  /*#__PURE__*/
  function () {
    var _bestTradeExactIn = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(pools, currencyAmountIn, currencyOut, _temp, // used in recursion.
    currentPools, nextAmountIn, bestTrades) {
      var _ref4, _ref4$maxNumResults, maxNumResults, _ref4$maxHops, maxHops, amountIn, tokenOut, i, pool, amountOut, _yield$pool$getOutput3, poolsExcludingThisPool;

      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _ref4 = _temp === void 0 ? {} : _temp, _ref4$maxNumResults = _ref4.maxNumResults, maxNumResults = _ref4$maxNumResults === void 0 ? 3 : _ref4$maxNumResults, _ref4$maxHops = _ref4.maxHops, maxHops = _ref4$maxHops === void 0 ? 3 : _ref4$maxHops;

              if (currentPools === void 0) {
                currentPools = [];
              }

              if (nextAmountIn === void 0) {
                nextAmountIn = currencyAmountIn;
              }

              if (bestTrades === void 0) {
                bestTrades = [];
              }

              !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
              !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
              !(currencyAmountIn === nextAmountIn || currentPools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
              amountIn = nextAmountIn.wrapped;
              tokenOut = currencyOut.wrapped;
              i = 0;

            case 10:
              if (!(i < pools.length)) {
                _context5.next = 46;
                break;
              }

              pool = pools[i]; // pool irrelevant

              if (!(!pool.token0.equals(amountIn.currency) && !pool.token1.equals(amountIn.currency))) {
                _context5.next = 14;
                break;
              }

              return _context5.abrupt("continue", 43);

            case 14:
              amountOut = void 0;
              _context5.prev = 15;
              _context5.next = 19;
              return pool.getOutputAmount(amountIn);

            case 19:
              _yield$pool$getOutput3 = _context5.sent;
              amountOut = _yield$pool$getOutput3[0];
              _context5.next = 28;
              break;

            case 23:
              _context5.prev = 23;
              _context5.t0 = _context5["catch"](15);

              if (!_context5.t0.isInsufficientInputAmountError) {
                _context5.next = 27;
                break;
              }

              return _context5.abrupt("continue", 43);

            case 27:
              throw _context5.t0;

            case 28:
              if (!(amountOut.currency.isToken && amountOut.currency.equals(tokenOut))) {
                _context5.next = 39;
                break;
              }

              _context5.t1 = sortedInsert;
              _context5.t2 = bestTrades;
              _context5.next = 33;
              return Trade.fromRoute(new Route([].concat(currentPools, [pool]), currencyAmountIn.currency, currencyOut), currencyAmountIn, TradeType.EXACT_INPUT);

            case 33:
              _context5.t3 = _context5.sent;
              _context5.t4 = maxNumResults;
              _context5.t5 = tradeComparator;
              (0, _context5.t1)(_context5.t2, _context5.t3, _context5.t4, _context5.t5);
              _context5.next = 43;
              break;

            case 39:
              if (!(maxHops > 1 && pools.length > 1)) {
                _context5.next = 43;
                break;
              }

              poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that lead from this token as long as we have not exceeded maxHops

              _context5.next = 43;
              return Trade.bestTradeExactIn(poolsExcludingThisPool, currencyAmountIn, currencyOut, {
                maxNumResults: maxNumResults,
                maxHops: maxHops - 1
              }, [].concat(currentPools, [pool]), amountOut, bestTrades);

            case 43:
              i++;
              _context5.next = 10;
              break;

            case 46:
              return _context5.abrupt("return", bestTrades);

            case 47:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[15, 23]]);
    }));

    function bestTradeExactIn(_x10, _x11, _x12, _x13, _x14, _x15, _x16) {
      return _bestTradeExactIn.apply(this, arguments);
    }

    return bestTradeExactIn;
  }()
  /**
   * similar to the above method but instead targets a fixed output amount
   * given a list of pools, and a fixed amount out, returns the top `maxNumResults` trades that go from an input token
   * to an output token amount, making at most `maxHops` hops
   * note this does not consider aggregation, as routes are linear. it's possible a better route exists by splitting
   * the amount in among multiple routes.
   * @param pools the pools to consider in finding the best trade
   * @param currencyIn the currency to spend
   * @param currencyAmountOut the desired currency amount out
   * @param nextAmountOut the exact amount of currency out
   * @param maxNumResults maximum number of results to return
   * @param maxHops maximum number of hops a returned trade can make, e.g. 1 hop goes through a single pool
   * @param currentPools used in recursion; the current list of pools
   * @param bestTrades used in recursion; the current list of best trades
   * @returns The exact out trade
   */
  ;

  Trade.bestTradeExactOut =
  /*#__PURE__*/
  function () {
    var _bestTradeExactOut = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(pools, currencyIn, currencyAmountOut, _temp2, // used in recursion.
    currentPools, nextAmountOut, bestTrades) {
      var _ref5, _ref5$maxNumResults, maxNumResults, _ref5$maxHops, maxHops, amountOut, tokenIn, i, pool, amountIn, _yield$pool$getInputA, poolsExcludingThisPool;

      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _ref5 = _temp2 === void 0 ? {} : _temp2, _ref5$maxNumResults = _ref5.maxNumResults, maxNumResults = _ref5$maxNumResults === void 0 ? 3 : _ref5$maxNumResults, _ref5$maxHops = _ref5.maxHops, maxHops = _ref5$maxHops === void 0 ? 3 : _ref5$maxHops;

              if (currentPools === void 0) {
                currentPools = [];
              }

              if (nextAmountOut === void 0) {
                nextAmountOut = currencyAmountOut;
              }

              if (bestTrades === void 0) {
                bestTrades = [];
              }

              !(pools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'POOLS') : invariant(false) : void 0;
              !(maxHops > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MAX_HOPS') : invariant(false) : void 0;
              !(currencyAmountOut === nextAmountOut || currentPools.length > 0) ? process.env.NODE_ENV !== "production" ? invariant(false, 'INVALID_RECURSION') : invariant(false) : void 0;
              amountOut = nextAmountOut.wrapped;
              tokenIn = currencyIn.wrapped;
              i = 0;

            case 10:
              if (!(i < pools.length)) {
                _context6.next = 46;
                break;
              }

              pool = pools[i]; // pool irrelevant

              if (!(!pool.token0.equals(amountOut.currency) && !pool.token1.equals(amountOut.currency))) {
                _context6.next = 14;
                break;
              }

              return _context6.abrupt("continue", 43);

            case 14:
              amountIn = void 0;
              _context6.prev = 15;
              _context6.next = 19;
              return pool.getInputAmount(amountOut);

            case 19:
              _yield$pool$getInputA = _context6.sent;
              amountIn = _yield$pool$getInputA[0];
              _context6.next = 28;
              break;

            case 23:
              _context6.prev = 23;
              _context6.t0 = _context6["catch"](15);

              if (!_context6.t0.isInsufficientReservesError) {
                _context6.next = 27;
                break;
              }

              return _context6.abrupt("continue", 43);

            case 27:
              throw _context6.t0;

            case 28:
              if (!amountIn.currency.equals(tokenIn)) {
                _context6.next = 39;
                break;
              }

              _context6.t1 = sortedInsert;
              _context6.t2 = bestTrades;
              _context6.next = 33;
              return Trade.fromRoute(new Route([pool].concat(currentPools), currencyIn, currencyAmountOut.currency), currencyAmountOut, TradeType.EXACT_OUTPUT);

            case 33:
              _context6.t3 = _context6.sent;
              _context6.t4 = maxNumResults;
              _context6.t5 = tradeComparator;
              (0, _context6.t1)(_context6.t2, _context6.t3, _context6.t4, _context6.t5);
              _context6.next = 43;
              break;

            case 39:
              if (!(maxHops > 1 && pools.length > 1)) {
                _context6.next = 43;
                break;
              }

              poolsExcludingThisPool = pools.slice(0, i).concat(pools.slice(i + 1, pools.length)); // otherwise, consider all the other paths that arrive at this token as long as we have not exceeded maxHops

              _context6.next = 43;
              return Trade.bestTradeExactOut(poolsExcludingThisPool, currencyIn, currencyAmountOut, {
                maxNumResults: maxNumResults,
                maxHops: maxHops - 1
              }, [pool].concat(currentPools), amountIn, bestTrades);

            case 43:
              i++;
              _context6.next = 10;
              break;

            case 46:
              return _context6.abrupt("return", bestTrades);

            case 47:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[15, 23]]);
    }));

    function bestTradeExactOut(_x17, _x18, _x19, _x20, _x21, _x22, _x23) {
      return _bestTradeExactOut.apply(this, arguments);
    }

    return bestTradeExactOut;
  }();

  _createClass(Trade, [{
    key: "route",
    get: function get() {
      !(this.swaps.length == 1) ? process.env.NODE_ENV !== "production" ? invariant(false, 'MULTIPLE_ROUTES') : invariant(false) : void 0;
      return this.swaps[0].route;
    }
    /**
     * The input amount for the trade assuming no slippage.
     */

  }, {
    key: "inputAmount",
    get: function get() {
      if (this._inputAmount) {
        return this._inputAmount;
      }

      var inputCurrency = this.swaps[0].inputAmount.currency;
      var totalInputFromRoutes = this.swaps.map(function (_ref6) {
        var inputAmount = _ref6.inputAmount;
        return inputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(inputCurrency, 0));
      this._inputAmount = totalInputFromRoutes;
      return this._inputAmount;
    }
    /**
     * The output amount for the trade assuming no slippage.
     */

  }, {
    key: "outputAmount",
    get: function get() {
      if (this._outputAmount) {
        return this._outputAmount;
      }

      var outputCurrency = this.swaps[0].outputAmount.currency;
      var totalOutputFromRoutes = this.swaps.map(function (_ref7) {
        var outputAmount = _ref7.outputAmount;
        return outputAmount;
      }).reduce(function (total, cur) {
        return total.add(cur);
      }, CurrencyAmount.fromRawAmount(outputCurrency, 0));
      this._outputAmount = totalOutputFromRoutes;
      return this._outputAmount;
    }
    /**
     * The price expressed in terms of output amount/input amount.
     */

  }, {
    key: "executionPrice",
    get: function get() {
      var _this$_executionPrice;

      return (_this$_executionPrice = this._executionPrice) != null ? _this$_executionPrice : this._executionPrice = new Price(this.inputAmount.currency, this.outputAmount.currency, this.inputAmount.quotient, this.outputAmount.quotient);
    }
    /**
     * Returns the percent difference between the route's mid price and the price impact
     */

  }, {
    key: "priceImpact",
    get: function get() {
      if (this._priceImpact) {
        return this._priceImpact;
      }

      var spotOutputAmount = CurrencyAmount.fromRawAmount(this.outputAmount.currency, 0);

      for (var _iterator2 = _createForOfIteratorHelperLoose(this.swaps), _step2; !(_step2 = _iterator2()).done;) {
        var _step2$value = _step2.value,
            route = _step2$value.route,
            inputAmount = _step2$value.inputAmount;
        var midPrice = route.midPrice;
        spotOutputAmount = spotOutputAmount.add(midPrice.quote(inputAmount));
      }

      var priceImpact = spotOutputAmount.subtract(this.outputAmount).divide(spotOutputAmount);
      this._priceImpact = new Percent(priceImpact.numerator, priceImpact.denominator);
      return this._priceImpact;
    }
  }]);

  return Trade;
}();

var IDL = {
  "version": "0.1.6",
  "name": "cyclos_core",
  "instructions": [{
    "name": "initFactory",
    "accounts": [{
      "name": "owner",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "factoryState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": []
  }, {
    "name": "setOwner",
    "accounts": [{
      "name": "owner",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "newOwner",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "factoryState",
      "isMut": true,
      "isSigner": false
    }],
    "args": []
  }, {
    "name": "enableFeeAmount",
    "accounts": [{
      "name": "owner",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "factoryState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "feeState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "fee",
      "type": "u32"
    }, {
      "name": "tickSpacing",
      "type": "u16"
    }]
  }, {
    "name": "createAndInitPool",
    "accounts": [{
      "name": "poolCreator",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "token0",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "token1",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "feeState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "initialObservationState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "rent",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "sqrtPriceX32",
      "type": "u64"
    }]
  }, {
    "name": "increaseObservationCardinalityNext",
    "accounts": [{
      "name": "payer",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "observationAccountBumps",
      "type": "bytes"
    }]
  }, {
    "name": "setFeeProtocol",
    "accounts": [{
      "name": "owner",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "factoryState",
      "isMut": true,
      "isSigner": false
    }],
    "args": [{
      "name": "feeProtocol",
      "type": "u8"
    }]
  }, {
    "name": "collectProtocol",
    "accounts": [{
      "name": "owner",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "factoryState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "recipientWallet0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "recipientWallet1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount0Requested",
      "type": "u64"
    }, {
      "name": "amount1Requested",
      "type": "u64"
    }]
  }, {
    "name": "initTickAccount",
    "accounts": [{
      "name": "signer",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "poolState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tickState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "tick",
      "type": "i32"
    }]
  }, {
    "name": "closeTickAccount",
    "accounts": [{
      "name": "tickState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "recipient",
      "isMut": true,
      "isSigner": false
    }],
    "args": []
  }, {
    "name": "initBitmapAccount",
    "accounts": [{
      "name": "signer",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "poolState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "bitmapState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "wordPos",
      "type": "i16"
    }]
  }, {
    "name": "initPositionAccount",
    "accounts": [{
      "name": "signer",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "recipient",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tickLowerState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tickUpperState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "positionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": []
  }, {
    "name": "mintCallback",
    "accounts": [{
      "name": "minter",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "tokenAccount0",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenAccount1",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "vault0",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "vault1",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount0Owed",
      "type": "u64"
    }, {
      "name": "amount1Owed",
      "type": "u64"
    }]
  }, {
    "name": "swapCallback",
    "accounts": [{
      "name": "signer",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "inputTokenAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "outputTokenAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "inputVault",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "outputVault",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount0Delta",
      "type": "i64"
    }, {
      "name": "amount1Delta",
      "type": "i64"
    }]
  }, {
    "name": "mint",
    "accounts": [{
      "name": "minter",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "tokenAccount0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenAccount1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "recipient",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "positionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "lastObservationState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "callbackHandler",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount",
      "type": "u64"
    }]
  }, {
    "name": "burn",
    "accounts": [{
      "name": "owner",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickLowerState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tickUpperState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "bitmapLowerState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "bitmapUpperState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "positionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "lastObservationState",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount",
      "type": "u64"
    }]
  }, {
    "name": "collect",
    "accounts": [{
      "name": "owner",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickLowerState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tickUpperState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "positionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "recipientWallet0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "recipientWallet1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount0Requested",
      "type": "u64"
    }, {
      "name": "amount1Requested",
      "type": "u64"
    }]
  }, {
    "name": "swap",
    "accounts": [{
      "name": "signer",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "inputTokenAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "outputTokenAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "inputVault",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "outputVault",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "factoryState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "lastObservationState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "callbackHandler",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amountSpecified",
      "type": "i64"
    }, {
      "name": "sqrtPriceLimitX32",
      "type": "u64"
    }]
  }, {
    "name": "mintTokenizedPosition",
    "accounts": [{
      "name": "minter",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "recipient",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "factoryState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "nftMint",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "nftAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "corePositionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenizedPositionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenAccount0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenAccount1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "lastObservationState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "rent",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "coreProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "associatedTokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount0Desired",
      "type": "u64"
    }, {
      "name": "amount1Desired",
      "type": "u64"
    }, {
      "name": "amount0Min",
      "type": "u64"
    }, {
      "name": "amount1Min",
      "type": "u64"
    }, {
      "name": "deadline",
      "type": "i64"
    }]
  }, {
    "name": "addMetaplexMetadata",
    "accounts": [{
      "name": "payer",
      "isMut": true,
      "isSigner": true
    }, {
      "name": "factoryState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "nftMint",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenizedPositionState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "metadataAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "rent",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "metadataProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "systemProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": []
  }, {
    "name": "increaseLiquidity",
    "accounts": [{
      "name": "payer",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "factoryState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenizedPositionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "corePositionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenAccount0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tokenAccount1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "lastObservationState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "coreProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount0Desired",
      "type": "u64"
    }, {
      "name": "amount1Desired",
      "type": "u64"
    }, {
      "name": "amount0Min",
      "type": "u64"
    }, {
      "name": "amount1Min",
      "type": "u64"
    }, {
      "name": "deadline",
      "type": "i64"
    }]
  }, {
    "name": "decreaseLiquidity",
    "accounts": [{
      "name": "ownerOrDelegate",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "nftAccount",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenizedPositionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "factoryState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "corePositionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "lastObservationState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "coreProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "liquidity",
      "type": "u64"
    }, {
      "name": "amount0Min",
      "type": "u64"
    }, {
      "name": "amount1Min",
      "type": "u64"
    }, {
      "name": "deadline",
      "type": "i64"
    }]
  }, {
    "name": "collectFromTokenized",
    "accounts": [{
      "name": "ownerOrDelegate",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "nftAccount",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenizedPositionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "factoryState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "corePositionState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "tickUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapLowerState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "bitmapUpperState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "lastObservationState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "vault1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "recipientWallet0",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "recipientWallet1",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "coreProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "amount0Max",
      "type": "u64"
    }, {
      "name": "amount1Max",
      "type": "u64"
    }]
  }, {
    "name": "exactInputSingle",
    "accounts": [{
      "name": "signer",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "factoryState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "poolState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "inputTokenAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "outputTokenAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "inputVault",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "outputVault",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "lastObservationState",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "coreProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "deadline",
      "type": "i64"
    }, {
      "name": "amountIn",
      "type": "u64"
    }, {
      "name": "amountOutMinimum",
      "type": "u64"
    }, {
      "name": "sqrtPriceLimitX32",
      "type": "u64"
    }]
  }, {
    "name": "exactInput",
    "accounts": [{
      "name": "signer",
      "isMut": false,
      "isSigner": true
    }, {
      "name": "factoryState",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "inputTokenAccount",
      "isMut": true,
      "isSigner": false
    }, {
      "name": "coreProgram",
      "isMut": false,
      "isSigner": false
    }, {
      "name": "tokenProgram",
      "isMut": false,
      "isSigner": false
    }],
    "args": [{
      "name": "deadline",
      "type": "i64"
    }, {
      "name": "amountIn",
      "type": "u64"
    }, {
      "name": "amountOutMinimum",
      "type": "u64"
    }, {
      "name": "additionalAccountsPerPool",
      "type": "bytes"
    }]
  }],
  "accounts": [{
    "name": "factoryState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "owner",
        "type": "publicKey"
      }, {
        "name": "feeProtocol",
        "type": "u8"
      }]
    }
  }, {
    "name": "feeState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "fee",
        "type": "u32"
      }, {
        "name": "tickSpacing",
        "type": "u16"
      }]
    }
  }, {
    "name": "observationState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "index",
        "type": "u16"
      }, {
        "name": "blockTimestamp",
        "type": "u32"
      }, {
        "name": "tickCumulative",
        "type": "i64"
      }, {
        "name": "secondsPerLiquidityCumulativeX32",
        "type": "u64"
      }, {
        "name": "initialized",
        "type": "bool"
      }]
    }
  }, {
    "name": "poolState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "token0",
        "type": "publicKey"
      }, {
        "name": "token1",
        "type": "publicKey"
      }, {
        "name": "fee",
        "type": "u32"
      }, {
        "name": "tickSpacing",
        "type": "u16"
      }, {
        "name": "liquidity",
        "type": "u64"
      }, {
        "name": "sqrtPriceX32",
        "type": "u64"
      }, {
        "name": "tick",
        "type": "i32"
      }, {
        "name": "observationIndex",
        "type": "u16"
      }, {
        "name": "observationCardinality",
        "type": "u16"
      }, {
        "name": "observationCardinalityNext",
        "type": "u16"
      }, {
        "name": "feeGrowthGlobal0X32",
        "type": "u64"
      }, {
        "name": "feeGrowthGlobal1X32",
        "type": "u64"
      }, {
        "name": "protocolFeesToken0",
        "type": "u64"
      }, {
        "name": "protocolFeesToken1",
        "type": "u64"
      }, {
        "name": "unlocked",
        "type": "bool"
      }]
    }
  }, {
    "name": "positionState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "liquidity",
        "type": "u64"
      }, {
        "name": "feeGrowthInside0LastX32",
        "type": "u64"
      }, {
        "name": "feeGrowthInside1LastX32",
        "type": "u64"
      }, {
        "name": "tokensOwed0",
        "type": "u64"
      }, {
        "name": "tokensOwed1",
        "type": "u64"
      }]
    }
  }, {
    "name": "positionManagerState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }]
    }
  }, {
    "name": "swapRouterState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "core",
        "type": "publicKey"
      }, {
        "name": "amountInCached",
        "type": "u64"
      }]
    }
  }, {
    "name": "tickState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "tick",
        "type": "i32"
      }, {
        "name": "liquidityNet",
        "type": "i64"
      }, {
        "name": "liquidityGross",
        "type": "u64"
      }, {
        "name": "feeGrowthOutside0X32",
        "type": "u64"
      }, {
        "name": "feeGrowthOutside1X32",
        "type": "u64"
      }, {
        "name": "tickCumulativeOutside",
        "type": "i64"
      }, {
        "name": "secondsPerLiquidityOutsideX32",
        "type": "u64"
      }, {
        "name": "secondsOutside",
        "type": "u32"
      }]
    }
  }, {
    "name": "tickBitmapState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "wordPos",
        "type": "i16"
      }, {
        "name": "word",
        "type": {
          "array": ["u64", 4]
        }
      }]
    }
  }, {
    "name": "tokenizedPositionState",
    "type": {
      "kind": "struct",
      "fields": [{
        "name": "bump",
        "type": "u8"
      }, {
        "name": "mint",
        "type": "publicKey"
      }, {
        "name": "poolId",
        "type": "publicKey"
      }, {
        "name": "tickLower",
        "type": "i32"
      }, {
        "name": "tickUpper",
        "type": "i32"
      }, {
        "name": "liquidity",
        "type": "u64"
      }, {
        "name": "feeGrowthInside0LastX32",
        "type": "u64"
      }, {
        "name": "feeGrowthInside1LastX32",
        "type": "u64"
      }, {
        "name": "tokensOwed0",
        "type": "u64"
      }, {
        "name": "tokensOwed1",
        "type": "u64"
      }]
    }
  }],
  "events": [{
    "name": "OwnerChanged",
    "fields": [{
      "name": "oldOwner",
      "type": "publicKey",
      "index": false
    }, {
      "name": "newOwner",
      "type": "publicKey",
      "index": false
    }]
  }, {
    "name": "SetFeeProtocolEvent",
    "fields": [{
      "name": "feeProtocolOld",
      "type": "u8",
      "index": false
    }, {
      "name": "feeProtocol",
      "type": "u8",
      "index": false
    }]
  }, {
    "name": "FeeAmountEnabled",
    "fields": [{
      "name": "fee",
      "type": "u32",
      "index": false
    }, {
      "name": "tickSpacing",
      "type": "u16",
      "index": false
    }]
  }, {
    "name": "IncreaseObservationCardinalityNext",
    "fields": [{
      "name": "observationCardinalityNextOld",
      "type": "u16",
      "index": false
    }, {
      "name": "observationCardinalityNextNew",
      "type": "u16",
      "index": false
    }]
  }, {
    "name": "PoolCreatedAndInitialized",
    "fields": [{
      "name": "token0",
      "type": "publicKey",
      "index": false
    }, {
      "name": "token1",
      "type": "publicKey",
      "index": false
    }, {
      "name": "fee",
      "type": "u32",
      "index": false
    }, {
      "name": "tickSpacing",
      "type": "u16",
      "index": false
    }, {
      "name": "poolState",
      "type": "publicKey",
      "index": false
    }, {
      "name": "sqrtPriceX32",
      "type": "u64",
      "index": false
    }, {
      "name": "tick",
      "type": "i32",
      "index": false
    }]
  }, {
    "name": "CollectProtocolEvent",
    "fields": [{
      "name": "poolState",
      "type": "publicKey",
      "index": false
    }, {
      "name": "sender",
      "type": "publicKey",
      "index": false
    }, {
      "name": "recipientWallet0",
      "type": "publicKey",
      "index": false
    }, {
      "name": "recipientWallet1",
      "type": "publicKey",
      "index": false
    }, {
      "name": "amount0",
      "type": "u64",
      "index": false
    }, {
      "name": "amount1",
      "type": "u64",
      "index": false
    }]
  }, {
    "name": "SwapEvent",
    "fields": [{
      "name": "poolState",
      "type": "publicKey",
      "index": false
    }, {
      "name": "sender",
      "type": "publicKey",
      "index": false
    }, {
      "name": "tokenAccount0",
      "type": "publicKey",
      "index": false
    }, {
      "name": "tokenAccount1",
      "type": "publicKey",
      "index": false
    }, {
      "name": "amount0",
      "type": "i64",
      "index": false
    }, {
      "name": "amount1",
      "type": "i64",
      "index": false
    }, {
      "name": "sqrtPriceX32",
      "type": "u64",
      "index": false
    }, {
      "name": "liquidity",
      "type": "u64",
      "index": false
    }, {
      "name": "tick",
      "type": "i32",
      "index": false
    }]
  }, {
    "name": "MintEvent",
    "fields": [{
      "name": "poolState",
      "type": "publicKey",
      "index": false
    }, {
      "name": "sender",
      "type": "publicKey",
      "index": false
    }, {
      "name": "owner",
      "type": "publicKey",
      "index": false
    }, {
      "name": "tickLower",
      "type": "i32",
      "index": false
    }, {
      "name": "tickUpper",
      "type": "i32",
      "index": false
    }, {
      "name": "amount",
      "type": "u64",
      "index": false
    }, {
      "name": "amount0",
      "type": "u64",
      "index": false
    }, {
      "name": "amount1",
      "type": "u64",
      "index": false
    }]
  }, {
    "name": "BurnEvent",
    "fields": [{
      "name": "poolState",
      "type": "publicKey",
      "index": false
    }, {
      "name": "owner",
      "type": "publicKey",
      "index": false
    }, {
      "name": "tickLower",
      "type": "i32",
      "index": false
    }, {
      "name": "tickUpper",
      "type": "i32",
      "index": false
    }, {
      "name": "amount",
      "type": "u64",
      "index": false
    }, {
      "name": "amount0",
      "type": "u64",
      "index": false
    }, {
      "name": "amount1",
      "type": "u64",
      "index": false
    }]
  }, {
    "name": "CollectEvent",
    "fields": [{
      "name": "poolState",
      "type": "publicKey",
      "index": false
    }, {
      "name": "owner",
      "type": "publicKey",
      "index": false
    }, {
      "name": "tickLower",
      "type": "i32",
      "index": false
    }, {
      "name": "tickUpper",
      "type": "i32",
      "index": false
    }, {
      "name": "amount0",
      "type": "u64",
      "index": false
    }, {
      "name": "amount1",
      "type": "u64",
      "index": false
    }]
  }, {
    "name": "IncreaseLiquidityEvent",
    "fields": [{
      "name": "tokenId",
      "type": "publicKey",
      "index": false
    }, {
      "name": "liquidity",
      "type": "u64",
      "index": false
    }, {
      "name": "amount0",
      "type": "u64",
      "index": false
    }, {
      "name": "amount1",
      "type": "u64",
      "index": false
    }]
  }, {
    "name": "DecreaseLiquidityEvent",
    "fields": [{
      "name": "tokenId",
      "type": "publicKey",
      "index": false
    }, {
      "name": "liquidity",
      "type": "u64",
      "index": false
    }, {
      "name": "amount0",
      "type": "u64",
      "index": false
    }, {
      "name": "amount1",
      "type": "u64",
      "index": false
    }]
  }, {
    "name": "CollectTokenizedEvent",
    "fields": [{
      "name": "tokenId",
      "type": "publicKey",
      "index": false
    }, {
      "name": "recipientWallet0",
      "type": "publicKey",
      "index": false
    }, {
      "name": "recipientWallet1",
      "type": "publicKey",
      "index": false
    }, {
      "name": "amount0",
      "type": "u64",
      "index": false
    }, {
      "name": "amount1",
      "type": "u64",
      "index": false
    }]
  }],
  "errors": [{
    "code": 6000,
    "name": "LOK",
    "msg": "LOK"
  }, {
    "code": 6001,
    "name": "ZeroMintAmount",
    "msg": "Minting amount should be greater than 0"
  }, {
    "code": 6002,
    "name": "TLU",
    "msg": "TLU"
  }, {
    "code": 6003,
    "name": "TMS",
    "msg": "TMS"
  }, {
    "code": 6004,
    "name": "TLM",
    "msg": "TLM"
  }, {
    "code": 6005,
    "name": "TUM",
    "msg": "TUM"
  }, {
    "code": 6006,
    "name": "M0",
    "msg": "M0"
  }, {
    "code": 6007,
    "name": "M1",
    "msg": "M1"
  }, {
    "code": 6008,
    "name": "OS",
    "msg": "OS"
  }, {
    "code": 6009,
    "name": "AS",
    "msg": "AS"
  }, {
    "code": 6010,
    "name": "SPL",
    "msg": "SPL"
  }, {
    "code": 6011,
    "name": "IIA",
    "msg": "IIA"
  }, {
    "code": 6012,
    "name": "NP",
    "msg": "NP"
  }, {
    "code": 6013,
    "name": "LO",
    "msg": "LO"
  }, {
    "code": 6014,
    "name": "R",
    "msg": "R"
  }, {
    "code": 6015,
    "name": "T",
    "msg": "T"
  }, {
    "code": 6016,
    "name": "LS",
    "msg": "LS"
  }, {
    "code": 6017,
    "name": "LA",
    "msg": "LA"
  }, {
    "code": 6018,
    "name": "TransactionTooOld",
    "msg": "Transaction too old"
  }, {
    "code": 6019,
    "name": "PriceSlippageCheck",
    "msg": "Price slippage check"
  }, {
    "code": 6020,
    "name": "NotApproved",
    "msg": "Not approved"
  }, {
    "code": 6021,
    "name": "TooLittleReceived",
    "msg": "Too little received"
  }]
};

export { ADDRESS_ZERO, BITMAP_SEED, FACTORY_ADDRESS, FEE_SEED, FeeAmount, FullMath, IDL, LiquidityMath, NoTickDataProvider, OBSERVATION_SEED, POOL_SEED, POSITION_SEED, Pool, Position, Route, SqrtPriceMath, SwapMath, TICK_SEED, TICK_SPACINGS, Tick, TickList, TickMath, Trade, buildTick, computePoolAddress, encodeSqrtRatioX32, generateBitmapWord, i16ToSeed, i32ToSeed, isSorted, lsb, maxLiquidityForAmounts, msb, nearestUsableTick, nextInitializedBit, priceToClosestTick, snapshotCumulativesInside, tickPosition, tickToPrice, toHex, tradeComparator, transformObservation, u16ToSeed, u32ToSeed };
//# sourceMappingURL=sdk.esm.js.map

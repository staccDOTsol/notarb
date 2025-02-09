'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Decimal = require('decimal.js');
var Decimal__default = _interopDefault(Decimal);
var invariant = _interopDefault(require('tiny-invariant'));
var bufferLayout = require('@solana/buffer-layout');
var web3_js = require('@solana/web3.js');
var BN = _interopDefault(require('bn.js'));
var splToken = require('@solana/spl-token');
var dotenv = _interopDefault(require('dotenv'));

/**
 * Calculate liquity and another token amount when current tick is in [tickLower, tickUpper]
 * @param tickLower The tick lower
 * @param tickUpper The tick upper
 * @param currentSqrtPrice The current sqrt price
 * @param desiredAmountSrc The src token amount
 * @param direct 0(desiredAmountSrc is TokenA), 1(desiredAmountSrc is TokenB)
 * @returns The liquity and dst token amount
 */

function calculateLiquity(tickLower, tickUpper, desiredAmountSrc, currentSqrtPrice, direct) {
  !(tickLower < tickUpper) ?  invariant(false, "The tickLower must less than tickUpper")  : void 0;
  var lowerSqrtPrice = tick2SqrtPrice(tickLower);
  var upperSqrtPrice = tick2SqrtPrice(tickUpper);
  !(currentSqrtPrice.greaterThanOrEqualTo(lowerSqrtPrice) && currentSqrtPrice.lessThanOrEqualTo(upperSqrtPrice)) ?  invariant(false, "The current price must in [lowerPrice,upperPrice]")  : void 0;
  var one = new Decimal__default(1);

  if (direct === 0) {
    var deltaLiquity = desiredAmountSrc.div(one.div(currentSqrtPrice).sub(one.div(upperSqrtPrice)));
    var desiredAmountDst = deltaLiquity.mul(currentSqrtPrice.sub(lowerSqrtPrice));
    return {
      desiredAmountDst: desiredAmountDst,
      deltaLiquity: deltaLiquity
    };
  } else {
    var _deltaLiquity = desiredAmountSrc.div(currentSqrtPrice.sub(lowerSqrtPrice));

    var _desiredAmountDst = _deltaLiquity.mul(one.div(currentSqrtPrice).sub(one.div(upperSqrtPrice)));

    return {
      desiredAmountDst: _desiredAmountDst,
      deltaLiquity: _deltaLiquity
    };
  }
}
/**
 * Calculate amount out of token A and token B by liquity
 * @param tickLower The tick lower
 * @param tickUpper The tick upper
 * @param currentSqrtPrice The current sqrt price
 * @param liquity The liquity amount
 * @returns The amount of token A and token B
 */

function calculateTokenAmount(tickLower, tickUpper, liquity, currentSqrtPrice) {
  var lowerSqrtPrice = tick2SqrtPrice(tickLower);
  var upperSqrtPrice = tick2SqrtPrice(tickUpper);

  if (currentSqrtPrice.lessThan(lowerSqrtPrice)) {
    return {
      amountA: liquity.div(lowerSqrtPrice).sub(liquity.div(upperSqrtPrice)),
      amountB: new Decimal__default(0)
    };
  } else if (currentSqrtPrice.greaterThan(upperSqrtPrice)) {
    return {
      amountA: new Decimal__default(0),
      amountB: liquity.mul(upperSqrtPrice).sub(liquity.mul(lowerSqrtPrice))
    };
  } else {
    return {
      amountA: liquity.div(currentSqrtPrice).sub(liquity.div(upperSqrtPrice)),
      amountB: liquity.mul(currentSqrtPrice).sub(liquity.mul(lowerSqrtPrice))
    };
  }
}
/**
 * Calculate liquity when current tick is less than tickLower
 * @param tickLower The tick lower
 * @param tickUpper The tick upper
 * @param desiredAmountA The desired amount of token A
 * @returns the liquity
 */

function calculateLiquityOnlyA(tickLower, tickUpper, desiredAmountA) {
  !(tickLower < tickUpper) ?  invariant(false, "The tickLower must less than tickUpper")  : void 0;
  var lowerSqrtPrice = tick2SqrtPrice(tickLower);
  var upperSqrtPrice = tick2SqrtPrice(tickUpper);
  var one = new Decimal__default(1);
  return desiredAmountA.div(one.div(lowerSqrtPrice).sub(one.div(upperSqrtPrice)));
}
/**
 * Calculate liquity when current tick is less than tickLower
 * @param tickLower The tick lower
 * @param tickUpper The tick upper
 * @param desiredAmountA The desired amount of token B
 * @returns The liquity
 */

function calculateLiquityOnlyB(tickLower, tickUpper, desiredAmountB) {
  !(tickLower < tickUpper) ?  invariant(false, "The tickLower must less than tickUpper")  : void 0;
  var lowerSqrtPrice = tick2SqrtPrice(tickLower);
  var upperSqrtPrice = tick2SqrtPrice(tickUpper);
  return desiredAmountB.div(upperSqrtPrice.sub(lowerSqrtPrice));
}
/**
 * Calculate the liquitys table
 * @param ticks The tick array of token swap
 * @returns The min, max of liquity, and liquitys array
 */

function calculateLiquityTable(ticks) {
  var minLiquity = new Decimal__default(0);
  var maxLiquity = new Decimal__default(0);
  var liquitys = [];
  var liquity = {
    lowerTick: 0,
    upperTick: 0,
    amount: new Decimal__default(0)
  };

  for (var i = 0; i < ticks.length; i++) {
    if (liquity.amount.equals(0)) {
      liquity.lowerTick = ticks[i].tick;
      liquity.amount = ticks[i].liquityNet;
      continue;
    }

    liquity.upperTick = ticks[i].tick;
    minLiquity = liquity.amount.lessThan(minLiquity) || minLiquity.equals(0) ? liquity.amount : minLiquity;
    maxLiquity = liquity.amount.greaterThan(maxLiquity) ? liquity.amount : maxLiquity;
    liquitys.push({
      lowerTick: liquity.lowerTick,
      upperTick: liquity.upperTick,
      amount: liquity.amount
    });
    liquity.amount = liquity.amount.add(ticks[i].liquityNet);
    liquity.lowerTick = ticks[i].tick;
  }

  return {
    maxLiquity: maxLiquity,
    minLiquity: minLiquity,
    liquitys: liquitys
  };
}
/**
 * Calculate max tokenAmount with sliding point.
 * @param liquity.
 * @param current sqrt price.
 * @param sliding point.
 */

function calculateSlidTokenAmount(tickLower, tickUpper, liquity, currentSqrtPrice, slid) {
  !(slid.lessThan(1) && slid.greaterThan(0)) ?  invariant(false, "Invalid slid:" + slid.toString())  : void 0;
  var maxSqrtPrice = currentSqrtPrice.mul(new Decimal__default(1).add(slid).sqrt());
  var minSqrtPrice = currentSqrtPrice.mul(new Decimal__default(1).sub(slid).sqrt());
  var constant = calculateTokenAmount(tickLower, tickUpper, liquity, currentSqrtPrice);
  var minRes = calculateTokenAmount(tickLower, tickUpper, liquity, minSqrtPrice);
  var maxRes = calculateTokenAmount(tickLower, tickUpper, liquity, maxSqrtPrice);
  return {
    maxAmountA: minRes.amountA,
    minAmountA: maxRes.amountA,
    maxAmountB: maxRes.amountB,
    minAmountB: minRes.amountB,
    amountA: constant.amountA,
    amountB: constant.amountB
  };
}

var MAX_TICK = 443632; // export const MAX_TICK = 552648
// The min ticker

var MIN_TICK = -MAX_TICK; // The price pieces
// price = pow(PIECES, TICK)

var PIECES = /*#__PURE__*/new Decimal.Decimal("1.0001");
var PRICE_OFFSET = /*#__PURE__*/new Decimal.Decimal("1e-12");
var MAX_PRICE = /*#__PURE__*/PIECES.pow(MAX_TICK).add(PRICE_OFFSET);
var MIN_PRICE = /*#__PURE__*/PIECES.pow(MIN_TICK).add(PRICE_OFFSET);
var MAX_SQRT_PRICE = /*#__PURE__*/PIECES.pow(MAX_TICK / 2).add(PRICE_OFFSET).toDP(12);
var MIN_SQRT_PRICE = /*#__PURE__*/PIECES.pow(MIN_TICK / 2).sub(PRICE_OFFSET).toDP(12);
/**
 * Get the tick by sqrt price
 *
 * @param sqrtPrice the sqrt price
  let afterSqrtPrice = liquity.div(amountIn.add(liquity.div(upperSqrtPrice)));
 */

function sqrtPrice2Tick(sqrtPrice) {
  !sqrtPrice.lessThanOrEqualTo(MAX_SQRT_PRICE) ?  invariant(false, "Invalid sqrtPrice: " + sqrtPrice.toString() + " Max: " + MAX_SQRT_PRICE.toString() + ", too large")  : void 0;
  !sqrtPrice.greaterThanOrEqualTo(MIN_SQRT_PRICE) ?  invariant(false, "Invalid sqrtPrice: " + sqrtPrice.toString() + ", Min: " + MIN_SQRT_PRICE.toString() + ", too small")  : void 0;
  return sqrtPrice.pow(2).log(PIECES).toDP(0, Decimal.Decimal.ROUND_HALF_UP).toNumber();
}
/**
 * Get the sqrt price by tick
 * @param tick the tick
 * @returns the sqrt price
 */

function tick2SqrtPrice(tick) {
  !(tick >= MIN_TICK && tick <= MAX_TICK) ?  invariant(false, "Invalid tick: " + tick + ", must be in range [" + MIN_TICK + ", " + MAX_TICK + "]")  : void 0;
  return PIECES.pow(tick / 2);
}
/**
 * Get the tick by price
 * @param price the price
 * @returns the tick
 */

function price2Tick(price) {
  !price.lessThan(MAX_PRICE) ?  invariant(false, "Invalid price:" + price.toString() + " Max: " + MAX_PRICE.toString() + ",  too large")  : void 0;
  !price.greaterThan(MIN_PRICE) ?  invariant(false, "Invalid price:" + price.toString() + " Min: " + MIN_PRICE.toString() + ", too small")  : void 0;
  return price.log(PIECES).toDP(0, Decimal.Decimal.ROUND_HALF_UP).toNumber();
}
/**
 * Get the price by tick
 * @param tick the tick
 * @returns the price
 */

function tick2Price(tick) {
  !(tick >= MIN_TICK && tick <= MAX_TICK) ?  invariant(false, "Invalid tick: " + tick + ", must be in range [" + MIN_TICK.toString() + ", " + MAX_TICK.toString() + "]")  : void 0;
  return PIECES.pow(tick);
}
/**
 * Get the nearest valid tick
 * @deprecated please use {@link getNearestTickBySqrtPrice Or getNearestTickByPrice} instead
 * @param sqrtPrice the sqrt price
 * @param tickSpace the tick space
 * @param isLower is the tick is lowwer
 * @returns the tick or null
 */

function getNearestTick(sqrtPrice, tickSpace) {
  return getNearestTickBySqrtPrice(sqrtPrice, tickSpace);
}
/**
 * Get the nearest valid tick for positions
 * @param sqrtPrice the sqrt price
 * @param tickSpace the tick space
 * @returns the tick or null(if the tick space <= 0)
 */

function getNearestTickBySqrtPrice(sqrtPrice, tickSpace) {
  !(tickSpace > 0 && tickSpace % 1 === 0) ?  invariant(false, "Invalid tickSpace:" + tickSpace)  : void 0;
  !sqrtPrice.lessThan(MAX_SQRT_PRICE) ?  invariant(false, "Invalid sqrtPrice: " + sqrtPrice.toString() + " Max: " + MAX_SQRT_PRICE.toString() + ", too large")  : void 0;
  !sqrtPrice.greaterThan(MIN_SQRT_PRICE) ?  invariant(false, "Invalid sqrtPrice: " + sqrtPrice.toString() + ", Min: " + MIN_SQRT_PRICE.toString() + ", too small")  : void 0;
  var t = sqrtPrice2Tick(sqrtPrice);
  var m = (t - MIN_TICK) % tickSpace;

  if (m > tickSpace / 2) {
    return t - m + tickSpace;
  }

  return t - m;
}
/**
 * Get the nearest valid tick for positions
 * @param price the price
 * @param tickSpace the tick space
 * @returns the tick or null(if the tick space <= 0)
 */

function getNearestTickByPrice(price, tickSpace) {
  !(tickSpace > 0 && tickSpace % 1 === 0) ?  invariant(false, "Invalid tickSpace:" + tickSpace)  : void 0;
  !price.lessThan(MAX_PRICE) ?  invariant(false, "Invalid price:" + price.toString() + " Max: " + MAX_PRICE.toString() + ",  too large")  : void 0;
  !price.greaterThan(MIN_PRICE) ?  invariant(false, "Invalid price:" + price.toString() + " Min: " + MIN_PRICE.toString() + ", too small")  : void 0;
  var t = price2Tick(price);
  var m = (t - MIN_TICK) % tickSpace;

  if (m > tickSpace / 2) {
    return t - m + tickSpace;
  }

  return t - m;
}
/**
 *
 * @param ticks The tick array of token swap
 * @param currentSqrtPrice The current sqrt price of token swap
 * @param fee The fee rate of token swap
 * @param currentLiquity The current liquity of token swap
 * @param amountIn The amount in of token A
 * @returns amountOut:The amount out of token B, amountUsed:The used of amountIn, afterPrice:The price after calculate, afterLiquity: The liquity after calculate
 */

function calculateSwapA2B(ticks, currentSqrtPrice, fee, currentLiquity, amountIn) {
  !amountIn.greaterThan(new Decimal.Decimal(0)) ?  invariant(false, "invalid amount in")  : void 0;
  !currentLiquity.greaterThanOrEqualTo(new Decimal.Decimal(0)) ?  invariant(false, "invalid liquity")  : void 0;
  !(ticks.length > 0) ?  invariant(false, "the ticks is empty")  : void 0; //let currentTick = sqrtPrice2Tick(currentSqrtPrice);

  !(currentSqrtPrice > ticks[0].tickPrice) ?  invariant(false, "out of ticks")  : void 0;
  var liquity = currentLiquity;
  var out = new Decimal.Decimal(0);
  var remind = amountIn;
  var remindWithFee = new Decimal.Decimal(0);
  var feeUsed = new Decimal.Decimal(0);
  var amountUsed = new Decimal.Decimal(0);

  for (var i = ticks.length - 1; i >= 0; i--) {
    if (liquity.equals(new Decimal.Decimal(0))) {
      currentSqrtPrice = ticks[i].tickPrice.sub(PRICE_OFFSET);
      liquity = liquity.sub(ticks[i].liquityNet); //upperSqrtPrice = ticks[i].tickPrice;

      continue;
    }

    if (currentSqrtPrice < ticks[i].tickPrice) {
      continue;
    }

    var upperSqrtPrice = currentSqrtPrice;
    var lowerSqrtPrice = ticks[i].tickPrice;
    var maxAmountIn = maxAmountA(lowerSqrtPrice, currentSqrtPrice, liquity);
    var fullStepFee = maxAmountIn.mul(fee).toDP(0, Decimal.Decimal.ROUND_DOWN);

    if (remind.lessThan(fullStepFee)) {
      remindWithFee = remind;
    } else {
      remindWithFee = remind.sub(fullStepFee);
    }

    if (maxAmountIn.greaterThanOrEqualTo(remindWithFee)) {
      remindWithFee = remind.mul(new Decimal.Decimal(1).sub(fee)).toDP(0, Decimal.Decimal.ROUND_UP);

      var _swapA2B = swapA2B(upperSqrtPrice, liquity, remindWithFee),
          amountOut = _swapA2B.amountOut,
          afterSqrtPrice = _swapA2B.afterSqrtPrice;

      amountUsed = amountUsed.add(remind);
      feeUsed = feeUsed.add(remind.sub(remindWithFee));
      return {
        amountOut: out.add(amountOut),
        amountUsed: amountUsed,
        feeUsed: feeUsed,
        afterPrice: afterSqrtPrice,
        afterLiquity: liquity
      };
    } else {
      remind = remindWithFee.sub(maxAmountIn);
      amountUsed = amountUsed.add(maxAmountIn).add(fullStepFee);
      feeUsed = feeUsed.add(fullStepFee);
      out = out.add(maxAmountB(lowerSqrtPrice, upperSqrtPrice, liquity));
      liquity = liquity.sub(ticks[i].liquityNet);
      currentSqrtPrice = ticks[i].tickPrice.sub(PRICE_OFFSET); //upperSqrtPrice = ticks[i].tickPrice;
    }
  }

  return {
    amountOut: out,
    amountUsed: amountUsed,
    feeUsed: feeUsed,
    afterPrice: currentSqrtPrice,
    afterLiquity: liquity
  };
}
/**
 *
 * @param ticks The tick array of token swap
 * @param currentSqrtPrice The current sqrt price of token swap
 * @param fee The fee rate of token swap
 * @param currentLiquity The current liquity of token swap
 * @param amountIn The amount in of token B
 * @returns amountOut:The amount out of token B, amountUsed:The used of amountIn, afterPrice:The price after calculate, afterLiquity: The liquity after calculate
 */

function calculateSwapB2A(ticks, currentSqrtPrice, fee, currentLiquity, amountIn) {
  !amountIn.greaterThan(new Decimal.Decimal(0)) ?  invariant(false, "invalid amount in")  : void 0;
  !currentLiquity.greaterThanOrEqualTo(new Decimal.Decimal(0)) ?  invariant(false, "invalid liquity")  : void 0;
  !(ticks.length > 0) ?  invariant(false, "the ticks is empty")  : void 0; //let currentTick = sqrtPrice2Tick(currentSqrtPrice);

  !currentSqrtPrice.lessThan(ticks[ticks.length - 1].tickPrice) ?  invariant(false, "out of ticks")  : void 0;
  var liquity = currentLiquity;
  var out = new Decimal.Decimal(0);
  var remind = amountIn;
  var remindWithFee = new Decimal.Decimal(0);
  var amountUsed = new Decimal.Decimal(0);
  var feeUsed = new Decimal.Decimal(0);

  for (var i = 0; i < ticks.length; i++) {
    if (liquity.equals(new Decimal.Decimal(0))) {
      currentSqrtPrice = ticks[i].tickPrice.add(PRICE_OFFSET);
      liquity = liquity.add(ticks[i].liquityNet);
      continue;
    }

    if (currentSqrtPrice > ticks[i].tickPrice) {
      continue;
    }

    var upperSqrtPrice = ticks[i].tickPrice;
    var maxAmountIn = maxAmountB(currentSqrtPrice, upperSqrtPrice, liquity);
    var fullStepFee = maxAmountIn.mul(fee).toDP(0, Decimal.Decimal.ROUND_DOWN);

    if (remind.lessThan(fullStepFee)) {
      remindWithFee = remind;
    } else {
      remindWithFee = remind.sub(fullStepFee);
    }

    if (maxAmountIn.greaterThanOrEqualTo(remindWithFee)) {
      remindWithFee = remind.mul(new Decimal.Decimal(1).sub(fee)).toDP(0, Decimal.Decimal.ROUND_UP);

      var _swapB2A = swapB2A(currentSqrtPrice, liquity, remindWithFee),
          amountOut = _swapB2A.amountOut,
          afterSqrtPrice = _swapB2A.afterSqrtPrice;

      amountUsed = amountUsed.add(remind);
      feeUsed = feeUsed.add(remind.sub(remindWithFee));
      return {
        amountOut: out.add(amountOut),
        feeUsed: feeUsed,
        amountUsed: amountUsed,
        afterPrice: afterSqrtPrice.pow(2),
        afterLiquity: liquity
      };
    } else {
      remind = remindWithFee.sub(maxAmountIn);
      amountUsed = amountUsed.add(maxAmountIn).add(fullStepFee);
      feeUsed = feeUsed.add(fullStepFee);
      out = out.add(maxAmountA(currentSqrtPrice, upperSqrtPrice, liquity));
      liquity = liquity.add(ticks[i].liquityNet);
      currentSqrtPrice = ticks[i].tickPrice.add(PRICE_OFFSET);
    }
  }

  return {
    amountOut: out,
    amountUsed: amountUsed,
    feeUsed: feeUsed,
    afterPrice: currentSqrtPrice,
    afterLiquity: liquity
  };
}
/** @internal */

function maxAmountA(lowerSqrtPrice, upperSqrtPrice, liquity) {
  return liquity.div(lowerSqrtPrice).toDP(0, Decimal.Decimal.ROUND_DOWN).sub(liquity.div(upperSqrtPrice).toDP(0, Decimal.Decimal.ROUND_DOWN));
}
/** @internal */

function maxAmountB(lowerSqrtPrice, upperSqrtPrice, liquity) {
  return liquity.mul(upperSqrtPrice.sub(lowerSqrtPrice)).toDP(0, Decimal.Decimal.ROUND_DOWN);
}
/** @internal */

function swapA2B(upperSqrtPrice, liquity, amountIn) {
  var afterSqrtPrice = liquity.div(amountIn.add(liquity.div(upperSqrtPrice)));
  var delta_increase = amountIn.add(liquity.div(upperSqrtPrice).toDP(0, Decimal.Decimal.ROUND_DOWN));
  var out = liquity.mul(upperSqrtPrice).toDP(0, Decimal.Decimal.ROUND_DOWN).sub(liquity.mul(liquity).div(delta_increase).toDP(0, Decimal.Decimal.ROUND_DOWN));
  return {
    amountOut: out,
    afterSqrtPrice: afterSqrtPrice
  };
}
/** @internal */

function swapB2A(lowerSqrtPrice, liquity, amountIn) {
  var afterSqrtPrice = amountIn.div(liquity).add(lowerSqrtPrice);
  var delta_increase = amountIn.add(liquity.mul(lowerSqrtPrice).toDP(0, Decimal.Decimal.ROUND_DOWN));
  var out = liquity.div(lowerSqrtPrice).toDP(0, Decimal.Decimal.ROUND_DOWN).sub(liquity.mul(liquity).div(delta_increase).toDP(0, Decimal.Decimal.ROUND_DOWN));
  return {
    amountOut: out,
    afterSqrtPrice: afterSqrtPrice
  };
}

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

Decimal__default.config({
  precision: 64,
  rounding: Decimal__default.ROUND_DOWN,
  toExpNeg: -64,
  toExpPos: 64
});
var TEN = /*#__PURE__*/new Decimal__default(10);
var P64 = /*#__PURE__*/new Decimal__default(2).pow(64);
var MAX_INT64 = /*#__PURE__*/P64.div(2).sub(1);
var MIN_INT64 = /*#__PURE__*/P64.div(2).neg();
var MAX_UINT64 = /*#__PURE__*/P64.sub(1);
var MAX_INT128 = /*#__PURE__*/P64.pow(63).sub(1);
var MIN_INT128 = /*#__PURE__*/MAX_INT128.neg();
var MAX_UINT128 = /*#__PURE__*/P64.pow(64).sub(1);
var MAX_PRECISION = 40;
var DecimalExt = /*#__PURE__*/function () {
  function DecimalExt() {}

  /**
   * New a Decimal from a int64 buffer
   * @param buffer The buffer
   * @param precision The pricision
   * @returns The Decimal value, the result will be div 10^precision
   */
  DecimalExt.from64Buffer = function from64Buffer(buffer, precision) {
    if (precision === void 0) {
      precision = 0;
    }

    !(buffer.length === 8) ?  invariant(false, "Invalid buffer length: " + buffer.length)  : void 0;
    !(Math.abs(precision) < MAX_PRECISION) ?  invariant(false, "Invalid precision: " + precision)  : void 0;
    console.log(buffer);

    if (buffer[7] >= 0x80) {
      var ss = [];

      for (var _iterator = _createForOfIteratorHelperLoose(buffer), _step; !(_step = _iterator()).done;) {
        var v = _step.value;
        ss.push(("00" + Math.abs(~v & 0xff).toString(16)).slice(-2));
      }

      var bn = new BN(ss.join(""), 16, "le").add(new BN(1)).neg();
      return new Decimal__default(bn.toString()).div(TEN.pow(precision));
    }

    return new Decimal__default(new BN(buffer, "le").toString()).div(TEN.pow(precision));
  }
  /**
   * New a Decimal from a uint64 buffer
   * @param buffer The buffer
   * @param precision The precision
   * @returns The Decimal value, the result will be div 10^precision
   */
  ;

  DecimalExt.fromU64Buffer = function fromU64Buffer(buffer, precision) {
    if (precision === void 0) {
      precision = 0;
    }

    !(buffer.length === 8) ?  invariant(false, "Invalid buffer length: " + buffer.length)  : void 0;
    !(Math.abs(precision) < MAX_PRECISION) ?  invariant(false, "Invalid precision: " + precision)  : void 0;
    return new Decimal__default(new BN(buffer, 16, "le").toString()).div(TEN.pow(precision));
  }
  /**
   * New a Decimal from a int128 buffer
   * @param buffer The buffer
   * @param precision The pricision
   * @returns The Decimal value, the result will be div 10^precision
   */
  ;

  DecimalExt.from128Buffer = function from128Buffer(buffer, precision) {
    if (precision === void 0) {
      precision = 0;
    }

    !(buffer.length === 16) ?  invariant(false, "Invalid buffer length: " + buffer.length)  : void 0;
    !(Math.abs(precision) < MAX_PRECISION) ?  invariant(false, "Invalid precision: " + precision)  : void 0;

    if (buffer[15] >= 0x80) {
      var ss = [];

      for (var _iterator2 = _createForOfIteratorHelperLoose(buffer), _step2; !(_step2 = _iterator2()).done;) {
        var v = _step2.value;
        ss.push(("00" + Math.abs(~v & 0xff).toString(16)).slice(-2));
      }

      var bn = new BN(ss.join(""), 16, "le").add(new BN(1)).neg();
      return new Decimal__default(bn.toString()).div(TEN.pow(precision));
    }

    return new Decimal__default(new BN(buffer, "le").toString()).div(TEN.pow(precision));
  }
  /**
   * New a Decimal from a uint128 buffer
   * @param buffer The buffer
   * @param precision The precision
   * @returns The Decimal value, the result will be div 10^precision
   */
  ;

  DecimalExt.fromU128Buffer = function fromU128Buffer(buffer, precision) {
    if (precision === void 0) {
      precision = 0;
    }

    !(buffer.length === 16) ?  invariant(false, "Invalid buffer length: " + buffer.length)  : void 0;
    !(Math.abs(precision) < MAX_PRECISION) ?  invariant(false, "Invalid precision: " + precision)  : void 0;
    return new Decimal__default(new BN(buffer, "le").toString()).div(TEN.pow(precision));
  }
  /**
   * Convert a Decimal value to int64 buffer
   * @param v The Decimal value
   * @param precision The precision
   * @returns The buffer, the result will be mul 10^precision
   */
  ;

  DecimalExt.to64Buffer = function to64Buffer(v, precision) {
    if (precision === void 0) {
      precision = 0;
    }

    !(Math.abs(precision) < MAX_PRECISION) ?  invariant(false, "Invalid precision: " + precision)  : void 0;
    v = v.mul(TEN.pow(precision)).round();
    !(v.greaterThanOrEqualTo(MIN_INT64) && v.lessThanOrEqualTo(MAX_INT64)) ?  invariant(false, "Invalid v: " + v.toString() + " to int128 buffer with precision: " + precision)  : void 0;
    var bn = new BN(v.toString());

    if (bn.isNeg()) {
      var buffer = bn.add(new BN(1)).toBuffer("le", 8);
      buffer.forEach(function (item, index, input) {
        input[index] = ~item & 0xff;
      });
      return buffer;
    } else {
      return bn.toBuffer("le", 8);
    }
  }
  /**
   * Convert a Decimal value to uint64 buffer
   * @param v The Decimal value
   * @param precision The precision
   * @returns The buffer, the result will be mul 10^precision
   */
  ;

  DecimalExt.toU64Buffer = function toU64Buffer(v, precision) {
    if (precision === void 0) {
      precision = 0;
    }

    !(Math.abs(precision) < MAX_PRECISION) ?  invariant(false, "Invalid precision: " + precision)  : void 0;
    v = v.mul(TEN.pow(precision)).round();
    !(v.greaterThanOrEqualTo(0) && v.lessThanOrEqualTo(MAX_UINT64)) ?  invariant(false, "Invalid v: " + v.toString() + " to uint64 buffer with precision: " + precision)  : void 0;
    return new BN(v.toString()).toBuffer("le", 8);
  }
  /**
   * Convert a Decimal value to int128 buffer
   * @param v The Decimal value
   * @param precision The precision
   * @returns The buffer, the result will be mul 10^precision
   */
  ;

  DecimalExt.to128Buffer = function to128Buffer(v, precision) {
    if (precision === void 0) {
      precision = 0;
    }

    !(Math.abs(precision) < MAX_PRECISION) ?  invariant(false, "Invalid precision: " + precision)  : void 0;
    v = v.mul(TEN.pow(precision)).round();
    !(v.greaterThanOrEqualTo(MIN_INT128) && v.lessThanOrEqualTo(MAX_INT128)) ?  invariant(false, "Invalid v: " + v.toString() + " to int128 buffer with precision: " + precision)  : void 0;
    var bn = new BN(v.toString());

    if (bn.isNeg()) {
      var buffer = bn.add(new BN(1)).toBuffer("le", 16);
      buffer.forEach(function (item, index, input) {
        input[index] = ~item & 0xff;
      });
      return buffer;
    } else {
      return bn.toBuffer("le", 16);
    }
  }
  /**
   * Convert a Decimal value to uint128 buffer
   * @param v The Decimal value
   * @param precision The precision
   * @returns The buffer, the result will be mul 10^precision
   */
  ;

  DecimalExt.toU128Buffer = function toU128Buffer(v, precision) {
    if (precision === void 0) {
      precision = 0;
    }

    !(Math.abs(precision) < MAX_PRECISION) ?  invariant(false, "Invalid precision: " + precision)  : void 0;
    v = v.mul(TEN.pow(precision)).round();
    !(v.greaterThanOrEqualTo(0) && v.lessThanOrEqualTo(MAX_UINT128)) ?  invariant(false, "Invalid v: " + v.toString() + " to int128 buffer with precision: " + precision)  : void 0;
    return new BN(v.toString()).toBuffer("le", 16);
  };

  return DecimalExt;
}();

/** @internal */

var encodeDecode = function encodeDecode(layout) {
  var decode = layout.decode.bind(layout);
  var encode = layout.encode.bind(layout);
  return {
    decode: decode,
    encode: encode
  };
};
var publicKey = function publicKey(property) {
  if (property === void 0) {
    property = "publicKey";
  }

  var layout = bufferLayout.blob(32, property);

  var _encodeDecode = encodeDecode(layout),
      encode = _encodeDecode.encode,
      decode = _encodeDecode.decode;

  var publicKeyLayout = layout;

  publicKeyLayout.decode = function (buffer, offset) {
    var src = decode(buffer, offset);
    return new web3_js.PublicKey(src);
  };

  publicKeyLayout.encode = function (publicKey, buffer, offset) {
    var src = publicKey.toBuffer();
    return encode(src, buffer, offset);
  };

  return publicKeyLayout;
};
var uint64 = function uint64(property) {
  if (property === void 0) {
    property = "uint128";
  }

  return bufferLayout.blob(8, property);
};
var int64 = function int64(property) {
  if (property === void 0) {
    property = "uint128";
  }

  return bufferLayout.blob(8, property);
};
var int128 = function int128(property) {
  if (property === void 0) {
    property = "uint128";
  }

  return bufferLayout.blob(16, property);
};
var uint128 = function uint128(property) {
  if (property === void 0) {
    property = "uint128";
  }

  return bufferLayout.blob(16, property);
};
var decimal64 = function decimal64(property, precision) {
  if (property === void 0) {
    property = "uint64";
  }

  if (precision === void 0) {
    precision = 0;
  }

  var layout = bufferLayout.blob(8, property); //const { encode, decode } = encodeDecode(layout);

  var decimal64Layout = layout;

  var _decode = layout.decode.bind(layout);

  var _encode = layout.encode.bind(layout);

  decimal64Layout.decode = function (buffer, offset) {
    var src = Buffer.from(_decode(buffer, offset));
    return DecimalExt.from64Buffer(src, precision);
  };

  decimal64Layout.encode = function (decimal, buffer, offset) {
    var src = DecimalExt.to64Buffer(decimal, precision);
    return _encode(src, buffer, offset);
  };

  return decimal64Layout;
};
var decimalU64 = function decimalU64(property, precision) {
  if (property === void 0) {
    property = "uint64";
  }

  if (precision === void 0) {
    precision = 0;
  }

  var layout = bufferLayout.blob(8, property); //const { encode, decode } = encodeDecode(layout)

  var _decode = layout.decode.bind(layout);

  var _encode = layout.encode.bind(layout);

  var decimalU64Layout = layout;

  decimalU64Layout.decode = function (buffer, offset) {
    var src = Buffer.from(_decode(buffer, offset));
    return DecimalExt.fromU64Buffer(src, precision);
  };

  decimalU64Layout.encode = function (decimal, buffer, offset) {
    var src = DecimalExt.toU64Buffer(decimal, precision);
    return _encode(src, buffer, offset);
  };

  return decimalU64Layout;
};
var decimal128 = function decimal128(property, precision) {
  if (property === void 0) {
    property = "uint64";
  }

  if (precision === void 0) {
    precision = 0;
  }

  var layout = bufferLayout.blob(16, property); //const { encode, decode } = encodeDecode(layout);

  var _decode = layout.decode.bind(layout);

  var _encode = layout.encode.bind(layout);

  var decimal128Layout = layout;

  decimal128Layout.decode = function (buffer, offset) {
    var src = Buffer.from(_decode(buffer, offset));
    return DecimalExt.from128Buffer(src, precision);
  };

  decimal128Layout.encode = function (decimal, buffer, offset) {
    var src = DecimalExt.to128Buffer(decimal, precision);
    return _encode(src, buffer, offset);
  };

  return decimal128Layout;
};
var decimalU128 = function decimalU128(property, precision) {
  if (property === void 0) {
    property = "uint64";
  }

  if (precision === void 0) {
    precision = 0;
  }

  var layout = bufferLayout.blob(16, property); //const { encode, decode } = encodeDecode(layout);

  var _decode = layout.decode.bind(layout);

  var _encode = layout.encode.bind(layout);

  var decimalU128Layout = layout;

  decimalU128Layout.decode = function (buffer, offset) {
    var src = Buffer.from(_decode(buffer, offset));
    var val = DecimalExt.fromU128Buffer(src, precision);
    return val;
  };

  decimalU128Layout.encode = function (decimal, buffer, offset) {
    var src = DecimalExt.toU128Buffer(decimal, precision);
    return _encode(src, buffer, offset);
  };

  return decimalU128Layout;
};

var POSITIONS_ACCOUNT_SIZE = 360000;
var POSITIONS_ACCOUNT_TYPE = 2;
var PositionLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/publicKey("nftTokenId"), /*#__PURE__*/bufferLayout.s32("lowerTick"), /*#__PURE__*/bufferLayout.s32("upperTick"), /*#__PURE__*/decimalU128("liquity"), /*#__PURE__*/decimalU128("feeGrowthInsideALast", 16), /*#__PURE__*/decimalU128("feeGrowthInsideBLast", 16), /*#__PURE__*/decimalU128("tokenAFee", 16), /*#__PURE__*/decimalU128("tokenBFee", 16)], "position");
var PositionsAccountLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("swapVersion"), /*#__PURE__*/publicKey("tokenSwapKey"), /*#__PURE__*/bufferLayout.u8("accountType"), /*#__PURE__*/bufferLayout.s32("len"), /*#__PURE__*/bufferLayout.blob(POSITIONS_ACCOUNT_SIZE - 38, "dataFlat")], "positionsAccount");
var MAX_ACCOUNT_POSITION_LENGTH = /*#__PURE__*/Math.floor((POSITIONS_ACCOUNT_SIZE - 38) / PositionLayout.span);
var isPositionsAccount = function isPositionsAccount(info) {
  return info.data.readUInt8(33) === POSITIONS_ACCOUNT_TYPE;
};
var parsePositionsAccount = function parsePositionsAccount(pubkey, info) {
  if (!isPositionsAccount(info)) return;
  var buffer = Buffer.from(info.data);

  var _PositionsAccountLayo = PositionsAccountLayout.decode(buffer),
      swapVersion = _PositionsAccountLayo.swapVersion,
      tokenSwapKey = _PositionsAccountLayo.tokenSwapKey,
      accountType = _PositionsAccountLayo.accountType,
      len = _PositionsAccountLayo.len,
      dataFlat = _PositionsAccountLayo.dataFlat;

  var positionSpan = len * PositionLayout.span;
  var positionsBuffer = dataFlat.slice(0, positionSpan);
  var positions = bufferLayout.seq(PositionLayout, len).decode(positionsBuffer);
  var positionsAccount = {
    swapVersion: swapVersion,
    tokenSwapKey: tokenSwapKey,
    accountType: accountType,
    len: len,
    positions: positions
  };
  return {
    pubkey: pubkey,
    info: info,
    data: positionsAccount
  };
};

var TICKS_ACCOUNT_SIZE = 504000;
var TICKS_ACCOUNT_TYPE = 1;
var TickLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.s32("tick"), /*#__PURE__*/decimalU128("tickPrice", 12), /*#__PURE__*/decimalU128("liquityGross"), /*#__PURE__*/decimal128("liquityNet"), /*#__PURE__*/decimalU128("feeGrowthOutside0", 16), /*#__PURE__*/decimalU128("feeGrowthOutside1", 16)], "tickInfo");
var isTicksAccount = function isTicksAccount(info) {
  return info.data.readUInt8(33) === TICKS_ACCOUNT_TYPE;
};
var parseTicksAccount = function parseTicksAccount(pubkey, info) {
  if (!isTicksAccount(info)) return;
  var Layout = bufferLayout.struct([bufferLayout.u8("swapVersion"), publicKey("tokenSwapKey"), bufferLayout.u8("accountType"), bufferLayout.s32("len"), bufferLayout.blob(info.data.length - 38, "dataFlat")], "ticksAccount");
  var buffer = Buffer.from(info.data);

  var _Layout$decode = Layout.decode(buffer),
      swapVersion = _Layout$decode.swapVersion,
      tokenSwapKey = _Layout$decode.tokenSwapKey,
      accountType = _Layout$decode.accountType,
      len = _Layout$decode.len,
      dataFlat = _Layout$decode.dataFlat;

  var tickSpan = len * TickLayout.span;
  var ticksBuffer = dataFlat.slice(0, tickSpan);
  var ticks = bufferLayout.seq(TickLayout, len).decode(ticksBuffer);
  var ticksAccount = {
    swapVersion: swapVersion,
    tokenSwapKey: tokenSwapKey,
    accountType: accountType,
    len: len,
    ticks: ticks
  };
  return {
    pubkey: pubkey,
    info: info,
    data: ticksAccount
  };
};

var TOKEN_SWAP_ACCOUNT_TYPE = 0;
var TokenSwapAccountLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("version"), /*#__PURE__*/publicKey("tokenSwapKey"), /*#__PURE__*/bufferLayout.u8("accountType"), /*#__PURE__*/bufferLayout.u8("isInitialized"), /*#__PURE__*/bufferLayout.u8("nonce"), /*#__PURE__*/publicKey("tokenProgramId"), /*#__PURE__*/publicKey("manager"), /*#__PURE__*/publicKey("managerTokenA"), /*#__PURE__*/publicKey("managerTokenB"), /*#__PURE__*/publicKey("swapTokenA"), /*#__PURE__*/publicKey("swapTokenB"), /*#__PURE__*/publicKey("tokenAMint"), /*#__PURE__*/publicKey("tokenBMint"), /*#__PURE__*/publicKey("ticksKey"), /*#__PURE__*/publicKey("positionsKey"), /*#__PURE__*/bufferLayout.u8("curveType"), /*#__PURE__*/decimalU64("fee", 12), /*#__PURE__*/decimalU64("managerFee", 12), /*#__PURE__*/bufferLayout.u32("tickSpace"), /*#__PURE__*/decimalU128("currentSqrtPrice", 12), /*#__PURE__*/decimalU128("currentLiquity"), /*#__PURE__*/decimalU128("feeGrowthGlobal0", 16), /*#__PURE__*/decimalU128("feeGrowthGlobal1", 16), /*#__PURE__*/decimalU128("managerFeeA"), /*#__PURE__*/decimalU128("managerFeeB")], "tokenSwapAccount");
var TOKEN_SWAP_ACCOUNT_SIZE = TokenSwapAccountLayout.span;
var isTokenSwapAccount = function isTokenSwapAccount(info) {
  return info.data.readUInt8(33) === TOKEN_SWAP_ACCOUNT_TYPE;
};
var parseTokenSwapAccount = function parseTokenSwapAccount(pubkey, info) {
  if (!isTokenSwapAccount(info)) {
    return;
  }

  var buffer = Buffer.from(info.data);
  var tokenSwapAccount = TokenSwapAccountLayout.decode(buffer);
  return {
    pubkey: pubkey,
    info: info,
    data: tokenSwapAccount
  };
};

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

/** @internal */
var TokenSwapInstruction;

(function (TokenSwapInstruction) {
  TokenSwapInstruction[TokenSwapInstruction["Initialize"] = 0] = "Initialize";
  TokenSwapInstruction[TokenSwapInstruction["Swap"] = 1] = "Swap";
  TokenSwapInstruction[TokenSwapInstruction["DepositAllTokenTypes"] = 2] = "DepositAllTokenTypes";
  TokenSwapInstruction[TokenSwapInstruction["WithdrawAllTokenTypes"] = 3] = "WithdrawAllTokenTypes";
  TokenSwapInstruction[TokenSwapInstruction["Claim"] = 4] = "Claim";
  TokenSwapInstruction[TokenSwapInstruction["ManagerClaim"] = 5] = "ManagerClaim";
  TokenSwapInstruction[TokenSwapInstruction["AddUserPosition"] = 6] = "AddUserPosition";
  TokenSwapInstruction[TokenSwapInstruction["UpdateFee"] = 7] = "UpdateFee";
  TokenSwapInstruction[TokenSwapInstruction["SimulateSwap"] = 8] = "SimulateSwap";
})(TokenSwapInstruction || (TokenSwapInstruction = {}));

var DataLayout = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("instruction")]);
var addUserPositionInstruction = function addUserPositionInstruction(programId, authority, positionsKey) {
  var data = Buffer.alloc(DataLayout.span);
  DataLayout.encode({
    instruction: TokenSwapInstruction.AddUserPosition
  }, data);
  var keys = [{
    pubkey: programId,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: authority,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: positionsKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: splToken.TOKEN_PROGRAM_ID,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
};

var DataLayout$1 = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("instruction"), /*#__PURE__*/decimalU64("positionIndex")]);
var claimInstruction = function claimInstruction(programId, tokenSwapKey, authority, userTransferAuthority, swapTokenA, swapTokenB, userTokenA, userTokenB, nftMint, nftUser, ticksKey, positionsKey, positionIndex) {
  var data = Buffer.alloc(DataLayout$1.span);
  DataLayout$1.encode({
    instruction: TokenSwapInstruction.Claim,
    positionIndex: positionIndex
  }, data);
  var keys = [{
    pubkey: tokenSwapKey,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: authority,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: userTransferAuthority,
    isSigner: true,
    isWritable: false
  }, {
    pubkey: nftMint,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: nftUser,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: swapTokenA,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: swapTokenB,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: userTokenA,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: userTokenB,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: ticksKey,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: positionsKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: splToken.TOKEN_PROGRAM_ID,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
};

var DataLayout$2 = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("instruction"), /*#__PURE__*/bufferLayout.u8("isNewPosition"), /*#__PURE__*/decimalU128("liquityAmount"), /*#__PURE__*/bufferLayout.s32("tickLower"), /*#__PURE__*/bufferLayout.s32("tickUpper"), /*#__PURE__*/decimalU64("maximumTokenA"), /*#__PURE__*/decimalU64("maximumTokenB"), /*#__PURE__*/decimalU64("positionIndex")]);
var depositAllTokenTypesInstruction = function depositAllTokenTypesInstruction(programId, tokenSwapKey, authority, userTransferAuthority, userTokenA, userTokenB, swapTokenA, swapTokenB, nftMint, nftUser, ticksKey, positionsKey, isNewPosition, tickLower, tickUpper, liquityAmount, maximumTokenA, maximumTokenB, positionIndex) {
  var data = Buffer.alloc(DataLayout$2.span);
  DataLayout$2.encode({
    instruction: TokenSwapInstruction.DepositAllTokenTypes,
    isNewPosition: isNewPosition,
    liquityAmount: liquityAmount,
    tickLower: tickLower,
    tickUpper: tickUpper,
    maximumTokenA: maximumTokenA,
    maximumTokenB: maximumTokenB,
    positionIndex: positionIndex
  }, data);
  var keys = [{
    pubkey: tokenSwapKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: authority,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: userTransferAuthority,
    isSigner: true,
    isWritable: false
  }, {
    pubkey: userTokenA,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: userTokenB,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: swapTokenA,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: swapTokenB,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: nftMint,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: nftUser,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: ticksKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: positionsKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: splToken.TOKEN_PROGRAM_ID,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
};

var DataLayout$3 = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("instruction"), /*#__PURE__*/bufferLayout.u8("nonce"), /*#__PURE__*/bufferLayout.u8("curveType"), /*#__PURE__*/decimalU64("fee", 12), /*#__PURE__*/decimalU64("managerFee", 12), /*#__PURE__*/bufferLayout.u32("tickSpace"), /*#__PURE__*/decimalU128("currentSqrtPrice", 12), /*#__PURE__*/decimalU128("currentLiquity"), /*#__PURE__*/decimalU128("feeGrowthGlobal0"), /*#__PURE__*/decimalU128("feeGrowthGlobal1"), /*#__PURE__*/decimalU128("managerFeeA"), /*#__PURE__*/decimalU128("managerFeeB")]);
var initializeInstruction = function initializeInstruction(programId, tokenSwapKey, authority, manager, managerTokenA, managerTokenB, swapTokenA, swapTokenB, ticksKey, positionsKey, nonce, curveType, fee, managerFee, tickSpace, currentSqrtPrice) {
  var data = Buffer.alloc(DataLayout$3.span);
  DataLayout$3.encode({
    instruction: TokenSwapInstruction.Initialize,
    nonce: nonce,
    curveType: curveType,
    fee: fee,
    managerFee: managerFee,
    tickSpace: tickSpace,
    currentSqrtPrice: currentSqrtPrice,
    currentLiquity: new Decimal__default(0),
    feeGrowthGlobal0: new Decimal__default(0),
    feeGrowthGlobal1: new Decimal__default(0),
    managerFeeA: new Decimal__default(0),
    managerFeeB: new Decimal__default(0)
  }, data);
  var keys = [{
    pubkey: tokenSwapKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: authority,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: manager,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: managerTokenA,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: managerTokenB,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: swapTokenA,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: swapTokenB,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: ticksKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: positionsKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: splToken.TOKEN_PROGRAM_ID,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
};

var DataLayout$4 = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("instruction")]);
var managerClaimInstruction = function managerClaimInstruction(programId, tokenSwapKey, authority, userTransferAuthority, swapTokenA, swapTokenB, userTokenA, userTokenB) {
  var data = Buffer.alloc(DataLayout$4.span);
  DataLayout$4.encode({
    instruction: TokenSwapInstruction.ManagerClaim
  }, data);
  var keys = [{
    pubkey: tokenSwapKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: authority,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: userTransferAuthority,
    isSigner: true,
    isWritable: false
  }, {
    pubkey: swapTokenA,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: swapTokenB,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: userTokenA,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: userTokenB,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: splToken.TOKEN_PROGRAM_ID,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
};

var DataLayout$5 = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("instruction"), /*#__PURE__*/decimalU64("amountIn"),
/*#__PURE__*/
// decimalU64("minimumAmountOut"),
bufferLayout.u8("direction")]);
var simulateSwapInstruction = function simulateSwapInstruction(programId, tokenSwapKey, ticksKey, amountIn, // minimumAmountOut: Decimal,
direction) {
  var data = Buffer.alloc(DataLayout$5.span);
  DataLayout$5.encode({
    instruction: TokenSwapInstruction.SimulateSwap,
    amountIn: amountIn,
    // minimumAmountOut,
    direction: direction
  }, data);
  var keys = [{
    pubkey: tokenSwapKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: ticksKey,
    isSigner: false,
    isWritable: true
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
};

var DataLayout$6 = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("instruction"), /*#__PURE__*/decimalU64("amountIn"), /*#__PURE__*/decimalU64("minimumAmountOut")]);
var swapInstruction = function swapInstruction(programId, tokenSwapKey, authority, userTransferAuthority, userSource, userDestination, swapSource, swapDestination, ticksKey, amountIn, minimumAmountOut) {
  var data = Buffer.alloc(DataLayout$6.span);
  DataLayout$6.encode({
    instruction: TokenSwapInstruction.Swap,
    amountIn: amountIn,
    minimumAmountOut: minimumAmountOut
  }, data);
  var keys = [{
    pubkey: tokenSwapKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: authority,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: userTransferAuthority,
    isSigner: true,
    isWritable: false
  }, {
    pubkey: userSource,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: userDestination,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: swapSource,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: swapDestination,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: ticksKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: splToken.TOKEN_PROGRAM_ID,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
};

var DataLayout$7 = /*#__PURE__*/bufferLayout.struct([/*#__PURE__*/bufferLayout.u8("instruction"), /*#__PURE__*/decimalU64("liquityAmount"), /*#__PURE__*/decimalU64("minimumTokenA"), /*#__PURE__*/decimalU64("minimumTokenB"), /*#__PURE__*/decimalU64("positionIndex")]);
var withdrawAllTokenTypesInstruction = function withdrawAllTokenTypesInstruction(programId, tokenSwapKey, authority, userTransferAuthority, swapTokenA, swapTokenB, userTokenA, userTokenB, nftMint, nftUser, ticksKey, positionsKey, liquityAmount, minimumTokenA, minimumTokenB, positionIndex) {
  var data = Buffer.alloc(DataLayout$7.span);
  DataLayout$7.encode({
    instruction: TokenSwapInstruction.WithdrawAllTokenTypes,
    liquityAmount: liquityAmount,
    minimumTokenA: minimumTokenA,
    minimumTokenB: minimumTokenB,
    positionIndex: positionIndex
  }, data);
  var keys = [{
    pubkey: tokenSwapKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: authority,
    isSigner: false,
    isWritable: false
  }, {
    pubkey: userTransferAuthority,
    isSigner: true,
    isWritable: false
  }, {
    pubkey: nftMint,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: nftUser,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: swapTokenA,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: swapTokenB,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: userTokenA,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: userTokenB,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: ticksKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: positionsKey,
    isSigner: false,
    isWritable: true
  }, {
    pubkey: splToken.TOKEN_PROGRAM_ID,
    isSigner: false,
    isWritable: false
  }];
  return new web3_js.TransactionInstruction({
    keys: keys,
    programId: programId,
    data: data
  });
};

/* eslint-disable @typescript-eslint/restrict-plus-operands */

function chooseCluster() {
  dotenv.config();
  if (!process.env.LIVE) return;

  switch (process.env.CLUSTER) {
    case "devnet":
    case "testnet":
    case "mainnet-beta":
      {
        return process.env.CLUSTER;
      }
  }

  throw 'Unknown cluster "' + process.env.CLUSTER + '", check the .env file';
}

var cluster = /*#__PURE__*/chooseCluster();
var url = process.env.RPC_URL || (process.env.LIVE ? /*#__PURE__*/web3_js.clusterApiUrl(cluster, false) : "http://localhost:8899");
var urlTls = process.env.RPC_URL || (process.env.LIVE ? /*#__PURE__*/web3_js.clusterApiUrl(cluster, true) : "http://localhost:8899");
var walletUrl = process.env.WALLET_URL || "https://solana-example-webwallet.herokuapp.com/";

/**
 * Send and confirm trnasaction with default option
 * @param conn The connection to use
 * @param transaction The transaction
 * @param signers The signers array
 * @returns
 */

function sendAndConfirmTransaction(_x, _x2) {
  return _sendAndConfirmTransaction.apply(this, arguments);
}

function _sendAndConfirmTransaction() {
  _sendAndConfirmTransaction = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(conn, transaction) {
    var _len,
        signers,
        _key,
        _args = arguments;

    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            for (_len = _args.length, signers = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
              signers[_key - 2] = _args[_key];
            }

            return _context.abrupt("return", web3_js.sendAndConfirmTransaction(conn, transaction, signers, {
              skipPreflight: false,
              commitment: "recent",
              preflightCommitment: "recent"
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sendAndConfirmTransaction.apply(this, arguments);
}

/**
 * Get a authority token account address
 * @param tokenMint The mint of token
 * @param owner The owner associated token address
 * @returns
 */

function getAssociatedTokenAddress(_x, _x2) {
  return _getAssociatedTokenAddress.apply(this, arguments);
}
/**
 * Get a create associated token account instruction
 * @param tokenMint The mint of token
 * @param owner The owner associated token address
 * @param authority The authority token account address
 * @param payer The pays for transaction
 * @returns
 */

function _getAssociatedTokenAddress() {
  _getAssociatedTokenAddress = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee(tokenMint, owner) {
    return runtime_1.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return splToken.Token.getAssociatedTokenAddress(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, tokenMint, owner, true);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getAssociatedTokenAddress.apply(this, arguments);
}

function createAssociatedTokenAccountInstruction(tokenMint, associatedAccount, owner, payer) {
  return splToken.Token.createAssociatedTokenAccountInstruction(splToken.ASSOCIATED_TOKEN_PROGRAM_ID, splToken.TOKEN_PROGRAM_ID, tokenMint, associatedAccount, owner, payer);
}
/**
 * Get the token account info by address
 * @param conn The connection to use
 * @param address The token account address
 * @returns
 */

function getTokenAccount(_x3, _x4) {
  return _getTokenAccount.apply(this, arguments);
}
/**
 * Get the token accounts by owner
 * @param conn The connection to use
 * @param owner The owner address
 * @returns The token accounts
 */

function _getTokenAccount() {
  _getTokenAccount = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(conn, address) {
    var account, accountInfo;
    return runtime_1.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return conn.getAccountInfo(address);

          case 2:
            account = _context2.sent;
            !((account == null ? void 0 : account.data) !== null) ?  invariant(false, "The token account:" + address.toBase58() + " data is null")  : void 0;
            !(account !== null) ?  invariant(false, "the account is null")  : void 0;
            accountInfo = parseTokenAccount(account);
            accountInfo.address = address;
            return _context2.abrupt("return", accountInfo);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _getTokenAccount.apply(this, arguments);
}

function getTokenAccounts(_x5, _x6) {
  return _getTokenAccounts.apply(this, arguments);
}

function _getTokenAccounts() {
  _getTokenAccounts = _asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(conn, owner) {
    var accounts, accountInfos, i, _accounts$value$i, pubkey, account, accountInfo;

    return runtime_1.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return conn.getTokenAccountsByOwner(owner, {
              programId: splToken.TOKEN_PROGRAM_ID
            });

          case 2:
            accounts = _context3.sent;
            accountInfos = [];

            for (i = 0; i < accounts.value.length; i++) {
              _accounts$value$i = accounts.value[i], pubkey = _accounts$value$i.pubkey, account = _accounts$value$i.account;
              !((account == null ? void 0 : account.data) !== null) ?  invariant(false, "The token account:" + pubkey.toBase58() + " data is null")  : void 0;
              accountInfo = parseTokenAccount(account);
              accountInfo.address = pubkey;
              accountInfos.push(accountInfo);
            }

            return _context3.abrupt("return", accountInfos);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _getTokenAccounts.apply(this, arguments);
}

function parseTokenAccountData(data) {
  var accountInfo = splToken.AccountLayout.decode(data);
  accountInfo.mint = new web3_js.PublicKey(accountInfo.mint);
  accountInfo.owner = new web3_js.PublicKey(accountInfo.owner);
  accountInfo.amount = splToken.u64.fromBuffer(accountInfo.amount);

  if (accountInfo.delegateOption === 0) {
    accountInfo.delegate = null;
    accountInfo.delegatedAmount = new splToken.u64(0);
  } else {
    accountInfo.delegate = new web3_js.PublicKey(accountInfo.delegate);
    accountInfo.delegatedAmount = splToken.u64.fromBuffer(accountInfo.delegatedAmount);
  }

  accountInfo.isInitialized = accountInfo.state !== 0;
  accountInfo.isFrozen = accountInfo.state === 2;

  if (accountInfo.isNativeOption === 1) {
    accountInfo.rentExemptReserve = splToken.u64.fromBuffer(accountInfo.isNative);
    accountInfo.isNative = true;
  } else {
    accountInfo.rentExemptReserve = null;
    accountInfo.isNative = false;
  }

  if (accountInfo.closeAuthorityOption === 0) {
    accountInfo.closeAuthority = null;
  } else {
    accountInfo.closeAuthority = new web3_js.PublicKey(accountInfo.closeAuthority);
  }

  return accountInfo;
}
function parseTokenAccount(account) {
  !((account == null ? void 0 : account.data) !== null) ?  invariant(false, "The account data is null")  : void 0;
  var accountInfo = splToken.AccountLayout.decode(account == null ? void 0 : account.data);
  accountInfo.mint = new web3_js.PublicKey(accountInfo.mint);
  accountInfo.owner = new web3_js.PublicKey(accountInfo.owner);
  accountInfo.amount = splToken.u64.fromBuffer(accountInfo.amount);

  if (accountInfo.delegateOption === 0) {
    accountInfo.delegate = null;
    accountInfo.delegatedAmount = new splToken.u64(0);
  } else {
    accountInfo.delegate = new web3_js.PublicKey(accountInfo.delegate);
    accountInfo.delegatedAmount = splToken.u64.fromBuffer(accountInfo.delegatedAmount);
  }

  accountInfo.isInitialized = accountInfo.state !== 0;
  accountInfo.isFrozen = accountInfo.state === 2;

  if (accountInfo.isNativeOption === 1) {
    accountInfo.rentExemptReserve = splToken.u64.fromBuffer(accountInfo.isNative);
    accountInfo.isNative = true;
  } else {
    accountInfo.rentExemptReserve = null;
    accountInfo.isNative = false;
  }

  if (accountInfo.closeAuthorityOption === 0) {
    accountInfo.closeAuthority = null;
  } else {
    accountInfo.closeAuthority = new web3_js.PublicKey(accountInfo.closeAuthority);
  }

  return accountInfo;
}

var INIT_KEY = /*#__PURE__*/new web3_js.PublicKey("11111111111111111111111111111111");
Decimal__default.config({
  precision: 64,
  rounding: Decimal__default.ROUND_HALF_DOWN,
  toExpNeg: -64,
  toExpPos: 64
});
/**
 * The token swap class
 */

var TokenSwap = /*#__PURE__*/function () {
  /**
   * The constructor of TokenSwap
   * @param conn The connection to use
   * @param programId The token swap program id
   * @param tokenSwapKey The token swap key
   * @param payer The default pays for the transaction
   */
  function TokenSwap(conn, programId, tokenSwapKey, payer) {
    this.programId = INIT_KEY;
    this.tokenSwapKey = INIT_KEY;
    this.authority = INIT_KEY;
    this.isLoaded = false;
    this.currentTick = 0;
    this.tokenSwapInfo = {
      tokenSwapKey: INIT_KEY,
      accountType: 0,
      version: 0,
      isInitialized: 0,
      nonce: 0,
      tokenProgramId: splToken.TOKEN_PROGRAM_ID,
      manager: INIT_KEY,
      managerTokenA: INIT_KEY,
      managerTokenB: INIT_KEY,
      swapTokenA: INIT_KEY,
      swapTokenB: INIT_KEY,
      tokenAMint: INIT_KEY,
      tokenBMint: INIT_KEY,
      ticksKey: INIT_KEY,
      positionsKey: INIT_KEY,
      curveType: 0,
      fee: new Decimal__default(0),
      managerFee: new Decimal__default(0),
      tickSpace: 0,
      currentSqrtPrice: new Decimal__default(0),
      currentLiquity: new Decimal__default(0),
      feeGrowthGlobal0: new Decimal__default(0),
      feeGrowthGlobal1: new Decimal__default(0),
      managerFeeA: new Decimal__default(0),
      managerFeeB: new Decimal__default(0)
    };
    this.ticks = [];
    this.conn = conn;
    this.tokenSwapKey = tokenSwapKey;
    this.programId = programId;
    this.payer = payer;
    this.positions = new Map();
    this.positionsKeys = new Map();
  }
  /**
   * Set the default payer
   * @returns
   */


  var _proto = TokenSwap.prototype;

  _proto.setDefaultPayer = function setDefaultPayer(payer) {
    this.payer = payer;
  }
  /**
   * Load the token swap info
   */
  ;

  _proto.load =
  /*#__PURE__*/
  function () {
    var _load = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee() {
      var _this = this;

      var config, accounts, _yield$PublicKey$find, authority;

      return runtime_1.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              config = {
                encoding: "base64",
                filters: [{
                  memcmp: {
                    offset: 1,
                    bytes: this.tokenSwapKey.toBase58()
                  }
                }]
              };
              _context.next = 3;
              return this.conn.getProgramAccounts(this.programId, config);

            case 3:
              accounts = _context.sent;
              accounts.map(function (item) {
                if (isTokenSwapAccount(item.account)) {
                  var info = parseTokenSwapAccount(item.pubkey, item.account);
                  !((info == null ? void 0 : info.data) !== undefined) ?  invariant(false, "The token swap account parse failed")  : void 0;
                  _this.tokenSwapInfo = info.data;
                } else if (isTicksAccount(item.account)) {
                  var _info = parseTicksAccount(item.pubkey, item.account);

                  !((_info == null ? void 0 : _info.data) !== undefined) ?  invariant(false, "The tick account parse failed")  : void 0;
                  _this.ticks = _info.data.ticks;
                } else if (isPositionsAccount(item.account)) {
                  var _info2 = parsePositionsAccount(item.pubkey, item.account);

                  !((_info2 == null ? void 0 : _info2.data) !== undefined) ?  invariant(false, "The position account data parse failed")  : void 0;

                  _this.positionsKeys.set(item.pubkey, _info2.data.positions.length);

                  for (var i = 0; i < _info2.data.positions.length; i++) {
                    var p = _info2.data.positions[i];

                    _this.positions.set(p.nftTokenId.toBase58(), {
                      positionsKey: item.pubkey,
                      index: new Decimal__default(i),
                      positionId: p.nftTokenId,
                      lowerTick: p.lowerTick,
                      upperTick: p.upperTick,
                      liquity: p.liquity,
                      feeGrowthInsideALast: p.feeGrowthInsideALast,
                      feeGrowthInsideBLast: p.feeGrowthInsideBLast,
                      tokenAFee: p.tokenAFee,
                      tokenBFee: p.tokenBFee
                    });
                  }
                } else {
                  console.log("the account:%s length:%d unkown", item.pubkey.toString(), item.account.data.length);
                }
              });

              if (!(this.authority.toString() === INIT_KEY.toString())) {
                _context.next = 11;
                break;
              }

              _context.next = 8;
              return web3_js.PublicKey.findProgramAddress([this.tokenSwapKey.toBuffer()], this.programId);

            case 8:
              _yield$PublicKey$find = _context.sent;
              authority = _yield$PublicKey$find[0];
              this.authority = authority;

            case 11:
              this.isLoaded = true;
              this.currentTick = sqrtPrice2Tick(this.tokenSwapInfo.currentSqrtPrice);
              return _context.abrupt("return", this);

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function load() {
      return _load.apply(this, arguments);
    }

    return load;
  }()
  /**
   * Create a new token swap
   * @param conn The connection to use
   * @param programId The token swap program id
   * @param payer Pays for the transaction
   * @param tokenAMint The token A mint
   * @param tokenBMint The token B mint
   * @param manager The manager
   * @param fee The fee of token swap
   * @param managerFee The manager(protocol) fee of token swap
   * @param tickSpace The tick space
   * @param initializePrice The initilized price of token swap
   * @param payer The pays for the transaction
   */
  ;

  TokenSwap.createTokenSwap =
  /*#__PURE__*/
  function () {
    var _createTokenSwap = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee2(conn, programId, tokenAMint, tokenBMint, manager, fee, managerFee, tickSpace, initializePrice, payer, isDebug) {
      var tokenSwapAccount, ticksAccount, positionsAccount, _yield$PublicKey$find2, authority, nonce, ticksAccountLamports, positionsAccountLarports, tokenSwapAccountLamports, transaction, swapTokenA, swapTokenB, currentSqrtPrice, tokenA, tokenB, managerTokenA, managerTokenB, curveType, tx;

      return runtime_1.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (isDebug === void 0) {
                isDebug = false;
              }

              // generate account create instruction that token swap need
              tokenSwapAccount = web3_js.Keypair.generate();
              ticksAccount = web3_js.Keypair.generate();
              positionsAccount = web3_js.Keypair.generate();
              _context2.next = 6;
              return web3_js.PublicKey.findProgramAddress([tokenSwapAccount.publicKey.toBuffer()], programId);

            case 6:
              _yield$PublicKey$find2 = _context2.sent;
              authority = _yield$PublicKey$find2[0];
              nonce = _yield$PublicKey$find2[1];
              _context2.next = 11;
              return conn.getMinimumBalanceForRentExemption(TICKS_ACCOUNT_SIZE);

            case 11:
              ticksAccountLamports = _context2.sent;
              _context2.next = 14;
              return conn.getMinimumBalanceForRentExemption(POSITIONS_ACCOUNT_SIZE);

            case 14:
              positionsAccountLarports = _context2.sent;
              _context2.next = 17;
              return conn.getMinimumBalanceForRentExemption(TOKEN_SWAP_ACCOUNT_SIZE);

            case 17:
              tokenSwapAccountLamports = _context2.sent;
              transaction = new web3_js.Transaction().add(web3_js.SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: tokenSwapAccount.publicKey,
                lamports: tokenSwapAccountLamports,
                space: TOKEN_SWAP_ACCOUNT_SIZE,
                programId: programId
              }), web3_js.SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: ticksAccount.publicKey,
                lamports: ticksAccountLamports,
                space: TICKS_ACCOUNT_SIZE,
                programId: programId
              }), web3_js.SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: positionsAccount.publicKey,
                lamports: positionsAccountLarports,
                space: POSITIONS_ACCOUNT_SIZE,
                programId: programId
              })); // generate create token swap authority token account instruction

              _context2.next = 21;
              return getAssociatedTokenAddress(tokenAMint, authority);

            case 21:
              swapTokenA = _context2.sent;
              _context2.next = 24;
              return getAssociatedTokenAddress(tokenBMint, authority);

            case 24:
              swapTokenB = _context2.sent;
              transaction.add(createAssociatedTokenAccountInstruction(tokenAMint, swapTokenA, authority, payer.publicKey), createAssociatedTokenAccountInstruction(tokenBMint, swapTokenB, authority, payer.publicKey)); // generate token swap initialize instruction

              currentSqrtPrice = initializePrice.sqrt();
              tokenA = new splToken.Token(conn, tokenAMint, splToken.TOKEN_PROGRAM_ID, payer);
              tokenB = new splToken.Token(conn, tokenBMint, splToken.TOKEN_PROGRAM_ID, payer);
              _context2.next = 31;
              return tokenA.getOrCreateAssociatedAccountInfo(manager);

            case 31:
              managerTokenA = _context2.sent;
              _context2.next = 34;
              return tokenB.getOrCreateAssociatedAccountInfo(manager);

            case 34:
              managerTokenB = _context2.sent;
              curveType = 0;
              transaction.add(initializeInstruction(programId, tokenSwapAccount.publicKey, authority, manager, managerTokenA.address, managerTokenB.address, swapTokenA, swapTokenB, ticksAccount.publicKey, positionsAccount.publicKey, nonce, curveType, fee, managerFee, tickSpace, currentSqrtPrice)); // send and confirm transaction

              _context2.next = 39;
              return sendAndConfirmTransaction(conn, transaction, payer, tokenSwapAccount, ticksAccount, positionsAccount);

            case 39:
              tx = _context2.sent;

              if (isDebug) {
                console.log(tx);
              }

              _context2.next = 43;
              return new TokenSwap(conn, programId, tokenSwapAccount.publicKey, payer).load();

            case 43:
              return _context2.abrupt("return", _context2.sent);

            case 44:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    function createTokenSwap(_x, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11) {
      return _createTokenSwap.apply(this, arguments);
    }

    return createTokenSwap;
  }()
  /**
   *
   * @param userTokenA The user address of token A
   * @param userTokenB The user address of token B
   * @param lowerTick The lower tick
   * @param upperTick The upper tick
   * @param liquity The liquity amount
   * @param maximumAmountA The maximum amount of Token A
   * @param maximumAmountB The maximum amount of Token B
   * @param userTransferAuthroity The pays for the transaction
   * @returns
   */
  ;

  _proto.mintPosition =
  /*#__PURE__*/
  function () {
    var _mintPosition = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee3(userTokenA, userTokenB, lowerTick, upperTick, liquity, maximumAmountA, maximumAmountB, userTransferAuthroity, payer) {
      var nftMintAccount, nftUser, accountLamports, positionsKey, transaction;
      return runtime_1.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (payer === void 0) {
                payer = null;
              }

              if (!this.isLoaded) {
                _context3.next = 4;
                break;
              }

              _context3.next = 4;
              return this.load();

            case 4:
              !(lowerTick < upperTick) ?  invariant(false, "The lowerTick must be less than upperTick")  : void 0;
              payer = payer !== null ? payer : this.payer;
              !(payer !== null) ?  invariant(false, "The payer is null")  : void 0; // Generate create position nft token instructions

              nftMintAccount = web3_js.Keypair.generate();
              _context3.next = 10;
              return getAssociatedTokenAddress(nftMintAccount.publicKey, payer.publicKey);

            case 10:
              nftUser = _context3.sent;
              _context3.next = 13;
              return splToken.Token.getMinBalanceRentForExemptAccount(this.conn);

            case 13:
              accountLamports = _context3.sent;
              positionsKey = this.choosePosition();
              !(positionsKey !== null) ?  invariant(false, "The position account space is full")  : void 0;
              transaction = new web3_js.Transaction();
              transaction.add(web3_js.SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: nftMintAccount.publicKey,
                lamports: accountLamports,
                space: splToken.MintLayout.span,
                programId: splToken.TOKEN_PROGRAM_ID
              }), splToken.Token.createInitMintInstruction(splToken.TOKEN_PROGRAM_ID, nftMintAccount.publicKey, 0, this.authority, null), createAssociatedTokenAccountInstruction(nftMintAccount.publicKey, nftUser, payer.publicKey, payer.publicKey)); // Generate mint positon instruction

              transaction.add(depositAllTokenTypesInstruction(this.programId, this.tokenSwapKey, this.authority, userTransferAuthroity.publicKey, userTokenA, userTokenB, this.tokenSwapInfo.swapTokenA, this.tokenSwapInfo.swapTokenB, nftMintAccount.publicKey, nftUser, this.tokenSwapInfo.ticksKey, positionsKey, 0, lowerTick, upperTick, liquity, maximumAmountA, maximumAmountB, new Decimal__default(0))); // send and confirm transaction

              _context3.next = 21;
              return sendAndConfirmTransaction(this.conn, transaction, payer, userTransferAuthroity, nftMintAccount);

            case 21:
              return _context3.abrupt("return", _context3.sent);

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function mintPosition(_x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20) {
      return _mintPosition.apply(this, arguments);
    }

    return mintPosition;
  }()
  /**
   * Increase liquity on a exist position
   * @param positionId The position id (nft mint address)
   * @param userTokenA The user address of token A
   * @param userTokenB The user address of token B
   * @param lowerTick The lower tick
   * @param upperTick The upper tick
   * @param liquity The liquity amount
   * @param maximumAmountA The maximum of token A
   * @param maximumAmountB The maximum of token B
   * @returns
   */
  ;

  _proto.increaseLiquity =
  /*#__PURE__*/
  function () {
    var _increaseLiquity = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee4(positionId, userTokenA, userTokenB, liquity, maximumAmountA, maximumAmountB, payer) {
      var positionInfo, nftToken, nftUser, transaction;
      return runtime_1.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              if (payer === void 0) {
                payer = null;
              }

              if (this.isLoaded) {
                _context4.next = 4;
                break;
              }

              _context4.next = 4;
              return this.load();

            case 4:
              positionInfo = this.getPositionInfo(positionId);
              !(positionInfo !== undefined) ?  invariant(false, "Position:" + positionId.toString() + " not found")  : void 0;
              payer = payer !== null ? payer : this.payer;
              !(payer !== null) ?  invariant(false, "The payer is null")  : void 0;
              nftToken = new splToken.Token(this.conn, positionId, splToken.TOKEN_PROGRAM_ID, payer);
              _context4.t0 = nftToken;
              _context4.next = 12;
              return getAssociatedTokenAddress(nftToken.publicKey, payer.publicKey);

            case 12:
              _context4.t1 = _context4.sent;
              _context4.next = 15;
              return _context4.t0.getAccountInfo.call(_context4.t0, _context4.t1);

            case 15:
              nftUser = _context4.sent;
              !(nftUser.amount.toNumber() === 1) ?  invariant(false, "You not hold this position:" + nftToken.publicKey.toBase58())  : void 0; // Generate mint positon instruction

              transaction = new web3_js.Transaction();
              transaction.add(depositAllTokenTypesInstruction(this.programId, this.tokenSwapKey, this.authority, payer.publicKey, userTokenA, userTokenB, this.tokenSwapInfo.swapTokenA, this.tokenSwapInfo.swapTokenB, positionId, nftUser.address, this.tokenSwapInfo.ticksKey, positionInfo.positionsKey, 1, positionInfo.lowerTick, positionInfo.upperTick, liquity, maximumAmountA, maximumAmountB, positionInfo.index)); // send and confirm transaction

              _context4.next = 21;
              return sendAndConfirmTransaction(this.conn, transaction, payer);

            case 21:
              return _context4.abrupt("return", _context4.sent);

            case 22:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function increaseLiquity(_x21, _x22, _x23, _x24, _x25, _x26, _x27) {
      return _increaseLiquity.apply(this, arguments);
    }

    return increaseLiquity;
  }()
  /**
   * Decrease liquity, after decrease if liquity amount is zero the position will be remove
   * @param positionId The position id (nft mint address)
   * @param userTokenA The user address of token A
   * @param userTokenB The user address of token B
   * @param liquity The liquity amount
   * @param minimumAmountA The minimum amount of token A want recv
   * @param minimumAmountB The minimum amount of token b want recv
   * @param userAuthroity The pays for the transaction
   * @returns
   */
  ;

  _proto.decreaseLiquity =
  /*#__PURE__*/
  function () {
    var _decreaseLiquity = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee5(positionId, userTokenA, userTokenB, liquity, minimumAmountA, minimumAmountB, payer) {
      var positionInfo, nftToken, nftUser, transaction;
      return runtime_1.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              if (payer === void 0) {
                payer = null;
              }

              if (this.isLoaded) {
                _context5.next = 4;
                break;
              }

              _context5.next = 4;
              return this.load();

            case 4:
              positionInfo = this.getPositionInfo(positionId);
              !(positionInfo !== undefined) ?  invariant(false, "Position:" + positionId.toString() + " not found")  : void 0;
              payer = payer !== null ? payer : this.payer;
              !(payer !== null) ?  invariant(false, "The payer is null")  : void 0;
              nftToken = new splToken.Token(this.conn, positionId, splToken.TOKEN_PROGRAM_ID, payer);
              _context5.t0 = nftToken;
              _context5.next = 12;
              return getAssociatedTokenAddress(nftToken.publicKey, payer.publicKey);

            case 12:
              _context5.t1 = _context5.sent;
              _context5.next = 15;
              return _context5.t0.getAccountInfo.call(_context5.t0, _context5.t1);

            case 15:
              nftUser = _context5.sent;
              !(nftUser.amount.toNumber() === 1) ?  invariant(false, "You not hold this position:" + nftToken.publicKey.toBase58())  : void 0; // Create withdrawAllTokenTypes instruction

              transaction = new web3_js.Transaction().add(withdrawAllTokenTypesInstruction(this.programId, this.tokenSwapKey, this.authority, payer.publicKey, this.tokenSwapInfo.swapTokenA, this.tokenSwapInfo.swapTokenB, userTokenA, userTokenB, positionId, nftUser.address, this.tokenSwapInfo.ticksKey, positionInfo.positionsKey, liquity, minimumAmountA, minimumAmountB, positionInfo.index)); // send and confirm transaction

              _context5.next = 20;
              return sendAndConfirmTransaction(this.conn, transaction, payer);

            case 20:
              return _context5.abrupt("return", _context5.sent);

            case 21:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function decreaseLiquity(_x28, _x29, _x30, _x31, _x32, _x33, _x34) {
      return _decreaseLiquity.apply(this, arguments);
    }

    return decreaseLiquity;
  }()
  /**
   *
   * @param userSource The token that user want swap out
   * @param userDestination The token that user want swap in
   * @param direct 0-A swap B, 1-B swap A
   * @param amountIn The amount in
   * @param minimumAmountOut The minimum amount out
   * @param userTransactionAuthority Account delegated to transfer user's tokens
   * @returns
   */
  ;

  _proto.swap =
  /*#__PURE__*/
  function () {
    var _swap = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee6(userSource, userDestination, direct, amountIn, minimumAmountOut, userTransferAuthority, payer) {
      var _ref, swapSrc, swapDst, transaction;

      return runtime_1.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              if (payer === void 0) {
                payer = null;
              }

              if (this.isLoaded) {
                _context6.next = 4;
                break;
              }

              _context6.next = 4;
              return this.load();

            case 4:
              payer = payer !== null ? payer : this.payer;
              !(payer !== null) ?  invariant(false, "The payer is null")  : void 0;
              _ref = direct === 1 ? {
                swapSrc: this.tokenSwapInfo.swapTokenA,
                swapDst: this.tokenSwapInfo.swapTokenB
              } : {
                swapSrc: this.tokenSwapInfo.swapTokenB,
                swapDst: this.tokenSwapInfo.swapTokenA
              }, swapSrc = _ref.swapSrc, swapDst = _ref.swapDst;
              transaction = new web3_js.Transaction().add(swapInstruction(this.programId, this.tokenSwapKey, this.authority, userTransferAuthority.publicKey, userSource, userDestination, swapSrc, swapDst, this.tokenSwapInfo.ticksKey, amountIn, minimumAmountOut)); // send and confirm transaction

              _context6.next = 10;
              return sendAndConfirmTransaction(this.conn, transaction, payer, userTransferAuthority);

            case 10:
              return _context6.abrupt("return", _context6.sent);

            case 11:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function swap(_x35, _x36, _x37, _x38, _x39, _x40, _x41) {
      return _swap.apply(this, arguments);
    }

    return swap;
  }();

  _proto.simulateSwap = /*#__PURE__*/function () {
    var _simulateSwap = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee7(amountIn, direction, payer) {
      var transaction, res;
      return runtime_1.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              if (this.isLoaded) {
                _context7.next = 3;
                break;
              }

              _context7.next = 3;
              return this.load();

            case 3:
              transaction = new web3_js.Transaction().add(simulateSwapInstruction(this.programId, this.tokenSwapKey, this.tokenSwapInfo.ticksKey, amountIn, direction));
              _context7.next = 6;
              return this.conn.simulateTransaction(transaction, [payer]);

            case 6:
              res = _context7.sent;
              console.log(res);

            case 8:
            case "end":
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function simulateSwap(_x42, _x43, _x44) {
      return _simulateSwap.apply(this, arguments);
    }

    return simulateSwap;
  }()
  /**
   *
   * Collect fee from specified position
   * @param positionID The NFT token public key of position
   * @param userTokenA The user address of token A
   * @param userTokenB The user address of token B
   * @param userAuthroity The pays for the transaction
   * @returns
   */
  ;

  _proto.collect =
  /*#__PURE__*/
  function () {
    var _collect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee8(positionId, userTokenA, userTokenB, payer) {
      var positionInfo, nftToken, nftUser, transaction;
      return runtime_1.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              if (payer === void 0) {
                payer = null;
              }

              if (this.isLoaded) {
                _context8.next = 4;
                break;
              }

              _context8.next = 4;
              return this.load();

            case 4:
              positionInfo = this.getPositionInfo(positionId);
              !(positionInfo !== undefined) ?  invariant(false, "Position:" + positionId.toString() + " not found")  : void 0;
              payer = payer !== null ? payer : this.payer;
              !(payer !== null) ?  invariant(false, "The payer is null")  : void 0;
              nftToken = new splToken.Token(this.conn, positionId, splToken.TOKEN_PROGRAM_ID, payer);
              _context8.t0 = nftToken;
              _context8.next = 12;
              return getAssociatedTokenAddress(nftToken.publicKey, payer.publicKey);

            case 12:
              _context8.t1 = _context8.sent;
              _context8.next = 15;
              return _context8.t0.getAccountInfo.call(_context8.t0, _context8.t1);

            case 15:
              nftUser = _context8.sent;
              !(nftUser.amount.toNumber() === 1) ?  invariant(false, "You not hold this position:" + nftToken.publicKey.toBase58())  : void 0;
              transaction = new web3_js.Transaction().add(claimInstruction(this.programId, this.tokenSwapKey, this.authority, payer.publicKey, this.tokenSwapInfo.swapTokenB, this.tokenSwapInfo.swapTokenB, userTokenA, userTokenB, positionId, nftUser.address, this.tokenSwapInfo.ticksKey, positionInfo.positionsKey, positionInfo.index)); // send and confirm transaction

              _context8.next = 20;
              return sendAndConfirmTransaction(this.conn, transaction, payer);

            case 20:
              return _context8.abrupt("return", _context8.sent);

            case 21:
            case "end":
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function collect(_x45, _x46, _x47, _x48) {
      return _collect.apply(this, arguments);
    }

    return collect;
  }()
  /**
   * Collect the manager fee
   * @param userTokenA The manager address of token A
   * @param userTokenB The manager address of token B
   * @param userAuthroity The pays for the transaction
   * @returns
   */
  ;

  _proto.managerCollect =
  /*#__PURE__*/
  function () {
    var _managerCollect = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee9(userTokenA, userTokenB, payer) {
      var transaction;
      return runtime_1.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              if (payer === void 0) {
                payer = null;
              }

              if (this.isLoaded) {
                _context9.next = 4;
                break;
              }

              _context9.next = 4;
              return this.load();

            case 4:
              payer = payer !== null ? payer : this.payer;
              !(payer !== null) ?  invariant(false, "The payer is null")  : void 0;
              transaction = new web3_js.Transaction().add(managerClaimInstruction(this.programId, this.tokenSwapKey, this.authority, payer.publicKey, this.tokenSwapInfo.swapTokenA, this.tokenSwapInfo.swapTokenB, userTokenA, userTokenB)); // send and confirm transaction

              _context9.next = 9;
              return sendAndConfirmTransaction(this.conn, transaction, payer);

            case 9:
              return _context9.abrupt("return", _context9.sent);

            case 10:
            case "end":
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function managerCollect(_x49, _x50, _x51) {
      return _managerCollect.apply(this, arguments);
    }

    return managerCollect;
  }()
  /**
   * Add a positions account for token swap
   * @param payer The pays for transaction
   * @returns
   */
  ;

  _proto.addPositionsAccount =
  /*#__PURE__*/
  function () {
    var _addPositionsAccount = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee10(payer) {
      var positionsAccount, lamports, transaction;
      return runtime_1.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              if (payer === void 0) {
                payer = null;
              }

              if (this.isLoaded) {
                _context10.next = 4;
                break;
              }

              _context10.next = 4;
              return this.load();

            case 4:
              payer = payer !== null ? payer : this.payer;
              !(payer !== null) ?  invariant(false, "The payer is null")  : void 0;
              positionsAccount = web3_js.Keypair.generate();
              _context10.next = 9;
              return this.conn.getMinimumBalanceForRentExemption(POSITIONS_ACCOUNT_SIZE);

            case 9:
              lamports = _context10.sent;
              transaction = new web3_js.Transaction().add(web3_js.SystemProgram.createAccount({
                fromPubkey: payer.publicKey,
                newAccountPubkey: positionsAccount.publicKey,
                lamports: lamports,
                space: POSITIONS_ACCOUNT_SIZE,
                programId: this.programId
              }), addUserPositionInstruction(this.programId, this.authority, positionsAccount.publicKey));
              _context10.next = 13;
              return sendAndConfirmTransaction(this.conn, transaction, payer, positionsAccount);

            case 13:
              return _context10.abrupt("return", _context10.sent);

            case 14:
            case "end":
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function addPositionsAccount(_x52) {
      return _addPositionsAccount.apply(this, arguments);
    }

    return addPositionsAccount;
  }();

  _proto.approve = /*#__PURE__*/function () {
    var _approve = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee11(userToken, tokenMint, amount, authority, payer) {
      var token;
      return runtime_1.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              if (payer === void 0) {
                payer = null;
              }

              payer = payer !== null ? payer : this.payer;
              !(payer !== null) ?  invariant(false, "The payer is null")  : void 0;
              token = new splToken.Token(this.conn, tokenMint, splToken.TOKEN_PROGRAM_ID, payer);
              _context11.next = 6;
              return token.approve(userToken, authority.publicKey, payer, [], amount.toNumber());

            case 6:
            case "end":
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function approve(_x53, _x54, _x55, _x56, _x57) {
      return _approve.apply(this, arguments);
    }

    return approve;
  }()
  /**
   * Get user's positions
   * @param owner The owner of position
   * @returns The positions list
   */
  ;

  _proto.getUserPositions =
  /*#__PURE__*/
  function () {
    var _getUserPositions = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/runtime_1.mark(function _callee12(owner) {
      var _this$payer;

      var tokenAccounts, positions, i, position;
      return runtime_1.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              if (owner === void 0) {
                owner = undefined;
              }

              !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
              owner = owner !== undefined ? owner : (_this$payer = this.payer) == null ? void 0 : _this$payer.publicKey;
              !(owner !== undefined) ?  invariant(false, "The owner is undefined")  : void 0;
              _context12.next = 6;
              return getTokenAccounts(this.conn, owner);

            case 6:
              tokenAccounts = _context12.sent;
              positions = [];

              for (i = 0; i < tokenAccounts.length; i++) {
                position = this.positions.get(tokenAccounts[i].mint.toBase58());

                if (position !== undefined) {
                  positions.push(position);
                }
              }

              return _context12.abrupt("return", positions);

            case 10:
            case "end":
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function getUserPositions(_x58) {
      return _getUserPositions.apply(this, arguments);
    }

    return getUserPositions;
  }()
  /**
   * Calculate the liquity and token A amount, when the token swap currentTick < upperTick
   * @param tickLower The lower tick
   * @param tickUpper the upper tick
   * @param desiredAmountA The desired token A amount
   * @returns
   */
  ;

  _proto.calculateLiquityByTokenA = function calculateLiquityByTokenA(tickLower, tickUpper, desiredAmountA) {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
    !(this.currentTick <= tickUpper) ?  invariant(false, "The current price must less than lower price")  : void 0;

    if (this.currentTick < tickLower) {
      return {
        desiredAmountB: new Decimal__default(0),
        liquity: calculateLiquityOnlyA(tickLower, tickUpper, desiredAmountA)
      };
    } else {
      var res = calculateLiquity(tickLower, tickUpper, desiredAmountA, this.tokenSwapInfo.currentSqrtPrice, 0);
      return {
        desiredAmountB: res.desiredAmountDst,
        liquity: res.deltaLiquity
      };
    }
  }
  /**
   * Calculate the liquity and token B amount, when the token swap currentTick < upperTick
   * @param tickLower The lower tick
   * @param tickUpper the upper tick
   * @param desiredAmountA The desired token B amount
   * @returns
   */
  ;

  _proto.calculateLiquityByTokenB = function calculateLiquityByTokenB(tickLower, tickUpper, desiredAmountB) {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
    !(this.currentTick >= tickLower) ?  invariant(false, "The current price must less than lower price")  : void 0;

    if (this.currentTick < tickUpper) {
      return {
        desiredAmountA: new Decimal__default(0),
        liquity: calculateLiquityOnlyB(tickLower, tickUpper, desiredAmountB)
      };
    } else {
      var res = calculateLiquity(tickLower, tickUpper, desiredAmountB, this.tokenSwapInfo.currentSqrtPrice, 1);
      return {
        desiredAmountA: res.desiredAmountDst,
        liquity: res.deltaLiquity
      };
    }
  }
  /**
   * Calculate the position current value
   * @param positionId The position id
   * @returns The amount of token A and token B
   */
  ;

  _proto.calculatePositionValue = function calculatePositionValue(positionId) {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
    var positionInfo = this.getPositionInfo(positionId);
    !(positionInfo !== undefined) ?  invariant(false, "The position:" + positionId.toBase58() + " not found")  : void 0;

    var _calculateTokenAmount = calculateTokenAmount(positionInfo.lowerTick, positionInfo.upperTick, positionInfo.liquity, this.tokenSwapInfo.currentSqrtPrice),
        amountA = _calculateTokenAmount.amountA,
        amountB = _calculateTokenAmount.amountB;

    return {
      liquity: positionInfo.liquity,
      amountA: amountA,
      amountB: amountB
    };
  }
  /**
   * prepare calculate collect amount of token A and B
   * @param positionId The position id
   * @returns the amount of token A and B
   */
  ;

  _proto.preCollect = function preCollect(positionId) {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
    var positionInfo = this.getPositionInfo(positionId);
    !(positionInfo !== undefined) ?  invariant(false, "The position:" + positionId.toBase58() + " not found")  : void 0;
    var lowerTick = null;
    var upperTick = null;

    for (var i = 0; i < this.ticks.length; i++) {
      if (this.ticks[i].tick === positionInfo.lowerTick) {
        lowerTick = this.ticks[i];
      }

      if (this.ticks[i].tick === positionInfo.upperTick) {
        upperTick = this.ticks[i];
      }
    }

    !(lowerTick !== null) ?  invariant(false, "The position lower tick:" + positionInfo.lowerTick + " not found")  : void 0;
    !(upperTick !== null) ?  invariant(false, "The position upper tick:" + positionInfo.upperTick + " not found")  : void 0;
    var lowerFeeOutSideA = new Decimal__default(0);
    var lowerFeeOutSideB = new Decimal__default(0);
    var upperFeeOutSideA = new Decimal__default(0);
    var upperFeeOutSideB = new Decimal__default(0);
    var currentSqrtPrice = this.tokenSwapInfo.currentSqrtPrice;

    if (lowerTick.tickPrice.lessThan(currentSqrtPrice)) {
      lowerFeeOutSideA = lowerTick.feeGrowthOutside0;
      lowerFeeOutSideB = lowerTick.feeGrowthOutside1;
    } else {
      lowerFeeOutSideA = this.tokenSwapInfo.feeGrowthGlobal0.sub(lowerTick.feeGrowthOutside0);
      lowerFeeOutSideB = this.tokenSwapInfo.feeGrowthGlobal1.sub(lowerTick.feeGrowthOutside1);
    }

    if (upperTick.tickPrice.lessThan(currentSqrtPrice)) {
      upperFeeOutSideA = this.tokenSwapInfo.feeGrowthGlobal0.sub(upperTick.feeGrowthOutside0);
      upperFeeOutSideB = this.tokenSwapInfo.feeGrowthGlobal1.sub(upperTick.feeGrowthOutside1);
    } else {
      upperFeeOutSideA = upperTick.feeGrowthOutside0;
      upperFeeOutSideB = upperTick.feeGrowthOutside1;
    }

    return {
      amountA: this.tokenSwapInfo.feeGrowthGlobal0.sub(lowerFeeOutSideA).sub(upperFeeOutSideA).sub(positionInfo.feeGrowthInsideALast).mul(positionInfo.liquity).add(positionInfo.tokenAFee),
      amountB: this.tokenSwapInfo.feeGrowthGlobal1.sub(lowerFeeOutSideB).sub(upperFeeOutSideB).sub(positionInfo.feeGrowthInsideBLast).mul(positionInfo.liquity).add(positionInfo.tokenBFee)
    };
  }
  /**
   * Prepare calculate A swap B
   * @param amountIn The amount input of token A
   * @returns amountOut:The amount out of token B, amountUsed:The used of amountIn, afterPrice:The price after calculate, afterLiquity: The liquity after calculate
   */
  ;

  _proto.preSwapA = function preSwapA(amountIn) {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
    var res = calculateSwapA2B(this.ticks, this.tokenSwapInfo.currentSqrtPrice, this.tokenSwapInfo.fee, this.tokenSwapInfo.currentLiquity, amountIn);
    var currentPriceA = this.tokenSwapInfo.currentSqrtPrice.pow(2);
    var currentPriceB = new Decimal__default(1).div(currentPriceA);
    var transactionPriceA = res.amountOut.div(res.amountUsed);
    var transactionPriceB = res.amountUsed.div(res.amountOut);
    var impactA = transactionPriceA.sub(currentPriceA).div(currentPriceA).abs();
    var impactB = transactionPriceB.sub(currentPriceB).div(currentPriceB).abs();
    var afterPriceA = res.afterPrice.pow(2);
    var afterPriceB = new Decimal__default(1).div(afterPriceA);
    return {
      amountOut: res.amountOut,
      amountUsed: res.amountUsed,
      feeUsed: res.feeUsed,
      afterPriceA: afterPriceA,
      afterPriceB: afterPriceB,
      afterLiquity: res.afterLiquity,
      impactA: impactA,
      impactB: impactB,
      transactionPriceA: transactionPriceA,
      transactionPriceB: transactionPriceB
    };
  }
  /**
   * Prepare calculate B swap A
   * @param amountIn The amount input of token B
   * @returns amountOut:The amount out of token A, amountUsed:The used of amountIn, afterPrice:The price after calculate, afterLiquity: The liquity after calculate
   */
  ;

  _proto.preSwapB = function preSwapB(amountIn) {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
    var res = calculateSwapB2A(this.ticks, this.tokenSwapInfo.currentSqrtPrice, this.tokenSwapInfo.fee, this.tokenSwapInfo.currentLiquity, amountIn);
    var currentPriceA = this.tokenSwapInfo.currentSqrtPrice.pow(2);
    var currentPriceB = new Decimal__default(1).div(currentPriceA);
    var transactionPriceA = res.amountUsed.div(res.amountOut);
    var transactionPriceB = res.amountOut.div(res.amountUsed);
    var impactA = transactionPriceA.sub(currentPriceA).div(currentPriceA).abs();
    var impactB = transactionPriceB.sub(currentPriceB).div(currentPriceB).abs();
    var afterPriceA = res.afterPrice.pow(2);
    var afterPriceB = new Decimal__default(1).div(afterPriceA);
    return {
      amountOut: res.amountOut,
      amountUsed: res.amountUsed,
      feeUsed: res.feeUsed,
      afterLiquity: res.afterLiquity,
      impactA: impactA,
      impactB: impactB,
      transactionPriceA: transactionPriceA,
      transactionPriceB: transactionPriceB,
      afterPriceA: afterPriceA,
      afterPriceB: afterPriceB
    };
  }
  /**
   * Get nearest tick by price
   * @param price The price
   * @returns The tick
   */
  ;

  _proto.getNearestTickByPrice = function getNearestTickByPrice$1(price) {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
    return getNearestTickByPrice(price, this.tokenSwapInfo.tickSpace);
  }
  /* @internal */
  ;

  _proto.getPositionInfo = function getPositionInfo(positionId) {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;
    return this.positions.get(positionId.toBase58());
  }
  /* @internal */
  ;

  _proto.choosePosition = function choosePosition() {
    !this.isLoaded ?  invariant(false, "The token swap not load")  : void 0;

    for (var _iterator = _createForOfIteratorHelperLoose(this.positionsKeys), _step; !(_step = _iterator()).done;) {
      var _step$value = _step.value,
          key = _step$value[0],
          val = _step$value[1];

      if (val < MAX_ACCOUNT_POSITION_LENGTH) {
        return key;
      }
    }

    return null;
  }
  /* for debug */
  ;

  _proto.log = function log() {
    var payer = this.payer !== null ? this.payer.publicKey.toBase58() : "null";
    console.log(JSON.stringify({
      programId: this.programId.toString(),
      tokenSwapKey: this.tokenSwapKey.toString(),
      payer: payer,
      authority: this.authority.toString(),
      currentTick: this.currentTick,
      currentPrice: this.tokenSwapInfo.currentSqrtPrice.pow(2).toString(),
      tokenSwapInfo: {
        accountType: this.tokenSwapInfo.accountType,
        version: this.tokenSwapInfo.version,
        isInitialized: this.tokenSwapInfo.isInitialized,
        nonce: this.tokenSwapInfo.nonce,
        manager: this.tokenSwapInfo.manager.toString(),
        managerTokenA: this.tokenSwapInfo.managerTokenA.toString(),
        managerTokenB: this.tokenSwapInfo.managerTokenB.toString(),
        swapTokenA: this.tokenSwapInfo.swapTokenA.toString(),
        swapTokenB: this.tokenSwapInfo.swapTokenB.toString(),
        tokenAMint: this.tokenSwapInfo.tokenAMint.toString(),
        tokenBMint: this.tokenSwapInfo.tokenBMint.toString(),
        ticksKey: this.tokenSwapInfo.ticksKey.toString(),
        positionsKey: this.tokenSwapInfo.positionsKey.toString(),
        curveType: this.tokenSwapInfo.curveType,
        fee: this.tokenSwapInfo.fee,
        managerFee: this.tokenSwapInfo.managerFee,
        tickSpace: this.tokenSwapInfo.tickSpace,
        currentSqrtPrice: this.tokenSwapInfo.currentSqrtPrice,
        currentLiquity: this.tokenSwapInfo.currentLiquity,
        feeGrowthGlobal0: this.tokenSwapInfo.feeGrowthGlobal0,
        feeGrowthGlobal1: this.tokenSwapInfo.feeGrowthGlobal1,
        managerFeeA: this.tokenSwapInfo.managerFeeA,
        managerFeeB: this.tokenSwapInfo.managerFeeB
      },
      positions: Object.fromEntries(this.positions),
      positionsKeys: Object.fromEntries(this.positionsKeys),
      ticks: this.ticks
    }, null, 4));
  };

  return TokenSwap;
}();

exports.INIT_KEY = INIT_KEY;
exports.MAX_ACCOUNT_POSITION_LENGTH = MAX_ACCOUNT_POSITION_LENGTH;
exports.MAX_PRICE = MAX_PRICE;
exports.MAX_SQRT_PRICE = MAX_SQRT_PRICE;
exports.MAX_TICK = MAX_TICK;
exports.MIN_PRICE = MIN_PRICE;
exports.MIN_SQRT_PRICE = MIN_SQRT_PRICE;
exports.MIN_TICK = MIN_TICK;
exports.PIECES = PIECES;
exports.POSITIONS_ACCOUNT_SIZE = POSITIONS_ACCOUNT_SIZE;
exports.POSITIONS_ACCOUNT_TYPE = POSITIONS_ACCOUNT_TYPE;
exports.PRICE_OFFSET = PRICE_OFFSET;
exports.PositionLayout = PositionLayout;
exports.PositionsAccountLayout = PositionsAccountLayout;
exports.TICKS_ACCOUNT_SIZE = TICKS_ACCOUNT_SIZE;
exports.TICKS_ACCOUNT_TYPE = TICKS_ACCOUNT_TYPE;
exports.TOKEN_SWAP_ACCOUNT_SIZE = TOKEN_SWAP_ACCOUNT_SIZE;
exports.TOKEN_SWAP_ACCOUNT_TYPE = TOKEN_SWAP_ACCOUNT_TYPE;
exports.TickLayout = TickLayout;
exports.TokenSwap = TokenSwap;
exports.TokenSwapAccountLayout = TokenSwapAccountLayout;
exports.calculateLiquity = calculateLiquity;
exports.calculateLiquityOnlyA = calculateLiquityOnlyA;
exports.calculateLiquityOnlyB = calculateLiquityOnlyB;
exports.calculateLiquityTable = calculateLiquityTable;
exports.calculateSlidTokenAmount = calculateSlidTokenAmount;
exports.calculateSwapA2B = calculateSwapA2B;
exports.calculateSwapB2A = calculateSwapB2A;
exports.calculateTokenAmount = calculateTokenAmount;
exports.cluster = cluster;
exports.createAssociatedTokenAccountInstruction = createAssociatedTokenAccountInstruction;
exports.decimal128 = decimal128;
exports.decimal64 = decimal64;
exports.decimalU128 = decimalU128;
exports.decimalU64 = decimalU64;
exports.encodeDecode = encodeDecode;
exports.getAssociatedTokenAddress = getAssociatedTokenAddress;
exports.getNearestTick = getNearestTick;
exports.getNearestTickByPrice = getNearestTickByPrice;
exports.getNearestTickBySqrtPrice = getNearestTickBySqrtPrice;
exports.getTokenAccount = getTokenAccount;
exports.getTokenAccounts = getTokenAccounts;
exports.int128 = int128;
exports.int64 = int64;
exports.isPositionsAccount = isPositionsAccount;
exports.isTicksAccount = isTicksAccount;
exports.isTokenSwapAccount = isTokenSwapAccount;
exports.maxAmountA = maxAmountA;
exports.maxAmountB = maxAmountB;
exports.parsePositionsAccount = parsePositionsAccount;
exports.parseTicksAccount = parseTicksAccount;
exports.parseTokenAccount = parseTokenAccount;
exports.parseTokenAccountData = parseTokenAccountData;
exports.parseTokenSwapAccount = parseTokenSwapAccount;
exports.price2Tick = price2Tick;
exports.publicKey = publicKey;
exports.sendAndConfirmTransaction = sendAndConfirmTransaction;
exports.sqrtPrice2Tick = sqrtPrice2Tick;
exports.swapA2B = swapA2B;
exports.swapB2A = swapB2A;
exports.tick2Price = tick2Price;
exports.tick2SqrtPrice = tick2SqrtPrice;
exports.uint128 = uint128;
exports.uint64 = uint64;
exports.url = url;
exports.urlTls = urlTls;
exports.walletUrl = walletUrl;
//# sourceMappingURL=crema-sdk.cjs.development.js.map

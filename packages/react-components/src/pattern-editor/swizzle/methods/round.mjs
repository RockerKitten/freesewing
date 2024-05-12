/**
 * A generic rounding method
 *
 * @param {object} methods - An object holding possibly swizzled methods (unused here)
 * @param {number} val - The input number to round
 * @param {number} decimals - The number of decimal points to use when rounding
 * @return {number} result - The rounded number
 */
export const round = (methods, val, decimals = 1) =>
  Math.round(val * Math.pow(10, decimals)) / Math.pow(10, decimals)

import isPlainObject from 'lodash.isplainobject';
import { WebP1pxPer1px }  from './constants';
import * as layouts from './config/layouts';

/**
 * Forms sorted array with breakpoints from sources' object
 *
 * @param  {object} sources     Object with sizes
 * @return {array.number}       Array of breakpoints, type of Number each
 */
export const getBreakPoints = sources => Object.keys(sources)
  .map(Number)
  .filter(key => !isNaN(key))
  .sort((a, b) => a - b);

/**
 * Finds source on the base of minWidth
 *
 * @param  {int}    minWidth        Breakpoint
 * @param  {object} sources         Object with sources
 * @param  {string} fallbackSrc     Fallback source in case no sizes match
 * @return {string}                 Source from the object with sources which matches
 */
export const findSource = (minWidth, { sources, fallbackSrc }) => {
  if (!sources || minWidth === undefined) return fallbackSrc;

  const breakpoints = getBreakPoints(sources);
  const breakpointsKey = breakpoints[0] <= minWidth
    ? breakpoints.reduce((newBreakpoint, breakpoint) => (minWidth >= breakpoint ? breakpoint : newBreakpoint))
    : null;

  return breakpointsKey ? sources[breakpointsKey] : fallbackSrc;
};

/**
 * Checks for webP image format support
 * @param {Function} cb     Callback function
 */
export const supportsWebP = (cb) => {
  const image = new Image();
  const eventHandler = event => cb(event && event.type === 'load' ? image.width === 1 : false);

  image.onload = eventHandler;
  image.onerror = eventHandler;
  // base64 encoded webP image with width 1px
  image.src = WebP1pxPer1px;
};

/**
 * Formats supplied width of an image to valid CSS property
 * @param  {(number|string)} width     Percentage string or number
 * @return {string}                    Percentage string or sting with number and pixels
 */
export const formatWidth = (width) => {
  if (Number.isNaN(Number(width)) === false) return `${width}px`;

  let parts = width.split('%');
  const error = `Invalid size supplied. A valid percentage value expected, got '${width}'.`;

  if (parts.length !== 2) {
    throw new Error(error);
  }

  parts = parts.filter(Boolean);

  if (parts.length !== 1 || Number.isNaN(Number(parts[0]))) {
    throw new Error(error);
  }

  return width;
};

/**
 * Gets the source path according to the device's capabilities
 *
 * @param  {(string|object)} src            - Original source path
 * @param  {Boolean}         hasWebPSupport - Corresponding boolean
 * @return {string}                         - Source path
 */
export const getSourcePath = (src, { hasWebPSupport } = {}) => {
  const pixelRatio = Math.ceil(window.devicePixelRatio || 1);
  const defaultCondition = hasWebPSupport ? 'webp' : 'default';

  let filename;

  if (isPlainObject(src)) {
    filename = src[`${pixelRatio}x`] || src[defaultCondition] || src.default;
  }
  console.log('filename:', filename);
  return filename;
};

/**
 * Forms the mediaquery for a specific layout
 *
 * @param {string} layoutId
 * @return {string}
 */

export const getMediaQuery = (layoutId) => {
  const mediaParts = [];
  const min = layouts[layoutId]["min"];
  const max = layouts[layoutId]["max"];

  if (min) mediaParts.push(`(min-width:${min}px)`);
  if (max) mediaParts.push(`(max-width:${max}px)`);

  if (mediaParts.length === 0) {
    if (!min) {
      throw new Error(`Layout '${layoutId}' doesn't contain a 'min' value`);
    }

    if (!max) {
      throw new Error(`Layout '${layoutId}' doesn't contain a 'max' value`);
    }
  }

  return mediaParts.join(' and ');
};

"use strict";
const pi = require('pureimage');
/**
 * Remove given array of rectangles with white color in given image (return a copy);
 * @param imgToConvert {Bitmap}
 * @param adRects {Array<{x: Number, y: Number, width: Number, height: Number}>}
 * @returns {Bitmap}
 */
const convert = (imgToConvert, adRects) => {
    const result = pi.make(imgToConvert.width, imgToConvert.height, {});
    const resultCtx = result.getContext('2d');
    resultCtx.drawImage(imgToConvert, 0, 0, imgToConvert.width, imgToConvert.height, 0, 0, imgToConvert.width, imgToConvert.height);
    if (imgToConvert && adRects) {
        adRects.forEach((rect) => {
            resultCtx.fillStyle = 'white';
            resultCtx.fillRect(rect.x, rect.y, rect.width, rect.height);
        });
        return result;

    } else {
        throw new Error('Expected 2 parameters (The first is arrays of bytes, and the second is the array of objects)');
    }
};

if (typeof module !== 'undefined') module.exports = convert;
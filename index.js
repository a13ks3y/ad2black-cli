"use strict";
const convert = (imgToConvert, adImg) => {
    if (!imgToConvert) {
        return [];
    } else if (adImg) {
        return imgToConvert.map((pixel, index) => {
            if (adImg[index] && adImg[index] === pixel) {
                return 0;
            } else {
                return pixel;
            }
        });
    } else {
        throw new Error('Expected 2 parameters (arrays of bytes)');
    }
};
if (typeof module !== 'undefined') module.exports = convert;
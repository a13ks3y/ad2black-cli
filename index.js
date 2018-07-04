"use strict";
const yargs = require('yargs');
const fs = require('fs');
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

if (yargs.argv._ && yargs.argv._[0] && yargs.argv._[0].length && !yargs.argv._[0].match(/.*\.js$/)) {
    const imgToConvertFilePath = yargs.argv._[0];
    const adRects = yargs.argv.r instanceof Array ? yargs.argv.r : [yargs.argv.r];
    console.log('Reading the file', imgToConvertFilePath);
    pi.decodePNGFromStream(fs.createReadStream(imgToConvertFilePath)).then((imgToConvert) => {
        const result = convert(imgToConvert, adRects.map( rect => Function(`return ${rect}`)()));
        pi.encodePNGToStream(result, fs.createWriteStream('result.png')).then(() => {
            console.log('Success! Please see result.png');
        });
    });

}

if (typeof module !== 'undefined') module.exports = convert;
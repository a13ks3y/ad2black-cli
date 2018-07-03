const convert = require('./index');
const assert = require('assert');
const fs = require('fs');
const base64 = require('base-64');
describe('Index', () => {
    it('Should have a function "convert"', () => {
        assert(convert instanceof Function);
    });
    it('Should return empty array if no parameters given', () => {
        assert(convert() instanceof Array);
    });
    it('Should return an array of pixels with black square instead of given image', () => {
        const testImg = base64.decode(fs.readFileSync('./test-data/test-img.base64.txt'));
        const adImg = base64.decode(fs.readFileSync('./test-data/ad-img.base64.txt'));
        const resultImg = base64.decode(fs.readFileSync('./test-data/result-img.base64.txt'));

        const testImgArr =Array.prototype.slice.call(new Buffer(testImg, 'base64'), 0);
        const adImgArr = new Buffer(adImg, 'base64');
        const resultImgArr = new Buffer(resultImg, 'base64');

        console.log(testImgArr);

        assert.deepEqual(convert(testImgArr, adImgArr), resultImgArr);
    });
});
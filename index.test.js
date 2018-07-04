"use strict";
const convert = require('./index');
const assert = require('assert');
const pi = require('pureimage');
const fs = require('fs');
const PNG = require('pngjs').PNG;
const pixelmatch = require('pixelmatch');
describe('Index', () => {
    it('Should have a function "convert"', () => {
        assert(convert instanceof Function);
    });
    it('Should throw exception if no parameters given', () => {
        try {
            // noinspection JSCheckFunctionSignatures
            convert();
        } catch (e) {
            assert(true);
        }
    });
    it('Should return an image with white square instead of given image', (done) => {
        pi.decodePNGFromStream(fs.createReadStream('test-data/img-to-convert.png')).then((imgToConvert) => {
            const result = convert(imgToConvert, [{
                x: 1662,
                y: 786,
                width: 237,
                height: 249
            }]);
            pi.decodePNGFromStream(fs.createReadStream('test-data/img-result.png')).then((imgResult) => {
                pi.encodePNGToStream(result, fs.createWriteStream('test-data/tmp.png')).then(()=>{
                    const imgResultPngStream = fs.createReadStream('test-data/img-result.png').pipe(new PNG()).on('parsed', doneReading);
                    const imgTmpPngStream = fs.createReadStream('test-data/tmp.png').pipe(new PNG()).on('parsed', doneReading);
                    let filesRead = 0;

                    function doneReading() {
                        if (++filesRead < 2) return;
                        const diff = new PNG({width: imgResultPngStream.width, height: imgResultPngStream.height});

                        const diffPixelsCount = pixelmatch(imgResultPngStream.data, imgTmpPngStream.data, diff.data, imgResultPngStream.width, imgResultPngStream.height, {threshold: 0.85});
                        assert(diffPixelsCount === 0, 'Difference should be 0!');
                        diff.pack().pipe(fs.createWriteStream('test-data/diff.png'));
                        done();
                    }
                });
            });
        });
    }).timeout(10000);
});

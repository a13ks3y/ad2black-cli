"use strict";
const convert = require('./index');
const assert = require('assert');
const fs = require('fs');
const getPixels = require('get-pixels');
const base64 = require('base-64');
describe('Index', () => {
    it('Should have a function "convert"', () => {
        assert(convert instanceof Function);
    });
    it('Should return empty array if no parameters given', () => {
        assert(convert() instanceof Array);
    });
    it('Should return an array of pixels with black square instead of given image', () => {
        getPixels('./test-data/img-to-convert.png',
            (err, pixels) => {
                err && (()=>{ console.log("Bad image path"); throw new Error('Bad image path'); })();
                const imgToConvert = pixels.shape;
                console.log("imgToConvert", imgToConvert);
                getPixels('./test-data/img-ad.png', (err, pixels) => {
                    err && (()=>{ console.log("Bad image path"); throw new Error('Bad image path'); })();
                    const imgAd = pixels.shape;
                    console.log('imgAd:', imgAd);

                    getPixels('./test-data/img-result.png', (err, pixels) => {
                        err && (()=>{ console.log("Bad image path"); throw new Error('Bad image path'); })();
                        const imgResult = pixels.shape;
                        console.log('imgResult:', imgResult);
                        console.log('imgAd[1].length', imgAd[1]);
                       assert.deepEqual(convert(imgToConvert, [{
                           imgToReplaceRect: {
                               left: 0,
                               top: imgAd[1],
                               right: imgAd[0],
                               bottom: 0
                           },
                       }]), imgResult);
                    });
                });
            }
        );
    });
});
'use strict';

const { test } = require('ava');

const {
    toCallback,
    toDecimals,
    toFlatArray,
    toLowercaseKeys,
    toPromise,
} = require('../lib/util');


test('util-to converts to a promise', (t) => {

    const callbackFunction = (data, callback) => callback(null, data);
    const promiseFunction = toPromise(callbackFunction);

    return promiseFunction('promised!')
        .then(result => t.is(result, 'promised!'));

});

test.cb('util-to converts to a callback', (t) => {

    const promiseFunction = data => Promise.resolve(data);
    const callbackFunction = toCallback(promiseFunction);

    callbackFunction('callback', (err, result) => {

        t.is(err, null);
        t.is(result, 'callback');
        t.end();

    });

});

test('util-to converts all keys to lowercase', (t) => {

    t.is(
        JSON.stringify(toLowercaseKeys({ A: { B: [{ C: [{ D: 1 }] }] } })),
        JSON.stringify({ a: { b: [{ c: [{ d: 1 }] }] } })
    );

});

test('util-to reduces all values into an array', (t) => {

    t.is(
        JSON.stringify(toFlatArray({ a: [{ b: 1 }, { c: 2 }, { d: [3, 4] }] })),
        JSON.stringify([1, 2, 3, 4])
    );

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.0), 10);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.1), 10);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.2), 10);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.3), 10);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.4), 10);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.5), 11);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.6), 11);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.7), 11);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.8), 11);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(10.9), 11);

});

test('util-to rounds a floating point number', (t) => {

    t.is(toDecimals(1 / 3, 2), 0.33);

});

'use strict';

const { test } = require('ava');

const {
    isArray,
    isBeta,
    isDevelopment,
    isEqual,
    isObject,
    isProduction,
    isStaging,
} = require('../lib/util');

test('isArray() tests for an array', (t) => {

    t.is(isArray([]), true);

});

test('isDevelopment() checks a string for the word development', (t) => {

    t.is(isDevelopment('DeVeLoPmEnT'), true);

});

test('isBeta() checks a string for the word beta', (t) => {

    t.is(isBeta('BeTa'), true);

});

test('isStaging() checks a string for the word staging', (t) => {

    t.is(isStaging('StAgInG'), true);

});

test('isProduction() checks a string for the word production', (t) => {

    t.is(isProduction('PrOdUcTiOn'), true);

});

test('isEqual() checks strings for equaility', (t) => {

    t.is(isEqual('string', 'string'), true);

});

test('isEqual() checks arrays for equaility', (t) => {

    t.is(isEqual(['a', 'b', 'c'], ['a', 'b', 'c']), false);

});

test('isEqual() checks objects for equaility', (t) => {

    t.is(isEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 }), false);

});

test('isEqual() checks non-signed integers for equaility', (t) => {

    t.is(isEqual(0, 0), true);

});

test('isEqual() checks signed integers for equaility', (t) => {

    t.is(isEqual(0, -0), false);

});

test('isEqual() defaults to true', (t) => {

    t.is(isEqual(), true);

});

test('isEqual() checks nulls for equaility', (t) => {

    t.is(isEqual(null, null), true);

});

test('isEqual() checks NaN for equality', (t) => {

    t.is(isEqual(NaN, NaN), true);

});

test('isObject() checks for an object', (t) => {

    t.is(isObject({}), true);

});

test('isObject() won\'t accept a string as an object', (t) => {

    t.is(isObject('string'), false);

});

test('isObject() won\'t accept an array as an object', (t) => {

    t.is(isObject([]), false);

});

test('isObject() defaults to false', (t) => {

    t.is(isObject(), false);

});

test('isObject() won\'t accept null as an object', (t) => {

    t.is(isObject(null), false);

});

'use strict';

const { test } = require('ava');
const { find } = require('../lib/util');

test('find() will find a value in an array', (t) => {

    t.is(find([1], element => element === 1), 1);

});

test('find() will find a value in an object', (t) => {

    t.is(find({ a: { b: [2] } }, element => element === 2), 2);

});

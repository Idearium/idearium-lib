'use strict';

const { test } = require('ava');
const { hasProperty, hasValue } = require('../lib/util');

test('hasProperty() returns true when a property exists', (t) => {

    t.is(hasProperty({ a: 1 }, 'a'), true);

});

test('hasProperty() returns false when a property does not exist', (t) => {

    t.is(hasProperty({ a: 1 }, 'b'), false);

});

test('hasValue() returns true when a value exists', (t) => {

    t.is(hasValue({ a: 1 }, 1), true);

});

test('hasValue() returns false when a value exists', (t) => {

    t.is(hasValue({ a: 1 }, 2), false);

});

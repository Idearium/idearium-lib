'use strict';

const debug = require('debug');
const { test } = require('ava');

// eslint-disable-next-line no-console
const ce = console.error;
const pe = process.exit;
const dl = debug.log;

test.beforeEach(() => {

    /* eslint-disable no-empty-function */
    // eslint-disable-next-line no-console
    console.error = () => {};
    process.exit = () => {};
    debug.log = () => {};
    /* eslint-enable no-empty-function */

});

test.afterEach(() => {

    // eslint-disable-next-line no-console
    console.error = ce;
    process.exit = pe;
    debug.log = dl;

});

test('common/exception is a function', (t) => {

    // eslint-disable-next-line global-require
    t.is(typeof require('../common/exception'), 'function');

});

test.cb('common/exception will log to console.error', (t) => {

    // eslint-disable-next-line no-console
    console.error = function (err) {

        t.regex(err.message, /A console error exception/);
        t.end();

    };

    // eslint-disable-next-line global-require
    require('../common/exception')(new Error('A console error exception'));

});

test.cb('common/exception will log via debug', (t) => {

    // No-op function (disable output).
    debug.log = function (msg) {

        t.regex(msg, /Exception logged/);
        t.end();

    };

    // eslint-disable-next-line global-require
    require('../common/exception')(new Error('A debug error exception'));

});

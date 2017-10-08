'use strict';

/* eslint-env node, mocha */

const { test } = require('ava');

const fs = require('fs');
const path = require('path');
const { parseConfigAsBoolean, parseCsv } = require('../lib/util');

test('parseConfigAsBoolean() should error if default value is not provided', (t) => {

    const error = t.throws(() => parseConfigAsBoolean());

    t.is(error.message, 'Default value is required.');

});

test('parseConfigAsBoolean() should return default value if provided value is undefined', (t) => {

    /* eslint-disable no-undefined */
    const result1 = parseConfigAsBoolean(undefined, true);
    const result2 = parseConfigAsBoolean(undefined, false);
    /* eslint-enable no-undefined */

    t.true(result1);
    t.false(result2);

});

test('parseConfigAsBoolean() should return true if provided value is a String of "true"', (t) => {

    t.true(parseConfigAsBoolean('true', true));

});

test('parseConfigAsBoolean() should return true if provided value is a String of "false"', (t) => {

    t.false(parseConfigAsBoolean('false', true));

});

test('parseCsv() should parse a csv file', (t) => {

    const stream = fs.createReadStream(path.resolve(__dirname, 'data', 'test.csv'));

    return parseCsv(stream)
        .then((data) => {

            t.deepEqual(data, [
                ['col1', 'col2', 'col3', 'col4', 'col5'],
                ['Test1.1', 'Test1.2', 'Test1.3', 'Test1.4', ''],
                ['Test2.1', 'Test2.2', 'Test2.3', 'Test2.4', ''],
                ['Test3.1', 'Test3.2', 'Test3.3', 'Test3.4', '😊'],
                ['Test4.1', 'Test4.2', 'Test4.3', 'Test4.4', 'Test4.5'],
                ['Test5.1', 'Test5.2', 'Test5.3', 'Test5.4', 'Test5.5'],
            ]);

        });

});

test('parseCsv() should parse csv buffered data', (t) => {

    const csv = 'col1,col2,col3,col4,col5\nTest1.1,Test1.2,Test1.3,Test1.4,\nTest2.1,Test2.2,Test2.3,Test2.4,""\nTest3.1,Test3.2,Test3.3,Test3.4,😊\nTest4.1,Test4.2,Test4.3,Test4.4,Test4.5\nTest5.1,Test5.2,Test5.3,Test5.4,Test5.5';
    const buffer = Buffer.from(csv);

    return parseCsv(buffer)
        .then((data) => {

            t.deepEqual(data, [
                ['col1', 'col2', 'col3', 'col4', 'col5'],
                ['Test1.1', 'Test1.2', 'Test1.3', 'Test1.4', ''],
                ['Test2.1', 'Test2.2', 'Test2.3', 'Test2.4', ''],
                ['Test3.1', 'Test3.2', 'Test3.3', 'Test3.4', '😊'],
                ['Test4.1', 'Test4.2', 'Test4.3', 'Test4.4', 'Test4.5'],
                ['Test5.1', 'Test5.2', 'Test5.3', 'Test5.4', 'Test5.5'],
            ]);

        });

});

test('parseCsv() should transform using the provided function', (t) => {

    const stream = fs.createReadStream(path.resolve(__dirname, 'data', 'test.csv'));
    const transform = (row, callback) => callback(null, row.map(cell => cell.toUpperCase()));

    return parseCsv(stream, { transform })
        .then((data) => {

            t.deepEqual(data, [
                ['COL1', 'COL2', 'COL3', 'COL4', 'COL5'],
                ['TEST1.1', 'TEST1.2', 'TEST1.3', 'TEST1.4', ''],
                ['TEST2.1', 'TEST2.2', 'TEST2.3', 'TEST2.4', ''],
                ['TEST3.1', 'TEST3.2', 'TEST3.3', 'TEST3.4', '😊'],
                ['TEST4.1', 'TEST4.2', 'TEST4.3', 'TEST4.4', 'TEST4.5'],
                ['TEST5.1', 'TEST5.2', 'TEST5.3', 'TEST5.4', 'TEST5.5'],
            ]);

        });

});

// Using callback here because the test suffers from https://github.com/avajs/ava/issues/1371
test.cb('parseCsv() should fail if there is an error with the csv', (t) => {

    const csv = 'col1,col2,col3,col4,col5\nTest1.1,Test1.2,Test1.3,Test1.4,\nTest2.1,Test2.2,Test2.3,Test2.4,""\nTest3.1,Test3.2,Test3.3,Test3.4,😊\nTest4.1,Test4.2,Test4.3,Test4.4,Test4.5\nTest5.1,Test5.2,Test5.3,Test5.4';
    const buffer = Buffer.from(csv);

    parseCsv(buffer)
        .then(() => t.end(new Error('parseCsv() should have thrown, but didn\'t.')))
        .catch((e) => {

            t.is(e.message, 'Number of columns is inconsistent on line 6');
            t.end();

        });

});

'use strict';

const mongoose = require('mongoose');
const { test } = require('ava');
const { find, findOne } = require('../lib/query');

const userModel = mongoose.model('userModel', new mongoose.Schema({
    email: String,
    username: String,
}));

test('find() will return a query object', (t) => {

    const queryObject = find(userModel, {
        filter: { _id: '5938a0aefb6e41e0e8368d00' },
        lean: false,
        limit: 20,
        projection: 'email username',
    });

    const { _conditions, _fields, _mongooseOptions, options } = queryObject;

    t.is(_conditions._id.toString(), '5938a0aefb6e41e0e8368d00');
    t.false(_mongooseOptions.lean);
    t.deepEqual(Object.keys(_fields), ['email', 'username']);
    t.is(options.limit, 20);

});

test('find() will return a query object', (t) => {

    const queryObject = find(userModel, {
        filter: { _id: '5938a0aefb6e41e0e8368d00' },
        lean: false,
        projection: 'email username',
    });

    const { _conditions, _fields, _mongooseOptions, options } = queryObject;

    t.is(_conditions._id.toString(), '5938a0aefb6e41e0e8368d00');
    t.false(_mongooseOptions.lean);
    t.deepEqual(Object.keys(_fields), ['email', 'username']);
    t.is(options.limit, 10);

});

test('find() will return a query object', (t) => {

    const queryObject = find(userModel, {
        filter: { _id: '5938a0aefb6e41e0e8368d00' },
        projection: 'email username',
    });

    const { _conditions, _fields, _mongooseOptions, options } = queryObject;

    t.is(_conditions._id.toString(), '5938a0aefb6e41e0e8368d00');
    t.true(_mongooseOptions.lean);
    t.deepEqual(Object.keys(_fields), ['email', 'username']);
    t.is(options.limit, 10);

});

test('find() will return a query object', (t) => {

    const queryObject = find(userModel, { filter: { _id: '5938a0aefb6e41e0e8368d00' } });

    const { _conditions, _fields, _mongooseOptions, options } = queryObject;

    t.is(_conditions._id.toString(), '5938a0aefb6e41e0e8368d00');
    t.true(_mongooseOptions.lean);
    t.deepEqual(Object.keys(_fields), ['_id']);
    t.is(options.limit, 10);

});

test('findOne() will return a query object', (t) => {

    const queryObject = findOne(userModel, {
        filter: { _id: '5938a0aefb6e41e0e8368d00' },
        lean: false,
        projection: 'email username',
    });

    const { _conditions, _fields, _mongooseOptions } = queryObject;

    t.is(_conditions._id.toString(), '5938a0aefb6e41e0e8368d00');
    t.false(_mongooseOptions.lean);
    t.deepEqual(Object.keys(_fields), ['email', 'username']);

});

test('findOne() will return a query object', (t) => {

    const queryObject = findOne(userModel, {
        filter: { _id: '5938a0aefb6e41e0e8368d00' },
        projection: 'email username',
    });

    const { _conditions, _fields, _mongooseOptions } = queryObject;

    t.is(_conditions._id.toString(), '5938a0aefb6e41e0e8368d00');
    t.true(_mongooseOptions.lean);
    t.deepEqual(Object.keys(_fields), ['email', 'username']);

});

test('findOne() will return a query object', (t) => {

    const queryObject = findOne(userModel, { filter: { _id: '5938a0aefb6e41e0e8368d00' } });

    const { _conditions, _fields, _mongooseOptions } = queryObject;

    t.is(_conditions._id.toString(), '5938a0aefb6e41e0e8368d00');
    t.true(_mongooseOptions.lean);
    t.deepEqual(Object.keys(_fields), ['_id']);

});

'use strict';

const fs = require('fs');
const path = require('path');

const { test } = require('ava');
const { toPromise } = require('../lib/util/to');

const mkdir = toPromise(fs.mkdir);
const writeFile = toPromise(fs.writeFile);
const rimraf = toPromise(require('rimraf'));

const data = 'test';
const digest = 'Q7DO+ZJl+eNMEOqdNQGSbSezn1fG1nRWHYuiNueoGfs=';
const encryption = 'xhe0s7KlBwDw7Gi8riPy5A==';
const userIv = 'Oan9RRdKYuDCyzJI';
const userSecret = 'rmeJRgNBVizATHzG';

const dir = path.resolve(__dirname);
const configDir = path.join(dir, '..', 'config');
const configFile = path.join(configDir, 'config.js');

let crypto;

test.before(() => {

    return rimraf(configDir)
        .then(() => mkdir(configDir))
        .then(() => {

            return writeFile(configFile, `module.exports = { "userIv": "${userIv}", "userSecret": "${userSecret}" };`);

        })
        .then(() => {

            // Now load in the crypto module.
            // eslint-disable-next-line global-require
            crypto = require('../common/crypto');

        });

});

test.after.always(() => rimraf(configDir));

test('common/crypto will decrypt some data', (t) => {

    t.is(crypto.decrypt(encryption), data);
    t.is(crypto.decrypt(encryption), data);
    t.is(crypto.decrypt(encryption), data);

});

test('common/crypto will decrypt some data', (t) => {

    t.is(crypto.decrypt(encryption), data);
    t.is(crypto.decrypt(encryption), data);
    t.is(crypto.decrypt(encryption), data);

});

test('common/crypto will create a hmac digest', (t) => {

    t.is(crypto.digest(data), digest);
    t.is(crypto.digest(data), digest);
    t.is(crypto.digest(data), digest);

});

test('common/crypto will encrypt some data', (t) => {

    t.is(crypto.encrypt(data), encryption);
    t.is(crypto.encrypt(data), encryption);
    t.is(crypto.encrypt(data), encryption);

});

test('common/crypto will generate an iv key pair', (t) => {

    t.deepEqual(Object.keys(crypto.generateIvKey()), ['iv', 'key']);
    t.deepEqual(Object.keys(crypto.generateIvKey()), ['iv', 'key']);
    t.deepEqual(Object.keys(crypto.generateIvKey()), ['iv', 'key']);

});

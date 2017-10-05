'use strict';

const fs = require('fs');
const path = require('path');

const { test } = require('ava');

const dir = path.resolve(__dirname, '..', 'config');
const data = 'test';
const digest = 'Q7DO+ZJl+eNMEOqdNQGSbSezn1fG1nRWHYuiNueoGfs=';
const encryption = 'xhe0s7KlBwDw7Gi8riPy5A==';
const userIv = 'Oan9RRdKYuDCyzJI';
const userSecret = 'rmeJRgNBVizATHzG';

let config;
let crypto;

test.cb.before((t) => {

    fs.mkdir(dir, function (err) {

        /* eslint-disable padded-blocks */
        if (err) {
            return t.end(err);
        }
        /* eslint-enable padded-blocks */

        fs.writeFile(`${dir}/config.js`, 'module.exports = { "title": "development", "phone": 1234 };', (writeErr) => {

            /* eslint-disable padded-blocks */
            if (writeErr) {
                return t.end(writeErr);
            }
            /* eslint-enable padded-blocks */

            // Load in the config, and set some values.
            // eslint-disable-next-line global-require
            config = require('../common/config');

            config.set('userIv', userIv);
            config.set('userSecret', userSecret);

            // Now load in the crypto module.
            // eslint-disable-next-line global-require
            crypto = require('../common/crypto');

            t.end();

        });

    });

});

test.cb.after.always((t) => {

    fs.unlink(`${dir}/config.js`, function (err) {

        /* eslint-disable padded-blocks */
        if (err) {
            return t.end(err);
        }
        /* eslint-enable padded-blocks */

        fs.rmdir(dir, t.end);

    });

});

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

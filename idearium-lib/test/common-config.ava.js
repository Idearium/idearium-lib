'use strict';

const path = require('path');
const fs = require('fs');
const dir = path.resolve(__dirname, '..', 'config');

const { test } = require('ava');

test.cb.before((t) => {

    fs.mkdir(dir, function (err) {

        /* eslint-disable padded-blocks */
        if (err) {
            return t.end(err);
        }
        /* eslint-enable padded-blocks */

        fs.writeFile(`${dir}/config.js`, 'module.exports = { "title": "development", "phone": 1234 };', t.end);

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

test('common/config will load the config', (t) => {

    // eslint-disable-next-line global-require
    const config = require('../common/config');

    t.is(config.get('title'), 'development');
    t.is(config.get('phone'), 1234);

    config.set('url', 'google.com');
    t.is(config.get('url'), 'google.com');

});

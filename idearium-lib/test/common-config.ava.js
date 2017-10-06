'use strict';

const path = require('path');
const fs = require('fs');

const { test } = require('ava');
const { toPromise } = require('../lib/util/to');

const mkdir = toPromise(fs.mkdir);
const writeFile = toPromise(fs.writeFile);
const rimraf = toPromise(require('rimraf'));

const dir = path.resolve(__dirname);
const configDir = path.join(dir, '..', 'config');
const configFile = path.join(configDir, 'config.js');

test.before(() => {

    return rimraf(configDir)
        .then(() => mkdir(configDir))
        .then(() => writeFile(configFile, 'module.exports = { "title": "development", "phone": 1234 };'));

});

test.after.always(() => rimraf(configDir));

test('common/config will load the config', (t) => {

    // eslint-disable-next-line global-require
    const config = require('../common/config');

    t.is(config.get('title'), 'development');
    t.is(config.get('phone'), 1234);

    config.set('url', 'google.com');
    t.is(config.get('url'), 'google.com');

});

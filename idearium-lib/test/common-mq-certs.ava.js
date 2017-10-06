'use strict';

const path = require('path');
const fs = require('fs');

const { test } = require('ava');
const { toPromise } = require('../lib/util/to');

const mkdir = toPromise(fs.mkdir);
const writeFile = toPromise(fs.writeFile);
const copy = toPromise(require('copy-dir'));
const rimraf = toPromise(require('rimraf'));

const dir = path.resolve(__dirname);
const configDir = path.join(dir, '..', 'config');

test.before(() => {

    // eslint-disable-next-line no-process-env
    const nodeEnv = process.env.NODE_ENV;
    const source = path.join(dir, 'data', 'mq-certs');
    const dest = path.join(dir, '..', 'mq-certs', nodeEnv);

    return rimraf(configDir)
        .then(() => mkdir(configDir))
        .then(() => {

            return writeFile(`${configDir}/config.js`, 'module.exports = { "test": "common-mongo-certs" }');

        })
        // Move the test files into place
        .then(() => copy(source, dest));

});

test.after.always(() => {

    return rimraf(path.join(dir, '..', 'mq-certs'))
        .then(() => rimraf(configDir));

});

test('common/mq/certs will load the certificates, specific to environment', (t) => {

    // eslint-disable-next-line global-require
    return require('../common/mq/certs')
        .then((optsCerts) => {

            t.true(Object.keys(optsCerts).includes('key'));
            t.true(Object.keys(optsCerts).includes('cert'));
            t.true(Object.keys(optsCerts).includes('ca'));

            t.true(optsCerts.key instanceof Buffer);
            t.true(optsCerts.cert instanceof Buffer);
            t.true(optsCerts.ca instanceof Array);

        });

});

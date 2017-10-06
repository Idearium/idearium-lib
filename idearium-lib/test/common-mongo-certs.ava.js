'use strict';

const fs = require('fs');
const path = require('path');

const { toPromise } = require('../lib/util/to');
const { test } = require('ava');

const mkdir = toPromise(fs.mkdir);
const writeFile = toPromise(fs.writeFile);
const rimraf = toPromise(require('rimraf'));
const copy = toPromise(require('copy-dir'));

const dir = path.resolve(__dirname);
const configDir = path.join(dir, '..', 'config');

test.before(() => {

    // eslint-disable-next-line no-process-env
    const nodeEnv = process.env.NODE_ENV;

    return rimraf(configDir)
        .then(() => mkdir(configDir))
        .then(() => {

            return writeFile(`${configDir}/config.js`, 'module.exports = { "test": "common-mongo-certs" }');

        })
        .then(() => {

            const source = path.join(dir, 'data', 'mongo-certs');
            const dest = path.join(dir, '..', 'mongo-certs', nodeEnv);

            return copy(source, dest);

        });

});

test.after.always(() => {

    return rimraf(path.join(dir, '..', 'mongo-certs'))
        .then(() => rimraf(configDir));

});

test('common/mongo/certs will load the certificates, specific to environment', function (t) {

    // eslint-disable-next-line global-require
    return require('../common/mongo/certs')
        .then((certs) => {

            t.true(certs instanceof Array);
            t.is(certs.length, 2);

        });

});

'use strict';

const path = require('path');
const fs = require('fs');

const { test } = require('ava');
const { toPromise } = require('../lib/util/to');

const mkdir = toPromise(fs.mkdir);
const writeFile = toPromise(fs.writeFile);
const copy = toPromise(require('copy-dir'));
const rimraf = toPromise(require('rimraf'));

const conf = require('./conf');
const dir = path.resolve(__dirname);
const configDir = path.join(dir, '..', 'config');

test.before(() => {

    // eslint-disable-next-line no-process-env
    const nodeEnv = process.env.NODE_ENV;
    const source = path.join(dir, 'data', 'mq-certs');
    const dest = path.join(dir, '..', 'mq-certs', nodeEnv);

    return mkdir(configDir)
        .then(() => {

            return writeFile(`${configDir}/config.js`, `module.exports = { "mqUrl": "${conf.rabbitUrl}" }`);

        })
        // Move the test files into place
        .then(() => copy(source, dest));

});

test.after.always(() => {

    return rimraf(path.join(dir, '..', 'mq-certs'))
        .then(() => rimraf(configDir));

});

test.cb('common/mq/client will connect to rabbit mq', (t) => {

    // Catch and proxy any errors to `done`.
    try {

        // Create an instance of `mq.Client`.
        // eslint-disable-next-line global-require
        const mqClient = require('../common/mq/client');

        // When the `connect` event is fired, we're done.
        // Only listen once, because `../common/mq/client` is used in later tests.
        // It will be cached, and so we don't want to execute this instance of `done` again.
        mqClient.once('connect', function () {

            const keys = Object.keys(mqClient.options);

            // Ensure it successfully loaded all certs.
            t.true(keys.includes('key'));
            t.true(keys.includes('cert'));
            t.true(keys.includes('ca'));
            t.true(keys.includes('servername'));
            t.true(Array.isArray(mqClient.options.ca));

            t.end();

        });

        // Listen for errors and send to `done`.
        mqClient.once('error', t.end);

    } catch (e) {

        return t.end(e);

    }

});

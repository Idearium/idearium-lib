'use strict';

const fs = require('fs');
const path = require('path');

const { test } = require('ava');
const { toPromise } = require('../lib/util/to');

const mkdir = toPromise(fs.mkdir);
const writeFile = toPromise(fs.writeFile);
const copy = toPromise(require('copy-dir'));
const rimraf = toPromise(require('rimraf'));

const conf = require('./conf');
const dir = path.resolve(__dirname);
const configDir = path.join(dir, '..', 'config');
const configFile = path.join(configDir, 'config.js');

test.before(() => {

    // eslint-disable-next-line no-process-env
    const nodeEnv = process.env.NODE_ENV;
    const source = path.join(dir, 'data', 'mq-certs');
    const dest = path.join(dir, '..', 'mq-certs', nodeEnv);

    return rimraf(configDir)
        .then(() => mkdir(configDir))
        .then(() => {

            return writeFile(configFile, `module.exports = { "mqUrl": "${conf.rabbitUrl}" }`);

        })
        // Move the test files into place
        .then(() => copy(source, dest));

});

test.after.always(() => {

    return rimraf(path.join(dir, '..', 'mq-certs'))
        .then(() => rimraf(configDir));

});

test.cb('common/mq/rpc-server will connect to rabbit mq', (t) => {

    // Catch and proxy any errors to `t.end`.
    try {

        // eslint-disable-next-line global-require
        const RpcServer = require('../common/mq/rpc-server');

        // Create an instance of `RpcServer`.
        // eslint-disable-next-line no-empty-function
        const mqRpcServer = new RpcServer('queue_name', () => {});

        // When the `connect` event is fired, we're done.
        // Only listen once, because `../common/mq/rpc-server` is used in later tests.
        mqRpcServer.once('connect', function () {

            const keys = Object.keys(mqRpcServer.options);

            // Ensure it successfully loaded all certs.
            t.true(keys.includes('key'));
            t.true(keys.includes('cert'));
            t.true(keys.includes('ca'));
            t.true(keys.includes('servername'));
            t.true(Array.isArray(mqRpcServer.options.ca));

            return t.end();

        });

        // Listen for errors.
        mqRpcServer.once('error', t.end);

    } catch (e) {

        return t.end(e);

    }

});

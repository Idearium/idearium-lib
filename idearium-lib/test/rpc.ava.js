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
        .then(() => rimraf(dest))
        .then(() => copy(source, dest));

});

test.after.always(() => {

    return rimraf(path.join(dir, '..', 'mq-certs'))
        .then(() => rimraf(configDir));

});

test.cb('will send and receive messages', (t) => {

    // Catch and proxy errors to `done`.
    try {

        //
        // Common
        //

        const data = {
            'array': [],
            'boolean': true,
            'object': {},
            'random': Math.floor(Math.random() * 40000),
        };

        const rpcName = 'rpc_server_name';

        //
        // Setup the server.
        //

        const reply = (msg, callback) => {

            const msgData = JSON.parse(msg.content.toString());

            t.deepEqual(msgData, data);
            callback(msg.content);

        };

        // eslint-disable-next-line global-require
        const RpcServer = require('../common/mq/rpc-server');

        const rpcServer = new RpcServer(rpcName, reply);

        // Listen for errors.
        rpcServer.addListener('error', t.end);

        //
        // Setup the client.
        //

        // Setup an instance of the class.
        // eslint-disable-next-line global-require
        const rpcClient = require('../common/mq/rpc-client');

        // Add the connect listener. When this happens, we're done.
        rpcClient.addListener('queue', () => {

            rpcClient.publish(rpcName, data)
                .then((result) => {

                    const msgData = JSON.parse(result.content.toString());

                    t.deepEqual(msgData, data);

                    return t.end();

                })
                .catch(t.end);

        });

        // Listen for errors.
        rpcClient.addListener('error', t.end);

    } catch (e) {

        return t.end(e);

    }

});

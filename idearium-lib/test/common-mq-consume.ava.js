'use strict';

const fs = require('fs');
const path = require('path');

const { mq } = require('../');
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
const messagesDir = path.join(dir, '..', 'messages');
const messagesFile = path.join(messagesDir, 'test-file.js');

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
        .then(() => rimraf(messagesDir))
        .then(() => mkdir(messagesDir))
        .then(() => {

            return writeFile(messagesFile, 'module.exports = { consume: () => Promise.resolve(), publish: () => Promise.resolve() };');

        })
        // Move the test files into place
        .then(() => rimraf(dest))
        .then(() => copy(source, dest));

});

test.after.always(() => {

    return rimraf(path.join(dir, '..', 'mq-certs'))
        .then(() => rimraf(configDir))
        .then(() => rimraf(messagesDir));

});

test.cb('will execute consumers', (t) => {

    const mqManager = new mq.Manager(messagesDir);

    /* eslint-disable global-require */
    const { consume } = require('../common/mq/consume');
    const { publish } = require('../common/mq/publish');
    const message = require(messagesFile);
    /* eslint-enable global-require */

    message.consume = consume((data) => {

        t.deepEqual(data, [{ 'will-execute-consumers': true }]);
        t.end();

        return Promise.resolve();

    }, {
        exchange: 'update',
        queue: 'lib.app.test.update.wec',
        routingKey: 'lib.app.test.update.wec',
    });

    message.publish = (publish({
        exchange: 'update',
        routingKey: 'lib.app.test.update.wec',
    }));

    // Catch and proxy any errors to `done`.
    try {

        // This will be cached.
        // eslint-disable-next-line global-require
        require('../common/mq/messages');

        // Wait until everything is loaded.
        mqManager.addListener('load', () => {

            // Run this manually, as it will have already run once.
            return mqManager.registerConsumers()
                .then(() => mqManager.publish(path.basename(messagesFile, '.js'), { 'will-execute-consumers': true }))
                .catch(t.end);

        });

    } catch (e) {

        return t.end(e);

    }

});

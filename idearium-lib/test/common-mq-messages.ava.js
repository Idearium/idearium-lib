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
const messagesDir = path.join(dir, '..', 'messages');
const messagesFile = path.join(messagesDir, 'test-file-common-mq-messages.js');

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
        .then(() => copy(source, dest));

});

test.after.always(() => {

    return rimraf(path.join(dir, '..', 'mq-certs'))
        .then(() => rimraf(configDir))
        .then(() => rimraf(messagesDir));

});

test.cb('will faciliate producing and consuming messages', (t) => {

    const exchange = 'common-mq-messages';
    const queueName = 'common-mq-messages-queue';

    /* eslint-disable global-require */
    const mqClient = require('../common/mq/client');
    const message = require(messagesFile);
    /* eslint-enable global-require */

    // Recreate the consume function.
    message.consume = function consumeTest () {

        mqClient.consume((channel) => {

            const processMessage = (msg) => {

                // For the purpose of this test case, instantly acknowledge the message.
                channel.ack(msg);

                let data;

                // Try and pass the data.
                try {

                    data = JSON.parse(msg.content.toString());

                } catch (e) {

                    return t.end(e);

                }

                /* eslint-disable padded-blocks */
                if (!data) {
                    return t.end(new Error('There was no data'));
                }
                /* eslint-enable padded-blocks */

                t.deepEqual(data, { 'common-mq-messages-test': true });

                return t.end();

            };

            // Create exchange, durable make sure exchange will persist to disk.
            return channel.assertExchange(exchange, 'fanout', { durable: true })
                // Create queue, durable make sure queue will persist to disk.
                .then(() => channel.assertQueue(queueName, { durable: true }))
                // Bind queue to exchange, with empty string as the routing key since the exchange type is 'fanout'.
                .then(() => channel.bindQueue(queueName, exchange, ''))
                // Consume and process the message, noAck tells rabbitmq to wait for aknowledgement.
                .then(() => channel.consume(queueName, processMessage, { noAck: false }));

        });

    };

    // Create the publish function.
    message.publish = function publishTest (data) {

        // Publish anything we receive into RabbitMQ.
        mqClient.publish((channel) => {

            // Create exchange, durable make sure exchange will persist to disk.
            return channel.assertExchange(exchange, 'fanout', { durable: true })
            // Publish message to exchange, persistent settings ensure message is saved to disk in case of server failure
                .then(() => channel.publish(exchange, '', Buffer.from(JSON.stringify(data)), { persistent: true }));

        });

    };

    // Catch and proxy any errors to `done`.
    try {

        // eslint-disable-next-line global-require
        const mqMessages = require('../common/mq/messages');

        // Once everything is loaded, publish.
        mqMessages.addListener('load', () => message.publish({ 'common-mq-messages-test': true }));

        // Load the message.
        mqMessages.load();

    } catch (e) {

        return t.end(e);

    }

});

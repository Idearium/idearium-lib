'use strict';

const client = require('./client');
const debug = require('debug')('idearium-lib:common:mq:consume');
const { isArray, ack } = require('../../').util;

/**
 * Consume a MQ message.
 * @param {Function} action The function to process the message. This should take a data array as the only parameter and must return a promise.
 * @param {Object} options The consume options.
 * @param {Object} [options.consumeOptions={ noAck: false }] The consume options.
 * @param {String} options.exchange The exchange string.
 * @param {Object} [options.exchangeOptions={ durable: true }] The exchange options.
 * @param {String} [options.exchangeType='topic'] The exchange type.
 * @param {String} options.queue The queue name.
 * @param {Object} [options.queueOptions={ durable: true }] The queue options.
 * @param {String} options.routingKey The routingKey.
 * @return {Function} Returns a function that publishes the message.
 */
const consume = (action, options) => () => client.consume((channel) => {

    const {
        consumeOptions,
        exchange,
        exchangeOptions,
        exchangeType,
        queue,
        queueOptions,
        routingKey,
    } = Object.assign({
        consumeOptions: { noAck: false },
        exchangeOptions: { durable: true },
        exchangeType: 'topic',
        queueOptions: { durable: true },
    }, options);

    const processMessage = (msg) => {

        let data;

        try {

            debug('Consuming message: %O', {
                data: JSON.parse(msg.content.toString()),
                exchange,
                queue,
                routingKey,
            });

            data = JSON.parse(msg.content.toString());

        } catch (err) {

            debug('MQ error reading data: %O', { data: msg.content.toString(), err });

            return ack(channel, msg);

        }

        if (!isArray(data)) {
            data = [data];
        }

        return action(data)
            .then(() => ack(channel, msg))
            .catch((err) => {

                debug('Error processing message: %O', { data, err });

                return ack(channel, msg);

            });

    };

    return channel.assertExchange(exchange, exchangeType, exchangeOptions)
        .then(() => channel.assertQueue(queue, queueOptions))
        .then(() => channel.bindQueue(queue, exchange, routingKey))
        .then(() => channel.consume(queue, processMessage, consumeOptions))
        .catch(err => debug('MQ error: %O', { err }));

});

module.exports = { consume };

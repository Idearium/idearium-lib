'use strict';

const config = require('./config');
const { Logger } = require('../lib/logs');
const { LogentriesStream } = require('../lib/logs/streams');
const factory = require('pino-pretty');

/* eslint-disable no-process-env */
const elasticApmServiceName = process.env.ELASTIC_APM_SERVICE_NAME;
const logentriesActive = process.env.LOGENTRIES_ACTIVE;
const logentriesToken = process.env.LOGENTRIES_TOKEN;
const logentriesRegion = process.env.LOGENTRIES_REGION;
/* eslint-enable no-process-env */

/**
 * Create a new Logger instance.
 * @param {String} context Context of the logs.
 * @param {Object} options Pino options.
 * @return {Object} Creates a new Logger instance.
 */
const log = (context, options) => {

    if (!context) {
        throw new Error('You must supply the context parameter');
    }

    const streams = [];

    let defaultStream = process.stderr;

    // Enable pretty-print
    if (config.get('isLocal')) {
        defaultStream = factory({ colorize: true }).asMetaWrapper(process.stderr);
    }

    streams.push(defaultStream);

    if (logentriesActive !== 'false') {

        const logEntriesStream = new LogentriesStream({
            region: logentriesRegion,
            token: logentriesToken,
        });

        streams.push(logEntriesStream);

    }

    const logger = new Logger(Object.assign({
        name: elasticApmServiceName,
        streams,
    }, options));

    logger.child({ context });

    return logger;

};

module.exports = log;

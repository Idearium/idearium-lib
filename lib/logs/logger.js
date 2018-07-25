'use strict';

const pinoms = require('pino-multi-stream');

class Logger {

    /**
     * The logger contructor.
     * @param {Object} [options={}] Pino logger options.
     * @returns {Void} Creates a new logger.
     */
    constructor (options = {}) {

        /* eslint-disable no-process-env */
        this.log = pinoms(Object.assign({
            level: process.env.PINO_LEVEL || 'debug',
            serializers: pinoms.stdSerializers,
        }, options));
        /* eslint-enable no-process-env */

    }

}

module.exports = Logger;

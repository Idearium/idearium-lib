'use strict';

const Logger = require('r7insight_node');

class LogentriesStream {

    constructor (options = {}) {

        if (!options.token) {
            throw new Error('A logentries token must be provided');
        }

        if (!options.region) {
            throw new Error('A logentries region must be provided');
        }

        this.stream = Logger.bunyanStream(options);

    }

}

module.exports = LogentriesStream;

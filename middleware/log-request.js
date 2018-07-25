'use strict';

const config = require('../common/config');
const log = require('../common/log')('idearium-lib:middleware:log-request');

module.exports = function logRequest (req, res, next) {

    const exclude = config.get('logRequestExclude') || ['admin/public', 'ping'];
    const regex = new RegExp(`^/${exclude.join('|')}/?.*$`);
    const start = Date.now();

    // Don't do any of this, if the regex matches.
    if (regex.test(req.url)) {
        return next();
    }

    // Let's move on straight away
    next();

    // Set the response start.
    req.responseStart = req.responseStart || start;

    // When the request is finished, log it.
    res.on('finish', () => {

        const duration = Date.now() - start;
        const packet = {
            production: config.get('production'),
            req,
            responseTime: duration,
            status: this.statusCode,
        };

        // Log a short version of the user object, if it exists.
        if (req.user && req.user.username && req.user._id) {

            packet.user = {
                id: req.user._id,
                username: req.user.username,
            };

        }

        log.debug(packet);

    });

};

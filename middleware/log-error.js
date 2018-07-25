'use strict';

const config = require('../common/config');
const log = require('../common/log')('idearium-lib:middleware:log-error');

module.exports = (err, req, res, next) => {

    // Let's move on straight away.
    next(err);

    // The duration of the request.
    const duration = Date.now() - (req.responseStart || Date.now());

    // The packet we're going to log.
    const packet = {
        err,
        production: config.get('production'),
        req,
        responseTime: duration,
        status: res.statusCode,
    };

    // A short version of the user, if it exists.
    if (req.user && req.user.username && req.user._id) {

        packet.user = {
            id: req.user._id,
            username: req.user.username,
        };

    }

    // Log the error.
    log.error(packet);

};

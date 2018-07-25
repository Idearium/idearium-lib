'use strict';

const log = require('../common/log')('idearium-lib:middleware:log-request');

module.exports = function logRequest (req, res, next) {

    const config = require('../common/config');
    const exclude = config.get('logRequestExclude') || ['admin/public', 'ping'];
    const regex = new RegExp(`^/${exclude.join('|')}/?.*$`);

    // Don't do any of this, if the regex matches.
    if (regex.test(req.url)) {
        return next();
    }

    // Let's move on straight away
    next();

    // Set the response start.
    req.responseStart = req.responseStart || req.responseStart || Date.now();

    // When the request is finished, log it.
    res.on('finish', () => {

        log.debug({
            duration: Date.now() - start,
            req,
            res,
        });

    });

};

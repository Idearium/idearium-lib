'use strict';

const log = require('../common/log')('idearium-lib:middleware:log-error');

module.exports = (err, req, res, next) => {

    // Let's move on straight away.
    next(err);

    log.error({
        duration: Date.now() - (req.responseStart || Date.now()),
        err,
        req,
        res,
    });

};

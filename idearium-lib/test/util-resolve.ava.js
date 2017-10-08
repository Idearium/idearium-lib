'use strict';

const { test } = require('ava');

const { ack } = require('../lib/util');

test('util-resolve acknowledges a message and resolves a promise', (t) => {

    const msg = 'msg';
    const channel = { ack: message => msg === message };

    return ack(channel, msg).then(() => {

        t.pass();

    });

});

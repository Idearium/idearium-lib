'use strict';

const { cleanUp, makeConfigs } = require('./util');

describe('config', () => {

    let config;

    beforeAll(() => makeConfigs('module.exports = { "title": "development", "phone": 1234 };')
        .then(() => {

            // eslint-disable-next-line global-require, prefer-destructuring
            config = require('../lib').config;

            return Promise.resolve();

        }));

    test('will load the config', () => {

        expect(config.get('title')).toBe('development');
        expect(config.get('phone')).toBe(1234);

        config.set('url', 'google.com');
        expect(config.get('url')).toBe('google.com');

    });

    afterAll(() => cleanUp());

});

'use strict';

const { cleanUp, makeConfigs } = require('./util');

describe('config', () => {

    let config;

    beforeAll(() => makeConfigs('module.exports = { "title": "development", "phone": 1234 };'));

    beforeEach(() => {

        // eslint-disable-next-line global-require, prefer-destructuring
        config = require('../lib').config;

        console.log('WHAT IS CONFIG ANYWAY?', config.getAll());

        return Promise.resolve();

    });

    test('will load the config', () => {

        expect(config.get('title')).to.equal('development');
        expect(config.get('phone')).to.equal(1234);

        config.set('url', 'google.com');
        expect(config.get('url')).equal('google.com');

    });

    afterAll(() => cleanUp());

});

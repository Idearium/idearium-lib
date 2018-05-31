'use strict';

const { cleanUp, makeConfigs } = require('./util');
const { Config } = require('../lib');
const path = require('path');

describe('config', () => {

    beforeAll(() => makeConfigs('module.exports = { "title": "development", "phone": 1234 };'));

    test('will load the config', () => {

        const config = new Config(path.join(process.cwd(), 'config'));

        expect(config.get('title')).toBe('development');
        expect(config.get('phone')).toBe(1234);

        config.set('url', 'google.com');
        expect(config.get('url')).toBe('google.com');

    });

    test('should set \'env\' to `process.env.NODE_ENV`', () => {

        const config = new Config(path.join(process.cwd(), 'config'));

        // eslint-disable-next-line no-process-env
        expect(config.get('env')).toBe(process.env.NODE_ENV);

    });

    test('should set `process.env.NODE_ENV` to `true`', () => {

        const config = new Config(path.join(process.cwd(), 'config'));

        // eslint-disable-next-line no-process-env
        expect(config.get(process.env.NODE_ENV)).toBeTruthy();

    });

    test('create multiple instance', () => {

        const config1 = new Config(path.join(process.cwd(), 'config'));
        const config2 = new Config(path.join(process.cwd(), 'config'));

        config1.set('hello', 'config1');
        config2.set('hello', 'config2');

        expect(config1.get('hello')).toBe('config1');
        expect(config2.get('hello')).toBe('config2');

    });

    afterAll(() => cleanUp());

});

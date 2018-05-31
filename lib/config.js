'use strict';

const nconf = require('nconf');
const path = require('path');

// eslint-disable-next-line no-process-env
const env = process.env.NODE_ENV;

class Config {

    /**
     * Constructor
     * @param {String} dir Config directory
     * @returns {Object} Config instance
     */
    constructor (dir) {

        if (!dir) {
            throw new Error('dir parameter must be provided when creating a new Config instance.');
        }

        this.config = new nconf.Provider();
        this.config.use('memory');

        // Load in the config file.
        // eslint-disable-next-line global-require
        this.config.defaults(require(dir));

        // Add hooks for environment flag.
        if (env) {
            this.config.set(env, true);
        }

        // Setup the environment.
        this.config.set('env', env);

        // Always prefer ENV variables, over those loaded above.
        this.config.env();

    }

    /**
     * Set config keyed value.
     * @param {String} key Key name.
     * @param {String} value Value.
     * @returns {Void} Sets the key value.
     */
    set (key, value) {
        this.config.set(key, value);
    }

    /**
     * Get config keyed value
     * @param {String} key Key name
     * @return {String} value
     */
    get (key) {
        return this.config.get(key);
    }

    /**
     * Get a list of all the config values
     * @return {Object} key value object.
     */
    getAll () {

        const keys = [];
        const result = {};
        const currentConfig = this.config;

        Object.keys(currentConfig.stores).forEach((storeType) => {
            keys.concat(Object.keys(currentConfig.stores[storeType].store).filter(key => keys.indexOf(key) < 0));
        });

        // That we have all of the keys, loop through and get their values.
        keys.sort().forEach(key => (result[key] = currentConfig.get(key)));

        return result;

    }

}

module.exports = new Config(path.join(process.cwd(), 'config'));

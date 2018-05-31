/* eslint-env node, mocha */

'use strict';

const { Hash } = require('../lib');

describe('Hash', () => {

    const identifier = 'string.to.hash';

    describe('create an instance', () => {

        test('should fail, if the identifier parameter is not provided', () => {

            expect(() => new Hash()).toThrow(/identifier/);

        });

        test('should instantiate, if the identifier parameter is provided', () => {

            const hash = new Hash(identifier);

            expect(hash).toBeDefined();
            expect(hash.identifier).toBeDefined();
            expect(hash.identifier).toBe(identifier);
            expect(hash.hashed).toBeNull();

        });

        test('should hash the identifier', (done) => {

            const hash = new Hash(identifier);

            hash.hash((err, hashed) => {

                if (err) {
                    return err;
                }

                expect(hash.hashed).toBeDefined();
                expect(hashed).toBeDefined();

                return done();

            });

        });

        test('successfully compare a hash', (done) => {

            const hash = new Hash(identifier);

            hash.hash((err, hashed) => {

                if (err) {
                    return err;
                }

                expect(hash.hashed).toBeDefined();
                expect(hashed).toBeDefined();

                hash.compare(hashed, (compareErr, comparison) => {

                    if (compareErr) {
                        return compareErr;
                    }

                    expect(comparison).toBeDefined();
                    expect(comparison).toBeTruthy();

                    return done();

                });

            });

        });

        test('successfully fail a hash compare', (done) => {

            const hash = new Hash(identifier);

            hash.hash((err, hashed) => {

                if (err) {
                    return err;
                }

                expect(hash.hashed).toBeDefined();
                expect(hashed).toBeDefined();

                hash.compare('some.string', (compareErr, comparison) => {

                    if (compareErr) {
                        return compareErr;
                    }

                    expect(comparison).toBeDefined();
                    expect(comparison).toBeFalsy();

                    return done();

                });

            });

        });

        test('successfully compare a hash, without prior hashing', (done) => {

            const hash = new Hash(identifier);

            hash.compare('$2a$10$H0S.zE4oymFcfWzcqa9OFuxCQwixGw7WolM.OjWD2hDz0/BbpsCT6', (compareErr, comparison) => {

                if (compareErr) {
                    return compareErr;
                }

                expect(comparison).toBeDefined();
                expect(comparison).toBeTruthy();

                return done();

            });

        });

    });

});

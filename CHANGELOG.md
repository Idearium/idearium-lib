# Idearium-lib changelog

## Unreleased

### Breaking changes

- Common and lib have been merged. Instead of requiring `const something = require('@idearium/idearium-lib/common/something')` you can now just do `const { something } = require('@idearium/idearium-lib');`.

#### Config

- The config no longer creates a new instance. You will have to manually call instantiate it. `const config = new Config(path.join(process.cwd(), 'config'));`.

#### Query

- `query` is now a mongoose plugin function, to use it you should do something like `mongoose.plugin(query);`.
- `query` will create functions `findOneDocument` and `findDocuments`. These functions take the same parameters that were previously available in the `options` object.

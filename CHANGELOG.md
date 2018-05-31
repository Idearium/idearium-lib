# Idearium-lib changelog

## Unreleased

### Breaking changes

- Common and lib have been merged. Instead of requiring `const something = require('@idearium/idearium-lib/common/something')` you can now just do `const { something } = require('@idearium/idearium-lib');`.
- `query` is now a function and must be passed a mongoose object.
- `query` will now create functions on mongoose models (a global plugin) and make the functions `findOneDocument` and `findDocuments` available. These functions take the same parameters that were previously available in the `options` object.

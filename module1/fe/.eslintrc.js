module.exports = {
    parser: '@typescript-eslint/parser', // Specifies the ESLint parser
    extends: [
        'plugin:@typescript-eslint/recommended' // Uses the recommended rules from @typescript-eslint/eslint-plugin
    ],
    parserOptions: {
        ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
        ecmaFeatures: {
            jsx: true // Allows for the parsing of JSX
        }
    },
    rules: {
        'semi': [ 'error', 'never' ],
        'quotes': [ 'error', 'single' ],
        'key-spacing': [ 'error', { afterColon: true }],
        'array-bracket-spacing': [ 'error', 'always', { 'singleValue': false , 'arraysInArrays': false ,'objectsInArrays': false }],
        'object-curly-spacing': [ 'error', 'always', { 'arraysInObjects': false, 'objectsInObjects': false }],
        'no-multi-spaces': [ 'error', { 'ignoreEOLComments': false }],
        'eqeqeq': [ 'error', 'always', { 'null': 'ignore' }],
        'valid-typeof': [ 'error', { 'requireStringLiterals': true }],
    },
    settings: {
        react: {
            version: 'detect' // Tells eslint-plugin-react to automatically detect the version of React to use
        }
    }
}

module.exports = {
    env: {
      browser: true,
      es2023: true
    },
    extends: ['@nuxtjs','prettier'],
    parserOptions: {
      ecmaVersion: 2023,
      sourceType: 'module'
    },
    plugins: [],
    rules: {
      'no-undef': 'off',
      indent: 'off',
      quotes: 'off',
      semi: ['error', 'always'],
      "comma-dangle": 'off',
    }
    };
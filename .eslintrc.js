module.exports = {
  env: {
    jest: true
  },
  plugins: ['react-redux'],
  extends: [
    'plugin:react-redux/recommended',
    'airbnb-typescript',
    'erb/typescript'
  ],
  rules: {
    // A temporary hack related to IDE not resolving correct package.json
    'import/no-extraneous-dependencies': 'off',
    'react/no-danger': 0,
    'react/no-array-index-key': 0,
    'jsx-a11y/label-has-for': [
      'error',
      {
        required: {
          some: ['nesting', 'id']
        }
      }
    ]
  },
  settings: {
    'import/resolver': {
      // See https://github.com/benmosher/eslint-plugin-import/issues/1396#issuecomment-575727774 for line below
      node: {},
      webpack: {
        config: require.resolve('./configs/webpack.config.eslint.js')
      }
    }
  }
};

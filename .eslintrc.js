module.exports = {
  env: {
    es2021: true,
    node: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:react/jsx-runtime',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  plugins: ['react', 'jsx-a11y', 'import', 'react-native', 'react-hooks', 'prettier'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single', { avoidEscape: true }],
    semi: ['error', 'always'],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-empty-function': 'off',
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'global-require': 'off', // React Native images uses the require syntax so we're turning it off so that we don't get any errors
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }], // only return an error if JSX syntax is used on files other than those with .js or .jsx file extension
    'react-native/no-unused-styles': 2, // disallow unused styles
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};

const path = require('path');

const tsOverride = require('@xcritical/eslint-plugin-xcritical/overrides/typescript');


module.exports = {
  extends: [
    'plugin:@xcritical/eslint-plugin-xcritical/base',
    'plugin:@xcritical/eslint-plugin-xcritical/typescript',
    'prettier',
    'plugin:redux-saga/recommended',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: ['prettier', 'redux-saga'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        parser: 'typescript',
        bracketSpacing: true,
        jsxBracketSameLine: true,
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['error', 'warn', 'info'],
      },
    ],
    'redux-saga/no-unhandled-errors': 'warn',
    'import/no-extraneous-dependencies': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-array-index-key': 'warn',
    'import/no-unresolved': ['error', { ignore: ['^@crm-package', '^mdi-react\/dist'] }],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
        ],
        pathGroupsExcludedImportTypes: ['builtin'],
        pathGroups: [
          {
            pattern: '@xcritical/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@crm-package/**',
            group: 'internal',
          },
        ],
      },
    ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'if', next: '*' },
      { blankLine: 'always', prev: '*', next: 'if' },
      { blankLine: 'always', prev: '*', next: 'return' },
    ],
    'react/jsx-indent': ['error', 2, { indentLogicalExpressions: true }],
    'no-underscore-dangle': 0,
    'no-unexpected-multiline': 'error',
    '@typescript-eslint/no-use-before-define': ['warn'],
    '@typescript-eslint/unbound-method': ['warn'],
    '@typescript-eslint/prefer-regexp-exec': 'warn',
    // Prettier conflicts
    'import/newline-after-import': 0,
  },
  globals: {
    APP_PATH: true,
    JSX: true,
  },
  parserOptions: {
    project: path.resolve(__dirname, './tsconfig.json'),
    ecmaFeatures: {
      jsx: true,
    },
    tsconfigRootDir: __dirname,
  },
};
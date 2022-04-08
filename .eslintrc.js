module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react', '@typescript-eslint', 'react-hooks',
    'jest-dom', 'testing-library',
  ],
  rules: {
    'no-param-reassign': ['error', { props: false }],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': ['warn', {
      extensions: ['.tsx'],
    }],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'import/extensions': ['error', 'ignorePackages', {
      ts: 'never',
      tsx: 'never',
    }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: [
          '.storybook/**',
          'stories/**',
          '**/*.stories.*',
        ],
      },
    ],
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
};

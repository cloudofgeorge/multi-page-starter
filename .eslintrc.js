module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  plugins: ['@typescript-eslint'],
  env: {
    browser: true,
    jest: true,
    node: true,
    es6: true,
    es2021: true,
  },
  globals: {
    window: true,
    document: true,
    jest: true,
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
    sourceType: 'module',
    ecmaVersion: 12,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    'arrow-body-style': 'off',
    'no-underscore-dangle': 'off',
    'no-nested-ternary': 'warn',
    'no-use-before-define': 'off',
    'no-unused-expressions': 'off',
    'global-require': 'off',
    allowTernary: 'off',
    'no-multi-assign': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-param-reassign': 'off',
    'no-restricted-globals': 'off',
    'class-methods-use-this': 'off',
    'default-case': 'off',
    'func-names': ['warn', 'always', { generators: 'as-needed' }],
    'prefer-const': 'off',
    'prefer-arrow-callback': 'off',
    'max-lines': ['error', 400],

    'import/no-unresolved': 'off',
    'import/imports-first': ['error', 'absolute-first'],
    'import/newline-after-import': 'error',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-dynamic-require': 'off',

    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-extra-boolean-cast': 'off',
    'import/no-named-as-default': 0,
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never',
      },
    ],
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'max-len': ['warn', 120],
    '@typescript-eslint/naming-convention': 0,
    'no-case-declarations': 'off',
    'react/jsx-filename-extension': 'off',
  },
  overrides: [
    {
      files: ['webpack/**/**'],
      rules: {
        'max-len': 'off',
      },
    },
    {
      files: ['src/templates/**/**'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ],
};

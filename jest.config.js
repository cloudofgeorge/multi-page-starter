module.exports = {
  coverageDirectory: '<rootDir>/coverage',
  preset: 'ts-jest/presets/js-with-babel',
  rootDir: './',
  verbose: true,
  testEnvironment: 'jsdom',
  testEnvironmentOptions: { resources: 'usable', runScripts: 'dangerously' },
  collectCoverageFrom: [
    'src/**/*.{ts,js}',
    '!src/test/**/*',
    '!src/**/types.ts',
    '!src/**/*.test.ts',
    '!src/**/__mocks__/**/*',
    '!src/**/__test__/**/*',
    '!src/**/mixins/**/*',
    '!src/**/index.ts',
    '!src/**/styles.ts',
    '!src/**/*.stories.*',
    '!**/node_modules/**',
  ],
  globals: {
    'ts-jest': {
      babelConfig: 'babel.config.js',
    },
  },
  moduleNameMapper: {
    '.+\\.(css|scss|png|jpg|jpeg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  testRegex: '(/__test__/.*|(\\.|/)(test|spec))\\.ts?$',
  moduleDirectories: ['node_modules', 'src'],
  transformIgnorePatterns: [],
};

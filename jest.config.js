const { pathsToModuleNameMapper } = require('ts-jest');

module.exports = {
  moduleNameMapper: {
    '@core/(.*)': '<rootDir>/src/app/core/$1',
    '@models/(.*)': '<rootDir>/src/app/models/$1',
  },
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
};

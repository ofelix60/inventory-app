/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/**/*.test.js'],
  verbose: true,
  forceExit: true,
  transformIgnorePatterns: ['node_modules/(?!(p-retry)/)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },

  // clearMocks:true
};

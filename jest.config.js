export default {
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^.+\\.(css|less|scss)$': 'identity-obj-proxy',
      '^.+\\.svg$': 'jest-svg-transformer',
    },
    setupFilesAfterEnv: ['./src/setupTests.js'],
  };
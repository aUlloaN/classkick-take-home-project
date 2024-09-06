const nextJest = require('next/jest');
 
/** @type {import('jest').Config} */
const createJestConfig = nextJest({
  dir: './',
});

const config = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
 
module.exports = createJestConfig(config);
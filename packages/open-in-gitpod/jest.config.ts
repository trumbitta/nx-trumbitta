/* eslint-disable */
export default {
  displayName: 'open-in-gitpod',
  preset: '../../jest.preset.js',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'json', 'js', 'jsx'],
  coverageDirectory: '../../coverage/packages/open-in-gitpod',
};

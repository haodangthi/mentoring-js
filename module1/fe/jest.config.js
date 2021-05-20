module.exports = {
  preset: 'ts-jest',
  transform: {
    "\\.[jt]sx?$": "babel-jest"
  },
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  verbose: true,
}

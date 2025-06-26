module.exports = {
  preset: 'jest-expo',
  setupFiles: ['./jest.setup.js'],
transformIgnorePatterns: [
  "node_modules/(?!(expo|@expo|react-native|@react-native|@react-navigation)/)"
],
moduleNameMapper: {
  '\\.(png|jpg|jpeg|svg)$': '<rootDir>/__mocks__/fileMock.js'
  }
};
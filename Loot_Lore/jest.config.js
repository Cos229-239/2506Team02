module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './jest/setup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!(expo|@expo|expo-modules-core|@react-navigation|react-navigation|@react-native|react-native|@react-native-async-storage|@testing-library)/)',
  ],
};

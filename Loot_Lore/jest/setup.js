// jest/setup.js
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

jest.mock('expo-clipboard', () => ({
  setStringAsync: jest.fn(),
}));

// Optional: Silence console warnings (can remove if you want logs)
global.console = {
  ...console,
  warn: jest.fn(),
};

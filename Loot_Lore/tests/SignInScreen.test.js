  jest.mock('../assets/logo.png', () => null);
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignInScreen from '../screens/SignInScreen';
import { NavigationContainer } from '@react-navigation/native';


describe('SignInScreen', () => {
  const mockNavigate = jest.fn();
  const mockReplace = jest.fn();

  const renderWithNav = () =>
    render(
      <NavigationContainer>
        <SignInScreen navigation={{ navigate: mockNavigate, replace: mockReplace }} />
      </NavigationContainer>
    );

  beforeEach(() => {
    mockNavigate.mockClear();
    mockReplace.mockClear();
  });

  it('renders input fields and buttons', () => {
    const { getByPlaceholderText, getByText } = renderWithNav();

    expect(getByPlaceholderText('Type your username or e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Type your password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
    expect(getByText('Sign Up')).toBeTruthy();
    expect(getByText('FORGOT PASSWORD')).toBeTruthy();
  });

  it('calls navigation.replace on login', () => {
    const { getByText } = renderWithNav();
    fireEvent.press(getByText('Login'));
    expect(mockReplace).toHaveBeenCalledWith('Main');
  });

  it('calls navigation.navigate to SignUpScreen', () => {
    const { getByText } = renderWithNav();
    fireEvent.press(getByText('Sign Up'));
    expect(mockNavigate).toHaveBeenCalledWith('SignUpScreen');
  });

  it('calls navigation.navigate to ResetPassword', () => {
    const { getByText } = renderWithNav();
    fireEvent.press(getByText('FORGOT PASSWORD'));
    expect(mockNavigate).toHaveBeenCalledWith('ResetPassword');
  });
});

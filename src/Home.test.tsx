import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from './Home';

test('Home Screen renders title of applicaion', () => {
  render(<Home />);
  const textElement = screen.getByText(/CapTrainimi/i);
  expect(textElement).toBeInTheDocument();
});

test('Home Screen renders Font Awesome icon', () => {
  render(<Home />);
  const fontAwesomeIconElement = screen.getByLabelText(/font-awesome/i);
  expect(fontAwesomeIconElement).toBeInTheDocument();
});

test('Home Screen renders Login and Signup with email buttons', () => {
  render(<Home />);
  const loginButton = screen.getByLabelText(/login-button/i);
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeEnabled();
  expect(loginButton).toHaveClass('btn btn-outline-primary btn-lg');

  const signupButton = screen.getByLabelText(/signup-button/i);
  expect(signupButton).toBeInTheDocument();
  expect(signupButton).toBeEnabled();
  expect(signupButton).toHaveClass('btn btn-outline-primary btn-lg');

});
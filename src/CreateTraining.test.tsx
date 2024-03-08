import { render, screen } from '@testing-library/react';
import Home from './Home';
import { HashRouter } from 'react-router-dom';

test('Home Screen renders title of applicaion', () => {
  render(<HashRouter><Home /></HashRouter>);
  const textElement = screen.getByText(/CapTrainimi/i);
  expect(textElement).toBeInTheDocument();
});

test('Home Screen renders Font Awesome icon', () => {
  render(<HashRouter><Home /></HashRouter>);
  const fontAwesomeIconElement = screen.getByLabelText(/font-awesome/i);
  expect(fontAwesomeIconElement).toBeInTheDocument();
});

test('Home Screen renders Login and Signup with email buttons', () => {
  render(<HashRouter><Home /></HashRouter>);
  const loginButton = screen.getByLabelText(/login-button/i);
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeEnabled();
  expect(loginButton).toHaveClass('btn btn-outline-primary btn-lg');

  const signupButton = screen.getByLabelText(/signup-button/i);
  expect(signupButton).toBeInTheDocument();
  expect(signupButton).toBeEnabled();
  expect(signupButton).toHaveClass('btn btn-outline-primary btn-lg');

});

test('Home Screen renders Footer', () => {
  render(<HashRouter><Home /></HashRouter>);
  const footerElementtext = screen.getByLabelText(/footer-text/i);
  expect(footerElementtext).toBeInTheDocument();
  expect(footerElementtext).toHaveTextContent("DC3010 Final Project Application")
});
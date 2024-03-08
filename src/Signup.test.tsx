import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Signup from './Signup';
import { useUserAuth } from './UserAuthContext';
import { useFirebase } from './FirebaseProvider';

jest.mock("./UserAuthContext");
jest.mock("./FirebaseProvider")

test('Signup Screen renders Font Awesome icon', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Signup /></HashRouter>);
  const fontAwesomeIconElement = screen.getByLabelText(/font-awesome/i);
  expect(fontAwesomeIconElement).toBeInTheDocument();
});

test('Signup Screen renders signup label', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Signup /></HashRouter>);
  const textElement = screen.getByLabelText(/signup-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Please fill out your details to create an account")
});

test('Signup Screen renders email labels and input', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Signup /></HashRouter>);
  const textElement = screen.getByLabelText(/email-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Email Address:")

  const textElement2 = screen.getByLabelText(/email-description-label/i);
  expect(textElement2).toBeInTheDocument();
  expect(textElement2).toHaveTextContent("The email address you will login with")

  const inputElement = screen.getByLabelText(/email-input/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toBeEnabled();
});

test('Signup Screen renders password labels and input', () => {

  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Signup /></HashRouter>);
  const textElement = screen.getByLabelText(/password-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Password:")

  const textElement2 = screen.getByLabelText(/password-description-label/i);
  expect(textElement2).toBeInTheDocument();
  expect(textElement2).toHaveTextContent("The password for your account")

  const inputElement = screen.getByLabelText(/password-input/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toBeEnabled();

  const textElement3 = screen.getByLabelText(/password-rule-label/i);
  expect(textElement3).toBeInTheDocument();
  expect(textElement3).toHaveTextContent("(Minimum 6 characters long)")
});

test('Signup Screen renders Signup button', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Signup /></HashRouter>);
  const loginButton = screen.getByLabelText(/signup-button/i);
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeEnabled();
  expect(loginButton).toHaveClass('btn btn-primary btn-lg');
});

test('Signup Screen renders link to login page text', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Signup /></HashRouter>);
  const textElement = screen.getByLabelText(/login-link-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Already have an account? Log In")
});

test('Signup Screen renders Footer', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Signup /></HashRouter>);
  const footerElementtext = screen.getByLabelText(/footer-text/i);
  expect(footerElementtext).toBeInTheDocument();
  expect(footerElementtext).toHaveTextContent("DC3010 Final Project Application")
});
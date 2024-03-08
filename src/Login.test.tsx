import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Login from './Login';
import { useUserAuth } from './UserAuthContext';
import { useFirebase } from './FirebaseProvider';

jest.mock("./UserAuthContext");
jest.mock("./FirebaseProvider")

test('Login Screen renders Font Awesome icon', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Login /></HashRouter>);
  const fontAwesomeIconElement = screen.getByLabelText(/font-awesome/i);
  expect(fontAwesomeIconElement).toBeInTheDocument();
});

test('Login Screen renders login label', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Login /></HashRouter>);
  const textElement = screen.getByLabelText(/login-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Login Below!")
});

test('Login Screen renders email labels and input', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Login /></HashRouter>);
  const textElement = screen.getByLabelText(/email-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Email")

  const inputElement = screen.getByLabelText(/email-input/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toBeEnabled();
});

test('Login Screen renders password labels and input', () => {

  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Login /></HashRouter>);
  const textElement = screen.getByLabelText(/password-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Password")


  const inputElement = screen.getByLabelText(/password-input/i);
  expect(inputElement).toBeInTheDocument();
  expect(inputElement).toBeEnabled();
});

test('Login Screen renders Login button', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Login /></HashRouter>);
  const loginButton = screen.getByLabelText(/login-button/i);
  expect(loginButton).toBeInTheDocument();
  expect(loginButton).toBeEnabled();
  expect(loginButton).toHaveClass('btn btn-primary btn-lg');
});

test('Login Screen renders link to login page text', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Login /></HashRouter>);
  const textElement = screen.getByLabelText(/login-link-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Haven't got an account? Sign up!")
});

test('Login Screen renders Footer', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Login /></HashRouter>);
  const footerElementtext = screen.getByLabelText(/footer-text/i);
  expect(footerElementtext).toBeInTheDocument();
  expect(footerElementtext).toHaveTextContent("DC3010 Final Project Application")
});
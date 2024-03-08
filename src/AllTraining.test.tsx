import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { useFirebase } from './FirebaseProvider';
import { useUserAuth } from './UserAuthContext';
import AllTraining from './AllTraining';

jest.mock("./UserAuthContext");
jest.mock("./FirebaseProvider");

test('AllTraining Screen renders title', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><AllTraining /></HashRouter>);
  const textElement = screen.getByLabelText(/alltraining-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Available Training Courses:")
});

test('AllTraining Screen renders training course input field', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><AllTraining /></HashRouter>);
  const textInput = screen.getByLabelText(/search-term/i);
  expect(textInput).toBeInTheDocument();
  expect(textInput).toHaveClass("form-control")
  expect(textInput).toBeEnabled();
});

test('AllTraining Screen renders search for training button', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><AllTraining /></HashRouter>);
  const searchButton = screen.getByLabelText(/search-training-course/i);
  expect(searchButton).toBeInTheDocument();
  expect(searchButton).toHaveTextContent("Search for training course")
  expect(searchButton).toBeEnabled();
  expect(searchButton).toHaveClass("btn btn-primary btn-lg")
});

test('AllTraining Screen renders fontawesome search icon', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><AllTraining /></HashRouter>);
  const textElement = screen.getByLabelText(/font-awesome-search/i);
  expect(textElement).toBeInTheDocument();
});
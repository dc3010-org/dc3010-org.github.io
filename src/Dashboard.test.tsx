import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { useUserAuth } from './UserAuthContext';
import { useFirebase } from './FirebaseProvider';

jest.mock("./UserAuthContext");
jest.mock("./FirebaseProvider")

test('Dashboard Screen renders current training text', () => {
  (useUserAuth as jest.Mock).mockResolvedValue("");
  (useFirebase as jest.Mock).mockResolvedValue("");

  render(<HashRouter><Dashboard /></HashRouter>);
  const textElement = screen.getByLabelText(/current-training-label/i);
  expect(textElement).toBeInTheDocument();
  expect(textElement).toHaveTextContent("Training courses you are currently enrolled on:")
});

import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { useFirebase } from '../FirebaseProvider';
import { useUserAuth } from '../UserAuthContext';
import Navbar from './Navbar';

jest.mock("../UserAuthContext");
jest.mock("../FirebaseProvider");

test('Screen renders application title', () => {
    (useUserAuth as jest.Mock).mockResolvedValue("");
    (useFirebase as jest.Mock).mockResolvedValue("");

    render(<HashRouter><Navbar /></HashRouter>);
    const textElement = screen.getByLabelText(/application-title/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent("CapTrainimi")
});

test('Screen renders logged in text', () => {
    (useUserAuth as jest.Mock).mockResolvedValue("");
    (useFirebase as jest.Mock).mockResolvedValue("");

    render(<HashRouter><Navbar /></HashRouter>);
    const textElement = screen.getByLabelText(/logged-in-text/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent("Logged in as: ")
});

test('Screen renders logout button', () => {
    (useUserAuth as jest.Mock).mockResolvedValue("");
    (useFirebase as jest.Mock).mockResolvedValue("");

    render(<HashRouter><Navbar /></HashRouter>);
    const logoutButton = screen.getByLabelText(/log-out-button/i);
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toBeEnabled();
});

test('Screen renders font awesome logout icon', () => {
    (useUserAuth as jest.Mock).mockResolvedValue("");
    (useFirebase as jest.Mock).mockResolvedValue("");

    render(<HashRouter><Navbar /></HashRouter>);
    const textElement = screen.getByLabelText(/font-awesome-logout/i);
    expect(textElement).toBeInTheDocument();
});

test('Screen renders logout text', () => {
    (useUserAuth as jest.Mock).mockResolvedValue("");
    (useFirebase as jest.Mock).mockResolvedValue("");

    render(<HashRouter><Navbar /></HashRouter>);
    const textElement = screen.getByLabelText(/logout-button-span/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent("Log out")
    expect(textElement).toHaveClass('d-none d-sm-inline');
});
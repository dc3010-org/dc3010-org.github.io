import { render, screen } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import { useFirebase } from '../FirebaseProvider';
import { useUserAuth } from '../UserAuthContext';
import Sidebar from './Sidebar';

jest.mock("../UserAuthContext");
jest.mock("../FirebaseProvider");

test('Screen renders sidebar title', () => {
    (useUserAuth as jest.Mock).mockResolvedValue("");
    (useFirebase as jest.Mock).mockResolvedValue("");

    render(<HashRouter><Sidebar /></HashRouter>);
    const textElement = screen.getByLabelText(/sidebar-title/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent("Navigation")
    expect(textElement).toHaveClass('fs-3 fw-light ps-3');
});

test('Screen renders sidebar dashboard link', () => {
    (useUserAuth as jest.Mock).mockResolvedValue("");
    (useFirebase as jest.Mock).mockResolvedValue("");

    render(<HashRouter><Sidebar /></HashRouter>);
    const textElement = screen.getByLabelText(/dashboard-link/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent("Dashboard")
    expect(textElement).toHaveClass('nav-link d-flex align-items-center gap-2 active');
});

test('Screen renders sidebar view all training courses link', () => {
    (useUserAuth as jest.Mock).mockResolvedValue("");
    (useFirebase as jest.Mock).mockResolvedValue("");

    render(<HashRouter><Sidebar /></HashRouter>);
    const textElement = screen.getByLabelText(/view-all-training-link/i);
    expect(textElement).toBeInTheDocument();
    expect(textElement).toHaveTextContent("View Training Packs")
    expect(textElement).toHaveClass('nav-link d-flex align-items-center gap-2 active');
});

import { render, screen } from '@testing-library/react';
import Footer from "./Footer";


test('Signup Screen renders Footer', () => {
    render(<Footer />);
    const footerElementtext = screen.getByLabelText(/footer-text/i);
    expect(footerElementtext).toBeInTheDocument();
    expect(footerElementtext).toHaveTextContent("DC3010 Final Project Application")
});
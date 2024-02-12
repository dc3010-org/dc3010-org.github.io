import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './Footer';

test('Home Screen renders footer message', () => {
    render(<Footer />);
    const fontAwesomeIconElement = screen.getByText(/DC3010 Final Project Application/i);
    expect(fontAwesomeIconElement).toBeInTheDocument();
  });
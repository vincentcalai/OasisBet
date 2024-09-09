import React from 'react';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Header from './Header';

jest.mock('../../assets/images/logo.png', () => 'mocked-logo.png');

describe('Header Component', () => {
  it('should render logo image with alt text', () => {
    render(<Header />);

    const logoImage = screen.getByAltText('Logo');
    expect(logoImage).toBeInTheDocument();

    expect(logoImage).toHaveAttribute('src', 'mocked-logo.png');
  });
});

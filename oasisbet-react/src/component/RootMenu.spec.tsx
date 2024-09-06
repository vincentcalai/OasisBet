import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import RootMenu from './RootMenu.tsx';

jest.mock('./common/Header.tsx', () => () => <div>Mock Header</div>);
jest.mock('./common/MainMenu.tsx', () => () => <div>Mock MainMenu</div>);
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <div>Mock Outlet</div>,
}));

describe('RootMenu Component', () => {

  it('renders Header, MainMenu, and Outlet components', () => {
    render(<RootMenu />);

    expect(screen.getByText('Mock Header')).toBeInTheDocument();

    expect(screen.getByText('Mock MainMenu')).toBeInTheDocument();

    expect(screen.getByText('Mock Outlet')).toBeInTheDocument();
  });
})


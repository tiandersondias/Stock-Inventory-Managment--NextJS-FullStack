import React from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './page';
import { useProductStore } from '../useProductStore';
import { useAuth } from '../authContext';

jest.mock('../useProductStore');
jest.mock('../authContext');
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe('Dashboard', () => {
  beforeEach(() => {
    (useAuth as jest.Mock).mockReturnValue({
      isLoggedIn: true,
      user: { id: '1', name: 'Test User', email: 'test@example.com' },
    });
  });

  it('renders the dashboard with key metrics', () => {
    (useProductStore as jest.Mock).mockReturnValue({
      allProducts: [
        { name: 'Product 1', price: 10, quantity: 5, category: 'Category A' },
        { name: 'Product 2', price: 20, quantity: 2, category: 'Category B' },
        { name: 'Product 3', price: 5, quantity: 10, category: 'Category A' },
      ],
      loadProducts: jest.fn(),
      isLoading: false,
    });

    render(<Dashboard />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Total Products')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Total Inventory Value')).toBeInTheDocument();
    expect(screen.getByText('$ 140.00')).toBeInTheDocument();
    expect(screen.getByText('Products by Category')).toBeInTheDocument();
    expect(screen.getByText('Category A:')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Category B:')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsDisplayer from './ProductsDisplayer';

describe('ProductsDisplayer', () => {
  const products = Array(50).fill(0).map((_, index) => ({
    id: index + 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  }));

  const renderComponent = (perPage = 0) => {
    render(
      <MemoryRouter>
        <ProductsDisplayer products={products} perPage={perPage} />
      </MemoryRouter>,
    );
  };

  it('displays all products if perPage is not declared', () => {
    renderComponent();
    expect(screen.getAllByRole('link')).toHaveLength(products.length);
  });
  it('displays the number of products in perPage', () => {
    renderComponent(10);
    expect(screen.getAllByRole('link')).toHaveLength(10);
  });
});

import React from 'react';
import {
  fireEvent, render, screen,
} from '@testing-library/react';
import { Router } from 'react-router-dom';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory, MemoryHistory } from 'history';
import ProductBox from './ProductBox';
import { Product } from '../services/types';

describe('ProductBox', () => {
  let history: MemoryHistory;
  const product: Product = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
  };

  const getLink = () => screen.getByRole('link');

  beforeEach(() => {
    history = createMemoryHistory();
    render(
      <Router navigator={history} location="/">
        <ProductBox product={product} />
      </Router>,
    );
  });

  it('has title attribute', () => {
    expect(getLink().title).toBe(product.title);
  });
  it('navigates to product page on click', () => {
    fireEvent.click(getLink());
    expect(history.location.pathname).toBe(`/product/${product.id}`);
  });
  it('displays title', () => {
    expect(screen.getByRole('heading', { level: 3 }).textContent).toBe(product.title);
  });
  it('displays price', () => {
    expect(screen.getByText(product.price)).toBeTruthy();
  });
  it('displays image', () => {
    const image = screen.getByAltText<HTMLImageElement>(product.title);
    expect(image.src).toBe(product.image);
  });
});

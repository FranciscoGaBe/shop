import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../app/store';
import CartItem from './CartItem';
import { addProduct, clearCart } from '../services/cart';
import { Product } from '../services/types';

describe('CartItem', () => {
  const product: Product & { quantity: number } = {
    id: 1,
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
    price: 109.95,
    description: 'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    category: "men's clothing",
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    rating: { rate: 3.9, count: 120 },
    quantity: 5,
  };

  beforeEach(() => {
    store.dispatch(addProduct({ productId: product.id, quantity: 5 }));
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CartItem item={product} />
        </MemoryRouter>
      </Provider>,
    );
  });

  afterEach(() => {
    store.dispatch(clearCart());
  });

  it('shows product image', () => {
    expect(screen.getByRole<HTMLImageElement>('img').src).toBe(product.image);
  });
  it('shows product title', () => {
    expect(screen.getByText(product.title)).toBeInTheDocument();
  });
  it('shows product price', () => {
    expect(screen.getByText(product.price)).toBeInTheDocument();
  });
  it('shows total price', () => {
    const totalPrice = Math.round(product.quantity * product.price * 100) / 100;
    expect(screen.getByText(totalPrice)).toBeInTheDocument();
  });
  it('shows item quantity inside input', () => {
    const input = screen.getByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe(product.quantity.toString());
    input.value = '10';
    fireEvent.input(input);
    expect(store.getState().cart.products[0].quantity).toBe(10);
  });
  it('has a button to remove item', () => {
    expect(store.getState().cart.products).toHaveLength(1);
    fireEvent.click(
      screen.getByRole('button', { name: 'remove' }),
    );
    expect(store.getState().cart.products).toHaveLength(0);
  });
});

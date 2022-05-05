import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Product } from '../services/types';
import CartItem from './CartItem';

interface Props {
  items: (Product & { quantity: number })[]
}

const Cart: React.FC<Props> = ({ items }) => {
  const priceTotal = Math.round(
    items.reduce((total, { quantity, price }) => total + quantity * price, 0) * 100,
  ) / 100;

  return (
    <div>
      <ul className="bg-white rounded-lg shadow p-4">
        <AnimatePresence>
          {
          items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))
        }
          { !items.length && <p className="font-bold text-center text-xl">Your cart is empty</p> }
        </AnimatePresence>
      </ul>
      <div className="text-right mt-2">
        <div className="bg-rose-800 inline-block text-white rounded-lg p-4 shadow">
          <p className="font-bold text-2xl">
            <span className="text-xl font-semibold">Total:</span>
            <span className="mr-1 ml-2">{ priceTotal }</span>
            <span>€</span>
          </p>
          <div>
            <button
              className="bg-white text-rose-800 font-semibold px-4 py-1 mt-4 rounded text-lg opacity-70 cursor-not-allowed"
              type="button"
              title="Not implemented"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

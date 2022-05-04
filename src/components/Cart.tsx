import { AnimatePresence } from 'framer-motion';
import React from 'react';
import { Product } from '../services/types';
import CartItem from './CartItem';

interface Props {
  items: (Product & { quantity: number })[]
}

const Cart: React.FC<Props> = ({ items }) => (
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
);

export default Cart;

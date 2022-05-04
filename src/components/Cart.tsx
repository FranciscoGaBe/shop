import React from 'react';
import { Product } from '../services/types';
import CartItem from './CartItem';

interface Props {
  items: (Product & { quantity: number })[]
}

const Cart: React.FC<Props> = ({ items }) => (
  <ul>
    {
      items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))
    }
  </ul>
);

export default Cart;

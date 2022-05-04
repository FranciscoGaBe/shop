import React from 'react';
import { useAppDispatch } from '../app/hooks';
import { changeProductQuantity, removeProduct } from '../services/cart';
import { Product } from '../services/types';

interface Props {
  item: Product & { quantity: number }
}

const CartItem: React.FC<Props> = ({ item }) => {
  const {
    id, quantity, title, price, image,
  } = item;
  const dispath = useAppDispatch();

  const totalPrice = Math.round(100 * quantity * price) / 100;

  const removeItem = () => {
    dispath(removeProduct(id));
  };

  const handleInput = (event: React.FormEvent) => {
    const value = +(event.target as HTMLInputElement).value;
    dispath(changeProductQuantity({ productId: id, quantity: value }));
  };

  return (
    <li>
      <img src={image} alt={title} />
      <p>{ title }</p>
      <div>
        <span>{ price }</span>
        <span>€</span>
      </div>
      <div>
        <span>{ totalPrice }</span>
        <span>€</span>
      </div>
      <input type="text" pattern="/\d*/" value={quantity} onInput={handleInput} />
      <button type="button" aria-label="remove" onClick={() => removeItem()}>remove</button>
    </li>
  );
};

export default CartItem;

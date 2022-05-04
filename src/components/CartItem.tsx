import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
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
    <motion.li
      exit={{ x: -400, opacity: 0 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="px-4 flex flex-wrap items-center py-3 border-b-2 border-rose-200 last:border-0 md:h-28"
    >
      <div className="w-full md:w-1/6 bg-white h-20 md:h-full flex items-center justify-center p-1">
        <img className="max-h-full" src={image} alt={title} />
      </div>
      <div className="w-full md:w-3/6 p-2 flex flex-col justify-between h-full">
        <p className="font-semibold text-sm">{ title }</p>
        <div className="font-bold px-2 mt-2">
          <span>{ price }</span>
          <span>€</span>
        </div>
      </div>
      <div className="w-full md:w-2/6 flex items-center">
        <div className="grow flex items-center bg-rose-800 border-4 rounded border-rose-800">
          <span className="text-white w-1/5 pl-2">Qty:</span>
          <input
            className={`
              transition-all duration-200 ease-in-out
              w-1/5 px-1 rounded-lg outline-none border-4 text-right
              border-rose-800 focus:border-rose-500
            `}
            type="text"
            pattern="/\d*/"
            value={quantity}
            onInput={handleInput}
          />
          <p className="w-3/5 text-white px-2 text-right flex justify-between">
            <span>Total:</span>
            <span>
              <span className="mr-1">{ totalPrice }</span>
              <span>€</span>
            </span>
          </p>
        </div>
        <div className="px-2 shrink-0">
          <button
            className="p-2 hover:text-red-600"
            type="button"
            aria-label="remove"
            onClick={() => removeItem()}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </motion.li>
  );
};

export default CartItem;

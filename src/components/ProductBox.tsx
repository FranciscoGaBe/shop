import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../services/types';
import Rating from './Rating';

interface Props {
  product: Product
}

const ProductBox: React.FC<Props> = ({ product }) => (
  <Link
    title={product.title}
    className="bg-white rounded-lg shadow w-full block border-2 border-rose-700"
    to={`/product/${product.id}`}
  >
    <div className="aspect-square p-2 flex items-center justify-center">
      <img className="max-h-full" src={product.image} alt={product.title} />
    </div>
    <div className="bg-rose-700 text-white h-20 flex flex-col py-2">
      <h3
        className="grow text-ellipsis text-center font-bold text-lg whitespace-nowrap overflow-hidden px-4"
      >
        { product.title }
      </h3>
      <div className="shrink-0 flex items-center justify-between px-2">
        <div>
          <Rating rate={product.rating.rate} />
        </div>
        <p>
          <span className="font-semibold">{ product.price }</span>
          <span className="ml-1">€</span>
        </p>
      </div>
    </div>
  </Link>
);

export default ProductBox;

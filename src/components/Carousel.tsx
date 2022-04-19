import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Product } from '../services/types';
import ProductBox from './ProductBox';

interface Props {
  products: Product[]
}

const Carousel: React.FC<Props> = ({ products }) => {
  const [show, setShow] = useState(0);

  const len = products.length;
  const showProducts = [
    { current: false, product: products[(show - 1 + len) % len] },
    { current: true, product: products[show] },
    { current: false, product: products[(show + 1) % len] },
  ];

  return (
    <div className="flex justify-center items-center">
      <button
        className="shrink-0 w-10 h-10"
        type="button"
        title="previous"
        onClick={() => { setShow((show - 1 + len) % len); }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="grow flex justify-center items-center gap-4">
        {
          showProducts.map(({ current, product }) => (
            <div
              key={product.id}
              className="w-2/6"
              aria-current={current}
              role="figure"
              title={product.title}
            >
              <ProductBox product={product} />
            </div>
          ))
        }
      </div>
      <button
        className="shrink-0 w-10 h-10"
        type="button"
        title="next"
        onClick={() => { setShow((show + 1) % len); }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Carousel;

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
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
    <div className="flex justify-center items-center px-2">
      <button
        className="shrink-0 w-10 h-10 bg-rose-700/70 rounded-full text-white hover:bg-rose-700"
        type="button"
        title="previous"
        onClick={() => { setShow((show - 1 + len) % len); }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div className="grow flex justify-center items-center gap-4">
        {
          showProducts.map(({ current, product }) => (
            <motion.div
              key={product.id}
              initial={{
                opacity: 0,
                scale: 0.3,
              }}
              animate={{
                opacity: current ? 1 : 0.6,
                scale: current ? 1 : 0.6,
              }}
              exit={{
                opacity: 0,
                scale: 0.3,
              }}
              className={`${current ? 'shrink-0 w-3/4' : 'hidden sm:block'} sm:w-1/3`}
              aria-current={current}
              role="figure"
              title={product.title}
            >
              <ProductBox product={product} />
            </motion.div>
          ))
        }
      </div>
      <button
        className="shrink-0 w-10 h-10 bg-rose-700/70 rounded-full text-white hover:bg-rose-700"
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

import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import React, { useState } from 'react';
import { Product } from '../services/types';
import ProductBox from './ProductBox';

interface Props {
  products: Product[]
}

interface CustomData {
  direction: 0 | 1 | -1,
  index: number
}

const variants: Variants = {
  initial: ({ direction }: CustomData) => ({
    position: 'absolute',
    backfaceVisibility: 'hidden',
    transformOrigin: '50% 50%',
    left: `${direction * 110}%`,
    scale: 0.6,
    rotateY: direction * 90,
    opacity: 0,
  }),
  animate: ({ index }: CustomData) => ({
    rotateY: index === 1 ? 0 : ((-1 + index) * 40),
    scale: index === 1 ? 1 : 0.85,
    left: index === 1 ? 0 : `${(-1 + index) * 90}%`,
    opacity: 1,
  }),
  exit: ({ direction }: CustomData) => ({
    left: `${direction * -110}%`,
    opacity: 0,
    scale: 0.6,
    rotateY: direction * -90,
  }),
};

const Carousel: React.FC<Props> = ({ products }) => {
  const [show, setShow] = useState(0);
  const [direction, setDirection] = useState(0);

  const len = products.length;
  const showProducts = [
    { current: false, product: products[(show - 1 + len) % len] },
    { current: true, product: products[show] },
    { current: false, product: products[(show + 1) % len] },
  ];

  const changeShow = (next: number) => {
    setDirection(next - show > 0 ? 1 : -1);
    setShow((products.length + next) % products.length);
  };

  return (
    <div className="flex justify-center items-center px-2">
      <button
        className="shrink-0 w-10 h-10 bg-rose-700/70 rounded-full text-white hover:bg-rose-700 relative z-10"
        type="button"
        title="previous"
        onClick={() => { changeShow(show - 1); }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <div
        className="grow w-full relative"
      >
        <div
          className="w-60 mx-auto relative flex items-center"
          style={{ perspective: '1050px', transformStyle: 'preserve-3d' }}
        >
          <div className="w-60 opacity-0 pointer-events-none">
            <ProductBox product={products[0]} />
          </div>
          <AnimatePresence custom={{ direction }}>
            {
              showProducts.map(({ current, product }, index) => (
                <motion.div
                  key={product.id}
                  variants={variants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  custom={{ direction, index }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                  aria-current={current}
                  role="figure"
                  title={product.title}
                  className="w-60"
                >
                  <ProductBox product={product} />
                </motion.div>
              ))
            }
          </AnimatePresence>
        </div>
      </div>
      <button
        className="shrink-0 w-10 h-10 bg-rose-700/70 rounded-full text-white hover:bg-rose-700 relative"
        type="button"
        title="next"
        onClick={() => { changeShow(show + 1); }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Carousel;

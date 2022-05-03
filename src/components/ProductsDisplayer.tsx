import { animate, motion, useViewportScroll } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../services/types';
import Pagination from './Pagination';
import ProductBox from './ProductBox';

interface Props {
  products: Product[],
  perPage?: number
}

const sliceArray = <T, >(array: T[], page: number, perPage: number): T[] => array.slice(
  (page - 1) * perPage,
  (page - 1) * perPage + perPage,
);

const ProductsDisplayer: React.FC<Props> = ({ products, perPage = 0 }) => {
  const [page, setPage] = useState(1);
  const [productsToShow, setProductsToShow] = useState(
    !perPage ? products : sliceArray(products, page, perPage),
  );
  const [loading, setLoading] = useState(false);
  const { scrollY } = useViewportScroll();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setProductsToShow(!perPage ? products : sliceArray(products, page, perPage));
  }, [products, page, perPage]);

  const changePage = (pageNumber: number) => {
    setPage(pageNumber);

    if (!ref.current) return;
    animate(
      scrollY,
      ref.current.offsetTop,
      {
        ease: 'easeOut',
        duration: 1,
        onPlay: () => { setLoading(true); },
        onUpdate: (scroll) => {
          window.scroll(0, scroll);
        },
        onComplete: () => {
          setProductsToShow(sliceArray(products, pageNumber, perPage));
          setLoading(false);
        },
      },
    );
  };

  return (
    <div ref={ref} className="py-2 px-1">
      {
        !!perPage && (
          <div className="text-right">
            <Pagination
              page={page}
              perPage={perPage}
              items={products.length}
              onChange={changePage}
            />
          </div>
        )
      }
      <div className="flex flex-wrap px-1">
        {
          productsToShow.map((product) => (
            <div key={product.id} className="sm:w-1/2 md:w-1/4 p-4">
              <div className="relative">
                <motion.div
                  animate={{ opacity: loading ? 0 : 1 }}
                  transition={{ delay: loading ? 0.3 : 0, duration: 0 }}
                >
                  <ProductBox product={product} />
                </motion.div>
                <motion.div
                  variants={{
                    close: { opacity: 0, height: '5rem' },
                    open: { opacity: 1, height: '100%' },
                  }}
                  initial="close"
                  animate={loading ? 'open' : 'close'}
                  transition={{
                    duration: 0.3,
                  }}
                  className={`
                  bg-rose-700 absolute bottom-0 right-0 left-0 rounded-lg
                    ${loading ? 'animate-pulse' : ''}
                  `}
                />
              </div>
            </div>
          ))
        }
      </div>
      {
        !!perPage && (
          <div className="text-right">
            <Pagination
              page={page}
              perPage={perPage}
              items={products.length}
              onChange={changePage}
            />
          </div>
        )
      }
    </div>
  );
};
ProductsDisplayer.defaultProps = {
  perPage: 0,
};

export default ProductsDisplayer;

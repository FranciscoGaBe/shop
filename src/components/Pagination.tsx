import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import React from 'react';

interface Props {
  page: number,
  perPage: number,
  items: number,
  onChange: ((page: number) => void)
}

const Pagination: React.FC<Props> = ({
  page, perPage, items, onChange,
}) => {
  const pages = Math.ceil(items / perPage);

  const transition = 'transition-all duration-300';
  const nextPreviousClasses = `
    text-sm disabled:cursor-not-allowed disabled:opacity-50 w-8 h-8 ${transition}
  `;

  return (
    <div className="text-rose-900 relative inline-flex items-center">
      <motion.div
        animate={{
          left: `${page * 2}rem`,
        }}
        transition={{ duration: 0.3 }}
        className="w-8 h-8 rounded-full bg-rose-900 absolute"
      />
      <button
        className={nextPreviousClasses}
        type="button"
        title="previous"
        disabled={page === 1}
        onClick={() => { onChange(page - 1); }}
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {
        Array(pages).fill(0).map((_, index) => index + 1).map((index) => (
          <button
            key={index}
            type="button"
            className={`
              w-8 h-8 relative font-bold ${page === index ? 'text-white' : ''}
              ${transition}
            `}
            aria-current={page === index}
            disabled={page === index}
            onClick={() => { onChange(index); }}
          >
            { index }
          </button>
        ))
      }
      <button
        className={nextPreviousClasses}
        type="button"
        title="next"
        disabled={page === pages}
        onClick={() => { onChange(page + 1); }}
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
    </div>
  );
};

export default Pagination;

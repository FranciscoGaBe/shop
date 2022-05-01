import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  level: 1 | 2 | 3 | 4 | 5 | 6,
}

const classes = {
  1: 'text-2xl mb-2',
  2: 'text-5xl mb-8',
  3: '',
  4: '',
  5: '',
  6: '',
};

const Heading: React.FC<Props> = ({ level, children }) => React.createElement(
  `h${level}`,
  { className: `inline-block font-bold text-rose-800 ${classes[level]}` },
  <>
    <span className="block mb-2 px-2">{ children }</span>
    <motion.div animate={{ width: '6rem' }} className="border-2 border-rose-800" />
  </>,
);

export default Heading;

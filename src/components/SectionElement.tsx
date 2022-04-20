import { motion, Variants } from 'framer-motion';
import React, { HTMLProps, useState } from 'react';

const SectionElement: React.FC<HTMLProps<HTMLElement>> = ({ className, children }) => {
  const [shown, setShown] = useState(false);

  const variants: Variants = {
    initial: { opacity: 0, x: `${(Math.floor(Math.random() * 3) - 1) * 1000}px` },
    inView: () => {
      if (!shown) setShown(true);
      return { opacity: 1, x: 0 };
    },
  };

  return (
    <section className={`py-8 ${className} overflow-hidden`}>
      <motion.div
        variants={variants}
        initial="initial"
        animate={shown ? 'inView' : 'initial'}
        whileInView="inView"
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto text-center"
      >
        { children }
      </motion.div>
    </section>
  );
};

export default SectionElement;

import { motion, Variants } from 'framer-motion';
import React, { HTMLProps } from 'react';

const SectionElement: React.FC<HTMLProps<HTMLElement>> = ({ className, children }) => {
  const variants: Variants = {
    initial: { opacity: 0, x: `${(Math.floor(Math.random() * 3) - 1) * 200}px` },
    inView: { opacity: 1, x: 0 },
  };

  return (
    <section
      className={`py-8 ${className} overflow-hidden`}
    >
      <motion.div
        variants={variants}
        initial="initial"
        whileInView="inView"
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
        layout
        className="max-w-5xl mx-auto text-center"
      >
        { children }
      </motion.div>
    </section>
  );
};

export default SectionElement;

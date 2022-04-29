import { faChevronLeft, faChevronRight, faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AnimatePresence, motion, useReducedMotion, Variants,
} from 'framer-motion';
import React, {
  HTMLProps, useCallback, useEffect, useMemo, useState,
} from 'react';

interface Props {
  className?: HTMLProps<HTMLDivElement>['className'],
  auto?: number
}

const variants: Variants = {
  initial: (direction: number) => ({
    left: `${direction * 100}%`,
    position: 'relative',
  }),
  center: { left: '0%' },
  exit: (direction: number) => ({
    left: `${direction * -100}%`,
    position: 'absolute',
  }),
};

const Banner: React.FC<Props> = ({ children, className = '', auto = 0 }) => {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const elements = useMemo(() => (
    Array.isArray(children) ? children : [children]
  ).map((element) => ({
    id: `Banner-${Math.random().toString(36).slice(2)}`,
    element,
  })), [children]);

  const changeBanner = useCallback((next: number) => {
    setDirection(Math.sign(next - current));
    setCurrent((next + elements.length) % elements.length);
  }, [current, elements]);

  useEffect(() => {
    if (auto === 0) return () => undefined;
    const timeout = window.setTimeout(() => changeBanner(current + 1), auto);
    return () => {
      clearTimeout(timeout);
    };
  }, [auto, changeBanner, current]);

  const bannerContainer = (bannerChildren: React.ReactNode) => (shouldReduceMotion
    ? bannerChildren
    : <AnimatePresence initial={false} custom={direction}>{ bannerChildren }</AnimatePresence>);

  return (!elements.length ? null : (
    <div className={`relative overflow-hidden ${className}`}>
      {
        bannerContainer(
          <motion.div
            variants={variants}
            custom={direction}
            initial="initial"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
            }}
            key={elements[current].id}
            className="h-full w-full"
            role="figure"
          >
            { elements[current].element }
          </motion.div>,
        )
      }
      { elements.length > 1 && (
        <div
          className="absolute inset-0 pointer-events-none flex items-center p-2 text-white leading-none"
        >
          <button
            className="shrink-0 pointer-events-auto w-8 h-8 bg-black/20 rounded-full"
            type="button"
            aria-label="previous"
            onClick={() => changeBanner(current - 1)}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <div className="grow self-end flex gap-1 justify-center text-xs">
            { elements.map(({ id }, index) => (
              <button
                key={id}
                className={`
                  ${index === current ? 'opacity-90' : 'opacity-30'} pointer-events-auto
                  rounded-full leading-none border-2 border-black/20
                `}
                type="button"
                aria-label={`Banner-${index + 1}`}
                onClick={() => changeBanner(index)}
              >
                <FontAwesomeIcon icon={faCircle} />
              </button>
            )) }
          </div>
          <button
            className="shrink-0 pointer-events-auto w-8 h-8 bg-black/20 rounded-full"
            type="button"
            aria-label="next"
            onClick={() => changeBanner(current + 1)}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      ) }
    </div>
  ));
};
Banner.defaultProps = {
  className: '',
  auto: 0,
};

export default Banner;

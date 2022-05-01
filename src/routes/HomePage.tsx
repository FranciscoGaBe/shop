import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGift } from '@fortawesome/free-solid-svg-icons';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import SectionElement from '../components/SectionElement';
import { useGetProductsQuery } from '../services/shop';
import { Product } from '../services/types';
import ProductsDisplayer from '../components/ProductsDisplayer';
import Banner from '../components/Banner';
import LoadingHandler from '../components/LoadingHandler';

const HomePage: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  const carouselProducts = useMemo(() => {
    if (!data) return [];
    const products: Product[] = [];
    const availableItems = [...data];
    while (products.length < 5) {
      products.push(
        availableItems.splice(
          Math.floor(Math.random() * availableItems.length),
          1,
        )[0],
      );
    }
    return products;
  }, [data]);

  return (
    <LoadingHandler isLoading={isLoading} isError={isError}>
      { data && (
      <div className="p-1 flex flex-col gap-1">
        <Banner className="h-60 w-full rounded-lg overflow-hidden" auto={10000}>
          <a
            className="bg-white h-full text-[#0A66C2] block"
            href="https://www.linkedin.com/in/francisco-garrido-679084198/"
            target="_blank"
            rel="noreferrer"
            title="LinkedIn"
          >
            <div className="max-w-xl h-full flex items-center mx-auto px-4">
              <p className="grow text-5xl sm:text-7xl font-bold">Linkedin</p>
              <div className="shrink-0 text-9xl rotate-12">
                <FontAwesomeIcon icon={faLinkedin} />
              </div>
            </div>
          </a>
          <a
            className="bg-[#161B22] h-full flex items-center text-white"
            href="https://github.com/FranciscoGaBe/shop"
            target="_blank"
            rel="noreferrer"
          >
            <div className="max-w-xl w-full h-full flex items-center mx-auto px-4">
              <div className="shrink-0 text-9xl">
                <FontAwesomeIcon icon={faGithub} />
              </div>
              <p className="grow text-5xl sm:text-7xl font-bold text-right">GitHub</p>
            </div>
          </a>
          <a
            className="bg-[#F8BA5C] h-full flex items-center"
            href="https://fakestoreapi.com/"
            target="_blank"
            rel="noreferrer"
          >
            <div className="max-w-xl h-full flex items-center mx-auto px-4">
              <img
                className="w-24 mx-auto shrink-0"
                src="https://fakestoreapi.com/icons/logo.png"
                alt="fakestoreapi"
              />
              <div className="font-semibold grow pl-4 text-center leading-none">
                <p>All data is supplied by</p>
                <p className="font-bold text-4xl text-center mb-2">Fake Store API</p>
                <p className="leading-5">Data created on this app is stored temporally inside chrome storage</p>
              </div>
            </div>
          </a>
        </Banner>
        <SectionElement className="bg-slate-200 rounded-lg overflow-hidden">
          <Heading level={2}>Best Sellers</Heading>
          <Carousel products={carouselProducts} />
        </SectionElement>
        <SectionElement
          className="rounded-lg overflow-hidden p-8 relative bg-rose-800"
        >
          <div className="absolute inset-0 flex items-center justify-center text-8xl">
            <FontAwesomeIcon className="text-rose-500" icon={faGift} />
          </div>
          <div className="text-white text-center text-2xl relative">
            <span className="font-semibold">Free shipping for orders over</span>
            {' '}
            <span className="font-black">40 €</span>
          </div>
        </SectionElement>
        <SectionElement className="bg-white rounded-lg overflow-hidden">
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}>
            <Heading level={2}>All Products</Heading>
            <ProductsDisplayer products={data} perPage={8} />
          </motion.div>
        </SectionElement>
      </div>
      ) }
    </LoadingHandler>
  );
};

export default HomePage;

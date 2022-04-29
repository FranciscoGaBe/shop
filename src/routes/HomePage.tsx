import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SectionElement from '../components/SectionElement';
import { useGetProductsQuery } from '../services/shop';
import { Product } from '../services/types';
import ProductsDisplayer from '../components/ProductsDisplayer';
import Banner from '../components/Banner';

const HomePage: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery();

  const corouselProducts = useMemo(() => {
    if (!data) return [];
    const items: Product[] = [];
    const availableItems = [...data];
    while (items.length < 5) {
      items.push(
        availableItems.splice(
          Math.floor(Math.random() * availableItems.length),
          1,
        )[0],
      );
    }
    return items;
  }, [data]);

  const banner = useMemo(() => (
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
  ), []);

  return (
    <div className="p-1 flex flex-col gap-1">
      { isError && <Error /> }
      { isLoading && <Loading /> }
      { banner }
      { !!corouselProducts.length && (
        <SectionElement className="bg-slate-200 rounded-lg overflow-hidden">
          <Heading level={2}>Best Sellers</Heading>
          <Carousel products={corouselProducts} />
        </SectionElement>
      ) }
      { data && (
        <SectionElement className="bg-white rounded-lg overflow-hidden">
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }}>
            <Heading level={2}>All Products</Heading>
            <ProductsDisplayer products={data} perPage={8} />
          </motion.div>
        </SectionElement>
      ) }
    </div>
  );
};

export default HomePage;

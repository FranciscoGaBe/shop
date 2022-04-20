import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
import Heading from '../components/Heading';
import Loading from '../components/Loading';
import Error from '../components/Error';
import SectionElement from '../components/SectionElement';
import { useGetProductsQuery } from '../services/shop';
import { Product } from '../services/types';

const HomePage: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const [corouselProducts, setCarouselProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!data) return;
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
    setCarouselProducts(items);
  }, [data]);

  return (
    <div>
      { isError && <Error /> }
      { isLoading && <Loading /> }
      { !!corouselProducts.length && (
        <SectionElement className="bg-slate-300">
          <Heading level={2}>Best Sellers</Heading>
          <Carousel products={corouselProducts} />
        </SectionElement>
      ) }
    </div>
  );
};

export default HomePage;

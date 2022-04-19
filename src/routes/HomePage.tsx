import React, { useEffect, useState } from 'react';
import Carousel from '../components/Carousel';
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
    <div className="py-8">
      { isError && <p>Something went wrong...</p> }
      { isLoading && <p>Loading...</p> }
      { corouselProducts.length && (
        <Carousel products={corouselProducts} />
      ) }
    </div>
  );
};

export default HomePage;

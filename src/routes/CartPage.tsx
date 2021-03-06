import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import Cart from '../components/Cart';
import Heading from '../components/Heading';
import LoadingHandler from '../components/LoadingHandler';
import SectionElement from '../components/SectionElement';
import { selectProducts } from '../services/cart';
import { useGetProductsQuery } from '../services/shop';
import { Product } from '../services/types';

const CartPage: React.FC = () => {
  const { data, isLoading, isError } = useGetProductsQuery();
  const cart = useAppSelector(selectProducts);
  const [items, setItems] = useState<(Product & { quantity: number })[] | undefined>(undefined);

  useEffect(() => {
    if (!data) {
      setItems(data);
      return;
    }

    const myItems: (Product & { quantity: number })[] = [];
    cart.forEach((item) => {
      const product = data.find(({ id }) => id === item.productId);
      if (!product) return;
      myItems.push({
        ...product,
        quantity: item.quantity,
      });
    });
    setItems(myItems);
  }, [cart, data]);

  return (
    <LoadingHandler isLoading={isLoading} isError={isError}>
      { items && (
        <SectionElement className="px-2">
          <Heading level={1}>
            <span className="text-4xl">Your Cart</span>
          </Heading>
          <div className="mt-4 px-2">
            <Cart items={items} />
          </div>
        </SectionElement>
      ) }
    </LoadingHandler>
  );
};

export default CartPage;

import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../app/hooks';
import Cart from '../components/Cart';
import LoadingHandler from '../components/LoadingHandler';
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
        <Cart items={items} />
      ) }
    </LoadingHandler>
  );
};

export default CartPage;

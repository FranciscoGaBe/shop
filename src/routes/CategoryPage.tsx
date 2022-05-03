import React from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../components/Heading';
import LoadingHandler from '../components/LoadingHandler';
import ProductsDisplayer from '../components/ProductsDisplayer';
import SectionElement from '../components/SectionElement';
import { useGetProductByCategoryQuery } from '../services/shop';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const {
    data, isLoading, isError, isFetching,
  } = useGetProductByCategoryQuery(category as string);

  return (
    <LoadingHandler isLoading={isLoading || isFetching} isError={isError}>
      { data && (
        <div>
          <SectionElement>
            <Heading level={1}>
              <span className="capitalize text-4xl">{ category }</span>
            </Heading>
            <ProductsDisplayer key={category} products={data} />
          </SectionElement>
        </div>
      ) }
    </LoadingHandler>
  );
};

export default CategoryPage;

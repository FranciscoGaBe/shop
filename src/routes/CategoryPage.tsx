import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filters from '../components/Filters';
import Heading from '../components/Heading';
import LoadingHandler from '../components/LoadingHandler';
import ProductsDisplayer from '../components/ProductsDisplayer';
import SectionElement from '../components/SectionElement';
import { useGetProductByCategoryQuery } from '../services/shop';
import filters, { filterAndSortProducts, reduceFilters } from '../utils/commonFilters';

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [appliedFilters, setAppliedFilters] = useState(reduceFilters(filters));
  const {
    data, isLoading, isError, isFetching,
  } = useGetProductByCategoryQuery(category as string);
  const [sortedProducts, setSortedProducts] = useState(filterAndSortProducts(data, appliedFilters));

  useEffect(() => {
    setSortedProducts(filterAndSortProducts(data, appliedFilters));
  }, [data, appliedFilters]);

  return (
    <LoadingHandler isLoading={isLoading || isFetching} isError={isError}>
      { sortedProducts && (
        <div>
          <SectionElement key={category}>
            <Heading level={1}>
              <span className="capitalize text-4xl">{ category }</span>
            </Heading>
            <div className="text-right">
              <Filters filters={filters} onSubmit={setAppliedFilters} />
            </div>
            <ProductsDisplayer products={sortedProducts} />
          </SectionElement>
        </div>
      ) }
    </LoadingHandler>
  );
};

export default CategoryPage;

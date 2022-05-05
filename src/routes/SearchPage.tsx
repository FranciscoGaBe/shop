import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Filters from '../components/Filters';
import Heading from '../components/Heading';
import LoadingHandler from '../components/LoadingHandler';
import ProductsDisplayer from '../components/ProductsDisplayer';
import SectionElement from '../components/SectionElement';
import { useGetProductsQuery } from '../services/shop';
import filters, { filterAndSortProducts, reduceFilters } from '../utils/commonFilters';

const myFilters = [...filters];
myFilters.splice(
  myFilters.findIndex((filter) => filter.name === 'name'),
  1,
);

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');
  const [appliedFilters, setAppliedFilters] = useState(
    reduceFilters(myFilters),
  );
  const { data, isLoading, isError } = useGetProductsQuery();
  const [sortedProducts, setSortedProducts] = useState(
    filterAndSortProducts(data, {
      ...appliedFilters,
      name: search || '',
    }),
  );

  useEffect(() => {
    setSortedProducts(filterAndSortProducts(data, {
      ...appliedFilters,
      name: search || '',
    }));
  }, [appliedFilters, data, search]);

  return (
    <LoadingHandler isLoading={isLoading} isError={isError}>
      { sortedProducts && (
        <SectionElement className="px-2">
          <Heading level={1}>
            <span className="text-4xl cap">Search results</span>
          </Heading>
          <div className="text-right mt-2">
            <Filters filters={myFilters} onSubmit={setAppliedFilters} />
          </div>
          <ProductsDisplayer products={sortedProducts} />
        </SectionElement>
      ) }
    </LoadingHandler>
  );
};

export default SearchPage;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Filters, { Filter } from '../components/Filters';
import Heading from '../components/Heading';
import LoadingHandler from '../components/LoadingHandler';
import ProductsDisplayer from '../components/ProductsDisplayer';
import SectionElement from '../components/SectionElement';
import { useGetProductByCategoryQuery } from '../services/shop';
import { Product } from '../services/types';

const filters: Filter[] = [
  {
    type: 'select',
    value: '1',
    name: 'sortBy',
    options: [
      { value: '1', text: 'Popularity: high to low' },
      { value: '2', text: 'Popularity: low to high' },
      { value: '3', text: 'Price: high to low' },
      { value: '4', text: 'Price: low to high' },
      { value: '5', text: 'Rating: high to low' },
      { value: '6', text: 'Rating: low to hight' },
    ],
  },
  {
    type: 'text', name: 'name', value: '', placeholder: 'Search by name',
  },
];

const sortFunctions: Record<string, (a: Product, b: Product) => number> = {
  1: (a, b) => (a.rating.count < b.rating.count ? 1 : -1),
  2: (a, b) => (a.rating.count > b.rating.count ? 1 : -1),
  3: (a, b) => (a.price < b.price ? 1 : -1),
  4: (a, b) => (a.price > b.price ? 1 : -1),
  5: (a, b) => (a.rating.rate < b.rating.rate ? 1 : -1),
  6: (a, b) => (a.rating.rate > b.rating.rate ? 1 : -1),
};

const CategoryPage: React.FC = () => {
  const { category } = useParams();
  const [appliedFilters, setAppliedFilters] = useState<Record<string, string>>(
    filters.reduce((obj, filter) => ({ ...obj, [filter.name]: filter.value }), {}),
  );
  const {
    data, isLoading, isError, isFetching,
  } = useGetProductByCategoryQuery(category as string);
  const [sortedProducts, setSortedProducts] = useState<Product[] | undefined>(data);

  useEffect(() => {
    const { name, sortBy } = appliedFilters;
    setSortedProducts(
      (data || []).filter((product) => {
        if (product.title.toLowerCase().indexOf(name.toLowerCase()) < 0) return false;
        return true;
      }).sort(sortFunctions[sortBy]),
    );
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

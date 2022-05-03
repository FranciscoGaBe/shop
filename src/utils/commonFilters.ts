import { Filter } from '../components/Filters';
import { Product } from '../services/types';

export const sortFunctions: Record<string, (a: Product, b: Product) => number> = {
  1: (a, b) => (a.rating.count < b.rating.count ? 1 : -1),
  2: (a, b) => (a.rating.count > b.rating.count ? 1 : -1),
  3: (a, b) => (a.price < b.price ? 1 : -1),
  4: (a, b) => (a.price > b.price ? 1 : -1),
  5: (a, b) => (a.rating.rate < b.rating.rate ? 1 : -1),
  6: (a, b) => (a.rating.rate > b.rating.rate ? 1 : -1),
};

export const filterAndSortProducts = (
  products: Product[] | undefined,
  { name = '', sortBy = '1' }: { sortBy?: string, name?: string} = {},
) => (products || []).filter((product) => {
  if (product.title.toLowerCase().indexOf(name.toLowerCase()) < 0) return false;
  return true;
}).sort(sortFunctions[sortBy]);

export const reduceFilters = (filters: Filter[]) => filters.reduce(
  (obj, filter) => ({ ...obj, [filter.name]: filter.value }),
  {},
);

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

export default filters;

import React from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const search = searchParams.get('q');

  return (
    <div>{ search }</div>
  );
};

export default SearchPage;

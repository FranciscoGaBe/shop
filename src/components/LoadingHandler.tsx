import React from 'react';
import Error from './Error';
import Loading from './Loading';

interface Props {
  isLoading?: boolean,
  isError?: boolean
}

const LoadingHandler: React.FC<Props> = ({ isLoading = false, isError = false, children }) => {
  if (isLoading) return <Loading />;
  if (isError) return <Error />;
  return children as React.ReactElement;
};
LoadingHandler.defaultProps = {
  isLoading: false,
  isError: false,
};

export default LoadingHandler;

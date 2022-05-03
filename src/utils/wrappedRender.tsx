// eslint-disable-next-line import/no-extraneous-dependencies
import { MemoryHistory, createMemoryHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from '../app/store';

type WrapperRender = (
  component: JSX.Element,
  options?: { location?: string, history?: MemoryHistory }
) => JSX.Element

const wrappedRender: WrapperRender = (component, options = {}) => (
  <Provider store={store}>
    <Router navigator={options.history || createMemoryHistory()} location={options.location || '/'}>
      { component }
    </Router>
  </Provider>
);

export default wrappedRender;

import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { store } from '../app/store';

const wrappedRender = (component: React.ReactNode) => (
  <Provider store={store}>
    <MemoryRouter>
      { component }
    </MemoryRouter>
  </Provider>
);

export default wrappedRender;

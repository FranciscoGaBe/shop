/* eslint-disable react/jsx-props-no-spreading */
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LoadingHandler from './LoadingHandler';

describe('LoadingHandler', () => {
  const renderComponent = (args = {}) => render(
    <MemoryRouter>
      <LoadingHandler {...args}>Content</LoadingHandler>
    </MemoryRouter>,
  );

  it('displays content by default', () => {
    renderComponent();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
  it('displays Loading component while isLoading is true', () => {
    renderComponent({ isLoading: true });
    expect(screen.getByRole('figure', { name: 'loading' })).toBeInTheDocument();
  });
  it('displays Error component when isError is true', () => {
    renderComponent({ isError: true });
    expect(screen.getByRole('figure', { name: 'error' })).toBeInTheDocument();
  });
  it('displays content when data is not null and isError and isLoading is false', () => {
    renderComponent({ isLoading: false, isError: false });
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from './Pagination';

describe('Pagination', () => {
  const renderComponent = (page = 1, onChange = () => undefined) => {
    render(<Pagination page={page} items={50} perPage={10} onChange={onChange} />);
  };
  it('displays as many page buttons as pages', () => {
    renderComponent();
    expect(screen.getAllByRole('button', { name: /\d+/ })).toHaveLength(5);
  });
  it('clicking on a page number goes to that page', () => {
    const fn = jest.fn();
    renderComponent(1, fn);
    fireEvent.click(screen.getAllByRole('button', { name: /\d+/ })[2]);
    expect(fn).toHaveBeenCalledWith(3);
  });
  it('clicking on the same page is disabled', () => {
    const fn = jest.fn();
    renderComponent(1, fn);
    fireEvent.click(screen.getAllByRole('button', { name: /\d+/ })[0]);
    expect(fn).not.toHaveBeenCalled();
  });
  describe('next button', () => {
    it('goes to next page', () => {
      const fn = jest.fn();
      renderComponent(1, fn);
      fireEvent.click(screen.getByRole('button', { name: 'next' }));
      expect(fn).toHaveBeenCalledWith(2);
    });
    it('is disabled on last page', () => {
      const fn = jest.fn();
      renderComponent(5, fn);
      fireEvent.click(screen.getByRole('button', { name: 'next' }));
      expect(fn).not.toHaveBeenCalled();
    });
  });
  describe('previous button', () => {
    it('goes to previous page', () => {
      const fn = jest.fn();
      renderComponent(2, fn);
      fireEvent.click(screen.getByRole('button', { name: 'previous' }));
      expect(fn).toHaveBeenCalledWith(1);
    });
    it('is disabled on last page', () => {
      const fn = jest.fn();
      renderComponent(1, fn);
      fireEvent.click(screen.getByRole('button', { name: 'previous' }));
      expect(fn).not.toHaveBeenCalled();
    });
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Filters, { Filter } from './Filters';

describe('Filters', () => {
  it('renders form element', () => {
    const filters: Filter[] = [
      { type: 'text', name: 'Description', value: 'test' },
    ];
    render(<Filters filters={filters} onSubmit={() => undefined} />);
    expect(screen.getByRole('form', { name: 'filters' })).toBeInTheDocument();
  });
  describe('filters', () => {
    it('renders text inputs', () => {
      const filters: Filter[] = [
        {
          type: 'text', name: 'Description', value: 'test', placeholder: 'Placeholder',
        },
      ];
      render(<Filters filters={filters} onSubmit={() => undefined} />);
      const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'Description' });
      expect(input.value).toBe('test');
      expect(input.placeholder).toBe('Placeholder');
    });
    it('renders select', () => {
      const filters: Filter[] = [
        {
          type: 'select',
          name: 'Options',
          value: '2',
          options: [
            { text: 'Option 1', value: '1' },
            { text: 'Option 2', value: '2' },
            { text: 'Option 3', value: '3' },
          ],
        },
      ];
      render(<Filters filters={filters} onSubmit={() => undefined} />);
      const input = screen.getByRole<HTMLSelectElement>('combobox', { name: 'Options' });
      expect(input.value).toBe('2');
      expect(input.options).toHaveLength(3);
      Array.from(input.options).forEach((option, index) => {
        expect(option.value).toBe((index + 1).toString());
        expect(option.textContent).toBe(`Option ${index + 1}`);
      });
    });
  });
  it('has a button to submit filters', () => {
    const filters: Filter[] = [
      { type: 'text', name: 'Description', value: 'test' },
      {
        type: 'select',
        name: 'Options',
        value: '2',
        options: [
          { text: 'Option 1', value: '1' },
          { text: 'Option 2', value: '2' },
          { text: 'Option 3', value: '3' },
        ],
      },
    ];
    const fn = jest.fn();
    render(<Filters filters={filters} onSubmit={fn} />);
    const button = screen.getByRole('button', { name: 'Apply filters' });
    fireEvent.click(button);
    expect(fn).toHaveBeenLastCalledWith({
      Options: '2',
      Description: 'test',
    });
    const textInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Description' });
    textInput.value = 'test 2';
    fireEvent.input(textInput);
    const selectInput = screen.getByRole<HTMLSelectElement>('combobox', { name: 'Options' });
    selectInput.value = '3';
    fireEvent.change(selectInput);
    fireEvent.click(button);
    expect(fn).toHaveBeenLastCalledWith({
      Options: '3',
      Description: 'test 2',
    });
  });
  it('has a button to reset filters', () => {
    const filters: Filter[] = [
      { type: 'text', name: 'Description', value: 'test' },
      {
        type: 'select',
        name: 'Options',
        value: '2',
        options: [
          { text: 'Option 1', value: '1' },
          { text: 'Option 2', value: '2' },
          { text: 'Option 3', value: '3' },
        ],
      },
    ];
    const fn = jest.fn();
    render(<Filters filters={filters} onSubmit={fn} />);
    const button = screen.getByRole('button', { name: 'Reset filters' });
    const textInput = screen.getByRole<HTMLInputElement>('textbox', { name: 'Description' });
    textInput.value = 'test 2';
    fireEvent.input(textInput);
    const selectInput = screen.getByRole<HTMLSelectElement>('combobox', { name: 'Options' });
    selectInput.value = '3';
    fireEvent.change(selectInput);
    fireEvent.click(button);
    expect(fn).toHaveBeenLastCalledWith({
      Options: '2',
      Description: 'test',
    });
    expect(selectInput.value).toBe('2');
    expect(textInput.value).toBe('test');
  });
});

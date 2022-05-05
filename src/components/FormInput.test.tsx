import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import FormInput from './FormInput';

describe('FormInput', () => {
  it('renders input of the passed type', () => {
    render(<FormInput type="number" />);
    expect(screen.getByRole<HTMLInputElement>('spinbutton').type).toBe('number');
  });
  it('renders name', () => {
    render(<FormInput name="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
  it('renders value', () => {
    render(<FormInput value="Test value" />);
    expect(screen.getByRole<HTMLInputElement>('textbox').value).toBe('Test value');
  });
  it('calls onInput when input is updated', () => {
    const fn = jest.fn();
    render(<FormInput onInput={fn} />);
    const input = screen.getByRole<HTMLInputElement>('textbox');
    input.value = 'Test';
    fireEvent.input(input);
    expect(fn).toHaveBeenLastCalledWith('Test');
  });
});

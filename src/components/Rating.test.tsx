import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from './Rating';

describe('Rating', () => {
  beforeEach(() => {
    render(<Rating rate={3.5} />);
  });

  it('displays rating', () => {
    expect(screen.getByLabelText('Rating: 3.5 out of 5')).toBeTruthy();
  });
  it('displays rate', () => {
    expect(screen.getByText('3.5')).toBeTruthy();
  });
});

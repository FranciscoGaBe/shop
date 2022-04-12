import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayoutHeader from './MainLayoutHeader';

describe('MainLayoutHeader', () => {
  beforeEach(() => {
    render(
      <MainLayoutHeader />,
      { wrapper: MemoryRouter },
    );
  });

  it('has a header element', () => {
    expect(screen.getByRole('banner').tagName).toBe('HEADER');
  });
  it('has logo', () => {
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('logo.svg');
  });
  it('has a navigation menu', () => {
    expect(screen.getByRole('navigation')).toBeTruthy();
  });
});

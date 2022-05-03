import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayoutHeader from './MainLayoutHeader';
import wrappedRender from '../../utils/wrappedRender';

describe('MainLayoutHeader', () => {
  beforeEach(() => {
    render(wrappedRender(<MainLayoutHeader />));
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

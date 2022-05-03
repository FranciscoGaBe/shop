import React from 'react';
import { render, screen } from '@testing-library/react';
import MainLayout from './MainLayout';
import wrappedRender from '../../utils/wrappedRender';

describe('MainLayout', () => {
  beforeEach(() => {
    render(wrappedRender(<MainLayout />));
  });

  it('has header element', () => {
    expect(screen.getByRole('banner').tagName).toBe('HEADER');
  });
  it('has a main element', () => {
    expect(screen.getByRole('main').tagName).toBe('MAIN');
  });
  it('has a footer element', () => {
    expect(screen.getByRole('contentinfo').tagName).toBe('FOOTER');
  });
});

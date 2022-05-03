import React from 'react';
import {
  cleanup, fireEvent, render, screen,
} from '@testing-library/react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createMemoryHistory } from 'history';
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

  it('has a search element', () => {
    cleanup();
    const history = createMemoryHistory();
    render(wrappedRender(<MainLayoutHeader />, { history }));
    expect(screen.getByRole('search')).toBeInTheDocument();
    const input = screen.getByRole<HTMLInputElement>('textbox', { name: 'search text' });
    const button = screen.getByRole('button', { name: 'search' });
    input.value = 'Test';
    fireEvent.input(input);
    fireEvent.click(button);
    expect(history.location.pathname).toBe('/search');
    expect(history.location.search).toBe('?q=Test');
  });
});

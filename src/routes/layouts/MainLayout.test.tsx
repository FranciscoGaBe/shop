import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayout from './MainLayout';

describe('MainLayout', () => {
  beforeEach(() => {
    render(
      <MainLayout />,
      { wrapper: MemoryRouter },
    );
  });

  describe('Header', () => {
    it('has a header element', () => {
      expect(screen.getByRole('banner')).toBeTruthy();
    });
    it('has logo', () => {
      const img = screen.getByRole('img') as HTMLImageElement;
      expect(img.src).toContain('logo.svg');
    });
  });

  describe('Navigation menu', () => {
    it('has a navigation menu', () => {
      expect(screen.getByRole('navigation')).toBeTruthy();
    });
  });

  describe('Footer', () => {
    it('displays copyright by', () => {
      expect(screen.getByText('© Francisco Garrido Bear')).toBeTruthy();
    });
    it('has a link to Github', () => {
      expect(screen.getByRole('link', { name: 'github' })).toBeTruthy();
    });
    it('has a link to LinkedIn', () => {
      expect(screen.getByRole('link', { name: 'linkedin' })).toBeTruthy();
    });
  });
});

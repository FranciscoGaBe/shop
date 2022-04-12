import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainLayoutFooter from './MainLayoutFooter';

describe('MainLayoutFooter', () => {
  beforeEach(() => {
    render(
      <MainLayoutFooter />,
      { wrapper: MemoryRouter },
    );
  });

  it('has a footer element', () => {
    expect(screen.getByRole('contentinfo').tagName).toBe('FOOTER');
  });
  it('displays copyright by', () => {
    expect(screen.getByText('© Francisco Garrido Bear')).toBeTruthy();
  });
  it('has a links to places of interest', () => {
    const places = [
      'https://github.com/FranciscoGaBe/shop',
      'https://www.linkedin.com/in/francisco-garrido-679084198/',
    ];
    const links = screen.getAllByRole<HTMLLinkElement>('link').map(({ href }) => href);
    places.forEach((place) => {
      expect(links).toContain(place);
    });
  });
});

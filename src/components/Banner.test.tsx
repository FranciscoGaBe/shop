import React from 'react';
import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import Banner from './Banner';

jest.mock('framer-motion', () => ({
  ...jest.requireActual('framer-motion'),
  useReducedMotion: () => true,
}));

describe('Banner', () => {
  const renderBanner = () => render(<Banner>Child</Banner>);
  const renderBannerMultipleChildren = ({ auto } = { auto: 0 }) => render(
    <Banner auto={auto}>
      <div>Child 1</div>
      <div>Child 2</div>
      <div>Child 3</div>
    </Banner>,
  );

  it('render child', () => {
    renderBanner();
    expect(screen.getByText('Child')).toBeTruthy();
  });
  it('does not render buttons with a single child', () => {
    renderBanner();
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
  it('render buttons with multiple children', () => {
    renderBannerMultipleChildren();
    expect(screen.getAllByRole('button')).not.toHaveLength(0);
  });
  it('has a next button', () => {
    renderBannerMultipleChildren();
    expect(screen.getByRole('figure').textContent).toBe('Child 1');
    fireEvent.click(screen.getByRole('button', { name: 'next' }));
    expect(screen.getByRole('figure').textContent).toBe('Child 2');
  });
  it('has a previous button', () => {
    renderBannerMultipleChildren();
    expect(screen.getByRole('figure').textContent).toBe('Child 1');
    fireEvent.click(screen.getByRole('button', { name: 'previous' }));
    expect(screen.getByRole('figure').textContent).toBe('Child 3');
  });
  it('has multiple buttons to navigate to banner', () => {
    renderBannerMultipleChildren();
    const buttons = screen.getAllByRole('button', { name: /Banner-.+/ });
    expect(buttons).toHaveLength(3);
    fireEvent.click(buttons[2]);
    expect(screen.getByRole('figure').textContent).toBe('Child 3');
    fireEvent.click(buttons[1]);
    expect(screen.getByRole('figure').textContent).toBe('Child 2');
  });
  it('does not change banners if auto is 0', () => {
    jest.useFakeTimers();
    renderBannerMultipleChildren({ auto: 0 });
    expect(screen.getByRole('figure').textContent).toBe('Child 1');
    jest.advanceTimersByTime(10000);
    expect(screen.getByRole('figure').textContent).toBe('Child 1');
    jest.useRealTimers();
  });
  it('changes banners when auto is supplied every "auto" miliseconds', async () => {
    renderBannerMultipleChildren({ auto: 100 });
    await waitFor(() => expect(screen.getByRole('figure').textContent).toBe('Child 1'));
    await waitFor(() => expect(screen.getByRole('figure').textContent).toBe('Child 2'));
    await waitFor(() => expect(screen.getByRole('figure').textContent).toBe('Child 3'));
  });
});

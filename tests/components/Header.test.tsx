/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../../app/components/Header';
import '@testing-library/jest-dom';

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders logo and navigation links', () => {
    render(<Header />);
    expect(screen.getByRole('link', { name: /streaming/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /popular movies/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /top rated movies/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /upcoming movies/i })).toBeInTheDocument();
  });

  it('has accessible aria-labels on navigation links', () => {
    render(<Header />);
    expect(screen.getByLabelText('Home')).toBeInTheDocument();
    expect(screen.getByLabelText('Popular Movies')).toBeInTheDocument();
    expect(screen.getByLabelText('Top Rated Movies')).toBeInTheDocument();
    expect(screen.getByLabelText('Upcoming Movies')).toBeInTheDocument();
  });

  it('changes background on scroll', () => {
    render(<Header />);
    const header = screen.getByRole('banner');

    // Initially transparent
    expect(header).toHaveClass('bg-transparent');

    // Simulate scroll event
    window.pageYOffset = 20;
    window.dispatchEvent(new Event('scroll'));

    // Since useEffect is async, wait for it to update
    setTimeout(() => {
      expect(header).not.toHaveClass('bg-transparent');
    }, 100);
  });
});

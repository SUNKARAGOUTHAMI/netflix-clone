/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import HeroBanner from '../../app/components/HeroBanner';
import '@testing-library/jest-dom';

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  overview: 'This is a test movie overview.',
  backdrop_path: '/testBackdrop.jpg',
  poster_path: '/testPoster.jpg',
  release_date: '2023-01-01',
  vote_average: 8.5,
};

describe('HeroBanner Component', () => {
  it('renders movie title and overview', () => {
    render(<HeroBanner movie={mockMovie} />);
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
  });

  it('renders Watch Now button linking to movie detail page', () => {
    render(<HeroBanner movie={mockMovie} />);
    const button = screen.getByRole('link', {
      name: `View details of ${mockMovie.title}`,
    });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', `/movie/${mockMovie.id}`);
  });

  it('renders backdrop image with correct alt text', () => {
    render(<HeroBanner movie={mockMovie} />);
    const img = screen.getByAltText(mockMovie.title);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute(
      'src',
      expect.stringContaining(mockMovie.backdrop_path)
    );
  });
});

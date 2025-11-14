/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import MovieCard from '../../app/components/MovieCard';
import '@testing-library/jest-dom';

const mockMovie = {
  id: 123,
  title: 'Sample Movie',
  poster_path: '/samplePoster.jpg',
  backdrop_path: '/sampleBackdrop.jpg',
  overview: 'Sample movie overview.',
  release_date: '2022-12-01',
  vote_average: 7.1,
};

describe('MovieCard Component', () => {
  it('renders movie poster image and title', () => {
    render(<MovieCard movie={mockMovie} />);
    const img = screen.getByAltText(`${mockMovie.title} poster`);
    expect(img).toBeInTheDocument();

    const title = screen.getByText(mockMovie.title);
    expect(title).toBeInTheDocument();
  });

  it('links to the correct movie detail page', () => {
    render(<MovieCard movie={mockMovie} />);
    const link = screen.getByRole('link', {
      name: `View details for ${mockMovie.title}`,
    });
    expect(link).toHaveAttribute('href', `/movie/${mockMovie.id}`);
  });

  it('renders fallback text if no poster_path', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<MovieCard movie={movieWithoutPoster} />);
    expect(screen.getByText(/no image/i)).toBeInTheDocument();
  });
});

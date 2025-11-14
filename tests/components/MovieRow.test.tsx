/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import MovieRow from '../../app/components/MovieRow';
import '@testing-library/jest-dom';

const mockMovies = [
  { id: 1, title: 'Movie 1', poster_path: '/p1.jpg', backdrop_path: '', overview: '', release_date: '', vote_average: 5.0 },
  { id: 2, title: 'Movie 2', poster_path: '/p2.jpg', backdrop_path: '', overview: '', release_date: '', vote_average: 6.0 },
  { id: 3, title: 'Movie 3', poster_path: '/p3.jpg', backdrop_path: '', overview: '', release_date: '', vote_average: 7.0 },
];

describe('MovieRow Component', () => {
  it('renders the title and movie cards', () => {
    render(<MovieRow movies={mockMovies} title="Test Row" />);
    expect(screen.getByRole('heading', { name: /test row/i })).toBeInTheDocument();
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });

  it('renders no movies message if movies array is empty', () => {
    render(<MovieRow movies={[]} title="Empty Row" />);
    expect(screen.getByText(/no movies available/i)).toBeInTheDocument();
  });

  it('allows keyboard arrow keys to scroll', () => {
    render(<MovieRow movies={mockMovies} title="Keyboard Scroll" />);
    const scrollContainer = screen.getByRole('list', { name: /keyboard scroll movies/i });
    expect(scrollContainer).toHaveAttribute('tabindex', '0');

    fireEvent.keyDown(scrollContainer, { key: 'ArrowRight' });
    fireEvent.keyDown(scrollContainer, { key: 'ArrowLeft' });
  });

  it('allows mouse wheel to scroll horizontally', () => {
    render(<MovieRow movies={mockMovies} title="Wheel Scroll" />);
    const scrollContainer = screen.getByRole('list', { name: /wheel scroll movies/i });
    fireEvent.wheel(scrollContainer, { deltaY: 100 });
    fireEvent.wheel(scrollContainer, { deltaY: -100 });
  });
});

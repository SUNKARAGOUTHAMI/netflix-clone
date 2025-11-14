'use client';

import { useRef, KeyboardEvent, WheelEvent } from 'react';
import MovieCard from './MovieCard';
import { MovieSummary } from '../../types/movie';  // Adjust path as needed

interface MovieRowProps {
  movies: MovieSummary[];
  title: string;
}

export default function MovieRow({ movies, title }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function onWheelScroll(e: WheelEvent<HTMLDivElement>) {
    if (scrollRef.current) {
      e.preventDefault();
      scrollRef.current.scrollBy({ left: e.deltaY, behavior: 'smooth' });
    }
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (!scrollRef.current) return;

    const scrollAmount = 100;
    if (e.key === 'ArrowRight') {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      e.preventDefault();
    }
  }

  if (movies.length === 0) {
    return (
      <section aria-label={title} className="mb-8 px-2">
        <h2 className="text-xl font-semibold mb-3">{title}</h2>
        <p className="text-gray-400">No movies available.</p>
      </section>
    );
  }

  return (
    <section aria-label={title} className="mb-8 px-2">
      <h2 className="text-xl font-semibold mb-3">{title}</h2>
      <div
        ref={scrollRef}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onWheel={onWheelScroll}
        role="list"
        aria-label={`${title} movies`}
        className="flex space-x-4 overflow-x-auto scrollbar-hide scroll-smooth focus:outline-none focus-visible:ring focus-visible:ring-red-600"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

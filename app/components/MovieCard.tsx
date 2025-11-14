'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MovieSummary } from '../../types/movie';  // Adjust path as needed

interface MovieCardProps {
  movie: MovieSummary;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
    : null;

  return (
    <Link
      href={`/movie/${movie.id}`}
      className="min-w-[160px] max-w-[160px] shrink-0 rounded-lg overflow-hidden bg-gray-800 shadow-md hover:shadow-xl transition-shadow duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative aspect-[2/3] w-full bg-gray-700">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={`${movie.title} poster`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="160px"
            placeholder="blur"
            blurDataURL="/vercel.svg"
            priority={false}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400">
            No Image
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="text-sm font-semibold truncate" title={movie.title}>
          {movie.title}
        </h3>
      </div>
    </Link>
  );
}

import Image from 'next/image';
import Link from 'next/link';
import { MovieSummary } from '@types/movie';

interface HeroBannerProps {
  movie: MovieSummary;
}

export default function HeroBanner({ movie }: HeroBannerProps) {
  return (
    <section className="relative h-[70vh] w-full select-none">
      {movie.backdrop_path ? (
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          fill
          sizes="100vw"
          priority
          style={{ objectFit: 'cover' }}
          className="brightness-[0.55]"
          placeholder="blur"
          blurDataURL="/vercel.svg"
        />
      ) : (
        <div className="absolute inset-0 bg-gray-800 flex items-center justify-center text-gray-400">
          No Image Available
        </div>
      )}
      <div className="absolute bottom-12 left-8 max-w-3xl text-white drop-shadow-lg">
        <h1 className="text-4xl font-extrabold mb-4">{movie.title}</h1>
        <p className="text-lg max-h-24 overflow-hidden text-ellipsis mb-6">
          {movie.overview}
        </p>
        <Link
          href={`/movie/${movie.id}`}
          className="inline-block rounded bg-red-600 px-6 py-3 font-semibold uppercase tracking-wide transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          aria-label={`View details of ${movie.title}`}
        >
          Watch Now
        </Link>
      </div>
    </section>
  );
}

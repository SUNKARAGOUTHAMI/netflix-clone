import { MovieDetail } from '@types/movie';
import { fetchMovieById } from '@lib/tmdb';
import Image from 'next/image';

interface MovieDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: MovieDetailPageProps) {
  try {
    const movie = await fetchMovieById(params.id);
    return {
      title: movie.title,
      description: movie.overview,
      openGraph: {
        title: movie.title,
        description: movie.overview,
        images: [
          {
            url: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
            alt: movie.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Movie Not Found',
      description: '',
    };
  }
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  let movie: MovieDetail | null = null;
  try {
    movie = await fetchMovieById(params.id);
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
  }

  if (!movie) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-red-500 text-lg">Movie not found or failed to load.</p>
      </div>
    );
  }

  return (
    <article className="max-w-6xl mx-auto px-4 sm:px-8 py-8">
      <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
      <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-6 shadow-lg">
        {movie.backdrop_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            style={{ objectFit: 'cover' }}
            priority
          />
        ) : (
          <div className="bg-gray-700 flex items-center justify-center h-full text-gray-300">
            No Image Available
          </div>
        )}
      </div>
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-300 leading-relaxed">{movie.overview}</p>
      </section>
      <section className="mb-6 flex flex-wrap gap-4 text-sm text-gray-400">
        <div>
          <strong>Release Date:</strong> {movie.release_date || 'N/A'}
        </div>
        <div>
          <strong>Runtime:</strong> {movie.runtime ? `${movie.runtime} min` : 'N/A'}
        </div>
        <div>
          <strong>Genres:</strong>{' '}
          {movie.genres.length > 0
            ? movie.genres.map((g) => g.name).join(', ')
            : 'N/A'}
        </div>
        <div>
          <strong>Rating:</strong> {movie.vote_average.toFixed(1)} / 10
        </div>
      </section>
      {movie.videos.results.length > 0 && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Trailers & Videos</h2>
          <div className="space-y-6">
            {movie.videos.results
              .filter((video) => video.site === 'YouTube' && video.type === 'Trailer')
              .map((video) => (
                <div key={video.id} className="aspect-video w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  />
                </div>
              ))}
          </div>
        </section>
      )}
    </article>
  );
}

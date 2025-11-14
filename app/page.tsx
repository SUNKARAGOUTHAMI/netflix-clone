import HeroBanner from './components/HeroBanner';
import MovieRow from './components/MovieRow';
import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
} from '@lib/tmdb';
import { MovieSummary } from '@types/movie';

interface HomePageProps {
  popularMovies: MovieSummary[];
  topRatedMovies: MovieSummary[];
  upcomingMovies: MovieSummary[];
  featuredMovie: MovieSummary | null;
}

async function getData(): Promise<HomePageProps> {
  try {
    const [popular, topRated, upcoming] = await Promise.all([
      fetchPopularMovies(),
      fetchTopRatedMovies(),
      fetchUpcomingMovies(),
    ]);
    const featuredMovie = popular.length > 0 ? popular[0] : null;

    return {
      popularMovies: popular,
      topRatedMovies: topRated,
      upcomingMovies: upcoming,
      featuredMovie,
    };
  } catch (error) {
    console.error('Error fetching movie data:', error);
    return {
      popularMovies: [],
      topRatedMovies: [],
      upcomingMovies: [],
      featuredMovie: null,
    };
  }
}

export default async function Home() {
  const { popularMovies, topRatedMovies, upcomingMovies, featuredMovie } =
    await getData();

  return (
    <>
      {featuredMovie && <HeroBanner movie={featuredMovie} />}
      <section className="space-y-10 px-4 sm:px-8 md:px-12 lg:px-20">
        <MovieRow movies={popularMovies} title="Popular Movies" />
        <MovieRow movies={topRatedMovies} title="Top Rated Movies" />
        <MovieRow movies={upcomingMovies} title="Upcoming Movies" />
      </section>
    </>
  );
}

import { MovieSummary, MovieDetail } from '../types/movie';

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY;

if (!API_KEY) {
  throw new Error(
    'TMDB_API_KEY is not defined. Please set it in your environment variables.'
  );
}

async function fetchFromTmdb<T>(endpoint: string): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}&api_key=${API_KEY}&language=en-US`;
  try {
    const res = await fetch(url, { next: { revalidate: 60 * 60 } });
    if (!res.ok) {
      throw new Error(`TMDB API responded with status ${res.status}`);
    }
    const data: T = await res.json();
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch TMDB API: ${error instanceof Error ? error.message : String(error)}`);
  }
}

interface TmdbMovieListResponse {
  results: MovieSummary[];
}

export async function fetchPopularMovies(): Promise<MovieSummary[]> {
  const data = await fetchFromTmdb<TmdbMovieListResponse>('/movie/popular?');
  return data.results ?? [];
}

export async function fetchTopRatedMovies(): Promise<MovieSummary[]> {
  const data = await fetchFromTmdb<TmdbMovieListResponse>('/movie/top_rated?');
  return data.results ?? [];
}

export async function fetchUpcomingMovies(): Promise<MovieSummary[]> {
  const data = await fetchFromTmdb<TmdbMovieListResponse>('/movie/upcoming?');
  return data.results ?? [];
}

export async function fetchMovieById(id: string): Promise<MovieDetail> {
  if (!id || typeof id !== 'string') {
    throw new Error('Invalid movie id');
  }
  const url = `/movie/${id}?append_to_response=videos`;
  return await fetchFromTmdb<MovieDetail>(url);
}

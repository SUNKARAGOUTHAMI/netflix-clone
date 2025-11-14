import {
  fetchPopularMovies,
  fetchTopRatedMovies,
  fetchUpcomingMovies,
  fetchMovieById,
} from '../../lib/tmdb';

global.fetch = jest.fn();

const mockApiKey = 'test_api_key';
process.env.TMDB_API_KEY = mockApiKey;

const mockMovieSummary = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  overview: 'Overview',
  release_date: '2023-01-01',
  vote_average: 7.0,
};

const mockMovieDetail = {
  ...mockMovieSummary,
  genres: [{ id: 1, name: 'Action' }],
  runtime: 120,
  videos: { results: [] },
  homepage: 'https://example.com',
  status: 'Released',
  tagline: 'Test tagline',
};

describe('TMDB fetch helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetchPopularMovies calls correct endpoint and returns movies', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [mockMovieSummary] }),
    } as Response);

    const movies = await fetchPopularMovies();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movie/popular'),
      expect.anything()
    );
    expect(movies).toEqual([mockMovieSummary]);
  });

  it('fetchTopRatedMovies calls correct endpoint and returns movies', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [mockMovieSummary] }),
    } as Response);

    const movies = await fetchTopRatedMovies();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movie/top_rated'),
      expect.anything()
    );
    expect(movies).toEqual([mockMovieSummary]);
  });

  it('fetchUpcomingMovies calls correct endpoint and returns movies', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ results: [mockMovieSummary] }),
    } as Response);

    const movies = await fetchUpcomingMovies();
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/movie/upcoming'),
      expect.anything()
    );
    expect(movies).toEqual([mockMovieSummary]);
  });

  it('fetchMovieById calls correct endpoint and returns movie detail', async () => {
    const movieId = '1';
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovieDetail,
    } as Response);

    const movie = await fetchMovieById(movieId);
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/movie/${movieId}?append_to_response=videos`),
      expect.anything()
    );
    expect(movie).toEqual(mockMovieDetail);
  });

  it('fetchFromTmdb throws error on non-ok response', async () => {
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: false,
      status: 404,
      json: async () => ({}),
    } as Response);

    await expect(fetchPopularMovies()).rejects.toThrow(
      /TMDB API responded with status 404/
    );
  });

  it('fetchMovieById throws error for invalid id', async () => {
    // @ts-expect-error testing invalid input
    await expect(fetchMovieById(null)).rejects.toThrow(/Invalid movie id/);
  });
});

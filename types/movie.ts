export interface Genre {
  id: number;
  name: string;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface VideoResponse {
  results: Video[];
}


// types/movie.ts
export interface MovieSummary {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  poster_path?: string;
  release_date?: string;
  vote_average?: number;
}

export interface MovieDetail extends MovieSummary {
  genres: Genre[];
  runtime: number | null;
  videos: VideoResponse;
  homepage: string | null;
  status: string;
  tagline: string | null;
}

import { Request } from 'express'

export interface SearchRequest extends Request {
  query: {
    searchTerm: string,
  }
}

export interface GetMovieFromImdbRequest extends Request {
  params: {
    imdbId: string,
  }
}

export interface CreateMovieRequest extends Request {
  body: Movie
}

export interface UpdateMovieRequest extends Request {
  body: Partial<Movie>
  params: {
    id: string
  }
}

export interface DeleteMovieRequest extends Request {
  params: {
    id: string
  }
}

export interface GetMovieRequest extends Request {
  params: {
    id: string
  }
}

export interface Movie {
  title: string;
  magnet: string;
  fileName: string;
  sourceUrl: string;
  plot: string;
  year: string;
  director: string;
  actors: string[];
  backDrop: string,
  poster: string;
  trailer: string;
  _id?: string;
  boxOffice: string;
  released: string;
  writer: string;
  runtime: string;
  ratingImdb: string;
  imdbId: string;
  rated: string;
  genres: string[];
}
export interface ImdbMovie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: any;
  budget: number;
  genres: Genres[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Production_companies[];
  production_countries: Production_countries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spoken_language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
export interface Genres {
  id: number;
  name: string;
}

export interface Production_companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Production_countries {
  iso_3166_1: string;
  name: string;
}

export interface Spoken_language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface CrewMember {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id?: number;
  character?: string;
  credit_id : string;
  order: number;
  job?: string;
}
export interface ImdbTrailer {
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type: string
  official: boolean
  published_at: string
  id: string
}
export interface GetCreditsResponse {
  id: Number,
  cast: CrewMember[],
  crew: CrewMember[]
}
export interface GetVideosResponse {
  id: number,
  results: ImdbTrailer[],
}
export interface SearchMovieResponse {
  page: number,
  results: Partial<ImdbMovie>[],
  total_pages: number,
  total_results: number,
}

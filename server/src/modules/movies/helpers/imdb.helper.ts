import {
  CrewMember,
  GetCreditsResponse,
  GetVideosResponse,
  ImdbMovie,
  Movie,
  SearchMovieResponse
} from '../movies.interfaces'
import { stringify } from 'qs'
import 'dotenv/config'
import axios from 'axios'
import { IMDB_SEARCH_URL } from '../movies.const'

export const ImdbRequest = () => {
  const queryParams = stringify({
    language: 'ru',
    api_key: process.env.IMDB_API_KEY
  })
  const MOVIE_URL = `${IMDB_SEARCH_URL}/movie`
  return {
    getMovie: (ImdbId: string) => axios.get<ImdbMovie>(`${MOVIE_URL}/${ImdbId}?${queryParams}`),
    getMovieCredits: (ImdbId: number) => axios.get<GetCreditsResponse>(`${MOVIE_URL}/${ImdbId}/credits?${queryParams}`),
    searchMovie: (query: string) => axios.get<SearchMovieResponse>(`${MOVIE_URL}/search/movie?${queryParams}&query=${query}`),
    getVideos: (ImdbId: number) => axios.get<GetVideosResponse>(`${MOVIE_URL}/${ImdbId}/videos?${queryParams}`)
  }
}
const findCrewMember = (crew: CrewMember[], memberJob: string) => crew.find(({ job }) => job === memberJob).name || ''
const { getMovieCredits, getVideos } = ImdbRequest()
export const fetchMovieCredits = async (ImdbId: number) => {
  try {

    const { data: { crew, cast } } = await getMovieCredits(ImdbId)
    const actors = cast.map(({ name }) => name)
    return {
      actors,
      director: findCrewMember(crew, 'Director'),
      writer: findCrewMember(crew, 'Writer')
    }
  } catch (err) {
    console.log(err)
    return {
      actors: [],
      director: '',
      writer: ''
    }
  }
}

export const getTrailer = async (ImdbId: number) => {
  try {
    const { data: { results } } = await getVideos(ImdbId)
    const { key } = results.find(({ type }) => type === 'Trailer')
    return `https://www.themoviedb.org/video/play?key=${key}`
  } catch (err) {
    console.log(err)
    return ''
  }
}

export const convertMovie = async ({
                                     backdrop_path,
                                     poster_path,
                                     title,
                                     original_title,
                                     release_date,
                                     id,
                                     revenue,
                                     runtime,
                                     vote_average,
                                     imdb_id,
                                     genres
                                   }: ImdbMovie): Promise<Partial<Movie>> => {
  const { actors, director, writer } = await fetchMovieCredits(id)
  return {
    title: title || original_title,
    plot: 'Жизнь и репутация Питера Паркера оказываются под угрозой, поскольку Мистерио раскрыл всему миру тайну личности Человека-паука. Пытаясь исправить ситуацию, Питер обращается за помощью к Стивену Стрэнджу, но вскоре всё становится намного опаснее.',
    year: new Date(release_date).getFullYear().toString(),
    director,
    actors,
    poster: `https://image.tmdb.org/t/p/w1280${poster_path}`,
    backDrop: `https://image.tmdb.org/t/p/w1280${backdrop_path}`,
    boxOffice: String(revenue),
    trailer: await getTrailer(id),
    released: new Date(release_date).toString(),
    writer,
    runtime: String(runtime),
    ratingImdb: vote_average.toString(),
    imdbId: imdb_id,
    rated: '',
    genres: genres.map(({ name }) => name)
  }
}

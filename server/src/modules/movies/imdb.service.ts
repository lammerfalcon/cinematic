import { ImdbMovie, Movie } from './movies.interfaces'
import 'dotenv/config'
import { convertMovie, ImdbRequest } from './helpers/imdb.helper'

const { searchMovie, getMovie } = ImdbRequest()

export const searchInImdb = async (query: string): Promise<Partial<ImdbMovie>> => {
  const { data: { results } }: any = await searchMovie(query)
  const [movie] = results

  return movie
}

export const getMovieFromImdb = async (imdbId: string): Promise<Partial<Movie>> => {
  const { data } = await getMovie(imdbId)
  return convertMovie(data)
}

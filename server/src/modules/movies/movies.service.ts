import { Router } from 'express'
import * as cheerio from 'cheerio'
import axios from 'axios'
import { parse, stringify } from 'qs'
import { BASE_SEARCH_URL, IMDB_SEARCH_URL, MAGNET_KEY, RUTOR_URL, SPLIT_MAGNET_STRING } from './movies.const'
import { extractMagnetFromQuery } from './movies.utils'
import { Movie } from './movies.interfaces'
import MoviesModel from './movies.model'
import moviesModel from './movies.model'

const router = Router()


export const movieSearch = async (searchTerm: String) => {

  const searchResult = await axios.get(`${BASE_SEARCH_URL}/${searchTerm}`)
  const $ = cheerio.load(searchResult.data)
  const data = $('table tr').toArray()
  return data
    .map(item => {
      const [_, magnetTag, title] = $(item).find('a').toArray()

      const magnetLink = $(magnetTag).attr('href')
      const torrentUrl = `${RUTOR_URL}${$(title).attr('href')}`
      return ({
        magnet: extractMagnetFromQuery(magnetLink),
        torrentUrl,
        title: $(title).text()
      })
    }).filter(item => item.title)
}


export const create = async (input: Movie) => {
  const item = new MoviesModel(input)
  await item.save()
  return item
}
export const update = (input: Partial<Movie>, id: string) => {
  return MoviesModel.findByIdAndUpdate(id, input, {
    new: true
  })
}
export const findOne = (id: string) => {
  return moviesModel.findById(id)
}
export const findAll = () => {
  return moviesModel.find()
}
const deleteOne = (id: string) => {
  return moviesModel.findByIdAndRemove(id)
}

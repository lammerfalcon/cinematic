import express from 'express'
import cors from  'cors'
import logger from 'morgan'
import * as mongoose from 'mongoose'

// Routes
import streamRouter from './modules/stream/stream.controller'
import contentRouter from './modules/content/content.controller'
import moviesRouter from './modules/movies/movies.controller'
import 'dotenv/config'
import * as process from 'process'

try {
  mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log(process.env.MONGO_URL)
    console.log('connection to mongo success')
  })
} catch (e) {
  console.warn('connection to mongo failed', e)
  throw e
}
//Middleware
const app = express()
app.use(cors())
app.disable('etag');
app.use(express.json())
app.use(logger('dev'))
// app.set('views', path.join(__dirname, 'views'))


// Endpoints
app.use('/stream', streamRouter)
app.use('/content', contentRouter)
app.use('/movies', moviesRouter)


const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})

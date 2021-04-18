import mongoose from 'mongoose'

import {AllMoviesSchema} from '../models/demoModel'

const Movies = mongoose.model('Movies', AllMoviesSchema, 'getAllMovies')

export const getAllData = (req, res) => {
  Movies.find({}, (err, movies) => {
    if (err) {
      res.send(err)
    }
    console.log({movies})
    res.json(movies)
  })
}

const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()

const BASE_URL = `https://rickandmortyapi.com`

// console request logger
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

app.use(cors())

app.use(requestLogger)

// GET character by id
app.get('/api/character/:id', (request, response) => {
  const id = request.params.id
  axios
    .get(`${BASE_URL}/api/character/${id}`)
    .then(result => {
      response.status(200).json(result.data)
    })
    .catch(error => {
      if (error.response.status === 404) {
        response.status(404).json({ 'error': 'Character not found' })
      } else {
        response.status(500).json({ 'error': 'Unable to process request' })
      }
    })
})

// GET location by id
app.get('/api/location/:id', (request, response) => {
  const id = request.params.id
  axios
    .get(`${BASE_URL}/api/location/${id}`)
    .then(result => {
      response.status(200).json(result.data)
    })
    .catch(error => {
      if (error.response.status === 404) {
        response.status(404).json({ 'error': 'Location not found' })
      } else {
        response.status(500).json({ 'error': 'Unable to process request' })
      }
    })
})

// GET episode by id
app.get('/api/episode/:id', (request, response) => {
  const id = request.params.id
  axios
    .get(`${BASE_URL}/api/episode/${id}`)
    .then(result => {
      response.status(200).json(result.data)
    })
    .catch(error => {
      if (error.response.status === 404) {
        response.status(404).json({ 'error': 'Episode not found' })
      } else {
        response.status(500).json({ 'error': 'Unable to process request' })
      }
    })
})

// unknown endpoint response
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

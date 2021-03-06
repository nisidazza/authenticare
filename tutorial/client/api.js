import request from 'superagent'

// TODO: implement or import a proper getAuthorizationHeader function
const getAuthorizationHeader = () => ({ 'Authorization': 'encoded-token' })

const rootUrl = '/api/v1/fruits'
const acceptJsonHeader = { 'Accept': 'application/json' }

export function getFruits (url = rootUrl) {
  return request.get(url)
    .set(acceptJsonHeader)
    .then(res => {
      return res.body.fruits
    })
    .catch(logError)
}

export function addFruit (fruit, url = rootUrl) {
  return request.post(url)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function updateFruit (fruit, url = rootUrl) {
  return request.put(url)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .send(fruit)
    .then(res => res.body.fruits)
    .catch(logError)
}

export function deleteFruit (id, url = rootUrl) {
  return request.delete(`${url}/${id}`)
    .set(acceptJsonHeader)
    .set(getAuthorizationHeader())
    .then(res => res.body.fruits)
    .catch(logError)
}

function logError (err) {
  // eslint-disable-next-line no-console
  console.error(
    'Error consuming the API (in client/api.js):',
    err.message
  )
}

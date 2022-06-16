import axios from 'axios'

// const baseUrl = 'http://localhost:3001/persons'
// for part3
// const baseUrl = 'http://localhost:3001/api/persons'
// const baseUrl = 'https://fswd-part3-backend.herokuapp.com/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const deleteOne = id => {
  console.log('deleted');
  return axios.delete(baseUrl+`/${id}`)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const exportObject = { 
  getAll, 
  create,
  deleteOne,
  update
}

export default exportObject
import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}


const clearToken = () => {
  token = null
  // console.log(`token clear: ${token}`);
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const blogUrl = baseUrl+`/${newObject._id}`
  const response = await axios.put(blogUrl, newObject, config)
  return response.data
}

const exp = { getAll, create, setToken, clearToken, update }
export default exp
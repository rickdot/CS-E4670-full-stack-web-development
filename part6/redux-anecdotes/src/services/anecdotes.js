import axios from 'axios'

const getId = () => (100000 * Math.random()).toFixed(0)

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdoteObj = {
    content: content,
    id: getId(),
    votes: 0
  }
  const response = await axios.post(baseUrl, anecdoteObj)
  return response.data
}

const voteOne = async (anecdoteObj) => {
  const response = await axios.put(`${baseUrl}/${anecdoteObj.id}`,anecdoteObj)
  return response.data
}

const exp = {
  getAll,
  createNew,
  voteOne
}
export default exp
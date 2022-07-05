import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      const newAnecdote = action.payload
      // console.log(newAnecdote);
      // state.push(asObject(newAnecdote))
      state.push(newAnecdote)

    },
    voteAnecdote(state, action) {
      const votedID = action.payload
      return state.map((anecdote) =>
        anecdote.id === votedID ?
        { ...anecdote, votes: anecdote.votes + 1 } :
        anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})


export const initializeAnecdotes = () => {
  return async dispatch => {
    const notes = await anecdoteService.getAll()
    dispatch(setAnecdotes(notes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content) 
    dispatch(createAnecdote(newAnecdote))
  }
}

export const voteTo = anecdote => {
  return async dispatch => {
    anecdoteService.voteOne(anecdote)
    dispatch(voteAnecdote(anecdote.id))
  }
}

export const { createAnecdote, voteAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer


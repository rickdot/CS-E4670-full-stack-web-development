import { createSlice } from '@reduxjs/toolkit'
import loginService from "../services/login"

const initialState = null

const notificationSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return {message: null, timeout: 0}
    }
  }
})


export const setUserTo = (userObj) => {
    console.log(userObj);
  return async dispatch => {
    dispatch(setUser(userObj))
  }
}

export const initializeUser = () => {
    return async dispatch => {
    //   const user = await 
    //   dispatch(setBlogs(blogs))
    }
  }


export const { setUser, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
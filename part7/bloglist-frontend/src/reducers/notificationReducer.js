import { createSlice } from '@reduxjs/toolkit'

let timeoutID = 0

const initialState = {
  message: null,
  timeout: 0
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return {message: null, timeout: 0}
    }
  }
})


export const showNotification = (message, timeout) => {
  return async dispatch => {
    clearTimeout(timeoutID)
    dispatch(setNotification({message:message, timeout:timeout}))
    timeoutID = setTimeout(() => {
        dispatch(removeNotification())
      }, timeout*1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
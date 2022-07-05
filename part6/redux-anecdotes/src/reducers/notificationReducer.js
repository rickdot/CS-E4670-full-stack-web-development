import { createSlice } from '@reduxjs/toolkit'

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
    dispatch(setNotification({message:message, timeout:timeout}))
    setTimeout(() => {
        dispatch(removeNotification())
      }, timeout*1000)
  }
}

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
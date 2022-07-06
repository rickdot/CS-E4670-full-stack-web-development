import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer';
// import filterReducer from './reducers/filterReduce'


const store = configureStore({
    reducer: {
      user: userReducer,
      blogs: blogReducer,
      notification: notificationReducer,
    //   filter: filterReducer
    }
})

export default store;
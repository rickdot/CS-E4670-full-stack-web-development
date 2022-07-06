import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const newBlog = action.payload
      state.push(newBlog)

    },
    likeOne(state, action) {
      const votedID = action.payload
      return (
        state.map((blog) => 
            blog._id === votedID ?
            { ...blog, likes: blog.likes + 1 } :
            blog
        )
      )
    },
    setBlogs(state, action) {
      return action.payload
    },
    deleteOne(state, action){
        const deletedID = action.payload
        return(
            state.filter((blog) => blog._id!==deletedID)
        )
    }
  }
})


export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = blogObj => {
  return async dispatch => {
    const newAnecdote = await blogService.create(blogObj) 
    dispatch(createBlog(newAnecdote))
  }
}

export const likeBlog = blogObj => {
  return async dispatch => {
    blogService.update(blogObj)
    dispatch(likeOne(blogObj._id))
  }
}

export const deleteBlog = blogID => {
    return async dispatch => {
      blogService.deleteBlog(blogID)
      dispatch(deleteOne(blogID))
    }
  }


export const { createBlog, likeOne, setBlogs, deleteOne } = blogSlice.actions
export default blogSlice.reducer


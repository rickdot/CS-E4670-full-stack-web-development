import { useState } from "react"
import blogService from "../services/blogs"
import { useSelector, useDispatch } from "react-redux";
import {showNotification} from "../reducers/notificationReducer"
import {addBlog} from "../reducers/blogReducer"
import {initializeBlogs} from "../reducers/blogReducer"

const BlogForm = ({user, setUser}) => {
  const dispatch = useDispatch();

  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const handleTitleChange=({ target }) => setNewTitle(target.value)
  const handleAuthorChange=({ target }) => setNewAuthor(target.value)
  const handleUrlChange=({ target }) => setNewUrl(target.value)

  const addNew = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0
    }

    dispatch(addBlog(blogObject))

    dispatch(showNotification(`a new blog ${blogObject.title} by ${blogObject.author} added`, 3))
    setNewTitle("")
    setNewAuthor("")
    setNewUrl("")
    dispatch(initializeBlogs())

  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew} id="blog-form">
        <div>
          title: <input value={newTitle} onChange={handleTitleChange} id = "title-input"  />
        </div>
        <div>
          author: <input value={newAuthor} onChange={handleAuthorChange} id = "author-input"  />
        </div>
        <div>
          url: <input value={newUrl} onChange={handleUrlChange} id = "url-input"  />
        </div>
        <button type="submit" data-testid="create-blog">create</button>
      </form>
    </div>
  )

}


export default BlogForm
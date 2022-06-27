import { useState } from "react"
import blogService from "../services/blogs"


const BlogForm = ({
  setErrorMessage,
  blogs,
  setBlogs
}) => {
  const [newTitle, setNewTitle] = useState("")
  const [newAuthor, setNewAuthor] = useState("")
  const [newUrl, setNewUrl] = useState("")
  const handleTitleChange=({ target }) => setNewTitle(target.value)
  const handleAuthorChange=({ target }) => setNewAuthor(target.value)
  const handleUrlChange=({ target }) => setNewUrl(target.value)
  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
        setNewTitle("")
        setNewAuthor("")
        setNewUrl("")
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
      })
  }

  return(
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          author: <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input value={newUrl} onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )

}


export default BlogForm
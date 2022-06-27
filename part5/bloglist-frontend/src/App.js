import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"

function likesCompare(a,b) {
  return b.likes - a.likes
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs =>
        setBlogs( initialBlogs )
      )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    window.localStorage.clear()
    blogService.clearToken()
    setUser(null)
  }

  let blogList = blogs
  blogList.sort(likesCompare)

  return (
    <div>
      <Notification message={errorMessage} />
      {
        user === null ?
          <LoginForm
            user={user}
            setUser={setUser}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
          />   :
          <div>
            <h2>blogs</h2>
            <div>
              {user.name} logged in<button onClick={handleLogOut}>logout</button>
            </div>
            <br/>
            <Togglable buttonLabel='create new blog' buttonLabel2='cancel'>
              <BlogForm
                user={user}
                setUser={setUser}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                blogs={blogs}
                setBlogs={setBlogs}
              />
            </Togglable>
          </div>
      }
      {blogs.map(blog => {
        return(
          <Blog key={blog._id}
            blog={blog}
            setBlogs={setBlogs}
            blogs={blogs}
            user={user}
          />
        )
      })}
    </div>
  )
}

export default App

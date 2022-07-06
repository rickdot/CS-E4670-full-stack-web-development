import { useState, useEffect } from "react"
import blogService from "./services/blogs"

import Notification from "./components/Notification"
import LoginForm from "./components/LoginForm"
import BlogForm from "./components/BlogForm"
import Togglable from "./components/Togglable"
import BlogList from "./components/BlogList"
import {initializeBlogs} from "./reducers/blogReducer"
import { useSelector, useDispatch } from "react-redux";
import {setUserTo} from "./reducers/userReducer"

function likesCompare(a,b) {
  return b.likes - a.likes
}

const App = () => {
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  console.log(user);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps 


  

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    window.localStorage.clear()
    blogService.clearToken()
    setUser(null)
    // setUser(null)
  }



  return (
    <div>
      <Notification />
      {
        user === null ?
          <LoginForm
            user={user}
            setUser={setUser}
          />   :
          <div>
            <h2>blogs</h2>
            <div>
              {user.name} logged in<button onClick={handleLogOut}>logout</button>
            </div>
            <br/>
            <Togglable buttonLabel='create new blog' buttonLabel2='cancel'>
              <BlogForm
                user={user} setUser={setUser}
              />
            </Togglable>
          </div>
      }
      <BlogList user={user}/>
    </div>
  )
}

export default App

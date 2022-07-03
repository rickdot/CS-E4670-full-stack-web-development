import { useState } from "react"
import loginService from "../services/login"
import blogService from "../services/blogs"

const LoginForm = ({
  setUser,
  setErrorMessage
}) => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleUsernameChange = ({ target }) => setUsername(target.value)
  const handlePasswordChange= ({ target }) => setPassword(target.value)


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        "loggedBlogappUser", JSON.stringify(user)
      )
      setUsername("")
      setPassword("")
    } catch (exception) {
      setErrorMessage("wrong username or password")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return(
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </div>
  )
}

export default LoginForm
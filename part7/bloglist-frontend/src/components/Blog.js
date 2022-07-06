import { useState } from "react"
import blogService from "../services/blogs"

const Blog = ({ blog, setBlogs, blogs, user, toggleHandler, likeHandler }) => {
  const [detail, setDetail] = useState(false)

  const hideWhenVisible = { display: detail ? "none" : "" }
  const showWhenVisible = { display: detail ? "" : "none" }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  let toggleDetail = toggleHandler
  if(!toggleHandler){
    toggleDetail = () => {
      setDetail(!detail)
    }
  }

  let handleLike = likeHandler
  if(!handleLike){
    handleLike = async () => {
      const blogID = blog._id
      const newBlog = { ...blog, likes:blog.likes+1 }
      await blogService.update(newBlog, blog._id)
      const updatedBlog = { ...newBlog, blogID }

      setBlogs(blogs.map((tempBlog) => (blog._id === tempBlog._id ? updatedBlog : tempBlog)))
    }
  }


  const handleDelete = async () => {
    const blogID = blog._id
    const blogObject = blogs.find(blog => blog._id===blogID)

    if(window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
      await blogService.deleteBlog(blogID)
      setBlogs(blogs.filter((blog) => blog._id !== blogID))
    }
  }


  return(
    <div style={blogStyle} className="blog">
      {
        detail === false ?
          <div style={hideWhenVisible}>
            <div className="blogTitle">
              {blog.title}
            </div>
            <div className="blogAuthor">
              {blog.author} <button onClick={toggleDetail}>View</button>
            </div>
          </div>   :
          <div style={showWhenVisible}>
            <div className="blogTitle">
              Title: {blog.title} <button onClick={toggleDetail}>Hide</button> <br/>
            </div>
            <div className="blogUrl">
              Url: {blog.url} <br/>
            </div>
            <div className="blogLikes">
              Likes: {blog.likes} <button onClick={handleLike}>like</button> <br/>
            </div>
            <div className="blogAuthor">
              Author: {blog.author} <br/>
            </div>
            { user && user.username === blog.user.username ?
              <button onClick={handleDelete}>Delete</button> :
              null
            }
          </div>
      }
    </div>
  )
}

export default Blog




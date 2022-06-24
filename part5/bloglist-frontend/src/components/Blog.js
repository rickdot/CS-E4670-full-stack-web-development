import { useState } from 'react'


const Blog = ({blog}) =>{
  const [detail, setDetail] = useState(false)

  const hideWhenVisible = { display: detail ? 'none' : '' }
  const showWhenVisible = { display: detail ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetail = () => {
    setDetail(!detail)
  }
  // console.log('Blog rendered:');
  // console.log(`detail = ${detail}`);
  return(
    <div style={blogStyle}>
      {
        detail === false ?
        <div style={hideWhenVisible}>
          {blog.title} {blog.author} <button onClick={toggleDetail}>View</button>
        </div>   :
        <div style={showWhenVisible}>
          Title: {blog.title} <br/>
          Url: {blog.url} <br/>
          Likes: {blog.likes} <button>like</button> <br/>
          Author: {blog.author} <br/>
          <button onClick={toggleDetail}>Hide</button>
        </div> 
      }
    </div>
  )      
}  

export default Blog




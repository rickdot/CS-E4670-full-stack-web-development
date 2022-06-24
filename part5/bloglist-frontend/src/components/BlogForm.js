const BlogForm = ({
    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    Title,
    Author,
    Url
}) => (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title: <input value={Title} onChange={handleTitleChange} /> 
        </div>
        <div>
          author: <input value={Author} onChange={handleAuthorChange} />
        </div>
        <div>
          url: <input value={Url} onChange={handleUrlChange} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )


  export default BlogForm
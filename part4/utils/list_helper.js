const dummy = (blogs) => {
    return 1
}
  

const totalLikes = (blogs) => {
    const sum = blogs.reduce((accumulator, object) => {
        return accumulator + object.likes;
    }, 0);
    return sum
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0){
        return undefined
    }
    const maxLikes = Math.max(...blogs.map(o => o.likes))
    const favBlog = blogs.find(obj => { return obj.likes === maxLikes})
    const result = {
        title: favBlog.title,
        author: favBlog.author,
        likes: favBlog.likes
      }
    return result
}

const mostBlogs = (blogs) => {
    if(blogs.length === 0){
        return undefined
    }

    
}

const mostLikes = (blogs) => {
    return 1
}


module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}
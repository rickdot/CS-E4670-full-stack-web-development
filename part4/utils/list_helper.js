const _ = require("lodash");

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
    
    let reducedAuthors = _.reduce(blogs, function (result, blog) {
        (result[blog.author] || (result[blog.author] = [])).push(blog);
        return result;
    }, {});

    let maxNum = 0
    let author = undefined
    _.values(reducedAuthors).forEach(arr => {
        if (arr.length > maxNum){
            maxNum = arr.length
            author = arr[0].author
        }
    })

    return {
        author: author,
        blogs: maxNum
    }

}

const mostLikes = (blogs) => {
    if(blogs.length === 0){
        return undefined
    }
    
    let reducedAuthors = _.reduce(blogs, function (result, blog) {
        (result[blog.author] || (result[blog.author] = [])).push(blog);
        return result;
    }, {});

    let maxNum = 0
    let author = undefined
    _.values(reducedAuthors).forEach(arr => {
        const sum = arr.reduce((accumulator, object) => {
            return accumulator + object.likes;
        }, 0);

        if (sum > maxNum){
            maxNum = sum
            author = arr[0].author
        }
    })

    return {
        author: author,
        likes: maxNum
    }
}


module.exports = {
dummy,
totalLikes,
favoriteBlog,
mostBlogs,
mostLikes
}
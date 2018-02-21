const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else {
    let sum = 0;
    blogs.forEach(blog => {
      sum = sum + blog.likes

    });
    return sum;
  }
}

const favoriteBlog = (blogs) => {
  let max = 0;
  let bestBlog = null;
  blogs.forEach(blog => {
    if(blog.likes >= max){
      max = blog.likes;
      bestBlog = blog;
    }
  });
  return bestBlog;

}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
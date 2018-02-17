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

module.exports = {
  dummy,
  totalLikes
}
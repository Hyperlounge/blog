module.exports = (coll) => {
  const posts = [...coll.getFilteredByGlob('src/posts/galleries/*.md')];

  return posts.reverse();
};

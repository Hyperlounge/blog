module.exports = (coll) => {
  const posts = [...coll.getFilteredByGlob(['src/posts/*.md', 'src/posts/galleries/*.md'])];

  return posts.reverse();
};

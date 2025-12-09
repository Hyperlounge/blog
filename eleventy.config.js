const container = require('markdown-it-container');

module.exports = (config) => {
  config.addPassthroughCopy('src/assets/img/**/*.jpg');
  config.addPassthroughCopy({ 'src/posts/img/': 'assets/img/' });
  config.addPassthroughCopy({ 'src/posts/galleries/img/': 'assets/img/' });

  config.addWatchTarget("src/assets/js/");

  config.addLayoutAlias('default', 'layouts/default.njk');
  config.addLayoutAlias('post', 'layouts/post.njk');
  config.addLayoutAlias('gallery', 'layouts/gallery.njk');
  config.addLayoutAlias('page', 'layouts/page.njk');

  config.addFilter('readableDate', require('./lib/filters/readableDate'));
  config.addFilter('minifyJs', require('./lib/filters/minifyJs'));

  config.addTransform("convert-img-src", async function (content) {
    return content.replace(/src="img/g, 'src="../assets/img/');
  });
  config.addTransform('minifyHtml', require('./lib/transforms/minifyHtml'));

  config.addCollection('posts', require('./lib/collections/posts'));
  config.addCollection('galleries', require('./lib/collections/galleries'));
  config.addCollection('tagList', require('./lib/collections/tagList'));
  config.addCollection('pagedPosts', require('./lib/collections/pagedPosts'));
  config.addCollection('pagedGalleries', require('./lib/collections/pagedGalleries'));
  config.addCollection('pagedPostsByTag', require('./lib/collections/pagedPostsByTag'));

  config.amendLibrary("md", (mdLib) => mdLib.use(container, 'custom', {
    validate: function (params) {
      const param = params.trim().split(' ', 2)[0];
      return param === 'portrait' || param === 'square';
    },
    render(tokens, idx, _options, env, slf) {
      var param = tokens[idx].info.trim();
      if (tokens[idx].nesting === 1) {
        tokens[idx].attrJoin('class', param)
      }

      return slf.renderToken(tokens, idx, _options, env, slf)
    }
  }));

  return {
    dir: {
      input: 'src',
      output: 'dist'
    },
    // pathPrefix: "/subfolder/",
    templateFormats: ['md', 'njk', 'html'],
    dataTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};

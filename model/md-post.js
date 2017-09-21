const Post = function (params) {

  const defaults = {
    desc: 'No Description', // description
    url: '', // post image url
    like_count: 0, // total like
    comment_count: 0, // total comment
    post_id: null, // link to actual post
    profile_id: null, // profile id
    tags: []
  }

  const opts = Object.assign({}, defaults, params)

  const generateTagsFromHash = () => {
    const split = opts.desc.split(' ')
    const filterdDesc = [];
    const tags = split.filter((item) => {
      if (item[0] !== undefined && item[0] === '#') {
        return true;
      } else {
        filterdDesc.push(item);
      }
    }).map((item) => {
      return item.substring(1, item.length)
    });

    opts.tags = opts.tags.concat(tags)
    opts.desc = filterdDesc.join(' ')
  }

  generateTagsFromHash();

  return {
    desc: opts.desc,
    display: opts.url,
    like: opts.like_count,
    comment: opts.comment_count,
    profile: opts.profile_id,
    post: opts.post_id,
    tags: opts.tags
  }

}

module.exports = Post

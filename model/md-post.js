const Post = function (params) {

  const defaults = {
    desc: "No Description", // description
    url: "", // post image url
    like_count: 0, // total like
    comment_count: 0, // total comment
    post_id: null, // link to actual post
    profile_id: null // profile id
  }

  const opts = Object.assign({}, defaults, params)

  return {
    desc: opts.desc,
    display: opts.url,
    like: opts.like_count,
    comment: opts.comment_count,
    profile: opts.profile_id,
    post: opts.post_id
  }

}

module.exports = Post

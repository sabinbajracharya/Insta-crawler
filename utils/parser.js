module.exports.parseProfile = (json) => {
  const Profile = require('../model/md-profile')
  const user = json['user']

  const profile = Profile({
    id: user.id,
    full_name: user.full_name,
    biography: user.biography,
    external_url: user.external_url,
    followed_by: user.followed_by.count,
    follows: user.follows.count,
    is_verified: user.is_verified,
    profile_pic_url: user.profile_pic_url,
    profile_pic_hd_url: user.profile_pic_url_hd,
    username: user.username,
    total_posts: user.media.count
  })
  return profile
}

module.exports.parsePosts = (json, Posts = []) => {
  const Post = require('../model/md-post')
  const edges = json['data']['user']['edge_owner_to_timeline_media']['edges']
  for (let i = edges.length - 1; i >= 0; i--) {
    const edge = edges[i]

    if (!("node" in  edge)) continue

    const node = edge.node
    const desc = node['edge_media_to_caption']['edges'][0]

    if (desc === undefined) {
      // No description for the post
      console.log(node['edge_media_to_caption']['edges'])
      continue
    }

    const post = Post({
      name: json['name'], // full name
      username: json['username'], // profile username
      profile_display: json['profile_display'], // profile image
      desc: desc['node']['text'], // description
      url: node['display_url'], // post image url
      like_count: node['edge_media_preview_like']['count'], // total like
      comment_count: node['edge_media_to_comment']['count'], // total comment
      post_id: node['shortcode'], // link to actual post
      profile_id: node['owner']['id'], // profile id,
      timestamp: node['taken_at_timestamp']
    })

    Posts.push(post)
  }
  return Posts
}

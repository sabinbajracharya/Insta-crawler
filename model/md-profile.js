const Profile = function (params = {}) {

  const defaults = {
    id: null,
    full_name: 'No name',
    biography: 'No bio',
    external_url: '',
    followed_by: 0,
    follows: 0,
    is_verified: false,
    profile_pic_url: null,
    username: null
  }

  const opts = Object.assign({}, defaults, params)

  return {
    id: opts.id,
    name: opts.full_name,
    bio: opts.biography,
    display: opts.profile_pic_url,
    display_hd: opts.profile_pic_hd_url,
    followers: opts.followed_by,
    follows: opts.follows,
    username: opts.username,
    verifed: opts.is_verified,
    external_url: opts.external_url,
    total_posts: opts.total_posts
  }
}

module.exports = Profile

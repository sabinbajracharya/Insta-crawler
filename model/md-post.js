const Post = function (text = "No Text", display_url = null) {

  const _text = text
  const _display_url = display_url

  return {
    desc: _text,
    display: _display_url
  }

}

module.exports = Post

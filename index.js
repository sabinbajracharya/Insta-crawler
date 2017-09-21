const dotenv = require('dotenv').load();
const algolia = require('./algolia/algolia')
const request = require('request-promise')
const Post = require('./model/md-post')
const { insertMany } = require('./database/insert')

http({
  uri: 'https://www.instagram.com/graphql/query',
  qs: {
    query_id: '17888483320059182',
    variables: JSON.stringify({
      id: '1814752244',
      first: 1000
    })
  },
  json: true
})

async function http (options = {}) {
  const defaults = {
    method: 'GET',
    uri: 'http://www.google.com',
    resolveWithFullResponse: true
  }
  const opts = Object.assign({}, defaults, options)
  try {
    const res = await request(opts)
    const Posts = parse(res.body)
    insertMany(Posts)
  } catch (e) {
    console.log("Error::", e)
  }

}

function parse (json) {
  const Posts = []
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

    const post = Post(
      desc['node']['text'],
      node['display_url']
    )

    Posts.push(post)
  }

  return Posts
}

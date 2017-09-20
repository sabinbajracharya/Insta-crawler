const dotenv = require('dotenv').load();
const db = require('./database/firebase')
const algolia = require('./algolia/algolia')
const request = require('request-promise')
const Post = require('./model/md-post')

http({
  uri: 'https://www.instagram.com/graphql/query',
  qs: {
    query_id: '17888483320059182',
    variables: JSON.stringify({
      id: '1814752244',
      first: 2
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
  const res = await request(opts)
  parse(res.body)
}

function parse (json) {
  const Posts = []
  const list = json['data']['user']['edge_owner_to_timeline_media']['edges']

  for (let i = list.length - 1; i >= 0; i--) {
    const node = list[i].node
    const post = Post(
      node['edge_media_to_caption']['edges'][0]['node']['text'],
      node['display_url']
    )
    console.log('sabinpost', post)
    Posts.push(post)
  }
}

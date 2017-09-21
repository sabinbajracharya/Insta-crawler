const dotenv = require('dotenv').load();
const request = require('request-promise')

const { parseProfile, parsePosts } = require('./utils/parser')
const { insertMany, insertOne } = require('./database/insert')
const { insertObjects } = require('./algolia/insert')

const USERNAME = 'customrus'
const URL_PROFILE = `https://www.instagram.com/${USERNAME}/?__a=1`
const URL_POSTS = 'https://www.instagram.com/graphql/query';


+async function(profileUrl, postsUrl) {
  try {
    const resProfile = await http({
      uri: URL_PROFILE,
      json: true
    })
    const Profile = await insertOne(parseProfile(resProfile))
    const resPosts = await http({
      uri: 'https://www.instagram.com/graphql/query',
      qs: {
        query_id: '17888483320059182',
        variables: JSON.stringify({
          id: '1814752244',
          first: 100
        })
      },
      json: true
    })
    resPosts['name'] = Profile.name
    resPosts['username'] = Profile.username
    resPosts['profile_display'] = Profile.display

    const Posts = parsePosts(resPosts)
    const postWithObjectIDs = await insertMany(Posts)
    const alogliaResult = await insertObjects(postWithObjectIDs)
  } catch (e) {
    console.log("Error::", e)
  }
}(URL_PROFILE, URL_POSTS);

async function http (options = {}) {
  const defaults = {
    method: 'GET',
    uri: 'http://www.google.com',
    resolveWithFullResponse: true
  }
  const opts = Object.assign({}, defaults, options)
  try {
    const res = await request(opts)
    return res.body
  } catch (e) {
    console.log("Error::", e)
  }
}

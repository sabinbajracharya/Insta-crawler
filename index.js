const dotenv = require('dotenv').load();
const request = require('request-promise')

const { parseProfile, parsePosts } = require('./utils/parser')
const { bulkUpdate, insertOne } = require('./database/insert')
const { insertObjects } = require('./algolia/insert')

const USERNAME = 'moonbao.np'

const URL_PROFILE = `https://www.instagram.com/${USERNAME}/?__a=1`
const URL_POSTS = 'https://www.instagram.com/graphql/query';
const rateLimit = 100

+async function(profileUrl, postsUrl) {
  try {
    const resProfile = await http({
      uri: URL_PROFILE,
      json: true
    })
    const Profile = await insertOne(parseProfile(resProfile))
    let hasNext = false

    const query = {
      query_id: '17888483320059182',
      variables: JSON.stringify({
        id: Profile.id,
        first: 100
      })
    }
    let postWithObjectIDs = []
    // let diffDays = 0
    do {
      console.log('Next Query', query)
      const resPosts = await http({
        uri: URL_POSTS,
        qs: query,
        json: true
      })
      resPosts['name'] = Profile.name
      resPosts['username'] = Profile.username
      resPosts['profile_display'] = Profile.display

      const Posts = parsePosts(resPosts)
      postWithObjectIDs = postWithObjectIDs.concat(await bulkUpdate(Posts))

      const pageInfo = resPosts['data']['user']['edge_owner_to_timeline_media']['page_info']
      hasNext = pageInfo['has_next_page']

      const nextQuery = Function(`return ${query.variables}`)()
      nextQuery.after = pageInfo['end_cursor']
      query.variables = JSON.stringify(nextQuery)

      // const timeDiff = Math.abs(Date.now() - Posts[0]['timestamp'] * 1000);
      // diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
      // console.log('Difference in days:: ', diffDays)
    } while (hasNext && postWithObjectIDs.length <= rateLimit)
    const alogliaResult = await insertObjects(postWithObjectIDs)
  } catch (e) {
    console.log("Error::", e)
  }
}(URL_PROFILE, URL_POSTS);

async function http (options = {}) {
  const defaults = {
    method: 'GET',
    uri: 'http://www.google.com',
    headers: {
      'Connection': 'close'
    },
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

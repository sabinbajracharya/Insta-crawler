const algoliasearch = require('algoliasearch')

const algolia = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
)

module.exports = algolia

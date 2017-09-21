const algolia = require('./algolia');

module.exports.insertObjects = async function (data) {

  const index = algolia.initIndex('PRODUCT');

  index.setSettings({
    searchableAttributes: [
      'name',
      'unordered(desc)',
      'tags'
    ],
    optionalWords: [
      'word1',
      'word2 word3 word4'
    ],
    customRanking: [
      'desc(like)',
      'desc(comment)'
    ]
  });

  const output = await index.saveObjects(data)
  console.log('### Aloglia ###')
  console.log(output)
}


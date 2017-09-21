const db = require('./firebase')

module.exports.insertMany = async function (data) {
  const postsRef = db.ref('data')

  for (let i = data.length - 1; i >= 0; i--) {
    const result = await postsRef.push(data[i])
    data[i]["objectID"] = result.key
    console.log('index', result.key)
  }
  return data //data returned with firebase key attached
}

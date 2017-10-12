const db = require('./firebase')

module.exports.insertMany = async function (data) {
  const postsRef = db.ref('data')

  for (let i = data.length - 1; i >= 0; i--) {
    const result = await postsRef.push(data[i])
    data[i]['objectID"'] = result.key
    console.log('index', result.key)
  }
  return data //data returned with firebase key attached
}

module.exports.insertOne = async function (data) {
  const postsRef = db.ref(`profile/${data.id}`)

  try {
    const result = await postsRef.set(data)
    console.log('profile_key', 'Synchronization succeeded')
  } catch (e) {
    console.log('Synchronization failed')
  }

  return data
}

module.exports.bulkUpdate = async function (data) {
  const postsRef = db.ref('data')
  const batch = {}
  Object.keys(data).forEach((key) => {
    const pushId = postsRef.push().key
    const itemValue = data[key]
    batch[pushId] = itemValue
  })

  const result = await postsRef.update(batch)
  if(result === undefined || result === null) {
    const objects = []
    Object.keys(batch).forEach((key) => {
      const itemValue = batch[key]
      itemValue['objectID'] = key
      objects.push(itemValue)
    })
    return objects
  } else {
    // if the result is not null then it is an error
    return []
  }
}

const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

exports.handler = async function (event, context) {
  let payload = JSON.parse(event.body)
  let response = {};

  if (!payload.story) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errorMessage: 'Cannot save an empty story' })
    }
  }

  await client.connect()
  await client.query(
    'INSERT INTO storymoji_submissions (prompt, story) VALUES ($1, $2)', [payload['prompt'], payload['story']])
    .then(res => {
      response['statusCode'] = res.rowCount ? 200 : 400
    })
    .catch(e => {
      console.log(e)
      if (e['constraint'] === 'no_reposts'){
        response['body'] = JSON.stringify({ errorMessage: 'Cannot save duplicate submission' });
      }
      response['statusCode'] = 400
    })
  await client.end()
  return response
}

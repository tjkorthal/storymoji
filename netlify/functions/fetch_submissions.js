const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

exports.handler = async function (event, context) {
  let prompt = event.queryStringParameters.prompt;
  let response = {};

  await client.connect()
  await client.query(
    'SELECT story, id FROM storymoji_submissions WHERE prompt = $1', [prompt])
    .then(res => {
      response['statusCode'] = res.rowCount ? 200 : 400,
      response['body'] = JSON.stringify({ submissions: res.rows })
    })
    .catch(e => {
      console.log(e)
      response['statusCode'] = 400
    })
  await client.end()
  return response
}

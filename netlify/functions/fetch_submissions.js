const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

exports.handler = async function (event, context) {
  let prompt = event.queryStringParameters.prompt;
  let response = {};

  await pool.query(
    'SELECT story, id FROM storymoji_submissions WHERE prompt = $1', [prompt])
    .then(res => {
      response['statusCode'] = res.rowCount ? 200 : 400,
      response['body'] = JSON.stringify({ submissions: res.rows })
    })
    .catch(e => {
      console.log(e)
      response['statusCode'] = 400
    })
  return response
}

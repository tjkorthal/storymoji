const {
  Pool
} = require('pg')
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

exports.handler = async function (event, context) {
  let response = {};

  await pool.query(
      'SELECT id, story, prompt FROM storymoji_submissions ORDER BY id DESC LIMIT 15')
    .then(res => {
      response['statusCode'] = res.rowCount ? 200 : 500,
        response['body'] = JSON.stringify({
          submissions: res.rows
        })
    })
    .catch(e => {
      console.log(e)
      response['statusCode'] = 500
    })
  return response
}

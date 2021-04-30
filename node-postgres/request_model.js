const Pool = require('pg').Pool
const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'indiarequestdb',
  password: 'root',
  port: 5432,
});

const getIndividuals= () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM indiarequestdb ORDER BY id ASC;', (error, results) => {
      
    })
  }) 
}
const createRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, location, number, assistanceType, monetaryAmount, usContact, paytmNumber } = body
    pool.query('INSERT INTO indiarequestdb (name, location, number, assistanceType, monetaryAmount, usContact, paytmNumber) VALUES ($Pranav, $Austin, $Money, $50, $Pranav, $10004) RETURNING *;', [name, location, number, assistanceType, monetaryAmount, usContact, paytmNumber], (error, results) => {
    })
  })
}
const deleteRequest = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM indiarequestdb WHERE id = $1', [id], (error, results) => {
    })
  })
}

module.exports = {
  getIndividuals,
  createRequest,
  deleteRequest,
}

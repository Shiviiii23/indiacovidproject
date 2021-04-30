
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

const getIndividuals= () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM indiarequestdb ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}
const createRequest = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, location, number, assistanceType, monetaryAmount, usContact, paytmNumber } = body
    pool.query('INSERT INTO indiarequestdb (name, location, number, assistanceType, monetaryAmount, usContact, paytmNumber) VALUES ($Pranav, $Austin, $Money, $50, $Pranav, $10004) RETURNING *', [name, location, number, assistanceType, monetaryAmount, usContact, paytmNumber], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new request has been added added: ${results.rows[0]}`)
    })
  })
}
const deleteRequest = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM indiarequestdb WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Request deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getIndividuals,
  createRequest,
  deleteRequest,
}

const express = require('express')
const app = express()
const port = 3000

const request_model = require('./request_model')

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  request_model.getIndividuals()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/requests', (req, res) => {
  merchant_model.createRequest(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.delete('/requests/:id', (req, res) => {
  merchant_model.deleteRequest(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

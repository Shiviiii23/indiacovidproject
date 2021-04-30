const Pool = require('pg').Pool
const pool = new Pool({
  host: 'localhost',
  database: 'indiarequestdb',
  port: 5432,
});

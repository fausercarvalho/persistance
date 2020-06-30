const Pool = require('pg').Pool
const pool = new Pool({
  user: 'gmdb_app',    
  host: 'localhost',
  database: 'students',
  password: '123',
  port: 5433,
})

module.exports = pool;
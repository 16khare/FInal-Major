// test-db.js
const db = require('./db');

db.query('SELECT 1', (err, results) => {
  if (err) {
    console.error('Query failed:', err.message);
  } else {
    console.log('Test query result:', results);
  }
  db.end(); // Close connection
});

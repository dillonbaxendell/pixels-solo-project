const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/total', (req, res) => {
  // GET route code here
  const queryText = `SELECT count(mood), mood
  FROM reflection
  GROUP BY "mood"
  ORDER BY mood ASC;`

  pool.query(queryText)
  .then( result => {
      res.send(result.rows);
  })
  .catch( error => {
      console.log('Error in GET mood total', error);
  })
});


/**
 * GET route template
 */
 router.get('/today', (req, res) => {
    // GET route code here
    const queryText = `SELECT mood, id
    FROM reflection
    WHERE "reflection".time = 'today'
    ORDER BY id ASC;`
  
    pool.query(queryText)
    .then( result => {
        res.send(result.rows);
    })
    .catch( error => {
        console.log('Error in GET mood total', error);
    })
  });

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
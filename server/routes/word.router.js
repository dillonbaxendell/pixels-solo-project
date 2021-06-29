const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  const queryText = `SELECT * FROM "word";`;

  pool.query(queryText)
  .then( result => {
      res.send(result.rows);
  })
  .catch( error => {
      console.log('Error in GET word.router.js', error);
  })
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  const newWord = req.body.word_name;
  console.log('newWord is :', newWord);

  const queryText = `INSERT INTO "word" ("word_name") VALUES ($1);`;

  pool.query(queryText, [newWord])
  .then( () => {
      res.sendStatus(201);
  })
  .catch( error => {
      console.log('Error in postWord', error);
  })
});

module.exports = router;
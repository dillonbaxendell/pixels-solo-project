const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * POST route template
 */
router.post('/overview', (req, res) => {
  // GET route code here
  console.log('req.body', req.body)
  const targetDate = req.body.targetDate
  console.log('targetDate is: ', targetDate);
  const queryText =  `SELECT "reflection".id, "reflection".mood, "reflection".time, "activity".activity_name, "word".word_name
  FROM "user"
  JOIN "reflection"
  ON "reflection".user_id = "user".id
  JOIN "reflection_activity" 
  ON "reflection".id = "reflection_activity".reflection_id
  JOIN "activity"
  ON "reflection_activity".activity_id = "activity".id
  JOIN "reflection_word"
  ON "reflection".id = "reflection_word".reflection_id
  JOIN "word"
  ON "reflection_word".word_id = "word".id
  WHERE ("user".id = 2) AND "reflection".time = $1;`

  pool.query(queryText, [targetDate])
  .then( result => {
    res.send(result.rows);
  })
  .catch( error => {
    console.log('Error in GET today in reflection router', error);
  })
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
  // POST route code here
  console.log('req.body:', req.body);

  const userID = req.body.user_id;
  const mood = req.body.mood;
  const wordAssociations = req.body.word_assoc;
  console.log(wordAssociations);
  const activityAssociations = req.body.activity_assoc;
  const relationshipAssociations = req.body.relation_assoc;

  const connection = await pool.connect()
  try {
      await connection.query('BEGIN');
      const sqlAddReflection = `INSERT INTO "reflection" ("user_id", "time", "mood") VALUES ($1, $2, $3) RETURNING id;`;

      //Save the result so we can get the returned value
      const result = await connection.query( sqlAddReflection, [userID, 'today', mood])
      //Get the id from the result - will have 1 row with the id
      const reflectionID = result.rows[0].id;
      console.log('reflectionID is:', reflectionID);
          
        const sqlAddWord = `INSERT INTO "reflection_word" ("word_id", "reflection_id") VALUES ($1, $2);`;

        for (let i = 0; i < wordAssociations.length; i++) {
            console.log(wordAssociations[i].id);

            await connection.query( sqlAddWord, [wordAssociations[i].id, reflectionID]);  
          }

        const sqlAddActivity = `INSERT INTO "reflection_activity" ("activity_id", "reflection_id") VALUES ($1, $2);`;

        for (let i = 0; i < activityAssociations.length; i++) {
            console.log(activityAssociations[i].id);

            await connection.query( sqlAddActivity, [activityAssociations[i].id, reflectionID]);  
          }

        const sqlAddRelationship = `INSERT INTO "reflection_relationship" ("relationship_id", "reflection_id") VALUES ($1, $2);`

        for (let i = 0; i < relationshipAssociations.length; i++) {
            console.log(relationshipAssociations[i].id);

            await connection.query( sqlAddRelationship, [relationshipAssociations[i].id, reflectionID]);  
          }

          await connection.query('COMMIT');
          res.sendStatus(200);


  } catch ( error ) {
    await connection.query('ROLLBACK');
    console.log(`Transaction Error - Rolling back new reflection`, error);
    res.sendStatus(500); 
  } finally {
    connection.release()
  }
});

module.exports = router;
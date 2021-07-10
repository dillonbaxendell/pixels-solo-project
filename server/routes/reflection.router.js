const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


/**
 * POST route (acts as a GET request)
 * This grabs the reflections from the date selected with the date picker
 */
router.post("/date/:id", (req, res) => {
  //POST route code here
  console.log("req.body in date POST:", req.body);

  const userID = req.params.id;
  const queryText = `SELECT "reflection".id, "reflection".mood, "reflection".time, 
  "activity".activity_name, "word".word_name, "relationship".name, 
  "relationship".relationship_to_user, "activity".id AS "activity_id", "word".id AS "word_id", 
  "relationship".id AS "relationship_id"
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
  JOIN "reflection_relationship"
  ON "reflection".id = "reflection_relationship".reflection_id
  JOIN "relationship"
  ON "reflection_relationship".relationship_id = "relationship".id
  WHERE ("user".id = $1) AND "reflection".time = $2
 ;`

  pool.query(queryText, [userID, req.body.date])
    .then((result) => {
      console.log("result.rows in /date: ", result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in POST date in reflection router", error);
    })
})

/**
 * POST route
 * uses async/await to submit the new reflection
 * inserts into junction tables and reflection table
 */
router.post("/", async (req, res) => {
  // POST route code here
  console.log("req.body:", req.body);
  
  const userID = req.body.user_id;
  console.log('USER ID IS THIS', userID);
  const mood = req.body.mood;
  console.log("MOOD IS THIS", mood);
  const wordAssociations = req.body.word_assoc;
  console.log(wordAssociations);
  const activityAssociations = req.body.activity_assoc;
  const relationshipAssociations = req.body.relation_assoc;
  const moodImg = req.body.mood_img

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const sqlAddReflection = `INSERT INTO "reflection" ("user_id", "time", "mood", "mood_img") VALUES ($1, $2, $3, $4) RETURNING id;`;

    //Save the result so we can get the returned value
    const result = await connection.query(sqlAddReflection, [
      userID,
      "today",
      mood,
      moodImg
    ]);
    //Get the id from the result - will have 1 row with the id
    const reflectionID = result.rows[0].id;
    console.log("reflectionID is:", reflectionID);

    const sqlAddWord = `INSERT INTO "reflection_word" ("word_id", "reflection_id") VALUES ($1, $2);`;

      console.log("wordID:", wordAssociations.id);

    await connection.query(sqlAddWord, [
        wordAssociations.id,
        reflectionID,
      ]);
    

    const sqlAddActivity = `INSERT INTO "reflection_activity" ("activity_id", "reflection_id") VALUES ($1, $2);`;


      console.log('activity associations in router', activityAssociations.id);

      await connection.query(sqlAddActivity, [
        activityAssociations.id,
        reflectionID,
      ]);
  

    const sqlAddRelationship = `INSERT INTO "reflection_relationship" ("relationship_id", "reflection_id") VALUES ($1, $2);`;

      console.log(relationshipAssociations.id);

      await connection.query(sqlAddRelationship, [
        relationshipAssociations.id,
        reflectionID,
      ]);
    

    await connection.query("COMMIT");

    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back new reflection`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

/**
 * PUT route
 * update the id from Edit Form
 */
router.put("/:id", async (req, res) => {
  console.log("req.body, req.params in PUT: ", req.body, req.params.id);

  //sparse the object out in separate variables:
  const reflectionID = req.body.id;
  const activityID = req.body.activity_id;
  const wordID = req.body.word_id;
  const relationshipID = req.body.relationship_id;
  const moodValue = req.body.mood;


  //Now complete the PUT request
  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const sqlUpdateReflection = `UPDATE "reflection"
    SET "mood" = $1 WHERE "id" = $2;`;

    await connection.query(sqlUpdateReflection, [moodValue, reflectionID]);

    const sqlUpdateActivity = `UPDATE "reflection_activity"
    SET "activity_id" = $1 WHERE "reflection_id" = $2;`

    await connection.query(sqlUpdateActivity, [activityID, reflectionID]);

    const sqlUpdateWord = `UPDATE "reflection_word"
    SET "word_id" = $1 WHERE "reflection_id" = $2;`;

    await connection.query(sqlUpdateWord, [wordID, reflectionID]);

    const sqlUpdateRelationship = `UPDATE "reflection_relationship"
    SET "relationship_id" = $1 WHERE "reflection_id" = $2;`;

    await connection.query(sqlUpdateRelationship, [relationshipID, reflectionID]);

    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back edit reflection`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
});

/**
 * DELETE route
 * deletes the reflection chosen to delete by the user
 */
router.delete("/:id", async (req, res) => {

  const reflectionID = req.params.id
  console.log('req.body in DELETE (router)', req.params);
  console.log('reflectionID in DELETE (router):', reflectionID);

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");

    const sqlDeleteActivity = `DELETE FROM "reflection_activity" 
    WHERE "reflection_activity".reflection_id = $1;`;

    await connection.query(sqlDeleteActivity, [reflectionID]);

    const sqlDeleteRelationship = `DELETE FROM "reflection_relationship"
    WHERE "reflection_relationship".reflection_id = $1;`;

    await connection.query(sqlDeleteRelationship, [reflectionID]);

    const sqlDeleteWord = `DELETE FROM "reflection_word"
    WHERE "reflection_word".reflection_id = $1;`;

    await connection.query(sqlDeleteWord, [reflectionID]);

    const sqlDeleteReflection = `DELETE FROM "reflection"
    WHERE "reflection".id = $1;`;

    await connection.query(sqlDeleteReflection, [reflectionID]);

    await connection.query("COMMIT");
    res.sendStatus(200);
  } catch (error) {
    await connection.query("ROLLBACK");
    console.log(`Transaction Error - Rolling back DELETE reflection`, error);
    res.sendStatus(500);
  } finally {
    connection.release();
  }
})

module.exports = router;

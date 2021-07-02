const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

/**
 * POST route
 */
router.post("/overview", (req, res) => {
  // GET route code here
  console.log("req.body", req.body);
  const targetDate = req.body.targetDate;
  const userID = req.body.user_id;
  console.log("targetDate is: ", targetDate, req.body.user_id);
  const queryText = ` SELECT "reflection".id, "reflection".mood, "reflection".time, 
  "activity".activity_name, "word".word_name, "relationship".name, 
  "relationship".relationship_to_user, "activity".id AS "activity_id", "word".id AS "word_id", 
  "relationship".id AS "relationship_id"
  FROM "user"
  JOIN "relationship"
  ON "user".id = "relationship".user_id
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
  WHERE ("user".id = $1) AND "reflection".time = $2
 ;`;

  pool.query(queryText, [userID, targetDate])
    .then((result) => {
      console.log("what is result.rows?", result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error in GET today in reflection router", error);
    });
});

/**
 * POST route
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

  const connection = await pool.connect();
  try {
    await connection.query("BEGIN");
    const sqlAddReflection = `INSERT INTO "reflection" ("user_id", "time", "mood") VALUES ($1, $2, $3) RETURNING id;`;

    //Save the result so we can get the returned value
    const result = await connection.query(sqlAddReflection, [
      userID,
      "today",
      mood,
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
 */
router.put("/:id", async (req, res) => {
  console.log("req.body, req.params in PUT: ", req.body, req.params.id);

  //sparse the object out in separate variables:
  const reflectionID = req.body.id;
  const activityID = req.body.activity_id;
  const wordID = req.body.word_id;
  const relationshipID = req.body.relationship_id;

  const activityName = req.body.activity_name;
  const moodValue = req.body.mood;
  const relationshipName = req.body.name;
  const relationshipToUser = req.body.relationship_to_user;
  const wordName = req.body.word_name;

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

module.exports = router;

var express = require('express');
var router = express.Router();

var db = require('../db/db_utility.js')

/* GET list of player characters */
router.get('/chars', function(req, res, next) {
  db.query('SELECT PERSONA_NAME FROM PERSONAS WHERE USERNAME = $1', [req.session.user]).then(data => {
    res.status(200).json({body: { characterList: data }})
  }).catch(error => {
    console.log('ERROR: ', error);
    res.status(500).send("Contact Admin(s)");
  })
});

/* GET details of a specific player character */
router.get('/persona', function(req, res, next) {
  if (!req.query.characterName) {
    res.status(400).send("Invalid Token")
  }
  db.query('SELECT * FROM PERSONAS WHERE USERNAME = $1 AND PERSONA_NAME = $2', [req.session.user, req.query.characterName]).then(data => {
    res.status(200).json({body: { characterList: data }})
  }).catch(error => {
    console.log('ERROR: ', error);
    res.status(500).send("Contact Admin(s)");
  })
});

/* POST a new player character */
router.get('/persona', function(req, res, next) {
  var persona_id;

  if (!req.body.persona_name) {
    res.status(400).send("Missing element(s)");
  }
  else {
    let username = req.session.user;


    db.query('SELECT * FROM PERSONAS WHERE USERNAME = $1 AND PERSONA_NAME = $2', [username, persona_name]).then(data => {
      if (data[0]) {
        res.status(400).send("Character with Name \"" + persona_name + "\" Already Exists");
      }
      else {
        db.query('SELECT MAX(ID) FROM PERSONAS').then(results => {
          if (!results[0]) {
            persona_id = 1;
          }
          else {
            persona_id = results[0].max + 1;
          }

          // save file to local directory resources

          let newPersonaArray = [
            persona_id,
            username,
            req.body.persona_name,
            false,
            6, //double check the stress system
            null, //players don't get superb to start
            req.body.great_skill,
            req.body.good_skill_1,
            req.body.good_skill_2,
            req.body.fair_skill_1,
            req.body.fair_skill_2,
            req.body.fair_skill_3,
            req.body.average_skill_1,
            req.body.average_skill_2,
            req.body.average_skill_3,
            req.body.average_skill_4,
            //ATTACHMENT_NAME
            //ATTACHMENT_LOCATION
            req.body.notes,
            req.body.inventory
          ]

          db.query('INSERT INTO PERSONAS (PERSONA_ID, USERNAME, PERSONA_NAME, NPC_FLAG, HEALTH, SUPERB_SKILL, GREAT_SKILL, GOOD_SKILL_1, GOOD_SKILL_2, FAIR_SKILL_1, FAIR_SKILL_2, FAIR_SKILL_3, AVERAGE_SKILL_1, AVERAGE_SKILL_2, AVERAGE_SKILL_3, AVERAGE_SKILL_4, ATTACHMENT_NAME, ATTACHMENT_LOCATION, NOTES, INVENTORY) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12, $13, $14, $15, $16, $17, $18, 19)', newPersonaArray).then(results => {
            res.status(201).json({body:{result:"Character Successfully Created"}})
          }).catch(error => {
            console.log('ERROR: ', error);
            res.status(400).send("Bad Request");
          })
        }).catch(error => {
          console.log('ERROR: ', error);
          res.status(500).send("Issue Connecting to Database");
        })
      }
    }).catch(error => {
      console.log('ERROR: ', error);
      res.status(500).send("Issue Connecting to Database");
    })
  }


  db.query('SELECT * FROM PERSONAS WHERE USERNAME = $1 AND PERSONA_NAME = $2', [req.session.user, req.query.characterName]).then(data => {
    res.status(200).json({body: { characterList: data }})
  }).catch(error => {
    console.log('ERROR: ', error);
    res.status(500).send("Contact Admin(s)");
  })
});

module.exports = router;

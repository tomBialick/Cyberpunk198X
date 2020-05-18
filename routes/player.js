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
          if (req.files && req.files.length > 0) {
            let fileObj = req.files.file;
            let fileName = fileObj.name;

            fileObj.mv('./resources/' + fileName, function(err) {
              if (err) {
                console.log(err)
                res.status(500).send("Internal Error Storing File");
              }
              else {
                // Add aspects
                let newPersonaArray = [
                  persona_id,
                  username,
                  req.body.persona_name,
                  false,
                  req.body.consequence_mild
                  req.body.consequence_moderate
                  req.body.consequence_severe
                  req.body.physical_stress_1
                  req.body.physical_stress_2
                  req.body.physical_stress_3
                  req.body.physical_stress_4
                  req.body.mental_stress_1
                  req.body.mental_stress_2
                  req.body.mental_stress_3
                  req.body.mental_stress_4
                  req.body.high_concept,
                  req.body.trouble,
                  req.body.aspect_1,
                  req.body.aspect_2,
                  req.body.aspect_3,
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
                  req.files.file.name
                  './resources/' + req.files.file.name
                  req.body.notes,
                  req.body.inventory
                ]

                db.query('INSERT INTO PERSONAS (PERSONA_ID, USERNAME, PERSONA_NAME, NPC_FLAG, CONSEQUENCE_MILD, CONSEQUENCE_MODERATE, CONSEQUENCE_SEVERE, PHYSICAL_STRESS_1, PHYSICAL_STRESS_2, PHYSICAL_STRESS_3, PHYSICAL_STRESS_4, MENTAL_STRESS_1, MENTAL_STRESS_2, MENTAL_STRESS_3, MENTAL_STRESS_4, HIGH_CONCEPT, TROUBLE, ASPECT_1, ASPECT_2, ASPECT_3, SUPERB_SKILL, GREAT_SKILL, GOOD_SKILL_1, GOOD_SKILL_2, FAIR_SKILL_1, FAIR_SKILL_2, FAIR_SKILL_3, AVERAGE_SKILL_1, AVERAGE_SKILL_2, AVERAGE_SKILL_3, AVERAGE_SKILL_4, ATTACHMENT_NAME, ATTACHMENT_LOCATION, NOTES, INVENTORY) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $22, $23, $24, $25, $26, $27, $28, $29, $20, $21, $22, $22, $23, $24, $25)', newPersonaArray).then(results => {
                  res.status(201).send("Character Successfully Created")
                }).catch(error => {
                  console.log('ERROR: ', error);
                  res.status(400).send("Bad Request");
                })
              }
            })
          }
          else {
            let newPersonaArray = [
              persona_id,
              username,
              req.body.persona_name,
              false,
              6, //double check the stress system
              req.body.high_concept,
              req.body.trouble,
              req.body.aspect_1,
              req.body.aspect_2,
              req.body.aspect_3,
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
              null,
              null,
              req.body.notes,
              req.body.inventory
            ]

            db.query('INSERT INTO PERSONAS (PERSONA_ID, USERNAME, PERSONA_NAME, NPC_FLAG, HEALTH, HIGH_CONCEPT, TROUBLE, ASPECT_1, ASPECT_2, ASPECT_3, SUPERB_SKILL, GREAT_SKILL, GOOD_SKILL_1, GOOD_SKILL_2, FAIR_SKILL_1, FAIR_SKILL_2, FAIR_SKILL_3, AVERAGE_SKILL_1, AVERAGE_SKILL_2, AVERAGE_SKILL_3, AVERAGE_SKILL_4, ATTACHMENT_NAME, ATTACHMENT_LOCATION, NOTES, INVENTORY) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12, $13, $14, $15, $16, $17, $18, 19)', newPersonaArray).then(results => {
              res.status(201).json("Character Successfully Created")
            }).catch(error => {
              console.log('ERROR: ', error);
              res.status(400).send("Bad Request");
            })
          }
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
});

/* GET list of player characters */
router.get('/skills', function(req, res, next) {
    res.status(200).json({body: [
      {
        name: "Athletics",
        desc: "The Athletics skill represents your character’s general level of physical fitness. Think agility. Pretty useful if you want to be an action hero",
        overcome: "Overcome any obstacle that requires physical movement. Also used for on foot chases",
        advantage: "Jumping to high ground, running faster than the opponent can keep up with, or performing dazzling acrobatic maneuvers in order to confound your foes",
        attack: "Does not help attack",
        defend: "Catchall skill to roll for defense in a physical conflict, against closequarters and ranged attacks. You can also use it to defend against characters trying to move past you, if you’re in a position to physically interfere with whoever’s making the attempt.",
        stunts: [
          {
            name: "Sprinter",
            desc: "You move two zones for free in a conflict without rolling, instead of one, provided there are no situation aspects restricting movement."
          },
          {
            name: "Hardcore Parkour",
            desc: "+2 to overcome actions with Athletics if you are in a chase across rooftops or a similarly precarious environment."
          },
          {
            name: "Dazing Counter",
            desc: "When you succeed with style on a defend action against an opponent’s Fight roll, you automatically counter with some sort of nerve punch or stunning blow. You get to attach the Dazed situation aspect to your opponent with a free invoke, instead of just a boost"
          }]
      },

      {
        name: "Burglary",
        desc: "The Burglary skill covers your character’s aptitude for stealing things and getting into places that are off-limits",
        overcome: "Burglary allows you to overcome any obstacle related to theft or infiltration. Bypassing locks and traps, pickpocketing and filching, covering your tracks, and other such activities all fall under the purview of this skill.",
        advantage: "Case a location with Burglary, to determine how hard it will be to break into and what kind of security you’re dealing with, as well as discover any vulnerabilities you might exploit. You can also examine the work of other burglars to determine how a particular heist was done, and create or discover aspects related to whatever evidence they may have left behind",
        attack: "Does not help attack",
        defend: "Does not help defense",
        stunts: [
          {
            name: "Always a Way Out",
            desc: "+2 on Burglary rolls made to create an advantage whenever you’re trying to escape from a location."
          },
          {
            name: "Security Specialist",
            desc: "You don’t have to be present to provide active opposition to someone trying to overcome security measures you put in place or worked on. (Normally, a character would roll against passive opposition for that.)"
          },
          {
            name: "Talk the Talk",
            desc: "You can use Burglary in place of Contacts whenever you’re dealing specifically with other thieves and burglars."
          }
        ]
      },
      {
        name: "Contacts",
        desc: "The skill of knowing and making connections with people. It presumes proficiency with all means of networking available in the setting.",
        overcome: "Overcome any obstacle related to finding someone you need to find. Whether that’s old-fashioned \"man on the street\" type of work, polling your information network, or searching archives and computer databases, you’re able to hunt down people or somehow get access to them.",
        advantage: "allows you to know who the perfect person to talk to is for anything you might need, or to decide that you know the perfect person already. It’s likely that you’ll create story details with this skill, represented by aspects. You can also create an advantage that represents what the word on the street is about a particular individual, object, or location, based on what your contacts tell you. These aspects almost always deal with reputation more than fact, such as Known as a Mean Guy or Notorious Swindler. Whether that person lives up to their reputation is anybody’s guess, though that doesn’t invalidate the aspect—people often have misleading reputations that complicate their lives. Contacts could also be used to create aspects that represent using your information network to plant or acquire information.",
        attack: "Does not help attack",
        defend: "Can be used to defend against people creating social advantages against you, provided your information network can be brought to bear in the situation. You might also use it to keep someone from using Deceive or Contacts to go \"off the grid\", or to interfere with Investigate attempts to find you.",
        stunts: [
          {
            name: "Ear to the Ground",
            desc: "Whenever someone initiates a conflict against you in an area where you’ve built a network of contacts, you use Contacts instead of Notice to determine turn order, because you got tipped off in time."
          },
          {
            name: "Rumormonger",
            desc: "+2 to create an advantage when you plant vicious rumors about someone else."
          },
          {
            name: "The Weight of Reputation",
            desc: "You can use Contacts instead of Provoke to create advantages based on the fear generated by the sinister reputation you’ve cultivated for yourself and all the shady associates you have. You should have an appropriate aspect to pair with this stunt."
          }
        ]
      },
      {
        name: "Computers",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "Unless you are fighting a giant robot while trying to control it with a remote or terminal, this won't help attack",
        defend: "Unless you are inside the giant robot you are fighting, this won't help defense",
        stunts: []
      },
      {
        name: "Decieve",
        desc: "The skill of lying, misdirecting, and manipulating people",
        overcome: "Bluff your way past someone, or to get someone to believe a lie, or to get something out of someone because they believe in one of your lies. For nameless NPCs, this is just an overcome roll, but for PCs or named NPCs, it requires a contest, and the target opposes with Empathy. Winning this contest could justify placing a situation aspect on your target, if buying into your lie could help you in a future scene. Deceive is the skill you use for determining if a disguise works, whether on yourself or others. You’ll need to have the time and supplies to create the desired effect. (Note: This is mainly a Hearts of Steel thing; in some games, this may not be appropriate for Deceive by default and should require a stunt.) You can also use Deceive to do small tricks of sleight-of-hand and misdirection.",
        advantage: "Create momentary distractions, cover stories, or false impressions. You could feint in a swordfight, putting an opponent Off-Balance and setting you up for an attack. You could do the whole, \"What’s that over there!\" trick to give you a Head Start when you run away. You could establish a Wealthy Noble Cover Story for when you attend a royal ball. You could trick someone into revealing one of their aspects or other information.",
        attack: "Indirect skill that creates a lot of opportunities you can capitalize on, but it doesn’t do direct harm to an individual.",
        defend: "Throw off Investigation attempts with false information and to defend against efforts made to discern your true motives with the Empathy skill.",
        stunts: [
          {
            name: "Lies upon Lies",
            desc: "+2 to create a Deceive advantage against someone who has believed one of your lies already during this session."
          },
          {
            name: "Mind Games",
            desc: "You can use Deceive in place of Provoke to make mental attacks, as long as you can make up a clever lie as part of the attack."
          },
          {
            name: "One Person, Many Faces",
            desc: "Whenever you meet someone new, you can spend a fate point to declare that you’ve met that person before, but under a different name and identity. Create a situation aspect to represent your cover story, and you can use Deceive in place of Rapport whenever interacting with that person."
          }
        ]
      },
      {
        name: "Drive",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Empathy",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Fight",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Investigate",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Lore",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Mechanics",
        desc: "The skill of working with machinery, for good or ill. Fix it, examine it, maintain it, etc. Think \"I'm Mr. Fixit\"",
        overcome: "Allows you to build, break, or fix machinery, presuming you have the time and tools you need. Often, actions with Mechanics happen as one component of a more complex situation, making it a popular skill for challenges. For example, if you’re just fixing a broken door, neither success nor failure is interesting; you should just succeed and move on. Now, if you’re trying to get your car to start while a pack of werewolves is hunting you...",
        advantage: "You can use Mechanics to create aspects representing features of a piece of machinery, pointing out useful features or strengths you can use to your advantage (Armor-Plated, Rugged Construction) or a vulnerability for you to exploit (Flaw in the Cross-Beam, Hasty Work). Creating Mechanics advantages can also take the form of quick and dirty sabotage or jury-rigging on mechanical objects in the scene. For example, you might create a Makeshift Pulley to help you get to the platform above you, or throw something into the ballista that’s firing on you to give it a Jammed Pivoting Joint and make it harder to hit you.",
        attack: "Unless you are fighting a giant robot from the inside, this won't help attack",
        defend: "Unless you are inside the giant robot you are fighting, this won't help defense",
        stunts: [
          {
            name: "",
            desc: ""
          }
        ]
      },
      {
        name: "Notice",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Physique",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Provoke",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Rapport",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Resources",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Shoot",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Stealth",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      },
      {
        name: "Will",
        desc: "",
        overcome: "",
        advantage: "",
        attack: "",
        defend: "",
        stunts: []
      }
    ]});
  })
});

module.exports = router;

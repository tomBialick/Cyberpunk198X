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
                  req.body.consequence_mild,
                  req.body.consequence_moderate,
                  req.body.consequence_severe,
                  req.body.physical_stress_1,
                  req.body.physical_stress_2,
                  req.body.physical_stress_3,
                  req.body.physical_stress_4,
                  req.body.mental_stress_1,
                  req.body.mental_stress_2,
                  req.body.mental_stress_3,
                  req.body.mental_stress_4,
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
                  req.body.stunt_1,
                  req.body.stunt_2,
                  req.body.stunt_3,
                  req.body.stunt_4,
                  req.body.stunt_5,
                  req.body.refresh,
                  req.files.file.name,
                  './resources/' + req.files.file.name,
                  req.body.notes,
                  req.body.inventory
                ]

                db.query('INSERT INTO PERSONAS (PERSONA_ID, USERNAME, PERSONA_NAME, NPC_FLAG, CONSEQUENCE_MILD, CONSEQUENCE_MODERATE, CONSEQUENCE_SEVERE, PHYSICAL_STRESS_1, PHYSICAL_STRESS_2, PHYSICAL_STRESS_3, PHYSICAL_STRESS_4, MENTAL_STRESS_1, MENTAL_STRESS_2, MENTAL_STRESS_3, MENTAL_STRESS_4, HIGH_CONCEPT, TROUBLE, ASPECT_1, ASPECT_2, ASPECT_3, SUPERB_SKILL, GREAT_SKILL, GOOD_SKILL_1, GOOD_SKILL_2, FAIR_SKILL_1, FAIR_SKILL_2, FAIR_SKILL_3, AVERAGE_SKILL_1, AVERAGE_SKILL_2, AVERAGE_SKILL_3, AVERAGE_SKILL_4, STUNT_1, STUNT_2, STUNT_3, STUNT_4, STUNT_5, REFRESH, ATTACHMENT_NAME, ATTACHMENT_LOCATION, NOTES, INVENTORY) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39)', newPersonaArray).then(results => {
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
              req.body.stunt_1,
              req.body.stunt_2,
              req.body.stunt_3,
              req.body.stunt_4,
              req.body.stunt_5,
              req.body.refresh,
              null,
              null,
              req.body.notes,
              req.body.inventory
            ]

            db.query('INSERT INTO PERSONAS (PERSONA_ID, USERNAME, PERSONA_NAME, NPC_FLAG, HEALTH, HIGH_CONCEPT, TROUBLE, ASPECT_1, ASPECT_2, ASPECT_3, SUPERB_SKILL, GREAT_SKILL, GOOD_SKILL_1, GOOD_SKILL_2, FAIR_SKILL_1, FAIR_SKILL_2, FAIR_SKILL_3, AVERAGE_SKILL_1, AVERAGE_SKILL_2, AVERAGE_SKILL_3, AVERAGE_SKILL_4, STUNT_1, STUNT_2, STUNT_3, STUNT_4, STUNT_5, REFRESH, ATTACHMENT_NAME, ATTACHMENT_LOCATION, NOTES, INVENTORY) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $12, $13, $14, $15, $16, $17, $18, 19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39)', newPersonaArray).then(results => {
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
        desc: "The Athletics skill represents your character's general level of physical fitness. Think agility. Pretty useful if you want to be an action hero",
        overcome: "Overcome any obstacle that requires physical movement. Also used for on foot chases",
        advantage: "Jumping to high ground, running faster than the opponent can keep up with, or performing dazzling acrobatic maneuvers in order to confound your foes",
        attack: "Does not help attack",
        defend: "Catchall skill to roll for defense in a physical conflict, against closequarters and ranged attacks. You can also use it to defend against characters trying to move past you, if you're in a position to physically interfere with whoever's making the attempt.",
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
            desc: "When you succeed with style on a defend action against an opponent's Fight roll, you automatically counter with some sort of nerve punch or stunning blow. You get to attach the Dazed situation aspect to your opponent with a free invoke, instead of just a boost"
          }]
      },

      {
        name: "Burglary",
        desc: "The Burglary skill covers your character's aptitude for stealing things and getting into places that are off-limits",
        overcome: "Burglary allows you to overcome any obstacle related to theft or infiltration. Bypassing locks and traps, pickpocketing and filching, covering your tracks, and other such activities all fall under the purview of this skill.",
        advantage: "Case a location with Burglary, to determine how hard it will be to break into and what kind of security you're dealing with, as well as discover any vulnerabilities you might exploit. You can also examine the work of other burglars to determine how a particular heist was done, and create or discover aspects related to whatever evidence they may have left behind",
        attack: "Does not help attack",
        defend: "Does not help defense",
        stunts: [
          {
            name: "Always a Way Out",
            desc: "+2 on Burglary rolls made to create an advantage whenever you're trying to escape from a location."
          },
          {
            name: "Security Specialist",
            desc: "You don't have to be present to provide active opposition to someone trying to overcome security measures you put in place or worked on. (Normally, a character would roll against passive opposition for that.)"
          },
          {
            name: "Talk the Talk",
            desc: "You can use Burglary in place of Contacts whenever you're dealing specifically with other thieves and burglars."
          }
        ]
      },
      {
        name: "Computers",
        desc: "Cue the \"I'm in\" voice. This is the digital version of Mechanics. Hacking, programming, specialized computer knowledge, understanding how exactly a compiler works (and not just to pass that CS theory course). Hopefully this is balanced since it's not from Fate Core, since I wanted to split mechanical knowledge from computer knowledge (it pains me to put all computer knowledge as one skill)",
        overcome: "Bypassing electronic security, investigate databases (although highly unrealistic if you had no prior knowledge of the data), digital forensics, writing scripts, execute a tar command flawlessly on your first try, general hacking other people's computers, etc.",
        advantage: "",
        attack: "Unless you are fighting a giant robot while trying to control it with a remote or terminal, this won't help attack",
        defend: "Unless you are inside the giant robot you are fighting, this won't help defense",
        stunts: [
          {
            name: "Upload the Download Streams",
            desc: "+2 while trying to hack into a new computer system by saying enough nonsensical hacking words (This RP is required for this)"
          },
          {
            name: "Backdoor Fun",
            desc: "Open up a secret backdoor protocol in a computer system that you have successfully infiltrated, which can use any time later and bypass the security (i.e. no rolling needed to hack it again)"
          },
          {
            name: "No more Mr. \"Error: File Not Found\" guy",
            desc: "+2 when digging/searching through a database, file system, or conducting digital forensics for a file or specific data"
          }
        ]
      },
      {
        name: "Contacts",
        desc: "The skill of knowing and making connections with people. It presumes proficiency with all means of networking available in the setting.",
        overcome: "Overcome any obstacle related to finding someone you need to find. Whether that's old-fashioned \"man on the street\" type of work, polling your information network, or searching archives and computer databases, you're able to hunt down people or somehow get access to them.",
        advantage: "allows you to know who the perfect person to talk to is for anything you might need, or to decide that you know the perfect person already. It's likely that you'll create story details with this skill, represented by aspects. You can also create an advantage that represents what the word on the street is about a particular individual, object, or location, based on what your contacts tell you. These aspects almost always deal with reputation more than fact, such as Known as a Mean Guy or Notorious Swindler. Whether that person lives up to their reputation is anybody's guess, though that doesn't invalidate the aspect—people often have misleading reputations that complicate their lives. Contacts could also be used to create aspects that represent using your information network to plant or acquire information.",
        attack: "Does not help attack",
        defend: "Can be used to defend against people creating social advantages against you, provided your information network can be brought to bear in the situation. You might also use it to keep someone from using Deceive or Contacts to go \"off the grid\", or to interfere with Investigate attempts to find you.",
        stunts: [
          {
            name: "Ear to the Ground",
            desc: "Whenever someone initiates a conflict against you in an area where you've built a network of contacts, you use Contacts instead of Notice to determine turn order, because you got tipped off in time."
          },
          {
            name: "Rumormonger",
            desc: "+2 to create an advantage when you plant vicious rumors about someone else."
          },
          {
            name: "The Weight of Reputation",
            desc: "You can use Contacts instead of Provoke to create advantages based on the fear generated by the sinister reputation you've cultivated for yourself and all the shady associates you have. You should have an appropriate aspect to pair with this stunt."
          }
        ]
      },
      {
        name: "Decieve",
        desc: "The skill of lying, misdirecting, and manipulating people",
        overcome: "Bluff your way past someone, or to get someone to believe a lie, or to get something out of someone because they believe in one of your lies. For nameless NPCs, this is just an overcome roll, but for PCs or named NPCs, it requires a contest, and the target opposes with Empathy. Winning this contest could justify placing a situation aspect on your target, if buying into your lie could help you in a future scene. Deceive is the skill you use for determining if a disguise works, whether on yourself or others. You'll need to have the time and supplies to create the desired effect. (Note: This is mainly a Hearts of Steel thing; in some games, this may not be appropriate for Deceive by default and should require a stunt.) You can also use Deceive to do small tricks of sleight-of-hand and misdirection.",
        advantage: "Create momentary distractions, cover stories, or false impressions. You could feint in a swordfight, putting an opponent Off-Balance and setting you up for an attack. You could do the whole, \"What's that over there!\" trick to give you a Head Start when you run away. You could establish a Wealthy Noble Cover Story for when you attend a royal ball. You could trick someone into revealing one of their aspects or other information.",
        attack: "Indirect skill that creates a lot of opportunities you can capitalize on, but it doesn't do direct harm to an individual.",
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
            desc: "Whenever you meet someone new, you can spend a fate point to declare that you've met that person before, but under a different name and identity. Create a situation aspect to represent your cover story, and you can use Deceive in place of Rapport whenever interacting with that person."
          }
        ]
      },
      {
        name: "Drive",
        desc: "Operate vehicles and things that go fast. Since this setting will likely only use cars, all modes of transportation are here. But if you are trying to be \"that guy\", yes this includes horses, helicopters, trains, hot air balloons, etc. Please do not be \"that guy\".",
        overcome: "Use this to successfully accomplish movement in the face of difficult circumstances while in a vehicle, like rough terrain, small amounts of clearance, or stunt driving. Obviously, Drive is also ripe for contests, especially chases and races.",
        advantage: "Use this to determine the best way to get somewhere in a vehicle, and a good enough roll might allow you to learn features of the route that get expressed as aspects, or declare that you know a Convenient Shortcut or something similar. You can also just read the Athletics description, and then make it about a vehicle. Advantages created using Drive often revolve around getting good positioning, doing a fancy maneuver, or putting your opponent in a bad spot.",
        attack: "Drive isn't usually used as an attack skill (though stunts can certainly alter this). If you want to ram a vehicle, you can attack with Drive, but you take the same shifts of harm you inflict.",
        defend: "Avoiding damage to a vehicle in a physical conflict is one of the most common uses of Drive. You can also use it to defend against advantages being created against you or overcome actions of someone trying to move past you in a vehicle.",
        stunts: [
          {
            name: "Hard to Shake",
            desc: "+2 to Drive whenever you're pursuing another vehicle in a chase scene."
          },
          {
            name: "Pedal to the Metal",
            desc: "You can coax more speed out of your vehicle than seems possible. Whenever you're engaged in any contest where speed is the primary factor (such as a chase or race of some kind) and you tie with your Drive roll, it's considered a success."
          },
          {
            name: "Ramming Speed!",
            desc: "When ramming another vehicle, you ignore two shifts of damage. So if you ram and hit for four shifts, you only take two yourself. (Note: Please yell \"Ramming Speed!\" as you invoke this)"
          }
        ]
      },
      {
        name: "Empathy",
        desc: "Involves knowing and being able to spot changes in a person's mood or bearing. It's basically the emotional Notice skill. Special: Empathy is the main skill you use to help others recover from consequences that are mental in nature.",
        overcome: "You don't really use Empathy to overcome obstacles directly—normally, you find out some information with it, and then use another skill to act. In some cases, though, you might use Empathy like you would Notice, to see if you catch a change in someone's attitude or intent.",
        advantage: "You can use Empathy to read a person's emotional state and get a general sense of who they are, presuming you have some kind of interpersonal contact with them. Most often, you'll use this to assess the aspects on another character's sheet, but sometimes you'll also be able to create new aspects, especially on NPCs. If the target has some reason to be aware that you're trying to read them, they can defend with Deceive or Rapport. You can also use Empathy to discover what circumstances will allow you to make mental attacks on someone, figuring out their breaking points.",
        attack: "Does not help attack",
        defend: "This is the skill to go to in order to defend against Deceive actions, allowing you to pierce through lies and see through to someone's true intent. You can also use it to defend against those creating social advantages against you in general.",
        stunts: [
          {
            name: "Lie Whisperer",
            desc: "+2 to all Empathy rolls made to discern or discover lies, whether they're directed at you or someone else."
          },
          {
            name: "Nose for Trouble",
            desc: "You can use Empathy instead of Notice to determine your turn order in a conflict, provided you've gotten a chance to observe or speak to those involved for at least a few minutes beforehand during this scene."
          },
          {
            name: "Psychologist",
            desc: " Once per session you can reduce someone else's consequence by one level of severity (severe to moderate, moderate to mild, mild to nothing at all) by succeeding on an Empathy roll with a difficulty of Fair (+2) for a mild consequence, Good (+3) for moderate, or Great (+4) for severe. You need to talk with the person you're treating for at least half an hour in order for them to receive the benefits of this stunt, and you can't use it on yourself. (Normally, this roll would only start the recovery process, instead of changing the consequence level.)"
          }
        ]
      },
      {
        name: "Fight",
        desc: "This skill covers all forms of close-quarters combat (in other words, within the same zone), both unarmed and using weapons. For the ranged weapons counterpart, see Shoot.",
        overcome: "Since you don't really use Fight outside of a conflict, it's not often used to overcome obstacles. You might use it to display your fighting prowess in a demonstration, or to participate in some kind of regulated bout or sport fighting, which would allow you to use this skill in a contest.",
        advantage: "You'll probably use Fight for most of the advantages you create in a physical conflict. Any number of special moves can be covered with advantages: a targeted strike to stun, a \"dirty move,\" disarming, and so on. You could even use Fight to assess another fighter's style, spotting weaknesses in his or her form that you can exploit.",
        attack: "This is self-explanatory. You make physical attacks with Fight. Remember, this is for close-in work, so you have to be in the same zone as your opponent.",
        defend: "You use Fight to defend against any other attack or create an advantage attempt made with Fight, as well as pretty much any action where violently interposing yourself could prevent it from happening. You can't use this skill to defend against Shoot attacks, unless the setting is fantastical enough that you can catch missiles or swat them from the air or use laser swords to deflect blasters.",
        stunts: [
          {
            name: "Heavy Hitter",
            desc: "When you succeed with style on a Fight attack and choose to reduce the result by one to gain a boost, you gain a full situation aspect with a free invocation instead."
          },
          {
            name: "Backup Weapon",
            desc: "Whenever someone's about to hit you with a Disarmed situation aspect or something similar, spend a fate point to declare you have a backup weapon. Instead of a situation aspect, your opponent gets a boost, representing the momentary distraction you suffer having to switch."
          },
          {
            name: "Killing Stroke",
            desc: "Once per scene, when you force an opponent to take a consequence, you can spend a fate point to increase the consequence's severity (so mild becomes moderate, moderate becomes severe). If your opponent was already going to take a severe consequence, he must either take a severe consequence and a second consequence or be taken out."
          }
        ]
      },
      {
        name: "Investigate",
        desc: "This skill you use to find things out. It's a counterpart to Notice—whereas Notice revolves around situational alertness and surface observation, Investigate revolves around concentrated effort and in-depth scrutiny",
        overcome: "Investigate obstacles are all about information that's hard to uncover for some reason. Analyzing a crime scene for clues, searching a cluttered room for the item you need, even poring over a musty old tome to try and find the passage that makes everything make sense. Racing against the clock to collect evidence before the cops show up or disaster occurs is a classic way to use Investigate in a challenge.",
        advantage: "Investigate is probably one of the most versatile skills you can use to create an advantage. As long as you're willing to take the time, you can find out just about anything about anyone, discover nearly any detail about a place or object, or otherwise make up aspects about nearly anything in the game world that your character could reasonably unearth. If that sounds broad, consider the following as just a few of the possibilities for using Investigate: eavesdropping on a conversation, looking for clues at a crime scene, examining records, verifying the truth of a piece of information, conducting surveillance, and researching a cover story. ",
        attack: "Does not help attack",
        defend: "Does not help defense",
        stunts: [
          {
            name: "Attention to Detail",
            desc: "You can use Investigate instead of Empathy to defend against Deceive attempts. What others discover through gut reactions and intuition, you learn through careful observation of microexpressions."
          },
          {
            name: "Eavesdropper",
            desc: "On a successful Investigate roll to create an advantage by eavesdropping on a conversation, you can discover or create one additional aspect (though this doesn't give you an extra free invocation)."
          },
          {
            name: "The Power of Deduction",
            desc: "Once per scene you can spend a fate point (and a few minutes of observation) to make a special Investigate roll representing your potent deductive faculties. For each shift you make on this roll you discover or create an aspect, on either the scene or the target of your observations, though you may only invoke one of them for free."
          }
        ]
      },
      {
        name: "Lore",
        desc: "This skill is about knowledge and education. As with some other skills, we called it Lore because that fits the particular flavor of our examples, other games might call it Scholarship, or Academics, or something like that. If your game has a reason to prioritize different fields of knowledge as being separate from one another, you might have several skills that follow the same basic template. For example, you might have a Lore skill that's reserved for supernatural and arcane knowledge, and a Scholar skill for more traditional education.",
        overcome: "You can use Lore to overcome any obstacle that requires applying your character's knowledge to achieve a goal. For example, you might roll Lore to decipher some ancient language on a tomb wall, under the presumption that your character might have researched it at some point. Frankly, you can use Lore as a go-to skill any time you need to know if your character can answer a difficult question, where some tension exists in not knowing the answer.",
        advantage: "Like Investigate, Lore provides a lot of very flexible opportunities to create advantages, provided you can research the subject in question. More often than not, you'll be using Lore to get a story detail, some obscure bit of information that you uncover or know already, but if that information gives you an edge in a future scene, it might take the form of an aspect. Likewise, you can use Lore to create advantages based on any subject matter your character might have studied, which gives you a fun way to add details to the setting.",
        attack: "Does not help attack (this setting does not have magic)",
        defend: "Does not help defense (this setting does not have magic)",
        stunts: [
          {
            name: "I've Read about That!",
            desc: "You've read hundreds—if not thousands—of books on a wide variety of topics. You can spend a fate point to use Lore in place of any other skill for one roll or exchange, provided you can justify having read about the action you're attempting."
          },
          {
            name: "Shield of Reason",
            desc: "You can use Lore as a defense against Provoke attempts, provided you can justify your ability to overcome your fear through rational thought and reason."
          },
          {
            name: "Specialist",
            desc: "Choose a field of specialization, such as herbology, criminology, or zoology. You get a +2 to all Lore rolls relating to that field of specialization."
          }
        ]
      },
      {
        name: "Mechanics",
        desc: "The skill of working with machinery, for good or ill. Fix it, examine it, maintain it, etc. Think \"I'm Mr. Fixit\"",
        overcome: "Allows you to build, break, or fix machinery, presuming you have the time and tools you need. Often, actions with Mechanics happen as one component of a more complex situation, making it a popular skill for challenges. For example, if you're just fixing a broken door, neither success nor failure is interesting; you should just succeed and move on. Now, if you're trying to get your car to start while a pack of werewolves is hunting you...",
        advantage: "You can use Mechanics to create aspects representing features of a piece of machinery, pointing out useful features or strengths you can use to your advantage (Armor-Plated, Rugged Construction) or a vulnerability for you to exploit (Flaw in the Cross-Beam, Hasty Work). Creating Mechanics advantages can also take the form of quick and dirty sabotage or jury-rigging on mechanical objects in the scene. For example, you might create a Makeshift Pulley to help you get to the platform above you, or throw something into the ballista that's firing on you to give it a Jammed Pivoting Joint and make it harder to hit you.",
        attack: "Unless you are fighting a giant robot from the inside, this won't help attack",
        defend: "Unless you are inside the giant robot you are fighting, this won't help defense",
        stunts: [
          {
            name: "Always Making Useful Things",
            desc: "You don't ever have to spend a fate point to declare that you have the proper tools for a particular job using Mechanics, even in extreme situations (like being imprisoned and separated from all your stuff). This source of opposition is just off the table"
          },
          {
            name: "Better than New!",
            desc: "Whenever you succeed with style on an overcome action to repair a piece of machinery, you can immediately give it a new situation aspect (with a free invoke) reflecting the improvements you've made, instead of just a boost."
          },
          {
            name: "Surgical Strikes",
            desc: "When using Mechanics in a conflict involving machinery, you can filter out unwanted targets from whole-zone attacks without having to divide up your shifts (normally, you'd need to divide your roll between your targets)."
          }
        ]
      },
      {
        name: "Notice",
        desc: "This skill involves just that—noticing things. It's a counterpart to Investigate, representing a character's overall perception, ability to pick out details at a glance, and other powers of observation. Usually, when you use Notice, it's very quick compared to Investigate, so the kinds of details you get from it are more superficial, but you also don't have to expend as much effort to find them.",
        overcome: "You don't really use Notice to overcome obstacles too often but when you do it's used in a reactive way: noticing something in a scene, hearing a faint sound, spotting the concealed gun in that guy's waistband. Note that this isn't license for GMs to call for Notice rolls left and right to see how generally observant the players' characters are; that's boring. Instead, call for Notice rolls when succeeding would result in something interesting happening and failing would result in something just as interesting.",
        advantage: "You use Notice to create aspects based on direct observation—looking over a room for details that stand out, finding an escape route in a debris-filled building, noticing someone sticking out in a crowd, etc. When you're watching people, Notice can tell you what's going on with them externally; for internal changes, see Empathy. You might also use Notice to declare that your character spots something you can use to your advantage in a situation, such as a convenient Escape Route when you're trying to get out of a building, or a Subtle Weakness in the enemy's line of defense. For example, if you're in a barroom brawl  you could make a Notice roll to say that you spot a puddle on the floor, right next to your opponent's feet that could cause him to slip.",
        attack: "Does not help attack",
        defend: "You can use Notice to defend against any uses of Stealth to get the drop on you or ambush you, or to discover that you're being observed.",
        stunts: [
          {
            name: "Danger Sense",
            desc: "You have an almost preternatural capacity for detecting danger. Your Notice skill works unimpeded by conditions like total concealment, darkness, or other sensory impairments in situations where someone or something intends to harm you."
          },
          {
            name: "Body Language Reader",
            desc: "You can use Notice in place of Empathy to learn the aspects of a target through observation."
          },
          {
            name: "Reactive Shot",
            desc: "You can use Notice instead of Shoot to make quick, reactive shots that don't involve a lot of aiming. However, because you're having a knee-jerk reaction, you're not allowed to concretely identify your target before using this stunt. So, for example, you might be able to shoot at someone you see moving in the bushes with this stunt, but you won't be able to tell if it's friend or foe before you pull the trigger. Choose carefully!"
          }
        ]
      },
      {
        name: "Physique",
        desc: "This skill is a counterpart to Athletics, representing the character's natural physical aptitudes, such as raw strength and endurance. In our example game, we have this skill broken out as something separate in order to create two distinct types of physical characters—the nimble guy (represented by Athletics) and the strongman (represented by Physique). In your game, you might not find this distinction necessary to make with separate skills—though you might still let players make that distinction with stunts and aspects. Special: The Physique skill gives you additional physical stress or consequence slots. Average (+1) or Fair (+2) gives you a 3-point stress box. Good (+3) or Great (+4) gives you a 3-point and a 4-point stress box. Superb (+5) and above give you an additional mild consequence slot along with the additional stress boxes. This slot can only be used for physical harm.",
        overcome: "You can use Physique to overcome any obstacles that require the application of brute force—most often to overcome a situation aspect on a zone—or any other physical impedance, like prison bars or locked gates. Of course, Physique is the classic skill for arm-wrestling matches and other contests of applied strength, as well as marathons or other endurance-based challenges.",
        advantage: "Physique has a lot of potential for advantages in physical conflict, usually related to grappling and holding someone in place, making them Pinned or Locked Down. You might also use it as a way of discovering physical impairments possessed by the target—grappling the old mercenary tells you that he has a Bum Leg or somesuch.",
        attack: "Physique is not used to harm people directly—see the Fight skill for that.",
        defend: "Though you don't generally use Physique to defend against attacks, you can use it to provide active opposition to someone else's movement, provided you're in a small enough space that you can effectively use your body to block access. You might also interpose something heavy and brace it to stop someone from getting through.",
        stunts: [
          {
            name: "Grappler",
            desc: "+2 to Physique rolls made to create advantages on an enemy by wrestling or grappling with them."
          },
          {
            name: "Take the Blow",
            desc: "You can use Physique to defend against Fight attacks made with fists or blunt instruments, though you always take 1 shift of stress on a tie."
          },
          {
            name: "Tough as Nails",
            desc: "Once per session, at the cost of a fate point, you can reduce the severity of a moderate consequence that's physical in nature to a mild consequence (if your mild consequence slot is free), or erase a mild consequence altogether."
          }
        ]
      },
      {
        name: "Provoke",
        desc: "This skill about getting someone's dander up and eliciting negative emotional response from them—fear, anger, shame, etc. It's the \"being a jerk\" skill. To use Provoke, you need some kind of justification. That could come entirely from situation, or because you have an aspect that's appropriate, or because you've created an advantage with another skill (like Rapport or Deceive), or because you've assessed your target's aspects (see Empathy). This skill requires that your target can feel emotions—robots and zombies typically can't be provoked.",
        overcome: "You can Provoke someone into doing what you want in a fit of emotional pique. You might intimidate them for information, piss them off so badly that they act out, or scare them into running away. This will often happen when you're going up against nameless NPCs or it isn't worthwhile to play out the particulars. Against PCs or important NPCs, you'll need to win a contest. They oppose with Will.",
        advantage: "You can create advantages representing momentary emotional states, like Enraged, Shocked, or Hesitant. Your target opposes with Will.",
        attack: "You can make mental attacks with Provoke, to do emotional harm to an opponent. Your relationship with the target and the circumstances you're in figure a great deal into whether or not you can use this action.",
        defend: "Being good at provoking others doesn't make you better at avoiding it yourself. You need Will for that.",
        stunts: [
          {
            name: "Armor of Fear",
            desc: "You can use Provoke to defend against Fight attacks, but only until the first time you're dealt stress in a conflict. You can make your opponents hesitate to attack, but when someone shows them that you're only human your advantage disappears."
          },
          {
            name: "Provoke Violence",
            desc: "When you create an advantage on an opponent using Provoke, you can use your free invocation to become the target of that character's next relevant action, drawing their attention away from another target."
          },
          {
            name: "Okay, Fine!",
            desc: "You can use Provoke in place of Empathy to learn a target's aspects, by bullying them until they reveal one to you. The target defends against this with Will. (If the GM thinks the aspect is particularly vulnerable to your hostile approach, you get a +2 bonus.)"
          }
        ]
      },
      {
        name: "Rapport",
        desc: "This skill is all about making positive connections to people and eliciting positive emotion. It's the skill of being liked and trusted.",
        overcome: "Use Rapport to charm or inspire people to do what you want, or to establish a good connection with them. Charm your way past the guard, convince someone to take you into their confidence, or become the man of the hour at the local tavern. For nameless NPCs, this is just an overcome action, but you may have to enter a contest to sufficiently ingratiate yourself to a named NPC or PC.",
        advantage: "Use Rapport to establish a positive mood on a target or in a scene or to get someone to confide in you out of a genuine sense of trust. You could pep talk someone into having Elevated Confidence, or stir a crowd into a Joyful Fervor, or simply make someone Talkative or Helpful.",
        attack: "Does not help attack",
        defend: "Rapport defends against any skill used to damage your reputation, sour a mood you've created, or make you look bad in front of other people. It does not, however, defend against mental attacks. That requires Will.",
        stunts: [
          {
            name: "Best Foot Forward",
            desc: "Twice per session, you may upgrade a boost you receive with Rapport into a full situation aspect with a free invocation."
          },
          {
            name: "Demagogue",
            desc: "+2 to Rapport when you're delivering an inspiring speech in front of a crowd. (If there are named NPCs or PCs in the scene, you may target them all simultaneously with one roll rather than dividing up your shifts.)"
          },
          {
            name: "Popular",
            desc: "If you're in an area where you're popular and well-liked, you can use Rapport in place of Contacts. You may be able to establish your popularity by spending a fate point to declare a story detail, or because of prior justification."
          }
        ]
      },
      {
        name: "Resources",
        desc: "Resources describes your character's general level of material wealth in the game world and ability to apply it. This might not always reflect cash on hand, given the different ways you can represent wealth in a particular setting—in a medieval game, it might be tied to land or vassals as much as gold; in the modern day, it might mean a number of good lines of credit.",
        overcome: "You can use Resources to get yourself out of or past any situation where throwing money at the problem will help, such as committing bribery or acquiring rare and expensive things. Challenges or contests might involve auctions or bidding wars.",
        advantage: "You might use Resources to grease the wheels and make people more friendly, whether that represents an actual bribe (I Scratch Your Back...) or simply buying drinks for people (In Vino Veritas). You can also use Resources to declare that you have something you need on hand, or can quickly acquire it, which could give you an aspect representing the object.",
        attack: "Does not help attack",
        defend: "Does not help defense",
        stunts: [
          {
            name: "Money Talks",
            desc: "You can use Resources instead of Rapport in any situation where ostentatious displays of material wealth might aid your cause."
          },
          {
            name: "Savvy Investor",
            desc: "You get an additional free invoke when you create advantages with Resources, provided that they describe a monetary return on an investment you made in a previous session. (In other words, you can't retroactively declare that you did it, but if it happened in the course of play, you get higher returns.)"
          },
          {
            name: "Trust Fund Baby",
            desc: "Twice per session, you may take a boost representing a windfall or influx of cash."
          }
        ]
      },
      {
        name: "Shoot",
        desc: "The counterpart to Fight, Shoot is the skill of using ranged weaponry, either in a conflict or on targets that don't actively resist your attempts to shoot them (like a bull's-eye or the broad side of a barn).",
        overcome: "Unless, for some reason, you need to demonstrate your Shoot ability in a non-conflict situation, you probably won't be using this skill for normal obstacles much. Obviously, contests involving Shoot are a popular staple of adventure fiction, and we recommend you look for the opportunity to have them if you have a character who specializes in this.",
        advantage: " In physical conflicts, Shoot can be used to perform a wide variety of moves, like trick shots, keeping someone under heavy fire, and the like. In cinematic games, you might even be able to disarm people and pin their sleeves to walls—pretty much anything you've seen in an action movie. You could also make the argument for creating aspects based on your knowledge of guns (like placing a Prone to Jams aspect on an opponent's gun).",
        attack: "This skill makes physical attacks. You can make them from up to two zones away, unlike with Fight. (Sometimes the range will change with the weapon.)",
        defend: "Shoot is unique in that it doesn't really have a defense component to it—you'd use Athletics for that. You could use it to lay down some covering fire—which might act as a defense for your allies or provide opposition to someone else's movement, though it could just as easily be represented by creating an advantage (Covering Fire or Hail of Bullets, for example).",
        stunts: [
          {
            name: "Called Shot",
            desc: "During a Shoot attack, spend a fate point and declare a specific condition you want to inflict on a target, like Shot in the Hand. If you succeed, you place that as a situation aspect on them in addition to hitting them for stress."
          },
          {
            name: "Quick on the Draw",
            desc: "You can use Shoot instead of Notice to determine turn order in any physical conflict where shooting quickly would be useful."
          },
          {
            name: "Uncanny Accuracy",
            desc: "Once per conflict, stack an additional free invoke on an advantage you've created to represent the time you take to aim or line up a shot (like In My Sights)."
          }
        ]
      },
      {
        name: "Stealth",
        desc: "The Stealth skill allows you to avoid detection, both when hiding in place and trying to move about unseen. It pairs well with the Burglary skill.",
        overcome: "You can use Stealth to get past any situation that primarily depends on you not being seen. Sneaking past sentries and security, hiding from a pursuer, avoiding leaving evidence as you pass through a place, and any other such uses all fall under the purview of Stealth.",
        advantage: "You'll mainly use Stealth to create aspects on yourself, setting yourself in an ideal position for an attack or ambush in a conflict. That way, you can be Well-Hidden when the guards pass by and take advantage of that, or Hard to Pin Down if you're fighting in the dark.",
        attack: "Does not help attack",
        defend: "You can use this to foil Notice attempts to pinpoint you or seek you out, as well as to try to throw off the scent of an Investigate attempt from someone trying to track you.",
        stunts: [
          {
            name: "Face in the Crowd",
            desc: "+2 to any Stealth roll to blend into a crowd. What a \"crowd\" means will depend on the environment—a subway station requires more people to be crowded than a small bar."
          },
          {
            name: "Ninja Vanish",
            desc: "Once per scene, you can vanish while in plain sight by spending a fate point, using a smoke pellet or other mysterious technique. This places the Vanished boost on you. While you’re vanished, no one can attack or create an advantage on you until after they’ve succeeded at an overcome roll with Notice to suss out where you went (basically meaning they have to give up an exchange to try). This aspect goes away as soon as you invoke it, or someone makes that overcome roll."
          },
          {
            name: "Slippery Target",
            desc: "Provided you’re in darkness or shadow, you can use Stealth to defend against Shoot attacks from enemies that are at least one zone away."
          }
        ]
      },
      {
        name: "Will",
        desc: "The Will skill represents your character’s general level of mental fortitude, the same way that Physique represents your physical fortitude. Special: The Will skill gives you additional mental stress boxes or consequence slots. Average (+1) or Fair (+2) gives you a 3-point stress box. Good (+3) or Great (+4) gives you a 3-point and a 4-point stress box. Superb (+5) and above give you an additional mild consequence slot along with the additional stress boxes. This slot can only be used for mental harm.",
        overcome: "You can use Will to pit yourself against obstacles that require mental effort. Puzzles and riddles can fall under this category, as well as any mentally absorbing task, like deciphering a code. Use Will when it’s only a matter of time before you overcome the mental challenge, and Lore if it takes something more than brute mental force to get past it. Many of the obstacles that you go up against with Will might be made part of challenges, to reflect the effort involved. Contests of Will might reflect particularly challenging games, like chess, or competing in a hard set of exams. In settings where magic or psychic abilities are common, contests of Will are popular occurrences.",
        advantage: "You can use Will to place aspects on yourself, representing a state of deep concentration or focus.",
        attack: "Does not help attack (this setting does not have magic/psychic stuff)",
        defend: "Will is the main skill you use to defend against mental attacks from Provoke, representing your control over your reactions.",
        stunts: [
          {
            name: "Strength From Determination",
            desc: "Use Will instead of Physique on any overcome rolls representing feats of strength."
          },
          {
            name: "Hard Boiled",
            desc: "You can choose to ignore a mild or moderate consequence for the duration of the scene. It can’t be compelled against you or invoked by your enemies. At the end of the scene it comes back worse, though; if it was a mild consequence it becomes a moderate consequence, and if it was already moderate, it becomes severe."
          },
          {
            name: "Indomitable",
            desc: "+2 to defend against Provoke attacks specifically related to intimidation and fear."
          }
        ]
      }
    ]});
});

module.exports = router;

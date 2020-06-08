import React, {Component} from 'react';
import './sheets/CreateCharacter.css';

class CreateCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      skills: [],
      char_name: "",
      high_concept: "",
      trouble: "",
      aspect_1: "",
      aspect_2: "",
      aspect_3: "",
      great_skill: "",
      good_skill_1: "",
      good_skill_2: "",
      fair_skill_1: "",
      fair_skill_2: "",
      fair_skill_3: "",
      average_skill_1: "",
      average_skill_2: "",
      average_skill_3: "",
      average_skill_4: "",
      stunt_1: "", //Check stunt choices
      stunt_2: "",
      stunt_3: "",
      stunt_4: "",
      stunt_5: "",
      refresh: 3, //calc from stunts
      notes: "", //Make it an object/array?
      inventory: "", //Make it an object/array?
      validStunts: [],
      stuntsUpdated: true,
      mental_stress_slots: 2,
      physical_stress_slots: 2,
      checkStresses: false,
      checkRefresh: false
    }
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleSubmitCharacter = this.handleSubmitCharacter.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.populateSkillList = this.populateSkillList.bind(this);
    this.renderSkillInfo = this.renderSkillInfo.bind(this);
    this.populateStuntList = this.populateStuntList.bind(this);
  }

  componentDidMount() {
    if (this.props.role === "player") {
      //fetch their characters
      fetch(this.props.hosturl + '/player/skills', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        if (response.status < 400) {
          response.json().then(responseJson => {
            let skillArray = JSON.parse(JSON.stringify(responseJson.body))
            let availableGreatArray = JSON.parse(JSON.stringify(responseJson.body))
            let availableGood1Array = JSON.parse(JSON.stringify(responseJson.body))
            let availableGood2Array = JSON.parse(JSON.stringify(responseJson.body))
            let availableFair1Array = JSON.parse(JSON.stringify(responseJson.body))
            let availableFair2Array = JSON.parse(JSON.stringify(responseJson.body))
            let availableFair3Array = JSON.parse(JSON.stringify(responseJson.body))
            let availableAverage1Array = JSON.parse(JSON.stringify(responseJson.body))
            let availableAverage2Array = JSON.parse(JSON.stringify(responseJson.body))
            let availableAverage3Array = JSON.parse(JSON.stringify(responseJson.body))
            let availableAverage4Array = JSON.parse(JSON.stringify(responseJson.body))

            this.setState({
              skills: skillArray,
              availableGreatSkills: availableGreatArray,
              availableGood1Skills: availableGood1Array,
              availableGood2Skills: availableGood2Array,
              availableFair1Skills: availableFair1Array,
              availableFair2Skills: availableFair2Array,
              availableFair3Skills: availableFair3Array,
              availableAverage1Skills: availableAverage1Array,
              availableAverage2Skills: availableAverage2Array,
              availableAverage3Skills: availableAverage3Array,
              availableAverage4Skills: availableAverage4Array
            })
          })
        }
        else {
          response.text().then(responseText => {
            alert(responseText)
          })
        }
      }).catch(error => {
        console.log("ERROR: " + error);
        alert("An error occurred. Please contact the admin(s) if this persists")
      })
    }
    else {
      console.log("ur a gm");
    }
  }

  componentDidUpdate() {
    if (!this.state.stuntsUpdated) {
      let tempValidStunts = []
      if (this.state.great_skill) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.great_skill)].stunts)
      }
      if (this.state.good_skill_1) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.good_skill_1)].stunts)
      }
      if (this.state.good_skill_2) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.good_skill_2)].stunts)
      }
      if (this.state.fair_skill_1) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.fair_skill_1)].stunts)
      }
      if (this.state.fair_skill_2) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.fair_skill_2)].stunts)
      }
      if (this.state.fair_skill_3) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.fair_skill_3)].stunts)
      }
      if (this.state.average_skill_1) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.average_skill_1)].stunts)
      }
      if (this.state.average_skill_2) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.average_skill_2)].stunts)
      }
      if (this.state.average_skill_3) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.average_skill_3)].stunts)
      }
      if (this.state.average_skill_4) {
        tempValidStunts = tempValidStunts.concat(this.state.skills[this.state.skills.findIndex(element => element.name === this.state.average_skill_4)].stunts)
      }
      for (let i = 1; i <= 5; i++) {
        let tempValue = document.getElementById(`create_character_stunt-${i}_select`).value
        if (tempValue === "None" || tempValue === " -- select an option -- ") {
          continue;
        }
        let tempIndex = tempValidStunts.findIndex(element => element.name === tempValue)
        if (tempIndex < 0) {
          document.getElementById(`create_character_stunt-${i}_select`).value = "None"
          switch (i) {
            case 1:
              this.setState({stunt_1: ""})
              break;
            case 2:
              this.setState({stunt_2: ""})
              break;
            case 3:
              this.setState({stunt_3: ""})
              break;
            case 4:
              this.setState({stunt_4: ""})
              break;
            case 5:
              this.setState({stunt_5: ""})
              break;
            default:
              break;
          }
        }
        else {
          tempValidStunts[tempIndex].selected = `stunt_${i}`
        }
      }
      this.setState({stuntsUpdated: true, validStunts: tempValidStunts})
    }
    if (this.state.checkStresses) {
      let phys_stress_count = 2
      let ment_stress_count = 2

      if (this.state.great_skill === "Physique" || this.state.good_skill_1 === "Physique" || this.state.good_skill_2 === "Physique") {
        phys_stress_count = 4
      }
      else if (this.state.fair_skill_1 === "Physique" || this.state.fair_skill_2 === "Physique" || this.state.fair_skill_3 === "Physique" || this.state.average_skill_1 === "Physique" || this.state.average_skill_2 === "Physique" || this.state.average_skill_3 === "Physique" || this.state.average_skill_4 === "Physique") {
        phys_stress_count = 3
      }
      if (this.state.great_skill === "Will" || this.state.good_skill_1 === "Will" || this.state.good_skill_2 === "Will") {
        ment_stress_count = 4
      }
      else if (this.state.fair_skill_1 === "Will" || this.state.fair_skill_2 === "Will" || this.state.fair_skill_3 === "Will" || this.state.average_skill_1 === "Will" || this.state.average_skill_2 === "Will" || this.state.average_skill_3 === "Will" || this.state.average_skill_4 === "Will") {
        ment_stress_count = 3
      }

      this.setState({checkStresses: false, physical_stress_slots: phys_stress_count, mental_stress_slots: ment_stress_count})
    }
    if (this.state.checkRefresh) {
      let temp_refresh = 3
      if (this.state.stunt_4 && this.state.stunt_4 !== "" && this.state.stunt_4 !== "none" && this.state.stunt_4 !== "None") {
        temp_refresh--;
      }
      if (this.state.stunt_5 && this.state.stunt_5 !== "" && this.state.stunt_5 !== "none" && this.state.stunt_5 !== "None") {
        temp_refresh--;
      }

      this.setState({checkRefresh: false, refresh: temp_refresh})
    }
  }

  handleInputChange(event) {
    let tokens = event.target.id.split('_')
    let endToken = tokens[tokens.length - 1]
    if (!event.target.value) {
      return; //ignore null value
    }
    else if (endToken === "input") {
      switch (event.target.id) {
        case "create_character_name_input":
          this.setState({char_name: event.target.value});
          break;
        case "create_character_concept_input":
          this.setState({high_concept: event.target.value});
          break;
        case "create_character_trouble_input":
          this.setState({trouble: event.target.value});
          break;
        case "create_character_aspect-1_input":
          this.setState({aspect_1: event.target.value});
          break;
        case "create_character_aspect-2_input":
          this.setState({aspect_2: event.target.value});
          break;
        case "create_character_aspect-3_input":
          this.setState({aspect_3: event.target.value});
          break;
        default:
          break;
      }
    }
    else if (endToken === "select") {
      if (event.target.id.includes("skill")) {
        if (event.target.id === "create_character_great-skill_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.great_skill //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "great_skill"

          this.setState({
            skills: tempSkills,
            great_skill: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_good-skill-1_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.good_skill_1 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "good_skill_1"

          this.setState({
            skills: tempSkills,
            good_skill_1: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_good-skill-2_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.good_skill_2 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "good_skill_2"

          this.setState({
            skills: tempSkills,
            good_skill_2: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_fair-skill-1_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.fair_skill_1 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "fair_skill_1"

          this.setState({
            skills: tempSkills,
            fair_skill_1: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_fair-skill-2_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.fair_skill_2 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "fair_skill_2"

          this.setState({
            skills: tempSkills,
            fair_skill_2: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_fair-skill-3_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.fair_skill_3 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "fair_skill_3"

          this.setState({
            skills: tempSkills,
            fair_skill_3: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_average-skill-1_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.average_skill_1 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "average_skill_1"

          this.setState({
            skills: tempSkills,
            average_skill_1: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_average-skill-2_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.average_skill_2 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "average_skill_2"

          this.setState({
            skills: tempSkills,
            average_skill_2: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_average-skill-3_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.average_skill_3 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "average_skill_3"

          this.setState({
            skills: tempSkills,
            average_skill_3: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
        else if (event.target.id === "create_character_average-skill-4_select") {
          let chosenSkillName = event.target.value
          let oldSkillName =  this.state.average_skill_4 //state not changed yet
          let tempSkills = this.state.skills
          let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
          let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

          if (oldSkill && oldSkill.selected) {
            delete oldSkill.selected
          }

          tempSkills[chosenSkillIndex].selected = "average_skill_4"

          this.setState({
            skills: tempSkills,
            average_skill_4: chosenSkillName,
            stuntsUpdated: false,
            checkStresses: true
          })
        }
      }
      else if (event.target.id.includes("stunt")) {
        if (event.target.id === "create_character_stunt-1_select") {
          let chosenStuntName = event.target.value
          let oldStuntName =  this.state.stunt_1 //state not changed yet
          let tempStunts = this.state.validStunts
          let oldStunt = tempStunts[tempStunts.findIndex(element => element.name === oldStuntName)]
          let chosenStuntIndex = tempStunts.findIndex(element => element.name === chosenStuntName)

          if (oldStunt && oldStunt.selected) {
            delete oldStunt.selected
          }

          tempStunts[chosenStuntIndex].selected = "stunt_1"

          this.setState({
            validStunts: tempStunts,
            stunt_1: chosenStuntName
          })
        }
        else if (event.target.id === "create_character_stunt-2_select") {
          let chosenStuntName = event.target.value
          let oldStuntName =  this.state.stunt_2 //state not changed yet
          let tempStunts = this.state.validStunts
          let oldStunt = tempStunts[tempStunts.findIndex(element => element.name === oldStuntName)]
          let chosenStuntIndex = tempStunts.findIndex(element => element.name === chosenStuntName)

          if (oldStunt && oldStunt.selected) {
            delete oldStunt.selected
          }

          tempStunts[chosenStuntIndex].selected = "stunt_2"

          this.setState({
            validStunts: tempStunts,
            stunt_2: chosenStuntName
          })
        }
        else if (event.target.id === "create_character_stunt-3_select") {
          let chosenStuntName = event.target.value
          let oldStuntName =  this.state.stunt_3 //state not changed yet
          let tempStunts = this.state.validStunts
          let oldStunt = tempStunts[tempStunts.findIndex(element => element.name === oldStuntName)]
          let chosenStuntIndex = tempStunts.findIndex(element => element.name === chosenStuntName)

          if (oldStunt && oldStunt.selected) {
            delete oldStunt.selected
          }

          tempStunts[chosenStuntIndex].selected = "stunt_3"

          this.setState({
            validStunts: tempStunts,
            stunt_3: chosenStuntName
          })
        }
        else if (event.target.id === "create_character_stunt-4_select") {
          if (event.target.value === "None") {
            let oldStuntName =  this.state.stunt_4 //state not changed yet
            let tempStunts = this.state.validStunts
            let oldStunt = tempStunts[tempStunts.findIndex(element => element.name === oldStuntName)]

            if (oldStunt && oldStunt.selected) {
              delete oldStunt.selected
            }

            this.setState({
              validStunts: tempStunts,
              stunt_4: "None",
              checkRefresh: true
            })
          }
          else {
            let chosenStuntName = event.target.value
            let oldStuntName =  this.state.stunt_4 //state not changed yet
            let tempStunts = this.state.validStunts
            let oldStunt = tempStunts[tempStunts.findIndex(element => element.name === oldStuntName)]
            let chosenStuntIndex = tempStunts.findIndex(element => element.name === chosenStuntName)

            if (oldStunt && oldStunt.selected) {
              delete oldStunt.selected
            }

            tempStunts[chosenStuntIndex].selected = "stunt_4"

            this.setState({
              validStunts: tempStunts,
              stunt_4: chosenStuntName,
              checkRefresh: true
            })
          }
        }
        else if (event.target.id === "create_character_stunt-5_select") {
          if (event.target.value === "None") {
            let oldStuntName =  this.state.stunt_5 //state not changed yet
            let tempStunts = this.state.validStunts
            let oldStunt = tempStunts[tempStunts.findIndex(element => element.name === oldStuntName)]

            if (oldStunt && oldStunt.selected) {
              delete oldStunt.selected
            }

            this.setState({
              validStunts: tempStunts,
              stunt_5: "None",
              checkRefresh: true
            })
          }
          else {
            let chosenStuntName = event.target.value
            let oldStuntName =  this.state.stunt_5 //state not changed yet
            let tempStunts = this.state.validStunts
            let oldStunt = tempStunts[tempStunts.findIndex(element => element.name === oldStuntName)]
            let chosenStuntIndex = tempStunts.findIndex(element => element.name === chosenStuntName)

            if (oldStunt && oldStunt.selected) {
              delete oldStunt.selected
            }

            tempStunts[chosenStuntIndex].selected = "stunt_5"

            this.setState({
              validStunts: tempStunts,
              stunt_5: chosenStuntName,
              checkRefresh: true
            })
          }
        }
      }
    }
  }

  handleSubmitCharacter(event) {
    event.preventDefault();
    let char_data = {
      persona_name: this.state.char_name,
      consequence_mild: false,
      consequence_moderate: false,
      consequence_severe: false,
      physical_stress_1: false, //calc phys
      physical_stress_2: false,
      physical_stress_3: ((this.state.physical_stress_slots >= 3) ? false: null),
      physical_stress_4: ((this.state.physical_stress_slots >= 4) ? false: null),
      mental_stress_1: false,//calc will
      mental_stress_2: false,
      mental_stress_3: ((this.state.mental_stress_slots >= 3) ? false: null),
      mental_stress_4: ((this.state.mental_stress_slots >= 4) ? false: null),
      high_concept: this.state.high_concept,
      trouble: this.state.trouble,
      aspect_1: this.state.aspect_1,
      aspect_2: this.state.aspect_2,
      aspect_3: this.state.aspect_3,
      great_skill: this.state.great_skill,
      good_skill_1: this.state.good_skill_1,
      good_skill_2: this.state.good_skill_2,
      fair_skill_1: this.state.fair_skill_1,
      fair_skill_2: this.state.fair_skill_2,
      fair_skill_3: this.state.fair_skill_3,
      average_skill_1: this.state.average_skill_1,
      average_skill_2: this.state.average_skill_2,
      average_skill_3: this.state.average_skill_3,
      average_skill_4: this.state.average_skill_4,
      stunt_1: this.state.stunt_1, //Check stunt choices
      stunt_2: this.state.stunt_2,
      stunt_3: this.state.stunt_3,
      stunt_4: this.state.stunt_4,
      stunt_5: this.state.stunt_5,
      refresh: this.state.refresh, //calc from stunts
      notes: this.state.notes, //Stringify if object/array
      inventory: this.state.inventory //Stringify if object/array
    }
    // TODO: attach file (char drawing)

    let personaJSONSTR = JSON.stringify(char_data);

    fetch( this.props.hosturl + '/player/persona', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: personaJSONSTR
    }).then(response => {
      if (response.status < 400) {
        response.text().then((responseText) => {
          alert(responseText);
          //clear form
        })
      }
      else {
        response.text().then(responseText => {
          alert(responseText)
          //keep form
          //highlight missing stuff?
        })
      }
    }).catch(error => {
      console.log("ERROR: " + error);
      alert("An error occurred. Please contact the admin(s) if this persists")
    })
  }

  handleGoBack(event) {
    event.preventDefault();
    this.props.goBack();
  }

  populateSkillList(id) {
    if (id === "great_skill") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "great_skill") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "good_skill_1") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "good_skill_1") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "good_skill_2") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "good_skill_2") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "fair_skill_1") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "fair_skill_1") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "fair_skill_2") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "fair_skill_2") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "fair_skill_3") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "fair_skill_3") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "average_skill_1") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "average_skill_1") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "average_skill_2") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "average_skill_2") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "average_skill_3") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "average_skill_3") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "average_skill_4") {
      if (this.state.skills.length > 0) {
        return this.state.skills.map((skill, i) => {
          if (skill.selected && skill.selected !== "average_skill_4") {
            return <option disabled value={skill.name} key={i}>{skill.name}</option>
          }
          else {
            return <option value={skill.name} key={i}>{skill.name}</option>
          }
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
  }

  populateStuntList(id) {
    if (id === "stunt_1") {
      if (this.state.validStunts.length > 0) {
        return this.state.validStunts.map((stunt, i) => {
          if (stunt.selected && stunt.selected !== "stunt_1") {
            return <option disabled value={stunt.name} key={i}>{stunt.name}</option>
          }
          else {
            return <option value={stunt.name} key={i}>{stunt.name}</option>
          }
        })
      }
      else {
        return <option>No stunts found</option>
      }
    }
    else if (id === "stunt_2") {
      if (this.state.validStunts.length > 0) {
        return this.state.validStunts.map((stunt, i) => {
          if (stunt.selected && stunt.selected !== "stunt_2") {
            return <option disabled value={stunt.name} key={i}>{stunt.name}</option>
          }
          else {
            return <option value={stunt.name} key={i}>{stunt.name}</option>
          }
        })
      }
      else {
        return <option>No stunts found</option>
      }
    }
    else if (id === "stunt_3") {
      if (this.state.validStunts.length > 0) {
        return this.state.validStunts.map((stunt, i) => {
          if (stunt.selected && stunt.selected !== "stunt_3") {
            return <option disabled value={stunt.name} key={i}>{stunt.name}</option>
          }
          else {
            return <option value={stunt.name} key={i}>{stunt.name}</option>
          }
        })
      }
      else {
        return <option>No stunts found</option>
      }
    }
    else if (id === "stunt_4") {
      if (this.state.validStunts.length > 0) {
        return this.state.validStunts.map((stunt, i) => {
          if (stunt.selected && stunt.selected !== "stunt_4") {
            return <option disabled value={stunt.name} key={i}>{stunt.name}</option>
          }
          else {
            return <option value={stunt.name} key={i}>{stunt.name}</option>
          }
        })
      }
      else {
        return <option>No stunts found</option>
      }
    }
    else if (id === "stunt_5") {
      if (this.state.validStunts.length > 0) {
        return this.state.validStunts.map((stunt, i) => {
          if (stunt.selected && stunt.selected !== "stunt_5") {
            return <option disabled value={stunt.name} key={i}>{stunt.name}</option>
          }
          else {
            return <option value={stunt.name} key={i}>{stunt.name}</option>
          }
        })
      }
      else {
        return <option>No stunts found</option>
      }
    }
  }

  renderSkillInfo() {
    if (this.state.skills.length > 0) {
      return this.state.skills.map((skill, i) => {
        return (<p><strong>{skill.name}</strong>: {skill.desc}<br />
          &emsp;<strong>Overcome</strong>: {skill.overcome}<br />
          &emsp;<strong>Advantage</strong>: {skill.advantage}<br />
          &emsp;<strong>Attack</strong>: {skill.attack}<br />
          &emsp;<strong>Defend</strong>: {skill.defend}<br />
          &emsp;<strong>Stunts</strong>:<br />
          &emsp;&emsp;&#8226;<strong>{skill.stunts[0].name}</strong>: {skill.stunts[0].desc}<br />
          &emsp;&emsp;&#8226;<strong>{skill.stunts[1].name}</strong>: {skill.stunts[1].desc}<br />
          &emsp;&emsp;&#8226;<strong>{skill.stunts[2].name}</strong>: {skill.stunts[2].desc}<br />
        </p>)
      })
    }
    else {
      return <p>No Skills Found</p>
    }
  }

  // TODO: Add create character form
  render() {
    return (
      <div>
        <h4>Create Character</h4>
        <button onClick={(e) => this.handleGoBack(e)}>Go Back</button>
        <div className="spacer">
        </div>
        <div id="create_character_div">
          <div id="create_character_skill_info_div">
            {this.renderSkillInfo()}
          </div>
          <div id="create_character_form_div">
            <form id="create_character_form">
              <label>Name: </label><input id="create_character_name_input" type="text" onChange={this.handleInputChange} />
              <label>Concept: </label><input id="create_character_concept_input" type="text" onChange={this.handleInputChange} />
              <label>Trouble: </label><input id="create_character_trouble_input" type="text" onChange={this.handleInputChange} />
              <label>Aspect 1: </label><input id="create_character_aspect-1_input" type="text" onChange={this.handleInputChange} />
              <label>Aspect 2: </label><input id="create_character_aspect-2_input" type="text" onChange={this.handleInputChange} />
              <label>Aspect 3: </label><input id="create_character_aspect-3_input" type="text" onChange={this.handleInputChange} />
              <label>Great Skill: </label><select id="create_character_great-skill_select" type="text" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("great_skill")}
              </select>
              <label>Good Skill 1: </label><select id="create_character_good-skill-1_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("good_skill_1")}
              </select>
              <label>Good Skill 2: </label><select id="create_character_good-skill-2_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("good_skill_2")}
              </select>
              <label>Fair Skill 1: </label><select id="create_character_fair-skill-1_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("fair_skill_1")}
              </select>
              <label>Fair Skill 2: </label><select id="create_character_fair-skill-2_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("fair_skill_2")}
              </select>
              <label>Fair Skill 3: </label><select id="create_character_fair-skill-3_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("fair_skill_3")}
              </select>
              <label>Average Skill 1: </label><select id="create_character_average-skill-1_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("average_skill_1")}
              </select>
              <label>Average Skill 2: </label><select id="create_character_average-skill-2_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("average_skill_2")}
              </select>
              <label>Average Skill 3: </label><select id="create_character_average-skill-3_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("average_skill_3")}
              </select>
              <label>Average Skill 4: </label><select id="create_character_average-skill-4_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("average_skill_4")}
              </select>
              <label>Stunt 1: </label><select id="create_character_stunt-1_select" onChange={this.handleInputChange}>
                <option disabled selected value="None"> -- select an option -- </option>
                {this.populateStuntList("stunt_1")}
              </select>
              <label>Stunt 2: </label><select id="create_character_stunt-2_select" onChange={this.handleInputChange}>
                <option disabled selected value="None"> -- select an option -- </option>
                {this.populateStuntList("stunt_2")}
              </select>
              <label>Stunt 3: </label><select id="create_character_stunt-3_select" onChange={this.handleInputChange}>
                <option disabled selected value="None"> -- select an option -- </option>
                {this.populateStuntList("stunt_3")}
              </select>
              <label>Stunt 4: </label><select id="create_character_stunt-4_select" onChange={this.handleInputChange}>
                <option selected value="None">None</option>
                {this.populateStuntList("stunt_4")}
              </select>
              <label>Stunt 5: </label><select id="create_character_stunt-5_select" onChange={this.handleInputChange}>
                <option selected value="None">None</option>
                {this.populateStuntList("stunt_5")}
              </select>
              <label>Refresh: </label><p>{this.state.refresh}</p>
              <label>Physical Stress Slots: </label><p>{this.state.physical_stress_slots}</p>
              <label>Mental Stress Slots: </label><p>{this.state.mental_stress_slots}</p>
              <label>Notes: </label><textarea id="create_character_notes_textarea" onChange={this.handleInputChange} rows={4}></textarea>
              <label>Inventory: </label><textarea id="create_character_inventory_textarea" onChange={this.handleInputChange} rows={4}></textarea>
            </form>
            <button id="create_character_create_button" onClick={(e) => this.handleSubmitCharacter(e)}>Create!</button>
          </div>
        </div>
      </div>
    )
  }
}
export default CreateCharacter;

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
      refresh: 0, //calc from stunts
      notes: "", //Make it an object/array?
      inventory: "", //Make it an object/array?
      validStunts: [],
      availableGreatSkills: [],
      availableGood1Skills: [],
      availableGood2Skills: [],
      availableFair1Skills: [],
      availableFair2Skills: [],
      availableFair3Skills: [],
      availableAverage1Skills: [],
      availableAverage2Skills: [],
      availableAverage3Skills: [],
      availableAverage4Skills: []
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
      if (event.target.id === "create_character_great-skill_select") {
        let chosenSkillName = event.target.value
        let oldSkillName =  this.state.great_skill //state not changed yet
        let oldSkill = this.state.skills[this.state.skills.findIndex(element => element.name === oldSkillName)]

        let availableGood1Array = this.state.availableGood1Skills
        let availableGood2Array = this.state.availableGood2Skills
        let availableFair1Array = this.state.availableFair1Skills
        let availableFair2Array = this.state.availableFair2Skills
        let availableFair3Array = this.state.availableFair3Skills
        let availableAverage1Array = this.state.availableAverage1Skills
        let availableAverage2Array = this.state.availableAverage2Skills
        let availableAverage3Array = this.state.availableAverage3Skills
        let availableAverage4Array = this.state.availableAverage4Skills

        let removeGood1Index = availableGood1Array.findIndex(element => element.name === chosenSkillName)
        availableGood1Array.splice(removeGood1Index, 1)
        if (oldSkill) {
          availableGood1Array.push(oldSkill)
        }
        availableGood1Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeGood2Index = availableGood2Array.findIndex(element => element.name === chosenSkillName)
        availableGood2Array.splice(removeGood2Index, 1)
        if (oldSkill) {
          availableGood2Array.push(oldSkill)
        }
        availableGood2Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeFair1Index = availableFair1Array.findIndex(element => element.name === chosenSkillName)
        availableFair1Array.splice(removeFair1Index, 1)
        if (oldSkill) {
          availableFair1Array.push(oldSkill)
        }
        availableFair1Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeFair2Index = availableFair2Array.findIndex(element => element.name === chosenSkillName)
        availableFair2Array.splice(removeFair2Index, 1)
        if (oldSkill) {
          availableFair2Array.push(oldSkill)
        }
        availableFair2Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeFair3Index = availableFair3Array.findIndex(element => element.name === chosenSkillName)
        availableFair3Array.splice(removeFair3Index, 1)
        if (oldSkill) {
          availableFair3Array.push(oldSkill)
        }
        availableFair3Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeAverage1Index = availableAverage1Array.findIndex(element => element.name === chosenSkillName)
        availableAverage1Array.splice(removeAverage1Index, 1)
        if (oldSkill) {
          availableAverage1Array.push(oldSkill)
        }
        availableAverage1Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeAverage2Index = availableAverage2Array.findIndex(element => element.name === chosenSkillName)
        availableAverage2Array.splice(removeAverage2Index, 1)
        if (oldSkill) {
          availableAverage2Array.push(oldSkill)
        }
        availableAverage2Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeAverage3Index = availableAverage3Array.findIndex(element => element.name === chosenSkillName)
        availableAverage3Array.splice(removeAverage3Index, 1)
        if (oldSkill) {
          availableAverage3Array.push(oldSkill)
        }
        availableAverage3Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeAverage4Index = availableAverage4Array.findIndex(element => element.name === chosenSkillName)
        availableAverage4Array.splice(removeAverage4Index, 1)
        if (oldSkill) {
          availableAverage4Array.push(oldSkill)
        }
        availableAverage4Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        this.setState({
          great_skill: chosenSkillName,
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
      }
      else if (event.target.id === "create_character_good-skill-1_select") {
        let chosenSkillName = event.target.value
        let oldSkillName =  this.state.great_skill //state not changed yet
        let oldSkill = this.state.skills[this.state.skills.findIndex(element => element.name === oldSkillName)]

        let availableGreatArray = this.state.availableGreatSkills
        let availableGood2Array = this.state.availableGood2Skills
        let availableFair1Array = this.state.availableFair1Skills
        let availableFair2Array = this.state.availableFair2Skills
        let availableFair3Array = this.state.availableFair3Skills
        let availableAverage1Array = this.state.availableAverage1Skills
        let availableAverage2Array = this.state.availableAverage2Skills
        let availableAverage3Array = this.state.availableAverage3Skills
        let availableAverage4Array = this.state.availableAverage4Skills

        let removeGreatIndex = availableGreatArray.findIndex(element => element.name === chosenSkillName)
        availableGreatArray.splice(removeGreatIndex, 1)
        if (oldSkill) {
          availableGreatArray.push(oldSkill)
        }
        availableGreatArray.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeGood2Index = availableGood2Array.findIndex(element => element.name === chosenSkillName)
        availableGood2Array.splice(removeGood2Index, 1)
        if (oldSkill) {
          availableGood2Array.push(oldSkill)
        }
        availableGood2Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeFair1Index = availableFair1Array.findIndex(element => element.name === chosenSkillName)
        availableFair1Array.splice(removeFair1Index, 1)
        if (oldSkill) {
          availableFair1Array.push(oldSkill)
        }
        availableFair1Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeFair2Index = availableFair2Array.findIndex(element => element.name === chosenSkillName)
        availableFair2Array.splice(removeFair2Index, 1)
        if (oldSkill) {
          availableFair2Array.push(oldSkill)
        }
        availableFair2Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeFair3Index = availableFair3Array.findIndex(element => element.name === chosenSkillName)
        availableFair3Array.splice(removeFair3Index, 1)
        if (oldSkill) {
          availableFair3Array.push(oldSkill)
        }
        availableFair3Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeAverage1Index = availableAverage1Array.findIndex(element => element.name === chosenSkillName)
        availableAverage1Array.splice(removeAverage1Index, 1)
        if (oldSkill) {
          availableAverage1Array.push(oldSkill)
        }
        availableAverage1Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeAverage2Index = availableAverage2Array.findIndex(element => element.name === chosenSkillName)
        availableAverage2Array.splice(removeAverage2Index, 1)
        if (oldSkill) {
          availableAverage2Array.push(oldSkill)
        }
        availableAverage2Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeAverage3Index = availableAverage3Array.findIndex(element => element.name === chosenSkillName)
        availableAverage3Array.splice(removeAverage3Index, 1)
        if (oldSkill) {
          availableAverage3Array.push(oldSkill)
        }
        availableAverage3Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        let removeAverage4Index = availableAverage4Array.findIndex(element => element.name === chosenSkillName)
        availableAverage4Array.splice(removeAverage4Index, 1)
        if (oldSkill) {
          availableAverage4Array.push(oldSkill)
        }
        availableAverage4Array.sort((a, b) => {
          let nameA = a.name.toLowerCase(); // ignore upper and lowercase
          let nameB = b.name.toLowerCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          else if (nameA > nameB) {
            return 1;
          }
          else {
            return 0;
          }
        })

        this.setState({
          good_skill_1: chosenSkillName,
          availableGreatSkills: availableGreatArray,
          availableGood2Skills: availableGood2Array,
          availableFair1Skills: availableFair1Array,
          availableFair2Skills: availableFair2Array,
          availableFair3Skills: availableFair3Array,
          availableAverage1Skills: availableAverage1Array,
          availableAverage2Skills: availableAverage2Array,
          availableAverage3Skills: availableAverage3Array,
          availableAverage4Skills: availableAverage4Array
        })
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
      physical_stress_3: null,
      physical_stress_4: null,
      mental_stress_1: false,//calc will
      mental_stress_2: false,
      mental_stress_3: null,
      mental_stress_4: null,
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
      if (this.state.availableGreatSkills.length > 0) {
        return this.state.availableGreatSkills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "good_skill_1") {
      if (this.state.availableGood1Skills.length > 0) {
        return this.state.availableGood1Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "good_skill_2") {
      if (this.state.availableGood2Skills.length > 0) {
        return this.state.availableGood2Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "fair_skill_1") {
      if (this.state.availableFair1Skills.length > 0) {
        return this.state.availableFair1Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "fair_skill_2") {
      if (this.state.availableFair2Skills.length > 0) {
        return this.state.availableFair2Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "fair_skill_3") {
      if (this.state.availableFair3Skills.length > 0) {
        return this.state.availableFair3Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "average_skill_1") {
      if (this.state.availableAverage1Skills.length > 0) {
        return this.state.availableFair1Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "average_skill_2") {
      if (this.state.availableAverage2Skills.length > 0) {
        return this.state.availableFair2Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "average_skill_3") {
      if (this.state.availableAverage3Skills.length > 0) {
        return this.state.availableFair3Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
    else if (id === "average_skill_4") {
      if (this.state.availableAverage4Skills.length > 0) {
        return this.state.availableAverage4Skills.map((skill, i) => {
          return <option value={skill.name} key={i}>{skill.name}</option>
        })
      }
      else {
        return <option>No skills found</option>
      }
    }
  }

  populateStuntList() {
    //remove selected stunts from list
    if (this.state.validStunts.length > 0) {
      return this.state.validStunts.map((stunt, i) => {
        return <option value={stunt.name} key={i}>{stunt.name}</option>
      })
    }
    else {
      return <option>No stunts found</option>
    }
  }

  renderSkillInfo() {
    if (this.state.skills.length > 0) {
      return this.state.skills.map((skill, i) => {
        return <p>{skill.name}: {skill.desc}</p>
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
              <label>Name: </label><input id="create_character_name_input" type="text" onChange={this.handleInputChange} /><br />
              <label>Concept: </label><input id="create_character_concept_input" type="text" onChange={this.handleInputChange} /><br />
              <label>Trouble: </label><input id="create_character_trouble_input" type="text" onChange={this.handleInputChange} /><br />
              <label>Aspect 1: </label><input id="create_character_aspect-1_input" type="text" onChange={this.handleInputChange} /><br />
              <label>Aspect 2: </label><input id="create_character_aspect-2_input" type="text" onChange={this.handleInputChange} /><br />
              <label>Aspect 3: </label><input id="create_character_aspect-3_input" type="text" onChange={this.handleInputChange} /><br />
              <label>Great Skill: </label><select id="create_character_great-skill_select" type="text" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("great_skill")}
              </select><br />
              <label>Good Skill 1: </label><select id="create_character_good-skill-1_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("good_skill_1")}
              </select><br />
              <label>Good Skill 2: </label><select id="create_character_good-skill-2_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("good_skill_2")}
              </select><br />
              <label>Fair Skill 1: </label><select id="create_character_fair-skill-1_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("fair_skill_1")}
              </select><br />
              <label>Fair Skill 2: </label><select id="create_character_fair-skill-2_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("fair_skill_2")}
              </select><br />
              <label>Fair Skill 3: </label><select id="create_character_fair-skill-3_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("fair_skill_3")}
              </select><br />
              <label>Average Skill 1: </label><select id="create_character_average-skill-1_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("average_skill_1")}
              </select><br />
              <label>Average Skill 2: </label><select id="create_character_average-skill-2_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("average_skill_2")}
              </select><br />
              <label>Average Skill 3: </label><select id="create_character_average-skill-3_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("average_skill_3")}
              </select><br />
              <label>Average Skill 4: </label><select id="create_character_average-skill-4_select" onChange={this.handleInputChange}>
                <option disabled selected value> -- select an option -- </option>
                {this.populateSkillList("average_skill_4")}
              </select><br />


              <button onClick={(e) => this.handleSubmitCharacter(e)}>Create!</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
export default CreateCharacter;

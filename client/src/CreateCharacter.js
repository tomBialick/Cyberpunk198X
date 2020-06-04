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
      validStunts: []
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
        let tempSkills = this.state.skills
        let oldSkill = tempSkills[tempSkills.findIndex(element => element.name === oldSkillName)]
        let chosenSkillIndex = tempSkills.findIndex(element => element.name === chosenSkillName)

        if (oldSkill && oldSkill.selected) {
          delete oldSkill.selected
        }

        tempSkills[chosenSkillIndex].selected = "great_skill"

        this.setState({
          skills: tempSkills,
          great_skill: chosenSkillName
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
          good_skill_1: chosenSkillName
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
          good_skill_2: chosenSkillName
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
          fair_skill_1: chosenSkillName
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
          fair_skill_2: chosenSkillName
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
          fair_skill_3: chosenSkillName
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
          average_skill_1: chosenSkillName
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
          average_skill_2: chosenSkillName
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
          average_skill_3: chosenSkillName
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
          average_skill_4: chosenSkillName
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

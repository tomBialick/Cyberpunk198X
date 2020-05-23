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
      inventory: "" //Make it an object/array?

    }
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleSubmitCharacter = this.handleSubmitCharacter.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    if (this.state.isPlayer) {
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
            this.setState({skills: responseJson.body})
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
    if (event.target.value && event.target.id === "create_character_name_input") {
      this.setState({char_name: event.target.value});
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

    fetch( this.props.hosturl + '/player/persona', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: data_json
    }).then(response => {
      if (response.status < 400) {
        response.text().then((responseText) => {
          alert(responseJson);
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

  // TODO: Add create character form
  render() {
    return (
      <div>
        <h4>Create Character</h4>
        <button onClick={(e) => this.handleGoBack(e)}>Go Back</button>
        {this.state.skills}
        <div className="spacer">
        </div>
        <div id="create_character_div">
          <form id="create_character_form">
            <label>Name: </label><input id="create_character_name_input" type="text" onChange={this.handleInputChange} />
            <br />
            <button onClick={(e) => this.handleSubmitCharacter(e)}>Create!</button>
          </form>
        </div>
      </div>
    )
  }
}
export default CreateCharacter;

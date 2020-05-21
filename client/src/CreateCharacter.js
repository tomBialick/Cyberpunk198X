import React, {Component} from 'react';
import './sheets/CreateCharacter.css';

class CreateCharacter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: ""
    }
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
      </div>
    )
  }
}
export default CreateCharacter;

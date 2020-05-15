import React, {Component} from 'react';
import './sheets/GameRoom.css';

class GameRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: "",
      isPlayer: (this.props.role === "player"),
      characterList: []
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.playerOrGMContent = this.playerOrGMContent.bind(this);
  }

  componentDidMount() {
    if (this.state.isPlayer) {
      //fetch their characters
      fetch(this.state.hosturl + '/player/chars', {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(response => {
        if (response.status < 400) {
          response.json().then(responseJson => {
            this.setState({characterList: responseJson.body.characterList})
            return true
          })
        }
        else {
          return false
        }
      }).catch(error => {
        console.log("ERROR: " + error);
        alert("An error occurred. Please contact the admin(s) if this persists")
        return false
      })
    }
    else {

    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  playerOrGMContent() {
    if (this.state.isPlayer) {

    }
    else {

    }
  }

  render() {
    return (
      <div>
        <h3>Welcome to Cyberpunk198X</h3>
        <button id="logout_button" onClick={(e) => this.handleLogout(e)}>Logout</button>
        <div className="spacer">
        <div>
        {this.playerOrGMContent()}
      </div>
    )
  }
}
export default GameRoom;

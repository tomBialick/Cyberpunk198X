import React, {Component} from 'react';
import './sheets/GameRoom.css';
import CreateCharacter from './CreateCharacter.js'

class GameRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: "",
      isPlayer: (this.props.role === "player"),
      characterList: [],
      menuChoice: ""
    }
    this.handleLogout = this.handleLogout.bind(this);
    this.playerOrGMContent = this.playerOrGMContent.bind(this);
    this.handleGoBack = this.handleGoBack.bind(this);
    this.handleCreateCharacter = this.handleCreateCharacter.bind(this);
  }

  componentDidMount() {
    if (this.state.isPlayer) {
      //fetch their characters
      fetch(this.props.hosturl + '/player/chars', {
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
      console.log("ur a gm");
    }
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  handleGoBack() {
    this.setState({menuChoice: ""})
  }

  handleCreateCharacter(event) {
    event.preventDefault();
    this.setState({menuChoice: "create character"})
  }

  playerOrGMContent() {
    if (this.state.isPlayer) {
      if (this.state.menuChoice === "create character") {
        return (
          <CreateCharacter hosturl={this.props.hosturl} username={this.props.username} role={this.props.role} goBack={this.handleGoBack} />
        )
      }
      else {
        return (
          <div id="player_gameroom_content">
            <button onClick={(e) => this.handleCreateCharacter(e)}>Create Character</button>
            <div className="spacer">
            </div>
            <p>{this.state.characterList}</p>
          </div>
        )
      }
    }
    else {
      return (
        <div id="player_gameroom_content">
          <p>ur a gm</p>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        <h3>Welcome to Cyberpunk198X</h3>
        <button id="logout_button" onClick={(e) => this.handleLogout(e)}>Logout</button>
        <div className="spacer">
        </div>
        {this.playerOrGMContent()}
      </div>
    )
  }
}
export default GameRoom;

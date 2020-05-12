import React, {Component} from 'react';
import './sheets/GameRoom.css';

class GameRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: ""
    }
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.logout();
  }

  render() {
    return (
      <div>
        <h3>Welcome to Cyberpunk198X</h3>
        <button onClick={(e) => this.handleLogout(e)}>Logout</button>
      </div>
    )
  }
}
export default GameRoom;

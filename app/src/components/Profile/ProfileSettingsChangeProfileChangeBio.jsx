import React, { Component } from 'react';

class ChangeBio extends Component {
  constructor() {
    super();
    this.state = {
      newBio: ''
    }
  }

  handleOptionInputOnChange = (e) => {
    this.setState({newBio: e.target.value})
  }

  render() {
    return (
      <form action="/api/updateInfo/userBio" method="post">
        <div>
          <label for="bio">Bio:</label>
          <input 
            type="text" 
            name="bio" 
            value={this.state.newBio} 
            onChange={this.handleOptionInputOnChange}
          />
        </div>
      </form>
    );
  }
}

export default ChangeBio;
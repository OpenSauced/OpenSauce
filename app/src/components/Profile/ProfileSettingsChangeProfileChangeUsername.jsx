import React, { Component } from 'react';

class ChangeUsername extends Component {
  constructor() {
    super();
    this.state = {
      newUserName: ''
    }
  }

  handleOptionInputOnChange = (e) => {
    this.setState( {newUserName: e.target.value} )
  }

  render() {
    return (
      <form action="/api/updateInfo/username" method="post">
        <div>
          <label for="name">Name:</label>
          <input 
            type="text" 
            name="newUserName" 
            value={this.state.newUserName} 
            onChange={this.handleOptionInputOnChange}
          />
        </div>
      </form>
    );
  }
}

export default ChangeUsername;
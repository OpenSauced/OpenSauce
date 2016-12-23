import React, { Component } from 'react';

class ChangeEmail extends Component {
  constructor() {
    super();
    this.state = {
      newEmail: ''
    }
  }

  handleOptionInputOnChange = (e) => {
    this.setState({newEmail: e.target.value})
  }

  render() {
    return (
      <form action="/auth/updateInfo/email" method="post">
        <div>
          <label for="mail">Email:</label>
          <input 
            type="text" 
            name="email" 
            value={this.state.newEmail} 
            onChange={this.handleOptionInputOnChange}
          />
        </div>
      </form>
    );
  }
}

export default ChangeEmail;
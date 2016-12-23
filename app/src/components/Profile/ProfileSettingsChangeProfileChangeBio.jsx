import React, { Component } from 'react';

class ChangeBio extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form action="/api/users/updateInfo/bio" method="post">
        <div>
          <label forHtml="newBio">Bio:</label>
          <input
            type="text"
            name="newBio"
          />
        </div>
        <div>
          <input type="submit" value="Save"/>
        </div>
      </form>
    );
  }
}

export default ChangeBio;

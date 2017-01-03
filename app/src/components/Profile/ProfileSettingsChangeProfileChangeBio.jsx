import React, { Component } from 'react';

class ChangeBio extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <form formAction="/api/users/updateInfo/bio" method="post" encType="multipart/form-data" formTarget="_top">
        <div>
          <label htmlFor="newBio">Bio:</label>
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

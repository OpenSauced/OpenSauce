import React, { Component } from 'react';

import AppProfileInfo from './AppProfileInfo';
import AppProfileInfoMyRecipies from './AppProfileInfoMyRecipies';
import AppProfileInfoFavRecipies from './AppProfileInfoFavRecipies';

class AppProfile extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <h1>AppProfile</h1>
        <div><AppProfileInfo/></div>
        <div><AppProfileInfoMyRecipies/></div>
        <div><AppProfileInfoFavRecipies/></div>
      </div>
    )
  }
}

export default AppProfile;

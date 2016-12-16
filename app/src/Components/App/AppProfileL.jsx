import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppProfileLInfo from './AppProfileLInfo';
import AppProfileLInfoMyRecipies from './AppProfileLInfoMyRecipies';
import AppProfileLInfoFavRecipies from './AppProfileLInfoFavRecipies';

class AppProfileL extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
      <h1>AppProfileL</h1>
        <div><AppProfileLInfo/></div>
        <div><AppProfileLInfoMyRecipies/></div>
        <div><AppProfileLInfoFavRecipies/></div>
      </div>
    )
  }
}

export default AppProfileL;

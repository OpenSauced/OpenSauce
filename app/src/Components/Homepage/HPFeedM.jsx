import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import HPFeedMRecipeList from './HPFeedMRecipeList';

class HPFeedM extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>HPFeedM</h1>
        <HPFeedMRecipeList/>
      </div>
    )
  }
}

export default HPFeedM;

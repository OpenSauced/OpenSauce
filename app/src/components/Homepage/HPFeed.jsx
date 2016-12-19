import React, { Component } from 'react';

import HPFeedRecipeList from './HPFeedRecipeList';

class HPFeed extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>HPFeed</h1>
        <HPFeedRecipeList/>
      </div>
    )
  }
}

export default HPFeed;

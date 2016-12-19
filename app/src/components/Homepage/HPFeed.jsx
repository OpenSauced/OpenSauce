import React, { Component } from 'react';

import AppHeader from '../App/AppHeader';
import HPFeedSearch from './HPFeedSearch';
import HPFeedRecipeList from './HPFeedRecipeList';

class HPFeed extends Component {
  constructor() {
    super();
    
  }

  componentDiDMount() {
    this.state = {
      searchInputValue: ''
    };
  }

  handleSearchInputValue(e) {
    this.setState({searchInputValue: e.target.value});
  }

  render() {
    return (
      <div>
        <AppHeader>
          <HPFeedSearch/>
        </AppHeader>
        <HPFeedRecipeList/>
      </div>
    )
  }
}

export default HPFeed;

import React, { Component } from 'react';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import HPFeedSearch from './components/Homepage/HPFeedSearch';
import HPFeed from './components/Homepage/HPFeed';
import Footer from './components/Footer/Footer';


class RouteHomepage extends Component {
  constructor() {
    super();
    this.handleSearchInputValue = this.handleSearchInputValue.bind(this);
    this.state = {
      searchInputValue: ''
    };
  }

  handleSearchInputValue(e) {
    this.setState({searchInputValue: e.target.value});
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader>
          <HPFeedSearch searchInputValue={this.state.searchInputValue} handleSearchInputValue={this.handleSearchInputValue}/>
        </AppHeader>
        <HPFeed/>
        <Footer/>
      </div>
    );
  }
};

export default RouteHomepage;

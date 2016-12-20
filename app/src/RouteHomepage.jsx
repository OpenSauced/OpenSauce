import React, { Component } from 'react';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import HPFeedSearch from './components/Homepage/HPFeedSearch';
import HPFeed from './components/Homepage/HPFeed';


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
        <AppHeader title={'Welcome to OpenSauce'}>
          <HPFeedSearch searchInputValue={this.state.searchInputValue} handleSearchInputValue={this.handleSearchInputValue}/>
        </AppHeader>
        <HPFeed/>
        <Footer/>
      </div>
    );
  }
}

export default RouteHomepage;

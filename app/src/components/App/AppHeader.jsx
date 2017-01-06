import React, { Component } from 'react';

import SearchBar from '../../Containers/HomePage/SearchBar'


class AppHeader extends Component {
  constructor() {
    super();
  }

  render() {
    var searchBar = this.props.title === "Welcome to OpenSauce" ? <SearchBar /> : <div></div>
    return (
      <div className="container-fluid titleBarContainer">
        <div className="row mainTitle flex-items-xs-center">
          <h1>{this.props.title}</h1>
        </div>
        <div className='subTitle'>
            <h2>
                This is a sub title
            </h2>
        </div>
        {searchBar}
        {/*
        commented this out, wtf is it? unused....?
        {
          // This will check to see if a child component has
          // been passed into the header and then render it in the view
          this.props.children ? this.props.children : null
        }
        */}
      </div>
    );
  }
}

export default AppHeader;

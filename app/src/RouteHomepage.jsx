import React, { Component } from 'react';

import HeaderNav from './components/HeaderNav/HeaderNav';
import HPFeed from './components/Homepage/HPFeed';


class RouteHomepage extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <HPFeed/>
      </div>
    );
  }
};

export default RouteHomepage;

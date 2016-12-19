import React, { Component } from 'react';

class AppHeader extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1>Welcome to OpenSauce</h1>
        {this.props.children}
      </div>
    );
  }
}

export default AppHeader;

import React, { Component } from 'react';

class AppHeader extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>Welcome to OpenSauce</h1>
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default AppHeader;

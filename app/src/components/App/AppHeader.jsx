import React, { Component } from 'react';

class AppHeader extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <h1>{this.props.title}</h1>
        </div>
        {
          // This will check to see if a child component has
          // been passed into the header and then render it in the view
          this.props.children ? this.props.children : null
        }
      </div>
    );
  }
}

export default AppHeader;

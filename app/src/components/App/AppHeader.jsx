import React, { Component } from 'react';

class AppHeader extends Component {
  constructor() {
    super();
  }

  render() {
    var style = this.props.style ? this.props.style : { 'backgroundImage' : 'url(./assets/imageRotation/hpBg_' +  Math.floor(Math.random() * 13) + '.jpg)' }
    return (
      <div className="row d-flex flex-column titleBarContainer" style={style}>
        <div className="mainTitle">
          <h1>{this.props.title}</h1>
        </div>
        <div className="subTitle">
            <h2>
                {this.props.subTitle ? this.props.subTitle : null}
            </h2>
        </div>
        <div className="app-header-child">
        {
          // This will check to see if a child component has
          // been passed into the header and then render it in the view
          this.props.children ? this.props.children : null
        }
        </div>
      </div>
    );
  }
}

export default AppHeader;

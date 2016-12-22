import React, { Component } from 'react';

class ChangePassword extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        YOU CAN CHANGE YOUR PASSWORD (O.0)..... not now, but you will be able to...
      </div>
    );
  }
}

export default ChangePassword;

///// Working on this - redux

// function mapStateToProps (state) {
//   console.log('RouteProfile.js - STATE: ', state.userData)
//   return { userData: state.userData }
// }

// export default connect(mapStateToProps)(RouteProfile) 
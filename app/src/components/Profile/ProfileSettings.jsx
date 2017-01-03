import React, { Component } from 'react';

import ProfileSettingsUserImage from './ProfileSettingsUserImage';
import ProfileSettingsChangeProfileInfo from './ProfileSettingsChangeProfileInfo'

class ProfileSettings extends Component {
  constructor() {
    super();
    this.state = {
      currentPage: 'ProfileSettings'
    }
  }

  changeState () {
    console.log('cliiiiiiiiiiiiiiiiiiiiiiiiiiiicked')
    console.log('this.state ', this.state)
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-3">
          <div id="ProfileChangeName" onClick={this.changeState.bind(this)} > Change User Profile Image </div>
        </div>
        <ProfileSettingsChangeProfileInfo/>
      </div>
    );
  }
}

export default ProfileSettings;


////Notes:
// removed: <ProfileSettingsUserImage/>


          // <div id="ProfileChangeUsername" onClick={} > Change User Profile Image </div>
          // <div id="ProfileChangeEmail" onClick={} > Change User Profile Image </div>
          // <div id="ProfileChangePassword" onClick={} > Change User Profile Image </div>
          // <div id="ProfileChangeBio" onClick={} > Change User Profile Image </div>
          // <div id="ProfileChangeProfilePicture" onClick={} > Change User Profile Image </div>
        

// { () => {
//             switch (this.state.currentPage) {
//               case ( 'ProfileSettings' ):
//                 return <

//               case ( 'ChangeName' ):

//               case ( 'ChangeUsername' ):

//               case ( 'ChangeEmail' ):

//               case ( 'ChangePassword' ):

//               case ( 'ChangeBio' ):

//               case ( 'ChangeProfilePicture' ):

//               default:
//                 <ProfileSettingsUserImage/>
//             }
//           }
//         }


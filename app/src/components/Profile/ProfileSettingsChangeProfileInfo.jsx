import React, { Component } from 'react';

//Components
import ProfileSettingsChangeProfileInput from './ProfileSettingsChangeProfileInput';
import ChangePassword from './ProfileSettingsChangeProfileChangePassword';
import ChangeEmail from './ProfileSettingsChangeProfileChangeEmail';
import ChangeUsername from './ProfileSettingsChangeProfileChangeUsername';
import ChangeName from './ProfileSettingsChangeProfileName';
import ChangeBio from './ProfileSettingsChangeProfileChangeBio';
import ChangeProfilePicture from './ProfileSettingsChangeProfileChangeProfilePicture';

//Redux
import { connect } from 'react-redux';

class ProfileSettingsChangeProfileInfo extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="col-xs-9">
          <h2>User Profile Settings</h2>
          <div className="row">
            <div className="col-xs">
              <h3>Change Your UserName</h3>
              <ChangeUsername/>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-xs">
              <h3>Change Your Name</h3>
              <ChangeName/>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col-xs">
              <h3>Change Your Email</h3>
              <ChangeEmail/>
            </div>
          </div>
          <hr/>
          <div className="row">
            <h3>Change Your Password</h3>
            <ChangePassword/>
          </div>
          <div className="row">
            <h3>Change Your Bio</h3>
            <ChangeBio/>
          </div>
          <div className="row">
            <h3>Change Your Photo</h3>
            <ChangeProfilePicture/>
          </div>

        </div>
    );
  }
}

function mapStateToProps (state) {
  return state.userData
}

export default connect(mapStateToProps)(ProfileSettingsChangeProfileInfo);

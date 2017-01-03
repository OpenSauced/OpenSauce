import React, { Component } from 'react';

import ProfileSettingsUserImage from './ProfileSettingsUserImage';

class ProfileSettings extends Component {
  constructor() {
    super();  
  }

  render() {
    return (
      // this will show up as a sidebar on the profile settings page
      <div className="col-xs-3">

        <ProfileSettingsUserImage/>
        
        {/* Each of these buttons corresponds to a case in RouteProfile
          * clicking one of the buttons will change what component renders in
          * ProfileSettingsChangeProfileInfo.js
        */}
        <button name="name" onClick={ this.props.renderClick }> Change your name </button>
        <button name="username" onClick={ this.props.renderClick }>Change your username</button>
        <button name="bio" onClick={ this.props.renderClick }> Change your bio </button>
        <button name="email" onClick={ this.props.renderClick }>Change your email</button>
        <button name="password" onClick={ this.props.renderClick }> Change your password</button>
        <button name="profilePicture" onClick={ this.props.renderClick }>Change your profile picture</button>
      
      </div>
    );
  }
}

export default ProfileSettings;

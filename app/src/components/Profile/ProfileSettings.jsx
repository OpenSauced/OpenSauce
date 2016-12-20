import React, { Component } from 'react';

import ProfileSettingsUserImage from './ProfileSettingsUserImage';
import ProfileSettingsChangeProfileInfo from './ProfileSettingsChangeProfileInfo'

class ProfileSettings extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="row">
        <ProfileSettingsUserImage/>
        <ProfileSettingsChangeProfileInfo/>
      </div>
    );
  }
}

export default ProfileSettings;

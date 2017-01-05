import React, { Component } from 'react';

import ProfileSettingsUserImage from './ProfileSettingsUserImage';

import { connect } from 'react-redux'

class ProfileSettings extends Component {
  constructor() {
    super();  
  }

  render() {
    // This component will show up as a sidebar on the 'Change Profile' page
    return (
      <div className="col-xs-3">
        <ProfileSettingsUserImage image={ this.props.userData.user_image}/>
        {/* Each of the buttons below corresponds to a case in RouteProfile
          * clicking one of the buttons will change what component renders in
          * ProfileSettingsChangeProfileInfo.js
        */}
        <button name="name"           onClick={ this.props.renderClick }> Change your name </button>
        <button name="username"       onClick={ this.props.renderClick }> Change your username </button>
        <button name="bio"            onClick={ this.props.renderClick }> Change your bio </button>
        <button name="email"          onClick={ this.props.renderClick }> Change your email </button>
        <button name="password"       onClick={ this.props.renderClick }> Change your password </button>
        <button name="profilePicture" onClick={ this.props.renderClick }> Change your profile picture </button>
      
      </div>
    );
  }
}

function mapStateToProps (state){
  return state.userData
}

export default connect(mapStateToProps)(ProfileSettings);

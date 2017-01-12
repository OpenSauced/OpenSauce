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
      <div className="col-12">
        {/* Each of the buttons below corresponds to a case in RouteProfile
          * clicking one of the buttons will change what component renders in
          * ProfileSettingsChangeProfileInfo.js
        */}
        <div className="row justify-content-around buffer">
          <ProfileSettingsUserImage image={ this.props.userData.user_image}/>
          <button className="btn btn-secondary col-2" name="profilePicture" onClick={ this.props.renderClick }> Edit your profile picture </button>
        </div>
        <div className="row justify-content-around buffer">
          <p className="col-4"><h5>Name:</h5> {this.props.userData.first_name + ' ' + this.props.userData.last_name}</p>        
          <button className="btn btn-secondary col-2" name="name" onClick={ this.props.renderClick }> Edit your name </button>
        </div>
        <div className="row justify-content-around buffer">
          <p className="col-4"><h5>Email:</h5> {this.props.userData.email}</p>
          <button className="btn btn-secondary col-2" name="email" onClick={ this.props.renderClick }> Edit your email </button>
        </div>
        <div className="row justify-content-around buffer">
          <p className="col-4"><h5>Username:</h5> {this.props.userData.username}</p>
          <button className="btn btn-secondary col-2" name="username" onClick={ this.props.renderClick }> Edit your username </button>  
        </div>
        <div className="row justify-content-around buffer">
          <p className="col-4"><h5>Bio:</h5> {this.props.userData.bio}</p>
          <button className="btn btn-secondary col-2" name="bio" onClick={ this.props.renderClick }> Edit your bio </button>
        </div>
        <div className="row justify-content-around buffer">
          <p className="col-4"><h5>Password:</h5>...</p>
          <button className="btn btn-secondary col-2" name="password" onClick={ this.props.renderClick }> Edit your password </button>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state){
  return state.userData
}

export default connect(mapStateToProps)(ProfileSettings);

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
        <div className="row justify-content-around">
          <ProfileSettingsUserImage image={ this.props.userData.user_image}/>
          <a className="col-2" href="#profile"><button className="btn btn-secondary w-100" name="profilePicture" onClick={ this.props.renderClick }> Edit your profile picture </button></a>
        </div>
        <div className="row justify-content-around">
          <p className="col-4"><h5>Name:</h5> {this.props.userData.first_name + ' ' + this.props.userData.last_name}</p>        
          <a className="col-2" href="#"><button className="btn btn-secondary w-100" name="name" onClick={ this.props.renderClick }> Edit your name </button></a>
        </div>
        <div className="row justify-content-around">
          <p className="col-4"><h5>Email:</h5> {this.props.userData.email}</p>
          <a className="col-2" href="#"><button className="btn btn-secondary w-100" name="email" onClick={ this.props.renderClick }> Edit your email </button></a>
        </div>
        <div className="row justify-content-around">
          <p className="col-4"><h5>Username:</h5> {this.props.userData.username}</p>
          <a className="col-2" href="#"><button className="btn btn-secondary w-100" name="username" onClick={ this.props.renderClick }> Edit your username </button> </a> 
        </div>
        <div className="row justify-content-around">
          <p className="col-4"><h5>Bio:</h5> {this.props.userData.bio}</p>
          <a className="col-2" href="#"><button className="btn btn-secondary w-100" name="bio" onClick={ this.props.renderClick }> Edit your bio </button></a>
        </div>
        <div className="row justify-content-around">
          <p className="col-4"><h5>Password:</h5>...</p>
          <a className="col-2" href="#"><button className="btn btn-secondary w-100" name="password" onClick={ this.props.renderClick }> Edit your password </button></a>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state){
  return state.userData
}

export default connect(mapStateToProps)(ProfileSettings);

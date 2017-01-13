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
        <hr/>
        <div className="row justify-content-around mb-2 pb-2 mt-0 pt-0">
          <ProfileSettingsUserImage image={ this.props.userData.user_image}/>
          <a className="col-12 col-sm-6 col-md-3 d-flex" href="#profile"><button className="btn btn-secondary w-100 align-self-center" name="profilePicture" onClick={ this.props.renderClick }> Edit your profile picture </button></a>
        </div>
        <hr/>
        <div className="row justify-content-around my-2 py-2">
          <p className="col-12 col-md-4"><h5>Name:</h5> {this.props.userData.first_name + ' ' + this.props.userData.last_name}</p>        
          <a className="col-12 col-sm-6 col-md-3 d-flex" href="#"><button className="btn btn-secondary w-100 align-self-center" name="name" onClick={ this.props.renderClick }> Edit your name </button></a>
        </div>
        <hr/>
        <div className="row justify-content-around my-2 py-2">
          <p className="col-12 col-md-4"><h5>Email:</h5> {this.props.userData.email}</p>
          <a className="col-12 col-sm-6 col-md-3 d-flex" href="#"><button className="btn btn-secondary w-100 align-self-center" name="email" onClick={ this.props.renderClick }> Edit your email </button></a>
        </div>
        <hr/>
        <div className="row justify-content-around my-2 py-2">
          <p className="col-12 col-md-4"><h5>Username:</h5> {this.props.userData.username}</p>
          <a className="col-12 col-sm-6 col-md-3 d-flex" href="#"><button className="btn btn-secondary w-100 align-self-center" name="username" onClick={ this.props.renderClick }> Edit your username </button> </a> 
        </div>
        <hr/>
        <div className="row justify-content-around my-2 py-2">
          <p className="col-12 col-md-4"><h5>Bio:</h5> {this.props.userData.bio}</p>
          <a className="col-12 col-sm-6 col-md-3 d-flex" href="#"><button className="btn btn-secondary w-100 align-self-center" name="bio" onClick={ this.props.renderClick }> Edit your bio </button></a>
        </div>
        <hr/>
        <div className="row justify-content-around my-2 py-2">
          <p className="col-12 col-md-4"><h5>Password:</h5>...</p>
          <a className="col-12 col-sm-6 col-md-3 d-flex" href="#"><button className="btn btn-secondary w-100 align-self-center" name="password" onClick={ this.props.renderClick }> Edit your password </button></a>
        </div>
      </div>
    );
  }
}

function mapStateToProps (state){
  return state.userData
}

export default connect(mapStateToProps)(ProfileSettings);

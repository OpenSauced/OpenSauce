import React, { Component } from 'react';

import ProfileSettingsChangeProfileInput from './ProfileSettingsChangeProfileInput'

class ProfileSettingsChangeProfileInfo extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        displayName: 'Will Schwanke',
        emailAddress: 'wschwanke@opensauce.com',
        currentPassword: '****************',
        newPassword: ''
      }
    }
  }

  handleOptionInputOnChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  render() {
    return (
      <div className="col-xs-9">
        <h2>User Profile Settings</h2>
        <div className="row">
          <div className="col-xs">
            <h3>Change Your Display Name</h3>
            <label>
              <span>Your Name:</span>
              <input type="text" name="displayName" value={this.state.options.displayName} onChange={this.handleOptionInputOnChange}/>
            </label>
          </div>
        </div>
        <hr/>
        <div className="row">
          <h3>Change Your Email</h3>
          <div className="col-xs">
            <label>
              <span>Email:</span>
              <input type="text" name="emailAddress" value={this.state.options.emailAddress} onChange={this.handleOptionInputOnChange}/>
            </label>
          </div>
        </div>
        <hr/>
        <div className="row">
          <h3>Change Your Password</h3>
          <div className="col-xs">
            <label>
              <span>Current Password:</span>
              <input type="text" name="currentPassword" value={this.state.options.currentPassword} onChange={this.handleOptionInputOnChange}/>
            </label>
            <label>
              <span>New Password:</span>
              <input type="text" name="newPassword" value={this.state.options.newPassword} onChange={this.handleOptionInputOnChange}/>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileSettingsChangeProfileInfo;

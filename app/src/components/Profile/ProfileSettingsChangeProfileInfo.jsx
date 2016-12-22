import React, { Component } from 'react';

//Components
import ProfileSettingsChangeProfileInput from './ProfileSettingsChangeProfileInput';
import ChangeProfile from './ProfileSettingsChangeProfileChangePassword';

//Redux
import { connect } from 'react-redux';

class ProfileSettingsChangeProfileInfo extends Component {
  constructor() {
    super();
    this.state = {
      options: {
        displayName: '',
        emailAddress: '',
        currentPassword: '*',
        newPassword: ''
      }
    }
  }

  handleOptionInputOnChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  concatUsername () {
    console.log('PROFSETTINGSCHGPROFINFO state/props: ', this.props)
    var first = this.props.userData.firstName;
    var last = this.props.userData.lastName;
    var fullName = first +" "+ last;
    return fullName;
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
                <input type="text" name="displayName" value={this.concatUsername()} onChange={this.handleOptionInputOnChange}/>
              </label>
            </div>
          </div>
          <hr/>
          <div className="row">
            <h3>Change Your Email</h3>
            <div className="col-xs">
              <label>
                <span>Email:</span>
                <input type="text" name="emailAddress" value={this.props.userData.email} onChange={this.handleOptionInputOnChange}/>
              </label>
            </div>
          </div>
          <hr/>
          <div className="row">
            <h3>Change Your Password</h3>
            <ChangeProfile/>
          </div>
        </div>
    );
  }
}

function mapStateToProps (state) {
  console.log('RouteProfile.js - STATE: ', state)
  return { userData: state.userData }
}

export default connect(mapStateToProps)(ProfileSettingsChangeProfileInfo);
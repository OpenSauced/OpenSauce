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
    var first = this.props.userData.first_name;
    var last = this.props.userData.last_name;
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
  return state.userData
}

export default connect(mapStateToProps)(ProfileSettingsChangeProfileInfo);
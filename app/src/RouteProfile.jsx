import React, { Component } from 'react';

// These are going to be on pretty much every route component page. Its the nav, header, and footer for the page
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import ProfileSettings from './components/Profile/ProfileSettings';
import ProfileSettingsChangeProfileInfo from './components/Profile/ProfileSettingsChangeProfileInfo'
import { connect } from 'react-redux';

class RouteProfile extends Component {
  constructor() {
    super();
    this.state = {
      renderInputs: 'profile'
    }
    this.handleSelectChangeProfile = this.handleSelectChangeProfile.bind(this);
  }

  handleSelectChangeProfile(e) {
    // Clicking on a button in ProfileSettings will trigger this function to run.
    // This function sets state and will modify what shows up on the screen through
    //    ProfileSettingsChangeProfileInfo component.
    let render = '';

    switch (e.target.name)  {
      case 'name':
        render = 'name'
        break;
      case 'username':
        render = 'username'
        break;
      case 'bio':
        render = 'bio'
        break;
      case 'email':
        render = 'email'
        break;
      case 'password':
        render = 'password'
        break;
      case 'profilePicture':
        render = 'profilePicture'
        break;
      default:
        render = 'profile'
        break;
    }

    this.setState({
      renderInputs: render
    });

  }

  render() {
    return (
      <div className="container-flex wholeContainer">
        <HeaderNav/>
        <AppHeader title={`Welcome ${this.props.userData.first_name} ${this.props.userData.last_name}!`}/>

        <div className="myProfilePageContainer container-fluid">
          {/*side bar for selecting what you want to change*/}
          <ProfileSettings renderClick={this.handleSelectChangeProfile}/>
          {/*selected change will show up here*/}
          <ProfileSettingsChangeProfileInfo renderInputs={this.state.renderInputs}/>
        </div>

        <Footer/>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state.userData
}

export default connect(mapStateToProps)(RouteProfile)

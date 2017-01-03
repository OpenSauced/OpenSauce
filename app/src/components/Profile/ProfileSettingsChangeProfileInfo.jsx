import React, { Component } from 'react';

//Components
import ChangePassword from './ProfileSettingsChangeProfileChangePassword';
import ChangeEmail from './ProfileSettingsChangeProfileChangeEmail';
import ChangeUsername from './ProfileSettingsChangeProfileChangeUsername';
import ChangeName from './ProfileSettingsChangeProfileName';
import ChangeBio from './ProfileSettingsChangeProfileChangeBio';
import ChangeProfilePicture from './ProfileSettingsChangeProfileChangeProfilePicture';

//Redux
import { connect } from 'react-redux';

class ProfileSettingsChangeProfileInfo extends Component {
  constructor() {
    super();

    this.state = {
      currentComponent: 'profile'
    }

    this.componentObj = {
      profile: <h1> Your current profile <br/>
        (TODO: fill with current profile info, <br/>
        having trouble getting props from mapStateToProps)
      </h1>,
      name: <ChangeName/>,
      username: <ChangeUsername/>,
      bio: <ChangeBio/>,
      email: <ChangeEmail/>,
      password: <ChangePassword/>,
      profilePicture: <ChangeProfilePicture/>
    }

    
  }

  //  If button in ProfileSettings is clicked, props will update, this will
  //  trigger a change of state and will render a corresponding component 
  //  in this.componentObj.
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.renderInputs !== this.props.renderInputs){
      this.setState( { currentComponent: this.props.renderInputs } )
    }
  }

  render() {
    return (
      <div>
        { this.componentObj[ this.state.currentComponent ] }
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state.userData
}

// You have been granted access to Redux
export default connect(mapStateToProps)(ProfileSettingsChangeProfileInfo);

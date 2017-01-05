import React, { Component } from 'react';

//Components
import ChangePassword from './ProfileSettingsChangeProfileChangePassword';
import ChangeEmail from './ProfileSettingsChangeProfileChangeEmail';
import ChangeUsername from './ProfileSettingsChangeProfileChangeUsername';
import ChangeName from './ProfileSettingsChangeProfileName';
import ChangeBio from './ProfileSettingsChangeProfileChangeBio';
import ChangeProfilePicture from './ProfileSettingsChangeProfileChangeProfilePicture';
import CurrentProfile from './ProfileSettingsCurrentProfile'

//Redux
import { connect } from 'react-redux';

class ProfileSettingsChangeProfileInfo extends Component {
    constructor() {
        super();

        this.state = {
          currentComponent: '',
          componentObj: {}
        }
        console.log('state: ',this.state)
    }

    componentWillMount () {
        const data = this.props.userData
        this.setState({ 
            currentComponent: 'profile', 
            componentObj: {
                profile:  <CurrentProfile data={ data }/>,
                name:     <ChangeName     data={ data }/>,
                username: <ChangeUsername data={ data.username }/>,
                bio:      <ChangeBio      data={ 'bio biiiiiiatch' }/>,
                email:    <ChangeEmail    data={ data.email }/>,
                password: <ChangePassword data={ 'hidden' }/>,
                profilePicture: <ChangeProfilePicture data={ data.user_image }/>
            }
        })
    }


    //  If button in ProfileSettings is clicked, props will update, this will
    //  trigger a change of state and will render a corresponding component
    //  in this.componentObj.
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.renderInputs !== this.props.renderInputs) {
            this.setState({ currentComponent: this.props.renderInputs })
        }
    }

    render() {
        return (
            <div>
                { this.state.componentObj[ this.state.currentComponent ] }
            </div>
        );
    }
    
}

function mapStateToProps(state) {
    return state.userData
}

// You have been granted access to Redux
export default connect(mapStateToProps)(ProfileSettingsChangeProfileInfo);

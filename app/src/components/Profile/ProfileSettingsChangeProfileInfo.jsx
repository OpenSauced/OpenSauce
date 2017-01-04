import React, {Component} from 'react';

//Components
import ChangePassword from './ProfileSettingsChangeProfileChangePassword';
import ChangeEmail from './ProfileSettingsChangeProfileChangeEmail';
import ChangeUsername from './ProfileSettingsChangeProfileChangeUsername';
import ChangeName from './ProfileSettingsChangeProfileName';
import ChangeBio from './ProfileSettingsChangeProfileChangeBio';
import ChangeProfilePicture from './ProfileSettingsChangeProfileChangeProfilePicture';

//Redux
import {connect} from 'react-redux';

class ProfileSettingsChangeProfileInfo extends Component {
    constructor() {
        super();

        this.state = {
            currentComponent: 'profile'
        }

        this.componentObj = {
            profile: <h1>
                Your current profile
                <br/>
                (TODO: fill with current profile info)
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
        if (prevProps.renderInputs !== this.props.renderInputs) {
            this.setState({currentComponent: this.props.renderInputs})
        }
    }

    render() {
        return (
            <div>
                {this.componentObj[this.state.currentComponent]}
            </div>
        );
    }
    // constructor() {
    //     super();
    // }
    //
    // render() {
    //     return (
    //         <div className="col-xs-9">
    //             <h2>User Profile Settings</h2>
    //             <div className="row">
    //                 <div className="col-xs">
    //                     <h3>Change Your UserName</h3>
    //                     <ChangeUsername/>
    //                 </div>
    //             </div>
    //             <hr/>
    //             <div className="row">
    //                 <div className="col-xs">
    //                     <h3>Change Your Name</h3>
    //                     <ChangeName/>
    //                 </div>
    //             </div>
    //             <hr/>
    //             <div className="row">
    //                 <div className="col-xs">
    //                     <h3>Change Your Email</h3>
    //                     <ChangeEmail/>
    //                 </div>
    //             </div>
    //             <hr/>
    //             <div className="row">
    //                 <div className="col-xs">
    //                     <h3>Change Your Password</h3>
    //                     <ChangePassword/>
    //                 </div>
    //             </div>
    //             <hr/>
    //             <div className="row">
    //                 <div className="col-xs">
    //                     <h3>Change Your Bio</h3>
    //                     <ChangeBio/>
    //                 </div>
    //             </div>
    //             <hr/>
    //             <div className="row">
    //                 <div className="col-xs">
    //                     <h3>Change Your Photo</h3>
    //                     <ChangeProfilePicture/>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

}

function mapStateToProps(state) {
    return state.userData
}

// You have been granted access to Redux
export default connect(mapStateToProps)(ProfileSettingsChangeProfileInfo);

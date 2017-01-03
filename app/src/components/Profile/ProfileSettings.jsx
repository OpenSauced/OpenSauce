import React, { Component } from 'react';

import ProfileSettingsUserImage from './ProfileSettingsUserImage';
import ProfileSettingsChangeProfileInfo from './ProfileSettingsChangeProfileInfo'

class ProfileSettings extends Component {
  constructor() {
    super();
    this.state = {
      renderInputs: 'ProfileSettings'
    }
    this.handleSelectHowToAddRecipe = this.handleSelectHowToAddRecipe.bind(this);
  }

  //old testing function, use if wanted
  changeState () {
    console.log('cliiiiiiiiiiiiiiiiiiiiiiiiiiiicked')
    console.log('this.state ', this.state)
  }

  handleSelectHowToChangeProfile(e) {
    // you will be clicking on one of two buttons in AppRecipeTypeOfInsert.js
    let render = '';

    if(e.target.name === 'manual'){
      render = 'manual';
    } else {
      render = 'link';
    };

    this.setState({
      renderInputs: render
    });
    
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-3">
          {/*<div id="ProfileChangeName" onClick={this.changeState.bind(this)} > Change User Profile Image </div>*/}
          {/* add and change name of ProfileSettingsUserImage to reflect pattern in 
              RouteAddRecipe > AddRecipe > AddRecipeTypeofInsert
             */}
        </div>
        {/* TODO: add reference to render props in the below component */}
        <ProfileSettingsChangeProfileInfo renderInputs={this.state.renderInputs}/>
      </div>
    );
  }
}

export default ProfileSettings;


////Notes:
// removed: <ProfileSettingsUserImage/>


          // <div id="ProfileChangeUsername" onClick={} > Change User Profile Image </div>
          // <div id="ProfileChangeEmail" onClick={} > Change User Profile Image </div>
          // <div id="ProfileChangePassword" onClick={} > Change User Profile Image </div>
          // <div id="ProfileChangeBio" onClick={} > Change User Profile Image </div>
          // <div id="ProfileChangeProfilePicture" onClick={} > Change User Profile Image </div>
        

// { () => {
//             switch (this.state.currentPage) {
//               case ( 'ProfileSettings' ):
//                 return <

//               case ( 'ChangeName' ):

//               case ( 'ChangeUsername' ):

//               case ( 'ChangeEmail' ):

//               case ( 'ChangePassword' ):

//               case ( 'ChangeBio' ):

//               case ( 'ChangeProfilePicture' ):

//               default:
//                 <ProfileSettingsUserImage/>
//             }
//           }
//         }


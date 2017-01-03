import React from 'react';

const ProfileSettingsUserImage = ({image}) => {
  const arrayOfChanges = [
    { text:'name' },
    { text:'name' },
    { text:'name' },
    { text:'name' },
    { text:'name' }
  ]

  // ALTER TEXT > this creates a button component (so only one will need to be created and not 10)
  // const alterText = () => {
  // }

  // 
  return (
    <div className="col-xs-3">
      <div className="col-xs-3">
        <button name="changeName" onClick={renderClick}>Change your name</button>
      </div>
      <div>
        <button name="link" onClick={renderClick}>Get Recipe from Other Site</button>
      </div>
      <div>
        <button name="link" onClick={renderClick}>Get Recipe from Other Site</button>
      </div>
      Change User Profile Image
    </div>
  );
}

export default ProfileSettingsUserImage;


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
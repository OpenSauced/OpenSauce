import React from 'react';

const ProfileSettingsUserImage = ({image}) => { 
    return (
      <div>
        Profile image will go here
      </div>
    );
}

export default ProfileSettingsUserImage;

// Todo: get profile image to show up
// ++ Redux works on its parent component, but for some reason there is trouble getting 
//    access to the redux props (mapStateToProps)

// class ProfileSettingsUserImage extends Component { 
//   constructor() {
//     super();
//     this.state = {
//       image: null
//     }
//   }

//   componentDidMount () {
//     this.setState({image:this.data})
//   }
//   render() {
//     return (
//       <div>
//         Profile image
//       {/*{this.state.image}*/}
//       </div>
//     );
//   }
// }

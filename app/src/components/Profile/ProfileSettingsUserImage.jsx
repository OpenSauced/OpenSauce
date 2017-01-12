import React from 'react';

const ProfileSettingsUserImage = ({image}) => { 
	console.log("ARGH",{image})
    return (
      <div className="col-4">
        <span className="">
        	<img className="navProfPic" src={ image.public_url || image.placeholder } width="100" height="100"/>
        </span>
      </div>
    );
}

export default ProfileSettingsUserImage;
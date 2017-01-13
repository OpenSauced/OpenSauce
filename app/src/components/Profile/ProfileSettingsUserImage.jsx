import React from 'react';

const ProfileSettingsUserImage = ({image}) => {
	console.log("ARGH",{image})
    return (
      <div className="col-12 col-sm-12 col-md-4">
        	<div className="profileImageBlock" style={{'backgroundImage': 'url(' +  image.public_url || image.placeholder + ')' }}></div>
      </div>
    );
}

export default ProfileSettingsUserImage;

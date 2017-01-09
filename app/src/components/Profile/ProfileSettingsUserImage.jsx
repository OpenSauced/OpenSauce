import React from 'react';

const ProfileSettingsUserImage = ({image}) => { 
    return (
      <div className="row">
        <span className="col-12"><img src={ image.public_url || image.placeholder } width="100" height="100"/></span>
      </div>
    );
}

export default ProfileSettingsUserImage;
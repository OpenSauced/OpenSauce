import React from 'react';

const CurrentProfile = ({data}) => { 
    return (
      <div>
        <span>
          <img src={data.user_image.placeholder} width="150" height="150"/>
        </span>
        <p> Bio: .... </p>
        <p> Name: {data.first_name + ' ' + data.last_name}</p>
        <p> Email: {data.email}</p>
        
      </div>
    );
}

export default CurrentProfile;
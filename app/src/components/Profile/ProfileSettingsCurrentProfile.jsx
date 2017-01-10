import React from 'react';

import { connect } from 'react-redux'

// component recieves all userData as props
const CurrentProfile = ({data}) => { 
    return (
      <div class="row">
        <span className="col-12">
          <img src={data.user_image.public_url || data.user_image.placeholder} width="150" height="150"/>
        </span>
        <div className="col-12">
          <p>Name: {data.first_name + ' ' + data.last_name}</p>
          <p>Email: {data.email}</p>
          <p>Bio: {data.bio}</p>
        </div>
      </div>
    );
}

export default CurrentProfile;
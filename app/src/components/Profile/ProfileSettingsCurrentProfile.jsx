import React from 'react';

import { connect } from 'react-redux'

import ProfileSettingsUserImage from './ProfileSettingsUserImage';


// component recieves all userData as props
const CurrentProfile = ({data}) => {
    return (
      <div class="row  mx-auto">
        <div className="col-12">
          <ProfileSettingsUserImage image={data.user_image}/>
          <p><h5>Name:</h5> {data.first_name + ' ' + data.last_name}</p>
          <p><h5>Email:</h5> {data.email}</p>
          <p><h5>Username:</h5> {data.username}</p>
          <p><h5>Bio:</h5> {data.bio}</p>
        </div>
      </div>
    );
}

export default CurrentProfile;

import React, { Component } from 'react';
import { Router, Link } from 'react-router';

//Redux and async functions
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//Axios
import axios from 'axios'

class HeaderNavProfile extends Component {
  constructor() {
    super();
  }

  render() {
    console.log(this.props.userData)
    return (
      <div className="col-xs-4">
        <div className="row"> HI
          {/*<img src={this.props.userData.user_image.public_url} alt="" title=""/>*/}
        </div>
        <div className="row">
          <span>Hey!</span>
        </div>
        <div className="row">
          <Link to="/profile">View Profile Settings</Link>
        </div>
      </div>
    );
  }
}

export default HeaderNavProfile;

////// Don't delete 
            // {/*<img src={this.props.userData.user_image.public_url} alt="" title=""/>*/}
            // <span>Hey, {`${this.props.userData.first_name} ${this.props.userData.last_name}`}!</span>
            // <Link to="/profile">View Profile Settings</Link>

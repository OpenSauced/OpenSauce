import React, { Component } from 'react';
import { Router, Link } from 'react-router';

//Redux and async functions
import axios from 'axios';
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class HeaderNavProfile extends Component {
  constructor() {
    super();
  }

  // Once username can get got from cookie, comment back in
  componentDidMount() {
    axios.get('/api/users/getUserCookie')
    .then((cookie) => {
     this.props.getUserData(cookie.data);
    })
  }

  render() {
    return (
      <div className="col-xs-4">
        <div className="row">
          <img src={this.props.userData.user_image.public_url} alt="" title=""/>
        </div>
        <div className="row">
          <span>Hey, {`${this.props.userData.first_name} ${this.props.userData.last_name}`}!</span>
        </div>
        <div className="row">
          <Link to="/profile">View Profile Settings</Link>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData }, dispatch)
}

function mapStateToProps (state) {
  //console.log('RoutHompage.js - STATE: ', state.userData)
  return state.userData
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavProfile)

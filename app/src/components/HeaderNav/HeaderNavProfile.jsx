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
     var username = cookie.data;
     this.props.getUserData(username);
    })
  }

  render() {
    return (
      <div className="col-xs-4"><Link to="/profile">View Profile</Link></div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData }, dispatch)
}

function mapStateToProps (state) {
  //console.log('RoutHompage.js - STATE: ', state.userData)
  return { userInfo: state.userData }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderNavProfile)

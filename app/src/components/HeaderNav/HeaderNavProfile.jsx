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

    return (
      <div className="col-sm-4">
          <div className="col-xs-4">
            <img src={this.props.userData.user_image.public_url} alt="" title=""/>
        </div>
          <div className="col-xs-4">
            <span>Hey, {`${this.props.userData.first_name} ${this.props.userData.last_name}`}!</span>
          </div>
          <div className="col-xs-4">
            <Link to="/profile">View Profile Settings</Link>
          </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state.userData
}

export default connect(mapStateToProps)(HeaderNavProfile);


////// Don't delete
            // {/*<img src={this.props.userData.user_image.public_url} alt="" title=""/>*/}
            // <span>Hey, {`${this.props.userData.first_name} ${this.props.userData.last_name}`}!</span>
            // <Link to="/profile">View Profile Settings</Link>

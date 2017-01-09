import React, { Component } from 'react';
import { Router, Link } from 'react-router';

//Redux and async functions
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderNavLogOutButton from './HeaderNavLogOutButton'

//Axios
import axios from 'axios'

class HeaderNavProfile extends Component {
  constructor() {
    super();
  }

  render() {

    return (
      <li className="dropdown">
        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">My Profile <span className="caret"></span></a>
        <ul className="dropdown-menu" >
            <li className="navProfPic" style={{'backgroundImage':"url('" + this.props.userData.user_image.public_url + "')"}} />
            <li role="separator" className="divider"></li>
            <li className="">
              <span>Hey, {`${this.props.userData.first_name} ${this.props.userData.last_name}`}!</span>
              <Link style={{'padding': '0px'}} to="/profile">View Profile Settings</Link>
            </li>
            <HeaderNavLogOutButton name="Logout" link="/login"/>
          </ul>
      </li>
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

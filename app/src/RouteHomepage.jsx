import React, { Component } from 'react';

//Main homepage components
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

//Feed components
import HPFeedSearch from './components/Homepage/HPFeedSearch';
import HPFeed from './components/Homepage/HPFeed';

//Axios
import axios from 'axios'

//Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUserData } from './actions/index';

class RouteHomepage extends Component {
  constructor() {
    super();
    this.handleSearchInputValue = this.handleSearchInputValue.bind(this);
    this.state = {
      searchInputValue: ''
    };
  }

  handleSearchInputValue(e) {
    this.setState({searchInputValue: e.target.value});
  }

  // componentDidMount() {
    
  // }
  
  render() {
  {/* Console log for username - if props are present, this should work*/}
    //console.log('RouteHomepage.js - USERNAME: ', this.props.userInfo.username)
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader title={'Welcome to OpenSauce'}>
          <HPFeedSearch searchInputValue={this.state.searchInputValue} handleSearchInputValue={this.handleSearchInputValue}/>
        </AppHeader>
        <HPFeed/>
        <Footer/>
      </div>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData }, dispatch)
}

function mapStateToProps (state) {
  console.log('RoutHompage.js - STATE: ', state)
  return state.userData
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteHomepage) 


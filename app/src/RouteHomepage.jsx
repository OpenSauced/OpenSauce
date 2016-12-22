import React, { Component } from 'react';

//Main homepage components
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

//Feed components
import HPFeedSearch from './components/Homepage/HPFeedSearch';
import HPFeed from './components/Homepage/HPFeed';

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

  componentDidMount() {
    axios.get('/api/users/getUserCookie')
    .then((cookie) => {
     var username = cookie.data;
     this.props.getUserData(username).then((data) => console.log('getUserData', data))
    })
  }
  
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

<<<<<<< b362bf8c05696002e61757782afca1c356b73fde
export default RouteHomepage;
=======
function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData }, dispatch)
}

function mapStateToProps (state) {
  console.log('RoutHompage.js - STATE: ', state.userData)
  return { userData: state.userData }
}

export default connect(mapStateToProps, mapDispatchToProps)(RouteHomepage) 


//d
>>>>>>> rebasing

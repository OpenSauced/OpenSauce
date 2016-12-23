import React from 'react';

//Main homepage components
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

import Login from './components/Login/Login';

const RouteLogin = ({}) => {
  return (
    <div className="container-fluid">
      <AppHeader title={'Login'}/>
      <Login/>
      <Footer/>
    </div>
  );
}

export default RouteLogin;

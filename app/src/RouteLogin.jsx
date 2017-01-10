import React from 'react';

//Main homepage components
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';

import Login from './components/Login/Login';

var randomSameImage = 'url(./assets/imageRotation/hpBg_' +  Math.floor(Math.random() * 13) + '.jpg)'

var pageStyle = {
  'backgroundImage': randomSameImage,
  'height': '100vh',
  'backgroundSize': 'cover',
  'backgroundColor': '#535353',
  'backgroundBlendMode': 'overlay',
  'backgroundSize': 'cover',
  'backgroundPosition': 'center center',
  'backgroundRepeat': 'no-repeat',
  // 'padding': '200px 0'
}

var modalStyle = {
  'backgroundImage': randomSameImage
}

var headerStyle = {
  'backgroundColor': 'transparent'
}

const RouteLogin = ({}) => {
  return (
    <div className="container-fluid" style={pageStyle}>
      <AppHeader title={'Welcome to OpenSauce'} style={headerStyle}/>
      <Login style={modalStyle}/>
    </div>
  );
}

export default RouteLogin;

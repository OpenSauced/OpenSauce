import React from 'react';
import { Router, Link } from 'react-router';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';

const Route404 = () => {
  return (
    <div className="container-fluid">
      <HeaderNav/>
      <AppHeader title={'404 :('}/>
      <div className="row">
        <p>We're sorry but the page you are looking for doe not exist.</p>
        <div></div>
      </div>
    </div>
  );
}

export default Route404;

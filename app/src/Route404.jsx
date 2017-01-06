import React from 'react';
import { Router, Link } from 'react-router';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

const Route404 = () => {
  return (
    <div className="container-flex wholeContainer">
      <HeaderNav/>
      <AppHeader title={"404 This isn't the recipe you are looking for..."}/>
      <div className="container-fluid 404PageContainer">
        <div className='col-xs-12'>
          <p>We're sorry but the page you are looking for doe not exist.</p>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Route404;

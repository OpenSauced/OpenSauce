import React, { Component } from 'react';

//Main homepage components
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';

//Feed components
import HPFeed from './components/Homepage/HPFeed';
import SearchBar from './containers/Homepage/SearchBar';

const RouteHomepage = () => {
  return (
    <div className="container-fluid">
      <HeaderNav/>
        <AppHeader title={'Welcome to OpenSauce'}>
          <SearchBar />
        </AppHeader>
      <HPFeed/>
    </div>
  );
}

export default RouteHomepage

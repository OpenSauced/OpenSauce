import React from 'react';

import HeaderNavButton from './HeaderNavButton';

const HeaderNavButtons = () => {
  return (
    <ul className="nav navbar-nav">
        <HeaderNavButton name="My Cookbook" link="/myrecipes"/>
        <HeaderNavButton name="Add Recipe" link="/addrecipe"/>
        {/* Redirects to RouterLogin, and the component will send a GET request to delete user cookies*/}
    </ul>
  );
}

export default HeaderNavButtons;

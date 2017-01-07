import React from 'react';

import HeaderNavButton from './HeaderNavButton';
import HeaderNavProfile from './HeaderNavProfile';


const HeaderNavButtons = () => {
  return (
    <ul className="navbar-nav ml-auto">
        <HeaderNavButton name="Home" link="/"/>
        <HeaderNavButton name="My Recipes" link="/myrecipes"/>
        <HeaderNavButton name="Add Recipe" link="/addrecipe"/>
        <HeaderNavProfile />
        {/* Redirects to RouterLogin, and the component will send a GET request to delete user cookies*/}
    </ul>
  );
}

export default HeaderNavButtons;

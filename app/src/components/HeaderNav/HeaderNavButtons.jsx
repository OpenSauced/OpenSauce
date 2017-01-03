import React from 'react';

import HeaderNavButton from './HeaderNavButton';
import HeaderNavLogOutButton from './HeaderNavLogOutButton'

const HeaderNavButtons = () => {
  return (
    <ul className="nav navbar-nav">
        <HeaderNavButton name="My Recipes" link="/myrecipes"/>
        <HeaderNavButton name="Add Recipe" link="/addrecipe"/>
        {/* Redirects to RouterLogin, and the component will send a GET request to delete user cookies*/}
        <HeaderNavLogOutButton name="Logout" link="/login"/>
    </ul>
  );
}

export default HeaderNavButtons;

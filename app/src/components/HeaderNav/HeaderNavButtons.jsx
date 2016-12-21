import React from 'react';
import axios from 'axios'

import HeaderNavButton from './HeaderNavButton';
import HeaderNavLogOutButton from './HeaderNavLogOutButton'

const HeaderNavButtons = () => {
  return (
    <div className="col-xs-4">
      <HeaderNavButton name="My Recipes" link="/myrecipes"/>
      <HeaderNavButton name="Add Recipe" link="/addrecipe"/>

    {/* Redirects to RouterLogin, and the component will send a GET request to delete user cookies*/}
      <HeaderNavLogOutButton name="LOGOUT" link="/login"/>
    </div>
  );
}

export default HeaderNavButtons;

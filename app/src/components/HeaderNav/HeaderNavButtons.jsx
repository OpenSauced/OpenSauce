import React from 'react';

import HeaderNavButton from './HeaderNavButton';
import HeaderNavLogOutButton from './HeaderNavLogOutButton'

const HeaderNavButtons = () => {
  return (
    <div className="col-sm-4">
      <div >
        <HeaderNavButton name="My Recipes" link="/myrecipes"/>
        <HeaderNavButton name="Add Recipe" link="/addrecipe"/>
        {/* Redirects to RouterLogin, and the component will send a GET request to delete user cookies*/}
        <HeaderNavLogOutButton name="Logout" link="/login"/>
      </div>
    </div>
  );
}

export default HeaderNavButtons;

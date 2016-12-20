import React from 'react';

import HeaderNavButton from './HeaderNavButton';

const HeaderNavButtons = () => {
  return (
    <div className="col-xs-4">
      <HeaderNavButton name="My Recipes" link="/myrecipes"/>
      <HeaderNavButton name="Add Recipe" link="/addrecipe"/>
    </div>
  );
}

export default HeaderNavButtons;

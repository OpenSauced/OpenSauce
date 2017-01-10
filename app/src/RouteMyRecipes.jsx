import React, { Component } from 'react'

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';

import RecipeList from './containers/AddRecipe/RecipeList.js'


class RouteMyRecipes  extends Component {
  render() {

    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader title={'Catchy Phrase'}>
        </AppHeader>
        <div>
          <RecipeList route={this.props.route.path}/>
        </div>
      </div>
    );
  }
}

export default RouteMyRecipes;

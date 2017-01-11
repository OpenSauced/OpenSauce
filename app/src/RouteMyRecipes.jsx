import React, { Component } from 'react'

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';

import FilterBar from './containers/AddRecipe/FilterBar'
import RecipeList from './containers/AddRecipe/RecipeList.js'


class RouteMyRecipes  extends Component {
  render() {

    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader title={'Catchy Phrase'}>
        <FilterBar />
        </AppHeader>
        <div className="row homePageContainer">
          <RecipeList route={this.props.route.path}/>
        </div>
      </div>
    );
  }
}

export default RouteMyRecipes;

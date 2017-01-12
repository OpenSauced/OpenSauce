import React, { Component } from 'react';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';

import AddRecipe from './components/AddRecipe/AddRecipe';
import AddRecipeTypeOfInsert from './components/AddRecipe/AddRecipeTypeOfInsert';

class RouteAddRecipe extends Component {
  constructor() {
    super();

    this.state = {
      renderInputs: 'manual'
    }
    this.handleSelectHowToAddRecipe = this.handleSelectHowToAddRecipe.bind(this);
  }

  handleSelectHowToAddRecipe(e) {
    // you will be clicking on one of two buttons in AppRecipeTypeOfInsert.js
    let render = '';

    if(e.target.name === 'manual'){
      render = 'manual';
    } else {
      render = 'link';
    };

    this.setState({
      renderInputs: render
    });
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader title={'Catchy Phrase'}>
          <AddRecipeTypeOfInsert renderClick={this.handleSelectHowToAddRecipe} renderInputs={this.state.renderInputs}/>
        </AppHeader>
          <AddRecipe renderInputs={this.state.renderInputs} recipeId={this.props.location.query.recipe}/>
      </div>
    );
  }
};

export default RouteAddRecipe;

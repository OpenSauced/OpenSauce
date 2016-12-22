import React, { Component } from 'react';

import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';

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
    // console.log("Getting current click?", e.target.name)
    let render = ''
    if(e.target.name === 'manual'){
      render = 'manual'
    } else {
      render = 'link'
    }
    this.setState({
        renderInputs: render
      })
  }

  render() {
    return (
      <div className="container-fluid">
        <HeaderNav/>
        <AppHeader title={'Catchy Phrase'}>
          <AddRecipeTypeOfInsert renderClick={this.handleSelectHowToAddRecipe}/>
        </AppHeader>
        <AddRecipe renderInputs={this.state.renderInputs} recipeId={this.props.location.query.recipe}/>
        <Footer/>
      </div>
    );
  }
};

export default RouteAddRecipe;


////////////////////////////////////////////////
////////////////////////////////////////////////
////  Make into Edit recipe compoenent /////////
////////////////////////////////////////////////
////////////////////////////////////////////////

import React, { Component } from 'react';
import {browserHistory} from 'react-router';

//Redux and async functions
import { connect } from 'react-redux';
// import { getUserData } from '../../../actions/index';
// import { bindActionCreators } from 'redux';

import EditRecipeIngredient from './components/ViewRecipe/EditRecipeIngredient'
import HeaderNav from './components/HeaderNav/HeaderNav';
import AppHeader from './components/App/AppHeader';
import Footer from './components/Footer/Footer';
import SaveAndForkButtons from './components/ViewRecipe/SaveAndForkButtons.jsx'

class RouteEditRecipe extends Component {
  constructor(props) {
    super(props);
    // state is used to track changes in the editting boxes
    this.state = {
      title: '',
      description: '',
      directions: '',
      ingredients: ['']
    }

    this.recipeData = {}
    this.onFormSubmit = this.onFormSubmit.bind(this)
    //recipeData is variable that can be set and used for the whole component
    this.onIngredientChange = this.onIngredientChange.bind(this);
    this.removeIngredient   = this.removeIngredient.bind(this);
    this.addNewIngredient   = this.addNewIngredient.bind(this);
  }

  componentWillMount () {
    console.log('derka derka I will mount')
    console.log('RouteEditRecipe props',this.props)
    let currentRecipe = this.props.currentRecipe
    this.setState({ 
      title: currentRecipe.title,
      description: currentRecipe.description,
      ingredients: currentRecipe.ingredients,
      directions: currentRecipe.directions,
      forkedParent: currentRecipe.forkedParent || 'none'
    });
  }

  //function to track changes in the ingredient text and set it to state
  onIngredientChange(e) {
    var index = e.target.id.split('-')[1]
    var newIngredients = this.state.ingredients.slice()
    newIngredients[index] = e.target.value
    this.setState({ingredients: newIngredients})
  }  

  //function to track changes in the ingredient text and set it to state
  addNewIngredient(e) {
    var newIngredients = this.state.ingredients.slice()
    newIngredients.push(e.target.value)
    this.setState({ingredients: newIngredients})
  }

  //function to remove the number of ingredients and set it to state
  removeIngredient(e) {
    var index = e.target.id.split('-')[1]
    var newIngredients = this.state.ingredients.slice()
    newIngredients.splice(index, 1)
    this.setState({ingredients: newIngredients})
  }

  onInputChange(event) {
    //create a case and match it to the element id, update state accordingly
    switch(event.target.id) {
      case 'recipe-title':
        this.setState({title: event.target.value})
        break;
      case 'recipe-description':
        this.setState({description: event.target.value})
        break;
      case 'recipe-directions':
        this.setState({directions: event.target.value})
        break;
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    // let ingredients = this.state.ingredients;
    // // let ingrCheck = ingredients.indexOf("")
    // // if ( ingrCheck !== -1 ){
    // //   if (ingrCheck === 0){
    // //     ingredients
    // //   }
    // // }
    let recipe = {
      title: this.state.title,
      description: this.state.description,
      ingredients: ,
      directions: this.state.directions,
      recipeId: this.props.currentRecipe._id
    }
    //Does the end of this route handle recipe.recipeId?
    $.ajax({
      method: 'POST',
      url: `/api/recipes/${recipe.recipeId}/editrecipe`,
      data: recipe,
      dataType: 'json'
    })
    .catch((err) => {
      console.error('Recipe did not post. Please enter all required information', err);
      alert('Message: ', err)
    })
    .then((recipe) => {
      const path = `/viewrecipe?recipeId=${this.props.currentRecipe._id}`
      browserHistory.push(path);
    })
  }

  render() {
    console.log('current props', this.props)
    console.log('current state', this.state)
    return (  
      <div className="row">
        <div className="container">
          <form onSubmit={this.onFormSubmit}>
            <div className="row">
              <label htmlFor="">
                <span>Recipe Title:</span>
                <input
                  placeholder="Please enter Recipe Name"
                  id="recipe-title"
                  value={this.state.title}
                  onChange={this.onInputChange.bind(this)}
                />
              </label>
            </div>
            <h3>Recipe Description:</h3>
            <textarea
              placeholder="Please enter a description"
              className=""
              id="recipe-description"
              value={this.state.description}
              onChange={this.onInputChange.bind(this)}
            ></textarea>

            <h3>Directions </h3>
            <textarea
              placeholder="Please enter directions"
              className=""
              id="recipe-directions"
              value={this.state.directions}
              onChange={this.onInputChange.bind(this)}
            ></textarea>

            <h3>Ingredients</h3>
            {
              this.state.ingredients.map((ingredient, index) => {
                return (
                  <EditRecipeIngredient
                    key={index}
                    ingredient={this.state.ingredients[index]}
                    index={index}
                    handleIngredientOnChange={this.onIngredientChange}
                    handleRemoveIngredient={this.removeIngredient}
                  />
                )
              })
            }
            <button type="button" className="" onClick={this.addNewIngredient}>Add New Ingredient</button>
            <span className="">
              <button type="submit" className="btn btn-secondary">Submit</button>
            </span>
          </form>
        </div>
      </div> 
    )
  }
}

// function mapDispatchToProps (dispatch) {
//   return bindActionCreators ({ getUserData, addUserSavedRecipe, removeUserSavedRecipe }, dispatch)
// }
function mapStateToProps (state) {
  return {
    userData: state.userData,
    currentRecipe: state.currentRecipe
  }
}

// function mapStateToProps (state) {
//   return state.userData
// }


export default connect(mapStateToProps)(RouteEditRecipe)


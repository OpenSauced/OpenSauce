
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

import EditRecipeIngredient from './EditRecipeIngredient'

class RouteEditRecipe extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      title: '',
      description: '',
      directions: '',
      ingredients: ['']
    }
    //setting state to base ingredients
    this.onFormSubmit       = this.onFormSubmit.bind(this)
    this.onIngredientChange = this.onIngredientChange.bind(this);
    this.removeIngredient   = this.removeIngredient.bind(this);
    this.addNewIngredient   = this.addNewIngredient.bind(this);
  }

  componentWillMount () {
    console.log('derka derka I will mount')
    console.log(this.props)
    this.setState({ 
      title: this.props.recipe.title,
      description: this.props.recipe.description,
      ingredients: this.props.recipe.ingredients,
      directions: this.props.recipe.directions,
      // IS FORKED PARENT REDUNDANT?
      forkedParent: this.props.recipe._id,
      thisRecipeId: this.props.recipeId
    });
  }

  onIngredientChange(e) {
    var index = e.target.id.split('-')[1]
    var newIngredients = this.state.ingredients.slice()
  
    newIngredients[index] = e.target.value
    this.setState({ingredients: newIngredients})
  }  

  addNewIngredient(e) {
    var newIngredients = this.state.ingredients.slice()
    newIngredients.push(e.target.value)
    this.setState({ingredients: newIngredients})
  }

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

    const username = this.props.userData.username

    let recipe = {
      title: this.state.title,
      description: this.state.description,
      ingredients: this.state.ingredients,
      directions: this.state.directions,
      recipeId: this.props.recipe._id
    }
    //Does the end of this route handle recipe.recipeId?
    $.ajax({
      method: 'POST',
      url: `/api/recipes/${username}/editrecipe`,
      data: recipe,
      dataType: 'json'
    })
    .catch((err) => {
      console.error('Recipe did not post. Please enter all required information', err);
      alert('Message: ', err)
    })
    .then((recipe) => {
      const path = `/viewrecipe?recipeId=${recipe._id}`
      browserHistory.push(path);
      window.location.href = path
    })
  }

  render() {
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

function mapStateToProps (state) {
  return state.userData
}

export default connect(mapStateToProps)(RouteEditRecipe)


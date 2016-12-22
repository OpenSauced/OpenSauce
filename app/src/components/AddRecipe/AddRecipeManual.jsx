import React, { Component } from 'react';

//Redux and async functions
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddRecipeManualList from './AddRecipeManualList';

class AddRecipeManual extends Component {
  constructor() {
    super();

    this.state = {
      title: '',
      description: '',
      directions: '',
      ingredients: ['']
    }

    // Function bindings for the component
    this.onIngredientChange = this.onIngredientChange.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this);
  }

  componentWillMount() {
    this.props.getUserData();
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

    return null
  }

  onFormSubmit(e) {
    e.preventDefault();

    let ingredients = this.state.ingredients.filter((ingredient) => {
      ingredient.replace(' ', '') === '' ? null : ingredient; 
    });

    let recipe = {
      title: this.state.title,
      description: this.state.description,
      ingredients: ingredients,
      directions: this.state.directions,
    }

    $.ajax({
      method: 'POST',
      url: `/api/recipes/${this.props.userData.username}/addrecipe`,
      data: recipe,
      dataType: 'json'
    })
    .then((data) => {
      console.log('Getting current data? ', data);
    })
    .catch((err) => {
      console.error('Getting current error? ', err);
    })
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

  render() {
    return (
      <form className="" onSubmit={this.onFormSubmit.bind(this)}>
        <h3>Recipe Title:</h3>
        <input
          placeholder="Please enter Recipe Name"
          className=""
          id="recipe-title"
          value={this.state.title}
          onChange={this.onInputChange.bind(this)}
        />

        <h3>Recipe Description:</h3>
        <input
          placeholder="Please enter a description"
          className=""
          id="recipe-description"
          value={this.state.description}
          onChange={this.onInputChange.bind(this)}
        />

        <h3>Directions </h3>
        <input
          placeholder="Please enter directions"
          className=""
          id="recipe-directions"
          value={this.state.directions}
          onChange={this.onInputChange.bind(this)}
        />

        <h3>Ingredients</h3>
        {
          this.state.ingredients.map((ingredient, index) => {
            return (
              <AddRecipeManualList
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
    );
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData }, dispatch)
}

function mapStateToProps (state) {
  return state.userData
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipeManual)

import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import Dropzone from 'react-dropzone';

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
      ingredients: [''],
      images: []
    }

    // Function bindings for the component
    this.onIngredientChange = this.onIngredientChange.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount() {
    this.props.getUserData()
    .then((user) => {
      console.log("id in componentWillMount ", this.props.recipeId)
      if(this.props.recipeId){
        console.log("id" ,this.props.recipeId)
        this.getRecipeFromDB(this.props.recipeId)
      } 
    })
  }
  
  getRecipeFromDB(recipeId) {
    $.ajax({
      url: '/api/recipes/' + recipeId,
      success: function(recipe) {
        console.log("RECIPE ", recipe.directions)
          this.setState({ 
            title: recipe.title,
            description: recipe.description,
            ingredients: recipe.ingredients,
            directions: recipe.directions,
            forkedParent: recipe._id
           });
      }.bind(this),
      error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
      }.bind(this),
    });
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

    let ingredients = this.state.ingredients;
    // .filter((ingredient) => {
    //   ingredient.replace(' ', '') === '' ? null : ingredient; 
    // });

    let recipe = new FormData();
    recipe.append('title', this.state.title);
    recipe.append('description', this.state.description);
    recipe.append('ingredients', JSON.stringify(ingredients));
    recipe.append('directions', this.state.directions);
    recipe.append('images', this.state.images[0]);

    $.ajax({
      method: 'POST',
      url: `/api/recipes/${this.props.userData._id}/addrecipe`,
      data: recipe,
      cache: false,
      contentType: false,
      processData: false,
    })
    .catch((err) => {
      console.error('Recipe did not post. Please enter all required information', err);
    })
    .then((recipe) => {
      console.log('Getting current data? ', recipe);
      const path = `/viewrecipe?recipeId=${recipe._id}`
      browserHistory.push(path);
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

  // Handle the image file upload. This accepts clicking and drag and drop.
  onDrop(acceptedFiles) {
    this.setState({
      // This is required for multiple images
      // images: this.state.images.concat(acceptedFiles)
      // This is for single image uploads
      images: acceptedFiles
    });
  }

  render() {
    return (
      <div className="row">
        <div className="container">
          <form id="addRecipeManualForm" onSubmit={this.onFormSubmit.bind(this)} encType="multipart/form-data">
            <div className="row">
              <Dropzone multiple={false} onDrop={this.onDrop}>
                <div>Try dropping some files here, or click to select files to upload.</div>
              </Dropzone>
              {this.state.images.length > 0 ? <div>
                <div>{this.state.images.map((image) => <img key={1} src={image.preview} /> )}</div>
                </div> : null}
            </div>
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
                  <AddRecipeManualList
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

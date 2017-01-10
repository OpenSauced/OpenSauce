import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import Dropzone from 'react-dropzone';

//Redux and async functions
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddRecipeManualList from './AddRecipeManualList';

class AddRecipeManual extends Component {
  constructor(props) {
    super(props);

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
    console.log("will mount ", this.props)
    this.props.getUserData()
    .then((user) => {
      // console.log("id in componentWillMount ", this.props.recipeId)
      if(this.props.recipeId){
        this.getRecipeFromDB(this.props.recipeId)
      } 
    })
  }

  componentDidMount(){
    console.log("did mount ", this.props)
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
          console.error(status, err.toString());
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
    var props = this.props
    $.ajax({
      method: 'POST',
      url: `/api/recipes/${this.props.userData._id}/addrecipe`,
      data: recipe,
      cache: false,
      contentType: false,
      processData: false,
      success: function(recipe){
        console.log('Getting current data? ', recipe);
        const path = `/viewrecipe?recipeId=${recipe._id}`
        browserHistory.push(path);
      },
      error: function(xhr, status, err){
        var responseMessage = xhr.responseText
        console.error("did not post to DB manual ", status, xhr.responseText);
        props.openModal(xhr.responseText)
      }
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
        <form className="col-12" id="addRecipeManualForm" onSubmit={this.onFormSubmit.bind(this)} encType="multipart/form-data">
          <div className="row">
            <Dropzone multiple={false} onDrop={this.onDrop}>
              <div>{this.state.images.length > 0 ? <img src={this.state.images[0].preview} /> : `Click or drag an image inside of the box to upload.`}</div>
            </Dropzone>
          </div>
          <div className="row">
            <label htmlFor="recipe-title">
              <h2>Recipe Title:</h2>
              <input 
                className="col-12"
                placeholder="Please enter Recipe Name"
                id="recipe-title"
                value={this.state.title}
                onChange={this.onInputChange.bind(this)}
                required
              />
            </label>
          </div>
          <div className="row">
            <label htmlFor="recipe-description">
              <h2>Recipe Description:</h2>
              <textarea
                className="col-12"
                placeholder="Please enter a description"
                className=""
                id="recipe-description"
                value={this.state.description}
                onChange={this.onInputChange.bind(this)}
              ></textarea>
            </label>
          </div>
          <div className="row">
            <label htmlFor="recipe-directions">
              <h2>Directions </h2>
              <textarea
                placeholder="Please enter directions"
                className=""
                id="recipe-directions"
                value={this.state.directions}
                onChange={this.onInputChange.bind(this)}
                required
              ></textarea>
            </label>
          </div>
          <div className="row">
            <label>
              <h2>Ingredients</h2>
              {
                this.state.ingredients.map((ingredient, index) => {
                  return (
                    <AddRecipeManualList
                      key={index}
                      ingredient={this.state.ingredients[index]}
                      index={index}
                      handleIngredientOnChange={this.onIngredientChange}
                      handleRemoveIngredient={this.removeIngredient}
                      required
                    />
                  )
                })
              }
              <button type="button" className="btn btn-secondary" onClick={this.addNewIngredient}>Add New Ingredient</button>
            </label>
          </div>
          <span className="">
            <button type="submit" className="btn btn-secondary">Submit</button>
          </span>
        </form>
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

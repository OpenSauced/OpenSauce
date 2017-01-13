import React, { Component } from 'react';
import {browserHistory} from 'react-router';

import Dropzone from 'react-dropzone';
import Recaptcha from 'react-recaptcha';


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
      ingredients: [''],
      directions: '',
      notes: '',
      images: [],
      verification: ''
    }

    // Function bindings for the component
    this.onIngredientChange = this.onIngredientChange.bind(this);
    this.removeIngredient = this.removeIngredient.bind(this);
    this.addNewIngredient = this.addNewIngredient.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.loadedRecaptcha = this.loadedRecaptcha.bind(this)
    this.verifyCallback = this.verifyCallback.bind(this)
    this.spliceBlankIngredients = this.spliceBlankIngredients.bind(this)
  }

  verifyCallback (response) {
    console.log('veriftying her is the response ', response)
    this.setState({ verification:response })
  }

  loadedRecaptcha () {
    console.log('Recaptcha loaded!')
  }

  componentWillMount() {
    console.log("AddRecipeManual will mount, here are it's props: ", this.props)
    this.props.getUserData()
    .then((user) => {
      // console.log("id in componentWillMount ", this.props.recipeId)
      if(this.props.recipeId){
        this.getRecipeFromDB(this.props.recipeId)
      }
    })
  }

  componentDidMount(){
    console.log("AddRecipeManual mounted, here are it's props: ", this.props)
  }

  // this is set up to detect a change in recipeId props for
  // change from /addrecipe to /addrecipe?recipe=########### and load that on screen
  componentWillReceiveProps( nextProps ) {
    // only changes state based on recipeId being present
      // recipeId === undefined? set state to blanks
    if ( !(nextProps.recipeId) ){
      this.setState({
        title: '',
        description: '',
        ingredients: [''],
        directions: '',
        notes: '',
        images: [],
        verification: '',
        forked_parent: null
      });
      // recipeId === a recipe id? get the info from the db
    } else if ( nextProps.recipeId ) {
      this.getRecipeFromDB(nextProps.recipeId)
    }
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
            notes: recipe.notes,
            forked_parent: recipe._id
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
     case 'recipe-notes':
      this.setState({notes: event.target.value})
      break;
    }
    return null
  }

  spliceBlankIngredients(ingredients){
    let idx = ingredients.indexOf('');
    if (idx === -1){
      return ingredients
    } else {
      ingredients.splice(idx,1)
      return this.spliceBlankIngredients(ingredients)
    }
  }

  onFormSubmit(e) {
    e.preventDefault();
    if (this.state.verification !== '') {
      let newIngredients = this.spliceBlankIngredients(this.state.ingredients);
      let props = this.props
      let recipe = new FormData();

      // add form data for ajax response
      recipe.append('title', this.state.title);
      recipe.append('description', this.state.description);
      recipe.append('ingredients', JSON.stringify(newIngredients));
      recipe.append('directions', this.state.directions);
      if(this.state.forked_parent){
        recipe.append('forked_parent', this.state.forked_parent);
      }
      recipe.append('notes', this.state.notes)
      //response from recaptcha and images
      recipe.append('g-recaptcha-response', this.state.verification)
      recipe.append('images', this.state.images[0]);
      var that = this
      $.ajax({
        method: 'POST',
        url: `/api/recipes/${this.props.userData._id}/addrecipe`,
        data: recipe,
        cache: false,
        contentType: false,
        processData: false,
        success: function(recipe){
          // console.log('Getting current data? ', recipe);
          const path = `/viewrecipe?recipeId=${recipe._id}`
          browserHistory.push(path);
        },
        error: function(xhr, status, err){
          let responseMessage = xhr.responseText
          that.props.openModal(xhr.responseText)
        }
      })
    } else {
      this.props.openModal('There is a problem with your recaptcha response')
    }
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
    console.log(this.state)
    return (
      <div className="row view-recipe-container">
      <h1 className="col-12 text-center">Add a Recipe</h1>
        <form className="col-12" id="addRecipeManualForm" onSubmit={this.onFormSubmit.bind(this)} encType="multipart/form-data">
          <div className="form-group">
            <label htmlFor="recipe-title" className="w-100">
              <h2>Recipe Title:</h2>
              <input
                className="col-10 form-control"
                placeholder="Please enter Recipe Name"
                id="recipe-title"
                value={this.state.title}
                onChange={this.onInputChange.bind(this)}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="recipe-description" className="w-100">
              <h2>Recipe Description:</h2>
              <textarea
                className="col-10 form-control"
                placeholder="Please enter a description"
                id="recipe-description"
                value={this.state.description}
                onChange={this.onInputChange.bind(this)}
              ></textarea>
            </label>
          </div>
          <div className="form-group">
            <label className="w-100">
              <h2>Ingredients:</h2>
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
          <div className="form-group">
            <label htmlFor="recipe-directions" className="w-100">
              <h2>Directions:</h2>
              <textarea
                className="col-10 form-control"
                placeholder="Please enter directions"
                id="recipe-directions"
                value={this.state.directions}
                onChange={this.onInputChange.bind(this)}
                required
              ></textarea>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="recipe-notes" className="w-100">
              <h2>Recipe Notes:</h2>
              <textarea
                className="col-10 form-control"              
                placeholder="Please enter your notes about this recipe"
                id="recipe-notes"
                value={this.state.notes}
                onChange={this.onInputChange.bind(this)}
                // {/* removed 'required' from this tag*/}
              ></textarea>
            </label>
          </div>
          <div className="form-group">
          <h2>Recipe Photo:</h2>
            <Dropzone multiple={false} onDrop={this.onDrop}>
                {
                  this.state.images.length > 0 
                    ? <div 
                        className="imageUploadBlock" 
                        style={{'backgroundImage': 'url(' + this.state.images[0].preview + ')' }}
                      ></div> 
                    : `Click or drag an image inside of the box to upload.`
                }
            </Dropzone>
          </div>
          <div className="form-group gtfo-recapture">
          {/*<Recaptcha
            sitekey="6LdWOBEUAAAAACTUSdYkHEjqeJIVtR7zM-yK0dbX"
            render="explicit"
            verifyCallback={this.verifyCallback}
            onloadCallback={this.loadedRecaptcha}
          />*/}
          </div>
          <span className="">
            <button type="submit" className="btn btn-primary">Submit</button>
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

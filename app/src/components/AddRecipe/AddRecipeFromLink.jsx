import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Recaptcha from 'react-recaptcha';
import { isURL } from 'validator';

class AddRecipeFromLink extends Component {
  constructor (props) {
    super (props)

    this.state = {
      recipeUrl: '',
      verificationCode: '',
      userId: ''
    }
 
  }

  componentWillMount () {
    this.setState({
      userId: this.props.userData._id
    })
    console.log('state ', this.state)
  }

  onInputChange (event) {

    //create a case and match it to the element id, update state accordingly
    switch(event.target.id) {
      case 'add_recipe_link':
        this.setState({ recipeUrl: event.target.value })
        // console.log(event.target.value)
        break;
    }
    return null
  }

  verifyCallback (response) {
    console.log('verifying, here is the response ', response)
    this.setState({ 
      verificationCode: response
    })
  }

  loadedRecaptcha () {
    console.log('Recaptcha loaded!')
  }

  formSubmit (e) {
    e.preventDefault();
    console.log(this.state)
    /// check for valid URL - only checks for structure of the URL
    if ( isURL( this.state.recipeUrl ) ) {
      //check for recaptcha token submission
      if ( this.state.verificationCode !== '' ) {

        var that = this;
        $.ajax({
          url: '/api/recipes/scraperecipe',
          type: 'POST',
          data: {
            'userId': this.state.userId,
            'url': this.state.recipeUrl,
            'g-recaptcha-response': this.state.verificationCode
          },
          success: function (statusObj) {
            console.log("recipe was saved to the DB", statusObj);
            if (statusObj.saved) {
              var path = `/viewrecipe?recipeId=${statusObj.recipeId}&savedAlready=true`
            } else {
              var path = `/viewrecipe?recipeId=${statusObj}`
            }
            browserHistory.push(path);
          },
          error: function(xhr, status, err) {
            var responseMessage = xhr.responseText
            that.props.openModal(xhr.responseText)
            console.error("did not post to DB from link ", status, xhr.responseText);
          }
        })
      } else {
        that.props.openModal('There is a problem with your recaptcha response')
      }
    } else {
      that.props.openModal('Please enter a valid recipe url (0.o)')
    }
  }

  render() {
    return (
      <div className="row view-recipe-container">
      <div className="col-6">
        <form id='commentPostForm' onSubmit={this.formSubmit.bind(this)}>
        <div>
          <label className="w-100" htmlFor="add_recipe_link">
            <input 
              className="form-control" 
              onChange={this.onInputChange.bind(this)}
              id="add_recipe_link" 
              type='text' 
              name='url' 
              placeholder="Copy and paste a link here..."
            />
          </label>
        </div>
        <Recaptcha
          sitekey="6LdWOBEUAAAAACTUSdYkHEjqeJIVtR7zM-yK0dbX"
          render="explicit"
          verifyCallback={this.verifyCallback.bind(this)}
          onloadCallback={this.loadedRecaptcha.bind(this)}
        />
        <button type='submit' className="btn btn-primary">Get Recipe</button>
        </form>
        </div>

      {/* supported sites */}
        <div className="col-6">
          <h4>We support these sites:</h4>
          <div className="d-flex justify-content-around">
            <img 
              src='/assets/Epicurious_Logo_2014.png'
              alt="Epicurious"
              height="75"
              width="100"
              />
             <img
            src='/assets/fn-logo.png'
            alt="Epicurious"
            height="75"
            width="75"
            />
             <img
            src='/assets/allrecipeslogo.svg'
            alt="Epicurious"
            height="75"
            width="75"
            />
          </div>
        </div>
      </div>
    );
  };
};

export default AddRecipeFromLink

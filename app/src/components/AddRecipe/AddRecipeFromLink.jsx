import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import Recaptcha from 'react-recaptcha';
import { isURL } from 'validator';

class AddRecipeFromLink extends Component {
  constructor (props) {
    super (props)

    this.state = {
      url: '',
      verificationCode: '',
      userId: ''
    }

    this.recaptchaInstance = null
    // this.resetRecaptcha = this.resetRecaptcha.bind(this)
  }

  componentWillMount() {
    // console.log('AddREcipeFormLink > componentWillReceiveProps > props ', this.props.userData._id)
    let userId = this.props.userData._id
    this.setState({ userId: userId })
  }

  componentDidMount () {
    this.recaptchaInstance = grecaptcha.render('recaptcha1', {
        sitekey : '6LdWOBEUAAAAACTUSdYkHEjqeJIVtR7zM-yK0dbX', 
        callback: this.verifyCallback.bind(this),
        theme : 'limit',
        render: 'explicit',
        type: 'image',
        size: 'normal',
        tabindex: '0'
    });
  }

  onInputChange (event) {
    //create a case and match it to the element id, update state accordingly
    switch(event.target.id) {
      case 'add_recipe_link':
        this.setState({ url: event.target.value })
        console.log(event.target.value)
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
    console.log('ADDRECIPEFROM LINK > formSubmit > this.state ', this.state)
    /// check for valid URL - only checks for structure of the URL
    // console.log("REcipe URLs ", this.state.url)
    ///////// check for valid url
    let validURL = isURL( this.state.url )

    if ( validURL ) {
      //check for recaptcha token submission

      if ( this.state.verificationCode !== '' ) {

        console.log( 'recaptchaInstance value ====', this.recaptchaInstance )
        var that = this;
        $.ajax({
          url: '/api/recipes/scraperecipe',
          type: 'POST',
          data: {
            'userId': this.state.userId,
            'url': this.state.url,
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
            // var responseMessage = xhr.responseText
            console.log(' THIS =====', this, "==== AND THAT =====", that)
            // that.recaptchaInstance.reset()
            grecaptcha.reset(that.recaptchaInstance)
            that.props.openModal(xhr.responseText)
            
            console.log('that.recaptchaInstance =====>',  that.recaptchaInstance)
            console.error("did not post to DB from link ", status, xhr.responseText);
          }

        })
      } else {
        this.props.openModal('There is a problem with your recaptcha response')
        grecaptcha.reset(this.recaptchaInstance)
      }
    } else {
      this.props.openModal('Please enter a valid recipe url (0.o)')
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
        <div id="recaptcha1"></div>
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
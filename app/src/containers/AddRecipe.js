import React, { Component } from 'react'

export default class AddRecipe extends Component {
  constructor(props) {
    super()
    this.state = {
      title: '',
      description: '',
      directions: [],
      ingredients: []
    }
  }

  onInputChange(event) {
    //create a case and match it to the element id, update state accordingly
    switch(event.target.id) {
    case 'recipe-title':
      this.setState({title: event.target.value})
      break;
    case 'recipe-description':
      this.setState({description: event.target.value})
      break
    }

    return null
  }

  onFormSubmit(event) {
    event.preventDefault()
    alert('FORM SUBMISSION DETECTED')
    //this.setState({term: ''})
    //this.props.fetchRecipes()
  }  

  componentWillMount() {

  }

  render() {
    return(
      <form
        className="input-group"
        onSubmit={this.onFormSubmit.bind(this)}
      >
        <h3>Recipe Title:</h3>
        <input
          placeholder="Please enter Recipe Name"
          className="form-control"
          id="recipe-title"
          value={this.state.title}
          onChange={this.onInputChange.bind(this)}
        />
        <h3>Recipe Description:</h3>
        <input
          placeholder="Please enter a description"
          className="form-control"
          id="recipe-description"
          value={this.state.description}
          onChange={this.onInputChange.bind(this)}
        />
        <span className="input-group-btn">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </span>

      </form>
    )
  }
}
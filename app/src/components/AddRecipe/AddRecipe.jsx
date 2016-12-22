import React, { Component } from 'react'

export default class AddRecipe extends Component {
  constructor(props) {
    super()
    this.state = {
      title: '',
      description: '',
      directions: '',
      ingredients: ['']
    }
  }

  componentWillMount(){
    if(this.props.recipeId){
    console.log('forking a recipe')
  } else {
    console.log('adding a new recipe')
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
    case 'recipe-directions':
      this.setState({directions: event.target.value})
      break
    }

    return null
  }

  onFormSubmit(event) {
    event.preventDefault()
    alert('ADD AXIOS CALL TO SUBMIT STATE  HERE:')

  } 

  renderIngredients(item, index, collection) {
    return (
      <div>
        <input
          key={index}
          id={`ingredients-${index}`}
          onChange={this.onIngredientChange.bind(this)}
          value={this.state.ingredients[index]}
          placeholder="new ingredient"
          className=""
        />
        <button
          type="button"
          key={`remove_ingredient-${index}`}
          id={`remove_ingredient-${index}`} 
          className=""
          onClick={this.removeIngredient.bind(this)}
        >
          Remove
        </button>
      </div>
    )
  }

  onIngredientChange(event) {
    var index = event.target.id.split('-')[1]
    var newIngredients = this.state.ingredients.slice()
  
    newIngredients[index] = event.target.value
    this.setState({ingredients: newIngredients})
  }  

  addNewIngredient() {
    var newIngredients = this.state.ingredients.slice()
    newIngredients.push(event.target.value)
    this.setState({ingredients: newIngredients})
  }

  removeIngredient() {
    var index = event.target.id.split('-')[1]
    var newIngredients = this.state.ingredients.slice()
    newIngredients.splice(index, 1)
    this.setState({ingredients: newIngredients})
  }

  render() {

    return(
      <form
        className=""
        onSubmit={this.onFormSubmit.bind(this)}
      >
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
        
        {this.state.ingredients.map(this.renderIngredients.bind(this))}
        
        <button
          type="button" 
          className=""
          onClick={this.addNewIngredient.bind(this)}
        >
          Add New Ingredient
        </button>
        
        <span className="">
          <button type="submit" className="btn btn-secondary">
            Submit
          </button>
        </span>

      </form>
    )
  }
}
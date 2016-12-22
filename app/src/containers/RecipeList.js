import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes } from '../actions/index'

//Sub Component Calls
//import 

class RecipeList extends Component {
  componentDidMount() {
    this.props.fetchRecipes()
  }

  renderRecipes(recipe) {
    return(
      <div key={recipe._id}>
        <div>{recipe.title}</div>
        <div>{recipe.directions}</div>
        <div>{recipe.title}</div>
      </div>
    )
  }

  render() {
    console.log('PROPS: ', this.props)
    return (
      <div>
        {this.props.recipes.map(this.renderRecipes)}
      </div>
    )
  }
}

// REDUX STUFF
const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
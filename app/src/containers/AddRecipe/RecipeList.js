import React, { Component } from 'react'
import LazyLoad from 'react-lazy-load'
import OnVisible, { setDefaultProps } from 'react-on-visible';

import axios from 'axios'

// REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, getUserData, addUserSavedRecipe, removeUserSavedRecipe } from '../../actions/index'

//Components
import HPFeedOnVisible from '../../components/Homepage/HPFeedOnVisible'
import HPFeedRecipe from '../../components/Homepage/HPFeedRecipe'
import SearchBar from '../Homepage/SearchBar'

class RecipeList extends Component {
  constructor () {
    super ()
  }

  renderRecipes(recipe) {
    return(
      <HPFeedRecipe
        key={recipe._id}
        recipe={recipe}
        userId={this.props.userData.userData._id}
        recipeId={recipe._id}
        myRecipes={this.props.userData.userData.my_recipes}
        savedRecipes={this.props.userData.userData.saved_recipes}
        addRecipe={this.props.addUserSavedRecipe}
        removeRecipe={this.props.removeUserSavedRecipe}
      />
    )
  }

  render() {
    return (
      <div className="w-100">
        <ul className="flex-row d-flex flex-wrap recipe_card">
          {this.props.recipes ? (this.props.recipes.length ? this.props.recipes.map(this.renderRecipes.bind(this)) : <h2>No Results</h2>  )  : <h2>Loading</h2>}
        </ul>
      </div>
    )
  }
}

const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    userData: state.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, getUserData, addUserSavedRecipe, removeUserSavedRecipe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)

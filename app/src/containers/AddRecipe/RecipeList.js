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
import HPLazyLoader from '../../components/Homepage/HPLazyLoader'
import SearchBar from '../Homepage/SearchBar'

///Setting Defaults for OnVisibility
setDefaultProps({
    bounce: true,
    visibleClassName: 'appear',
    percent: 10
});

class RecipeList extends Component {
  constructor () {
    super ()
    this.state = {
      limit: 16,
      skip: 0
    }
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
      <div>
        <SearchBar />
        <ul className="row recipe_card">
          {this.props.recipes ? (this.props.recipes.length ? this.props.recipes.map(this.renderRecipes.bind(this)) : "NO RESULTS FOUND"  )  : "LOADING"}
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


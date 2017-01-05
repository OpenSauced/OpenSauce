import React, { Component } from 'react'

//Components
import HPFeedRecipe from '../../components/Homepage/HPFeedRecipe'
import SearchBar from '../HomePage/SearchBar'

class RecipeList extends Component {
  renderRecipes(recipe) {
    return(
      <HPFeedRecipe key={recipe._id} recipe={recipe}/>
    )
  }

  render() {
    
    return (
      <div>
        <SearchBar />
        <ul className="row recipe_card">
          {this.props.recipes ? this.props.recipes.map(this.renderRecipes) : "LOADING"}
        </ul>
      </div>
    )
  }
}

// REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, getUserData } from '../../actions/index'
const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, getUserData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
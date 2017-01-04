import React, { Component } from 'react'

//Components
import HPFeedRecipe from '../../components/Homepage/HPFeedRecipe'
import SearchBar from '../Homepage/SearchBar'

// REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, getUserData } from '../../actions/index'

class RecipeList extends Component {
  componentWillMount() {
    //Check the route here and fetch by user or not depending on the route.
    switch(this.props.route) {
      case '/myrecipes':
        //console.log('GETTING USER DATA: ', this.props.route)
        this.props.getUserData()
        break;      
      default:
        //console.log('GETTING ALL RECIPIES DATA: ', this.props.route)
        this.props.fetchRecipes()
        break; 
    }
  }

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
          {this.props.recipes.map(this.renderRecipes)}
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
  return bindActionCreators ({ fetchRecipes, getUserData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
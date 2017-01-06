import React, { Component } from 'react'

//Components
import HPFeedRecipe from '../../components/Homepage/HPFeedRecipe'

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
    }
  }

  renderRecipes(recipe) {
    return(
      <HPFeedRecipe key={recipe._id} recipe={recipe}/>
    )
  }

  render() {
    return (
        <div className="row mainRecipeFeed">
          {this.props.recipes.map(this.renderRecipes)}
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
    recipes: state.recipes,
    userData: state.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, getUserData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)

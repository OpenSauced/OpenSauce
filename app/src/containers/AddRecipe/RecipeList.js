import React, { Component } from 'react'

//Components
import HPFeedRecipe from '../../components/Homepage/HPFeedRecipe';

class RecipeList extends Component {
  componentWillMount() {
    //Check the route here and fetch by user or not depending on the route.
    switch(this.props.route) {
      case '/myrecipes':
      this.props.getUserData()
      break;      
      default:
      this.props.fetchRecipes() 
    }
  }

  renderRecipes(recipe) {
    return(
      <ul className="row" key={recipe._id}>  
        <HPFeedRecipe recipe={recipe}/>
      </ul>
    )
  }

  render() {
    
    return (
      <ul className="row">
        {this.props.recipes.map(this.renderRecipes)}
      </ul>
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
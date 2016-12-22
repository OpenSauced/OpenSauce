import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes } from '../../actions/index'

class RecipeList extends Component {
  componentWillMount() {
    //Check the route here and fetch by user or not depending on the route.
    switch(this.props.route) {
      case '/myrecipes':
        //this.props.user.userData.my_recipes
        console.log(this.props.user)
        break
      default:
        this.props.fetchRecipes()
    }
    
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
    recipes: state.recipes,
    user: state.userData
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
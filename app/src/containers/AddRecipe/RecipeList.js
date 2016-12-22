import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { fetchRecipes } from '../../actions/index'

class RecipeList extends Component {
  componentWillMount() {
    //Check the route here and fetch by user or not depending on the route.
    if (!this.props.route) {
        this.props.fetchRecipes()
    }
  }

  renderRecipes(recipe) {
    return(
      <ul className="row">
        <div key={recipe._id}>
          <div>{recipe.title}</div>
          <div>{recipe.directions}</div>
          <div>{recipe.title}</div>
        </div>
      </ul>
    )
  }

  render() {
    //console.log('PROPS: ', this.props)
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
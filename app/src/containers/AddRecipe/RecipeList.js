import React, { Component } from 'react'

//Components
import HPFeedRecipe from '../../components/Homepage/HPFeedRecipe';

class RecipeList extends Component {
  componentWillMount() {
    //Check the route here and fetch by user or not depending on the route.
    if (!this.props.route) {
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
    console.log('RECIPE LIST PROPS: ', this.props)
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
import { fetchRecipes } from '../../actions/index'
const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}
 
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)
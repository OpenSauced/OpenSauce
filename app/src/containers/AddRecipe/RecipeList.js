import React, { Component } from 'react'
import LazyLoad from 'react-lazy-load'
import OnVisible, { setDefaultProps } from 'react-on-visible';

import axios from 'axios'

// REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, getUserData } from '../../actions/index'

//Components
import HPFeedOnVisible from '../../components/Homepage/HPFeedOnVisible'
import HPFeedRecipe from '../../components/Homepage/HPFeedRecipe'
import HPLazyLoader from '../../components/Homepage/HPLazyLoader'

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

  // loadMoreReduxRecipes () {
  //   const newSkip = this.state.skip + this.state.limit;
  //   console.log( 'new Skip: ', newSkip )
  //   axios.get('/api/recipes/', { params: { skip: newSkip } } )
  //   .then( (data) => { this.setState({ skip: newSkip }); })
  // }

  // showElem () {
  //   console.log(this)
  // }

  renderRecipes(recipe) {
    return(
      <HPFeedRecipe key={recipe._id} recipe={recipe}/>
    )
  }

  render() {
    return (
        <div className="row mainRecipeFeed">
          {this.props.recipes ? (this.props.recipes.length ? this.props.recipes.map(this.renderRecipes) : "NO RESULTS FOUND"  )  : "LOADING"}
        </div>
    )
  }

}
const mapStateToProps = (state) => {
  return {
    recipes: state.recipes
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, getUserData }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)

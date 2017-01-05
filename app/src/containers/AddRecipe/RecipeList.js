import React, { Component } from 'react'
import LazyLoad from 'react-lazy-load'
import axios from 'axios'

//Components
import HPFeedRecipe from '../../components/Homepage/HPFeedRecipe'
import HPLazyLoader from '../../components/Homepage/HPLazyLoader'
import SearchBar from '../Homepage/SearchBar'

class RecipeList extends Component {
  constructor () {
    super ()
    this.state = {
      limit: 16,
      skip: 0
    }
  }

  loadMoreReduxRecipes () {
    const newSkip = this.state.skip + this.state.limit;
    console.log( 'new Skip: ', newSkip )
    axios.get('/api/recipes/', { params: { skip: newSkip } } )
    .then( (data) => { this.setState({ skip: newSkip }); })
  }

  showElem () {
    console.log(this)
     // var r = this.getBoundingClientRect()
     // alert("Top/Left: "+r.top+" / "+r.left)
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
          {this.props.recipes ? (this.props.recipes.length ? this.props.recipes.map(this.renderRecipes) : "NO RESULTS FOUND"  )  : "LOADING"}
        </ul>
        {/*<LazyLoad onContentVisible={this.loadMoreReduxRecipes.bind(this)}>
             <LazyLoad onContentVisible={this.showElem()}>
          <h1>Loding More Recipes </h1>
        </LazyLoad>
      */}
        <HPLazyLoader/>
        
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
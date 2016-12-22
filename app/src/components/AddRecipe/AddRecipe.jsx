import React, { Component } from 'react'

//Redux and async functions
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddRecipeFromLink from './AddRecipeFromLink';

import AddRecipeManual from './AddRecipeManual'
import AddRecipeSearchAPI from './AddRecipeSearchAPI'


class AddRecipe extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    this.props.getUserData();
  }

  render() {

    return(
      this.props.renderInputs === 'manual' ? <AddRecipeManual recipeId={this.props.recipeId}/> : <AddRecipeFromLink userData={this.props.userData}/>
    )
  }
}


function mapDispatchToProps (dispatch) {
  return bindActionCreators ({ getUserData }, dispatch)
}

function mapStateToProps (state) {
  return state.userData
}

export default connect(mapStateToProps, mapDispatchToProps)(AddRecipe)

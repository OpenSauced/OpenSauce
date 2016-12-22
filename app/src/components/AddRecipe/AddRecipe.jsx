import React, { Component } from 'react'

//Redux and async functions
import { getUserData } from '../../actions/index';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import AddRecipeManual from './AddRecipeManual';
import AddRecipeFromLink from './AddRecipeFromLink';

class AddRecipe extends Component {
  constructor() {
    super()
  }

  componentWillMount() {
    this.props.getUserData();
  }

  render() {

    return(
      this.props.renderInputs === 'manual' ? <AddRecipeManual/> : <AddRecipeFromLink userData={this.props.userData}/>
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

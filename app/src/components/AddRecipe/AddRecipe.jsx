import React, { Component } from 'react'

import AddRecipeManual from './AddRecipeManual';

export default class AddRecipe extends Component {
  constructor() {
    super()
  }

  render() {

    return(
      this.props.renderInputs === 'manual' ? <AddRecipeManual/> : <AddRecipeSearchAPI/>
    )
  }
}
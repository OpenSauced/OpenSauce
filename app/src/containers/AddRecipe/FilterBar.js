import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'

class FilterBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
        isForkedRecipesChecked: true,
        isSavedRecipesChecked: true,
        isMyRecipesChecked: true
    }
    this.search = _.debounce((id) => {this.sendSearch(id)}, 100)
  }

  sendSearch(id) {
    
    switch(id) {
      case 'saved_recipes_checkbox':
        this.setState({isSavedRecipesChecked: this.state.isSavedRecipesChecked ? false : true})
        break
      case 'forked_recipes_checkbox':
        this.setState({isForkedRecipesChecked: this.state.isForkedRecipesChecked ? false : true})
        break 
      case 'my_recipes_checkbox':
        this.setState({isMyRecipesChecked: this.state.isMyRecipesChecked ? false : true})
        break 
    }

    var filter = {
      isForkedRecipesChecked: this.state.isForkedRecipesChecked,
      isSavedRecipesChecked: this.state.isSavedRecipesChecked,
      isMyRecipesChecked: this.state.isMyRecipesChecked
    }
    
    //console.log(filter)
    this.props.clearRecipes()
    this.props.getUserRecipes(filter)
  }

  onFormSubmit(event) {
    event.preventDefault()
  }

  onCheckboxChange(event) {
    this.search(event.target.id)
  }

  render() {
    return (
      <div>
      <h3> now viewing: </h3>
        <label><input
          id="saved_recipes_checkbox" 
          onChange={this.onCheckboxChange.bind(this)} 
          type="checkbox" 
          checked={this.state.isSavedRecipesChecked}
        />SAVED RECIPES</label> &nbsp; &nbsp; 
        <label><input
          id="forked_recipes_checkbox"  
          onChange={this.onCheckboxChange.bind(this)} 
          type="checkbox" 
          checked={this.state.isForkedRecipesChecked}
        />FORKED RECIPES</label> &nbsp; &nbsp; 
        <label><input 
          id="my_recipes_checkbox" 
          onChange={this.onCheckboxChange.bind(this)} 
          type="checkbox" 
          checked={this.state.isMyRecipesChecked}
        />MY RECIPES</label>
      </div>
    )
  }
}
//REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUserRecipes, clearRecipes } from '../../actions/index'

const  mapStateToProps = (state) => {
  return {
    searchTerm: state.searchTerm
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ getUserRecipes, clearRecipes }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FilterBar)
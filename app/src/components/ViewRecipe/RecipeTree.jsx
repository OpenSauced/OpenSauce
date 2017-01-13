import React, { Component } from 'react'

// REDUX STUFF
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchRecipes, getUserData, addUserSavedRecipe, removeUserSavedRecipe } from '../../actions/index'

//Components
import SortableTree from 'react-sortable-tree';

class RecipeList extends Component {
  constructor () {
    super ()
  }

  disableDrag() {
    window.requestAnimationFrame(() => {
      [].slice.call(document.getElementsByClassName('rst__moveHandle')).forEach(element => {element.remove()})
    })
  }

  render() {
    console.log(this.props.treeData)
    return (
      <SortableTree 
        treeData={this.props.treeData}
        isVirtualized={false} 
        onChange={() => {}}
        ref={() => {this.disableDrag();window.scrollTo(0, 0)}}
      />
      
    )
  }
}

const  mapStateToProps = (state) => {
  return {
    treeData: state.treeData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, getUserData, addUserSavedRecipe, removeUserSavedRecipe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)

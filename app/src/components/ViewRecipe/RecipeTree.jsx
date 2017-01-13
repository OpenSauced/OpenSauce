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
    this.state = {
      treeData: {}
    }
  }
  disableDrag() {
    window.requestAnimationFrame(() => {
      [].slice.call(document.getElementsByClassName('rst__moveHandle')).forEach(element => {element.remove()})
    })
  }

  componentDidMount() {
    this.disableDrag()
    this.setTreeData()
  }
  setTreeData() {
    var currentRecipe = this.props.currentRecipe

    var treeData = [
        { 
          title: 'MOMS SPAGGETHI', 
          expanded: true,
          subtitle: (<a href="#">John Rambo</a>) ,
          children: [ 
            { title: 'SISTERS SPAGGETHI' }, 
            { title: currentRecipe.title,
              subtitle: currentRecipe.creator.username,
              expanded: true,
              children: [
                {title: 'SONS SPAGGETHI'},
                {title: 'DAUGHTERS SPAGGETTH'}
               ]
            }
          ]
        }
    ]
    this.setState({treeData: treeData})
  }
  
  render() {
    console.log(this.props.currentRecipe)
    return (
      <SortableTree 
              treeData={this.state.treeData}
              isVirtualized={false} 
              onChange={() => {}}
      />
    )
  }
}

const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    userData: state.userData,
    currentRecipe: state.currentRecipe
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, getUserData, addUserSavedRecipe, removeUserSavedRecipe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)

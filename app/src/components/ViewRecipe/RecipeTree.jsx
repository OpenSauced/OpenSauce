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
  componentWillMount() {
    this.setTreeData()
  }

  componentDidMount() {
    this.disableDrag()
   
  }
  setTreeData() {
    var currentRecipe = this.props.currentRecipe
    var treeData = []
    //     { 
    //       title: 'MOMS SPAGGETHI', 
    //       expanded: true,
    //       subtitle: (<a href="#">John Rambo</a>) ,
    //       children: [ 
    //         { title: 'SISTERS SPAGGETHI' }, 
    //         { title: currentRecipe.title,
    //           subtitle: currentRecipe.creator.username,
    //           expanded: true,
    //           children: [
    //             {title: 'SONS SPAGGETHI'},
    //             {title: 'DAUGHTERS SPAGGETTH'}
    //            ]
    //         }
    //       ]
    //     }
    // ]

    var currentNode = []

    //push currentRecipeInfo to the tree

    currentNode.push({title: currentRecipe.title, expanded: true})
    treeData = currentNode
    
    //check for children
    if (currentRecipe.forked_children.length) {
      currentNode[0].children = []
      currentRecipe.forked_children.forEach(child => {
        currentNode[0].children.push(
          {
            title: child.title,
            subtitle: child.creator.username
          }
        )
      })
    }

    //check for parrent node
    var parentNode = {}
    if (currentRecipe.forked_parent) {
      parentNode.title = currentRecipe.forked_parent.title
      parentNode.subtitle = currentRecipe.forked_parent.creator.username
      parentNode.expanded = true
      parentNode.children = currentNode

      //check for siblings
      if (currentRecipe.forked_parent.forked_children.length > 1) {
        currentRecipe.forked_parent.forked_children.forEach(child => {
          if (child._id !== currentRecipe._id) currentNode.unshift(
            {title: child.title, subtitle: child.creator.username}
          ) 
        })
      }

      treeData = [parentNode]
    }

    
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

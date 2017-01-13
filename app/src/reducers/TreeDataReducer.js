/////////////////////////////////
/* Commented out this file, it seemed to cause issues when rendering RouteEditRecipe.
 * 
 * I also noticed GET_RECIPE_BY_ID is used a couple of times by different reducers,
 * maybe this has something to do with it?
 */


import { GET_RECIPE_BY_ID } from '../actions/index'
import { Link } from 'react-router'
import React from 'react'

export default (state = '', action) => {
  switch (action.type) {

    case GET_RECIPE_BY_ID:
      console.log('TreeDataReducer FIred')
      return setTreeData(action.payload.data)

  }

  return state;
}

function setTreeData(recipe) {
  var currentRecipe = recipe
  var treeData = []
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
          title: (<Link className="tree-link" to={`/viewrecipe?recipeId=${child._id}`}>{child.title}</Link>),
          subtitle: child.creator.username
        }
      )
    })
  }

  //check for parrent node
  var parentNode = {}
  if (currentRecipe.forked_parent) {
    parentNode.title = (<Link className="tree-link" to={`/viewrecipe?recipeId=${currentRecipe.forked_parent._id}`}>{currentRecipe.forked_parent.title}</Link>)
    parentNode.subtitle = currentRecipe.forked_parent.creator.username
    parentNode.expanded = true
    parentNode.children = currentNode

    //check for siblings
    if (currentRecipe.forked_parent.forked_children.length > 1) {
      currentRecipe.forked_parent.forked_children.forEach(child => {
        if (child._id !== currentRecipe._id) currentNode.unshift(
          {
            title: (<Link className="tree-link" to={`/viewrecipe?recipeId=${child._id}`}>{child.title}</Link>), 
            subtitle: child.creator.username
          }
        ) 
      })
    }

    treeData = [parentNode]
  }

  
  return treeData
}
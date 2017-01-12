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
    this.treeData = [
        { 
          title: 'Chicken Pasta Parent',
          subtitle: 'John Rambo' ,
          children: [ { title: 'Moms Spagetti' }, { title: 'Sister Spagetti' 

        }, { title: 'Brothers Spagetti' } ],
          expanded: true,
        },
        { 
          title: 'Chicken Grilled',
          expanded: true,
          children: [ { title: 'Egg CHICKEN DOUBLE SAUCE' } ] 
        }
      ]
  }
  disableDrag() {
    window.requestAnimationFrame(() => {
      [].slice.call(document.getElementsByClassName('rst__moveHandle')).forEach(element => {element.remove()})
    })
  }

  componentDidMount() {
    this.disableDrag()
  }

  render() {
    return (
      <SortableTree 
              treeData={this.treeData}
              isVirtualized={false} 
              onChange={() => {}}
      />
    )
  }
}

const  mapStateToProps = (state) => {
  return {
    recipes: state.recipes,
    userData: state.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators ({ fetchRecipes, getUserData, addUserSavedRecipe, removeUserSavedRecipe }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeList)

import { getStore } from '../index.js'
import { browserHistory } from 'react-router';
import { 
  updateSearchTerm, 
  clearRecipes, 
  fetchRecipes,
  getUserRecipes,
  getRecipeById
  } from './index'

export const routeDispatcher = (location = browserHistory.getCurrentLocation()) =>  {

  getStore().dispatch(updateSearchTerm('term' in location.query ? location.query.term : ''))
  //console.log(location)
  switch (location.pathname) {
    case '/':
      getStore().dispatch(clearRecipes())
      getStore().dispatch(fetchRecipes(location.search))
      break

    case '/myrecipes':
      getStore().dispatch(clearRecipes())
      getStore().dispatch(getUserRecipes(getStore().getState().userData.userData.my_recipes))
      break

    case '/viewrecipe':
      console.log('Route_Dispatcher OK ', location.pathname)
      getStore().dispatch(getRecipeById('recipeId' in location.query ? location.query.recipeId : ''))
      break

    case '/editrecipe':
      console.log('Route_Dispatcher OK ', location.pathname)
      getStore().dispatch(getRecipeById('recipeId' in location.query ? location.query.recipeId : ''))
      break

    default:
      console.log('Route_Dispatcher @', location.pathname, ' : nothing to dispatch')
  }
}
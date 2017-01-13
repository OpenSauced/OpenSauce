import { getStore } from '../index.js'
import { browserHistory } from 'react-router';
import { 
  updateSearchTerm, 
  clearRecipes, 
  fetchRecipes,
  getUserRecipes,
  getRecipeById,
  setDbOffset
  } from './index'

export const routeDispatcher = (location = browserHistory.getCurrentLocation()) =>  {

  getStore().dispatch(updateSearchTerm('term' in location.query ? location.query.term : ''))
  //console.log(location)
  switch (location.pathname.toLowerCase()) {
    case '/':
      console.log('Route_Dispatcher "/" OK ', location.pathname)
      getStore().dispatch(clearRecipes())
      getStore().dispatch(setDbOffset(6))
      getStore().dispatch(fetchRecipes(location.search))
      break

    case '/myrecipes':
      console.log('Route_Dispatcher myrecipe OK ', location.pathname)
      getStore().dispatch(clearRecipes())
      getStore().dispatch(setDbOffset(6))
      getStore().dispatch(getUserRecipes())
      break

    case '/viewrecipe':
      console.log('Route_Dispatcher viewrecipe OK ', location.pathname)
      getStore().dispatch(getRecipeById('recipeId' in location.query ? location.query.recipeId : ''))
      break

    case '/editrecipe':
      console.log('Route_Dispatcher editrecipe OK ', location.pathname)
      console.log('Route_Dispatcher editrecipe - location.query ', location.query)
      getStore().dispatch(getRecipeById('recipeId' in location.query ? location.query.recipeId : ''))
      break

    case '/login':
      console.log(browserHistory)

    default:
      console.log('Route_Dispatcher default @', location.pathname, ' : nothing to dispatch')
  }
}

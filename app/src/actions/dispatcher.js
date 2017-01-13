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
  switch (location.pathname.toLowerCase()) {
    case '/':
      getStore().dispatch(clearRecipes())
      getStore().dispatch(setDbOffset(6))
      getStore().dispatch(fetchRecipes(location.search))
      break

    case '/myrecipes':
      getStore().dispatch(clearRecipes())
      getStore().dispatch(setDbOffset(6))
      getStore().dispatch(getUserRecipes())
      break

    case '/viewrecipe':
      getStore().dispatch(getRecipeById('recipeId' in location.query ? location.query.recipeId : ''))
      break

    case '/editrecipe':
      getStore().dispatch(getRecipeById('recipeId' in location.query ? location.query.recipeId : ''))
      break

    case '/login':

  }
}

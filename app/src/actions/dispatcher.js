import { getStore } from '../index.js'
import { browserHistory } from 'react-router';
import { 
  updateSearchTerm, 
  clearRecipes, 
  fetchRecipes,
  getUserRecipes
  } from './index'

export const routeDispatcher = (location = browserHistory.getCurrentLocation()) =>  {

  getStore().dispatch(updateSearchTerm('term' in location.query ? location.query.term : ''))

  switch (location.pathname) {
    case '/':
      getStore().dispatch(clearRecipes())
      getStore().dispatch(fetchRecipes(location.search))
      break

    case '/myrecipes':
      getStore().dispatch(clearRecipes())
      getStore().dispatch(getUserRecipes(getStore().getState().userData.userData.my_recipes))
      break

    case '/profile':
      console.log(location)
      break
  }

}
import axios from 'axios'
import { getStore } from '../index.js'
export const GET_USER_DATA = 'GET_USER_DATA'

//export const SEARCH_RECIPES = 'SEARCH_RECIPES'
export const FETCH_RECIPES = 'FETCH_RECIPES'
export const GET_USER_RECIPES = 'GET_USER_RECIPES'
export const CLEAR_RECIPES = 'CLEAR_RECIPES'

export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM'

export const updateSearchTerm = (term) => {
 
  return {
    type: 'UPDATE_SEARCH_TERM',
    payload: term
  }
}

export const fetchRecipes = (search) => {
  const request = axios.get('/api/recipes/' + search)
  return {
   type: FETCH_RECIPES,
   payload: request
  }
}

export const getUserRecipes = (recipes) => {
  
  var username = getStore().getState().userData.userData.username
  var request = axios.get(`/api/recipes/${username}`)
  
  return {
    type: GET_USER_RECIPES,
    payload: request
  }
}

export const clearRecipes = (recipes) => {
  return {
    type: CLEAR_RECIPES,
    payload: null
  }
}

//get userdata via axios request (jump to /server/routes/userRoutes)
export const getUserData = ( username ) => {
// Added the 'get cookie for username here' route - must send a get request to find the username
 const request = axios.get('/auth/getUserCookie')
   .then((cookie) => {
     return axios.get(`/api/users/${cookie.data}/profile`);
   })
   .catch((err) => {
     console.error(err);
   })

 //return for dispatch in component - App.js
 return {
   type: GET_USER_DATA,
   payload: request
 }
}

export const routeDispatcher = (location) =>  {

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

import axios from 'axios'
import { getStore } from '../index.js'

//USER ACTIONS
export const GET_USER_DATA = 'GET_USER_DATA'
export const ADD_USER_SAVED_RECIPE = 'ADD_USER_SAVED_RECIPE'
export const REMOVE_USER_SAVED_RECIPE = 'REMOVE_USER_SAVED_RECIPE'

//RECIPES ACTIONS
export const FETCH_RECIPES = 'FETCH_RECIPES'
export const GET_USER_RECIPES = 'GET_USER_RECIPES'
export const CLEAR_RECIPES = 'CLEAR_RECIPES'
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID'

// SEARCH TERM ACTIONS
export const UPDATE_SEARCH_TERM = 'UPDATE_SEARCH_TERM'

export const updateSearchTerm = (term) => {

  return {
    type: UPDATE_SEARCH_TERM,
    payload: term
  }
}

export const fetchRecipes = (search) => {
  const request = axios.get('/api/recipes/' + search)
   // promise chaining, copyright Bennett Staley 2016
   return request.then((payload) => {
     var finalPayload = payload
     console.log(finalPayload)
     payload.data.forEach((recipe, index) => {
       // blank data check
       if (recipe.title === undefined || recipe.description === undefined || recipe.ingredients === undefined || recipe.creator === null) {
         // uh oh, someone posted something with blank data!
         // this shouldn't be possible
         console.log('index', index, 'is missing something! removed:', recipe.title)
         //remove that item. Warning, this shouldnt even be needed....
         finalPayload.data.splice(index, 1)
       } else {
         // wasn't missing anything, now we check their lenght
         // google will penalize you if you hide stuff for no reason. This is the solution
         // concatinating!
         //
         //
         // side note this would be better on db side, to cut down on weight of packet
         if (recipe.title.length > 55) {
          recipe.title = recipe.title.slice(0, 55).concat(' ...')
         }
         if (recipe.description.length > 175) {
          recipe.description = recipe.description.slice(0, 175).concat(' ...')
         }
       }
     })
     return finalPayload
   }).then((finalPayload) => {
     return {
      type: FETCH_RECIPES,
      payload: finalPayload
     }
   })
}

export const getUserRecipes = (recipes) => {

  var username = getStore().getState().userData.userData.username
  var request = axios.get(`/api/recipes/${username}/userrecipes`)
  var requestdata = request
    // .then((response) => {
    //   let recipes = response.data.my_recipes.concat(response.data.saved_recipes)
    //   recipes.forEach(recipe => {
    //     recipe.creator = {
    //       _id:recipe.creator,
    //       username: username
    //     }
    //   })
    //   return recipes
    // })
    console.log(request)
  return {
    type: GET_USER_RECIPES,
    payload: requestdata
  }
}

export const getRecipeById = (recipeId) => {
  var url = '/api/recipes/' + recipeId
  var request = axios.get(url)
  //console.log('ACTION DISPATCHED', recipeId)
  return {
    type: GET_RECIPE_BY_ID,
    payload: request
  }
}

export const clearRecipes = (recipes) => {
  return {
    type: CLEAR_RECIPES,
    payload: null
  }
}

export const addUserSavedRecipe = (recipeId, userId) => {

  var request = axios.post('/api/users/save', {
    recipeId: recipeId,
    userId: userId
  })
  //console.log('ACTION FIRED: -ADD RECIPE-', recipeId, userId)
  return {
    type: ADD_USER_SAVED_RECIPE,
    payload: request
  }
}

export const removeUserSavedRecipe = (recipeId, userId) => {

  var request = axios.post('/api/users/remove', {
    recipeId: recipeId,
    userId: userId
  })
  //console.log('ACTION FIRED: -REMOVE RECIPE-', recipeId, userId)
  return {
    type: REMOVE_USER_SAVED_RECIPE,
    payload: request
  }
}

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

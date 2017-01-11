import axios from 'axios'
import { getStore } from '../index.js'
import _ from 'lodash'

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

// check to see if we have a search in our redux state
// if the state has different search terms then set state to null and search again
// if the state has the same search terms append the new results to the state

export const fetchRecipes = (search, offset) => {
  // get the store so we can append instead of remove
  let previousFeed = getStore().getState().recipes;
  let reqUrl = '/api/recipes';

  // check to see if a search term was passed to the function
  if (search) {
    reqUrl = reqUrl + search;
  }

  // check to see if an offset was passed to the function
  if (offset) {
    // checks to see if an offset was passed and then checks
    // to see if it needs to prepend a & to the offset string
    if(search) offset = '&' + offset;
    else offset = '?' + offset;
    reqUrl = reqUrl + offset;
  }

  const request = axios.get(reqUrl);
  // promise chaining, copyright Bennett Staley 2016
  return request.then((payload) => {
    var finalPayload = payload;
    //loop through the data to see if its missing anything and then remove it
    if(payload.data.length > 0 && payload.data !== 'No Results') {
      payload.data.forEach((recipe, index) => {
      if (recipe.title === undefined || recipe.description === undefined || recipe.ingredients === undefined || recipe.creator === null) {
        // // uh oh, someone posted something with blank data!
        // // this shouldn't be possible
        // console.log('index', index, 'is missing something! removed:', recipe.title)
        // //remove that item. Warning, this shouldnt even be needed....
        // finalPayload.data.splice(index, 1)
        } else {
          // wasn't missing anything, now we check their length
          // google will penalize you if you hide stuff for no reason. This is the solution
          // concatinating!
          //
          //
          // side note this would be better on db side, to cut down on weight of packet
          if (recipe.title.length > 55) {
            recipe.title = recipe.title.slice(0, 55).concat('...')
          }
          if (recipe.description.length > 175) {
            recipe.description = recipe.description.slice(0, 175).concat('...')
          }
        }
      })
      if (previousFeed) {
        let data = previousFeed.concat(finalPayload.data);
        finalPayload.data = data;
      }
    } else {
      finalPayload.data = previousFeed;
    }
    return finalPayload;
  }).then((finalPayload) => {
    return {
      type: FETCH_RECIPES,
      payload: finalPayload
    }
  })
}

export const getUserRecipes = (filter) => {
  
  var username = getStore().getState().userData.userData.username
  var request = axios.get(`/api/recipes/${username}/userrecipes`)
  var requestdata = request
    .then((response) => {
      response.data.my_recipes.forEach(recipe => {
        // checks to see if the title has too many characters and then removes extra characters and appends
        // a ... to the end of the string
        if (recipe.title.length > 55) {
          recipe.title = recipe.title.slice(0, 55).concat('...')
        }
        // does the same thing to the description and replaces it
        if (recipe.description.length > 175) {
          recipe.description = recipe.description.slice(0, 175).concat('...')
        }
        recipe.creator = {
          _id:recipe.creator,
          username: username
        },
        recipe.type = "my_recipe"
      })
      response.data.saved_recipes.forEach(recipe => {
        recipe.type = "saved_recipe"
      })

      let recipes = response.data.my_recipes.concat(response.data.saved_recipes)
      //console.log(recipes)

      //Filter Saved Recipes
      if (filter && filter.isSavedRecipesChecked === false) {
        recipes = _.reject(recipes, (recipe) => recipe.type === "saved_recipe")
      }
      
      //Filter My Recipes
      if (filter && filter.isMyRecipesChecked === false) {
        recipes = _.reject(recipes, (recipe) => recipe.type === "my_recipe")
      }

      //Filter Forked Recipes
      if (filter && filter.isForkedRecipesChecked === false) {
        recipes = _.filter(recipes, (recipe) => recipe.forked_parent === null)
      }
      
      return recipes
    })

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
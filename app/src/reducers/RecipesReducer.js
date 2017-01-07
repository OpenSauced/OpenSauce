import { FETCH_RECIPES, GET_USER_RECIPES, SEARCH_RECIPES, CLEAR_RECIPES } from '../actions/index'

export default (state = null, action) => {
  switch (action.type) {
    
    case FETCH_RECIPES:
      return action.payload.data

    case GET_USER_RECIPES:
      //SAVED RECIPES ARE DUPLICATES
      //TO LIKE AND UNLIKE HERE MAKE DB CALLS THAT WILL RETURN THE USERS RECIPES POPULATED CHANGE THE LINK THAT FIRES SO THAT IT WILL KNOW WHAT TO DO AT ACTION LEVEL OR REDUCER LEVEL
      console.log('TODO: CHECK FOR DUPLICATES',action.payload.data.my_recipes.concat(action.payload.data.saved_recipes))
      return action.payload.data.my_recipes.concat(action.payload.data.saved_recipes)
    
    case CLEAR_RECIPES:
      return action.payload

  }
  return state;
}
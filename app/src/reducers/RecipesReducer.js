import { FETCH_RECIPES, GET_USER_RECIPES, SEARCH_RECIPES, CLEAR_RECIPES } from '../actions/index'

export default (state = null, action) => {
  switch (action.type) {
    
    case FETCH_RECIPES:
      return action.payload.data

    case GET_USER_RECIPES:
      //SAVED RECIPES ARE DUPLICATES
      console.log('SAVED RECIPES ARE DUPLICATES',action.payload.data.my_recipes.concat(action.payload.data.saved_recipes))
      return action.payload.data.my_recipes
    
    case CLEAR_RECIPES:
      return action.payload

  }
  return state;
}
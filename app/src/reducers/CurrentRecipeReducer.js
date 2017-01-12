import { GET_RECIPE_BY_ID, ADD_USER_SAVED_RECIPE, REMOVE_USER_SAVED_RECIPE } from '../actions/index'

export default (state = {}, action) => {
  switch (action.type) {

    case ADD_USER_SAVED_RECIPE:
      var newRecipe = Object.assign(state)
      newRecipe.likes = newRecipe.likes + 1
      return newRecipe

      case REMOVE_USER_SAVED_RECIPE:
        var newRecipe = Object.assign(state)
        newRecipe.likes = newRecipe.likes - 1
        return newRecipe

    case GET_RECIPE_BY_ID:
      //console.log('REDUCER FIRED', action.payload.data)
      return action.payload.data
  }
  return state;
}

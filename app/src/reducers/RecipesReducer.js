import { FETCH_RECIPES, GET_USER_RECIPES, SEARCH_RECIPES, CLEAR_RECIPES, FETCH_OFFSET } from '../actions/index'

export default (state = null, action) => {
  switch (action.type) {

    case FETCH_RECIPES:
      return action.payload.data || []
    break;

    case GET_USER_RECIPES:
      return action.payload

    case CLEAR_RECIPES:
      return action.payload

  }
  return state;
}

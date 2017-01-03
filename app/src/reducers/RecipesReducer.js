import { FETCH_RECIPES, GET_USER_DATA, SEARCH_RECIPES } from '../actions/index'

export default (state = [], action) => {
  switch (action.type) {
    
    case FETCH_RECIPES:
      return action.payload.data

    case GET_USER_DATA:
      return action.payload.data.my_recipes || state

    case SEARCH_RECIPES:
      console.log('FETCH_RECIPES PAYLOAD: ', action.payload.data)
      return state
  }
  return state;
}
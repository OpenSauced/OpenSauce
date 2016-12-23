import { FETCH_RECIPES, GET_USER_DATA } from '../actions/index'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      //console.log('FETCH_RECIPES PAYLOAD: ', action.payload.data)
      return action.payload.data
    case GET_USER_DATA:
      return action.payload.data.my_recipes
  }
  return state;
}
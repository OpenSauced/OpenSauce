import { FETCH_RECIPES } from '../actions/index'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      console.log(action.payload.data) 
      return [action.payload.data]
  }
  return state;
}
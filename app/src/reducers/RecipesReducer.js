import { FETCH_RECIPES } from '../actions/index'

export default (state = [], action) => {
  switch (action.type) {
    case FETCH_RECIPES:
      return action.payload.data
  }
  return state;
}
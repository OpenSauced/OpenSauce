import { UPDATE_SEARCH_TERM } from '../actions/index'

export default (state = '', action) => {
  switch (action.type) {

    case UPDATE_SEARCH_TERM:
      return action.payload

  }

  return state;
}
import { DB_OFFSET } from '../actions/index'

export default (state = 6, action) => {
  switch (action.type) {

    case DB_OFFSET:
      return action.payload

  }

  return state;
}
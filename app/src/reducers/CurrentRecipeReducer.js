import { GET_RECIPE_BY_ID } from '../actions/index'

export default (state = {text: 'HOLA'}, action) => {
  switch (action.type) {

    case GET_RECIPE_BY_ID:
      //console.log('REDUCER FIRED', action.payload.data)
      return action.payload.data
  }
  return state;
}
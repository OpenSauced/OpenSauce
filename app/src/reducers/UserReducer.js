import { GET_USER_DATA } from '../actions/index'
//TODO: add actions to action index.js

//I think the function name doesn't matter here.... see the difference between this and RecipesReducer
export default function userReducer (state = {}, action) {
  switch (action.type) {
    //get user info from db
    case GET_USER_DATA :
      //console.log('USERREDUCER - action.payload', action.payload)
      return Object.assign({}, state, {
          userData: action.payload.data

        }
      )
    //change some user info
    //TODO: what user info exactly?
    // case "CHANGE_USER_INFO" :
    //   return state - action.number
    default:
      return state
  }
}
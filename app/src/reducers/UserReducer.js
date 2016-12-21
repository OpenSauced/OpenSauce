import { GET_USER_DATA } from '../actions/index'
//TODO: add actions to action index.js

export default function userInfoReducer(state = {}, action) {
  switch (action.type) {
    //get user info from db
    case GET_USER_DATA :
      console.log('USERREDUCER - action.payload', action.payload)
      return Object.assign({}, state, {
          username: action.payload.data.username,
          firstName: action.payload.data.first_name,
          lastName: action.payload.data.last_name,
          picture: action.payload.data.picture
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
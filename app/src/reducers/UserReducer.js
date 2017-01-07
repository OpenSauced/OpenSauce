import { GET_USER_DATA, ADD_USER_SAVED_RECIPE, REMOVE_USER_SAVED_RECIPE } from '../actions/index'
//TODO: add actions to action index.js

//I think the function name doesn't matter here.... see the difference between this and RecipesReducer
export default function userReducer (state = {}, action) {
  switch (action.type) {
    //get user info from db
    case GET_USER_DATA:
      
      return Object.assign({}, state, {
          userData: action.payload.data
          //REFACTOR THIS TO action.payload.data.userData and change it everywhere else.
        }
      )
    
    case ADD_USER_SAVED_RECIPE:
      
      return Object.assign({}, state, {
          userData: action.payload.data
          //ALSO REFACTOR THIS TO action.payload.data.userData and change it everywhere else.
        }
      )

    case REMOVE_USER_SAVED_RECIPE:
      
      return Object.assign({}, state, {
          userData: action.payload.data
          //ALSO ALSO REFACTOR THIS TO action.payload.data.userData and change it everywhere else.
        }
      )

    default:
      return state
  }
}
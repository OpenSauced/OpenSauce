import { combineReducers } from 'redux';
import RecipesReducer from './RecipesReducer'
import UserReducer from './UserReducer'

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  userData: UserReducer
});

export default rootReducer;
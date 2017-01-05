import { combineReducers } from 'redux';
import RecipesReducer from './RecipesReducer'
import UserReducer from './UserReducer'
import SearchTermReducer from './SearchTermReducer'

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  userData: UserReducer,
  searchTerm: SearchTermReducer
});

export default rootReducer;
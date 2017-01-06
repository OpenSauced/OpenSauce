import { combineReducers } from 'redux';
import RecipesReducer from './RecipesReducer'
import UserReducer from './UserReducer'
import SearchTermReducer from './SearchTermReducer'
import CurrentRecipeReducer from './CurrentRecipeReducer'

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  userData: UserReducer,
  searchTerm: SearchTermReducer,
  currentRecipe: CurrentRecipeReducer
});

export default rootReducer;
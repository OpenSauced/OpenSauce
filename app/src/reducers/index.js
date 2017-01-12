import { combineReducers } from 'redux';
import RecipesReducer from './RecipesReducer'
import UserReducer from './UserReducer'
import SearchTermReducer from './SearchTermReducer'
import CurrentRecipeReducer from './CurrentRecipeReducer'
import OffsetReducer from './OffsetReducer'

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  userData: UserReducer,
  searchTerm: SearchTermReducer,
  currentRecipe: CurrentRecipeReducer,
  offset: OffsetReducer
});

export default rootReducer;
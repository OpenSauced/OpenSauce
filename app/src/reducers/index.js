import { combineReducers } from 'redux';
import RecipesReducer from './RecipesReducer'
import UserReducer from './UserReducer'
import SearchTermReducer from './SearchTermReducer'
import CurrentRecipeReducer from './CurrentRecipeReducer'
import OffsetReducer from './OffsetReducer'
import TreeDataReducer from './TreeDataReducer'

const rootReducer = combineReducers({
  recipes: RecipesReducer,
  userData: UserReducer,
  searchTerm: SearchTermReducer,
  currentRecipe: CurrentRecipeReducer,
  offset: OffsetReducer,
  treeData: TreeDataReducer,
});

export default rootReducer;
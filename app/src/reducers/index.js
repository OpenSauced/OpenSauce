import { combineReducers } from 'redux';
import RecipesReducer from './RecipesReducer'

const rootReducer = combineReducers({
  recipes: RecipesReducer
});

export default rootReducer;
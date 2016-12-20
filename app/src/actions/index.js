import axios from 'axios'

export const FETCH_RECIPES = 'FETCH_RECIPES'

export const fetchRecipes = () => {
  
  const request = axios.get('http://localhost:3000/api/recipes/')
  return {
    type: FETCH_RECIPES,
    payload: request

  }
}
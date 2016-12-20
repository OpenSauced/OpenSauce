import axios from 'axios'

export const FETCH_RECIPES = 'FETCH_RECIPES'

export const fetchRecipes = (data) => {
  
  const request = axios.get('http://localhost:3000/recipes/rub_duckey')
  
  return {
    type: FETCH_WEATHER,
    payload: request

  }
}
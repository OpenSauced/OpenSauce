import axios from 'axios'

export const FETCH_RECIPES = 'FETCH_RECIPES';
export const GET_USER_DATA = 'GET_USER_DATA';

export const fetchRecipes = () => {
  
  const request = axios.get('http://localhost:3000/api/recipes/')
  return {
    type: FETCH_RECIPES,
    payload: request

  }
}


// add 'username' as an argument
export const getUserData = () => {

  //get userdata via axios request (jump to /server/routes/userRoutes)
  //TODO: Get username to insert in url
  const request = axios.get('/api/users/asd/profile')
  
  //return for dispatch in component - App.js
  return {
    type: GET_USER_DATA,
    payload: request
  }
}
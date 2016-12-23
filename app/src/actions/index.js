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

//get userdata via axios request (jump to /server/routes/userRoutes)
export const getUserData = ( username ) => {
 
// Added the 'get cookie for username here' route - must send a get request to find the username
 const request = axios.get('/api/users/getUserCookie')
   .then((cookie) => {
     return axios.get(`/api/users/${cookie.data}/profile`);
   })
   .catch((err) => {
     console.error(err);
   })

 //return for dispatch in component - App.js
 return {
   type: GET_USER_DATA,
   payload: request
 }
}
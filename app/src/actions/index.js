import axios from 'axios'


export const GET_USER_DATA = 'GET_USER_DATA';
export const SEARCH_RECIPES = 'SEARCH_RECIPES'
export const FETCH_RECIPES = 'FETCH_RECIPES';


export const searchRecipes = (term) => {
  const url = `/api/recipes/search?term=${term}`
  const request = axios.get(url)
  return {
    type: SEARCH_RECIPES,
    payload: request
  }
}

export const fetchRecipes = () => {
  const request = axios.get('/api/recipes/')
  return {
   type: FETCH_RECIPES,
   payload: request
  }
}

//get userdata via axios request (jump to /server/routes/userRoutes)
export const getUserData = ( username ) => {
 console.log('FETCHING USER DATA' )
// Added the 'get cookie for username here' route - must send a get request to find the username
 const request = axios.get('/auth/getUserCookie')
   .then((cookie) => {
    console.log('cookie', cookie)
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

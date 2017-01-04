import axios from 'axios'


export const GET_USER_DATA = 'GET_USER_DATA';
export const SEARCH_RECIPES = 'SEARCH_RECIPES'
export const FETCH_RECIPES = 'FETCH_RECIPES';

export const locationDidUpdate = (data) => {
  console.log('locationDidUpdate: ', data)
  return {
    type: 'DO_NOTHING',
    payload: null
  }
}

export const searchRecipes = (term) => {
  const url = `/api/recipes/search?term=${term}`
  const request = axios.get(url)
  
  return {
    type: SEARCH_RECIPES,
    payload: request
  }
}

export const fetchRecipes = (search) => {
  const request = axios.get('/api/recipes/' + search)
  return {
   type: FETCH_RECIPES,
   payload: request
  }
}

//get userdata via axios request (jump to /server/routes/userRoutes)
export const getUserData = ( username ) => {
// console.log('FETCHING USER DATA' )
// Added the 'get cookie for username here' route - must send a get request to find the username
 const request = axios.get('/auth/getUserCookie')
   .then((cookie) => {
    //console.log('cookie', cookie)
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

export const routeDispatcher = (store, location) =>  {
  console.log("ROUTE DISPATCHER WAS CALLED!")
  console.log(store.getState().userData)
  console.log(location)
  switch (location.pathname) {
    case '/':
    store.dispatch(fetchRecipes(location.search))
    break

    case '/myrecipes':
    store.dispatch(getUserData())
    break
  }

}

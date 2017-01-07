import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//Router Stuff
import App from './containers/App'
import RouteLogin from './RouteLogin';
import RouteSignUp from './RouteSignUp';
import RouteHomepage from './RouteHomepage';
import RouteProfile from './RouteProfile';
import RouteAddRecipe from './RouteAddRecipe';
import Route404 from './Route404';
import MyRecipes from './RouteMyRecipes'
import RouteViewRecipe from './RouteViewRecipe'

//Redux Stuff
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import ReduxPromise from 'redux-promise';

//Redux reducers and actions
import axios from 'axios'
import reducers from './reducers';
import { getUserData } from './actions/index';
import { routeDispatcher } from './actions/dispatcher';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

store.dispatch( getUserData() ).then( (data) => renderApplication () )

function renderApplication () {
  
  routeDispatcher()
  browserHistory.listen((location) => {
    routeDispatcher(location)
  })

  ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        
        <Route path="/" component={App}>
          {/* Homepage route */}
          <IndexRoute component={RouteHomepage}/>
          {/* Current User Profile Settings route */}
          <Route path="/profile" component={RouteProfile}/>
                  
          {/* Signup route */}
          <Route path="/signup" component={RouteSignUp}/>
        
          {/* Login route */ }
          <Route path="/login" component={RouteLogin}/>
     
          {/* Recipe Routes */}
          <Route path="/addrecipe(?:recipeId)" component={RouteAddRecipe}/>
          <Route path="/viewrecipe(?:recipeId)" component={RouteViewRecipe}/>
          <Route path="/myrecipes" component={MyRecipes}/>

          {/* Test Routes*/}

          {/* These routes will handle 404 errors */}
          <Route path="/*" component={Route404}/>
          <Route path="/**/*" component={Route404}/>

        </Route>
        
      </Router>
    </Provider>
  ), document.getElementById('root'));
}

export function getStore() {
    return store;
}
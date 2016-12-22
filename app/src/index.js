import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//Router Stuff
import RouteLogin from './RouteLogin';
import RouteSignup from './RouteSignUp';
import RouteHomepage from './RouteHomepage';
import RouteProfile from './RouteProfile';
import RouteAddRecipe from './RouteAddRecipe';
import Route404 from './Route404';
import SearchBar from './containers/SearchBar';
import RecipeList from './containers/RecipeList';

//Redux Stuff
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';
import ReduxPromise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      {/* Homepage route */}
      <Route path="/" component={RouteHomepage}/>

      {/* Current User Profile Settings route */}
      <Route path="/profile" component={RouteProfile}/>

      {/* Signup route */}
      <Route path="/signup" component={RouteSignup}/>

      {/* Login route */}
      <Route path="/login" component={RouteLogin}/>

      {/* Recipe Routes */}
      <Route path="/addrecipe" component={RouteAddRecipe}/>

      {/* Test Routes*/}
      <Route path="/search" component={SearchBar}/>
      <Route path="/RecipeList" component={RecipeList}/>

      {/* These routes will handle 404 errors */}
      <Route path="/*" component={Route404}/>
      <Route path="/**/*" component={Route404}/>

    </Router>
  </Provider>
), document.getElementById('root'));

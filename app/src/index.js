import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

//Router Stuff
import RouteLogin from './RouteLogin';
import RouteSignup from './RouteSignup';
import RouteHomepage from './RouteHomepage';
import RouteProfile from './RouteProfile';
import RouteAddRecipe from './RouteAddRecipe';
import Route404 from './Route404';

//Redux Stuff
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './reducers';


const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={hashHistory}>
      {/* Homepage route */}
      <Route path="/" component={RouteHomepage}/>
      {/* Current User Profile Settings route */}
      <Route path="/profile" component={RouteProfile}/>
      {/* Signup route */}
      <Route path="/signup" component={RouteSignup}/>
      {/* Login route */}
      <Route path="/signup" component={RouteSignup}/>
      {/* These routes will handle 404 errors */}
      <Route path="/*" component={Route404}/>
      <Route path="/**/*" component={Route404}/>
    </Router>
  </Provider>
),document.getElementById('root'));

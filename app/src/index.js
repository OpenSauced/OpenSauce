import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

//Redux and reducers 
//TODO: add reducers file
import { Provider, createStore } from 'react-redux';
//writing "from './reducers'" will default to './reducers/index.js'
import reducers from './reducers'

//Routes for views
import RouteHomepage from './RouteHomepage';
import RouteAddRecipe from './RouteAddRecipe';
import Route404 from './Route404';

//creating reducers and store
const store = createStore(reducers)

render((
  <Provider store={store} >
    <Router history={hashHistory}>
      {/* Serves Homepage */}
      <Route path="/" component={RouteHomepage}/>
      {/* Recipe Routes */}
      <Route path="/addrecipe" component={RouteAddRecipe}/>
      {/* These routes will handle 404 errors */}
      <Route path="/*" component={Route404}/>
      <Route path="/**/*" component={Route404}/>
    </Router>
  </Provider>
),document.getElementById('root'));

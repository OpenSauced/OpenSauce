import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';

//Router Stuff
import RouteHomepage from './RouteHomepage';
import RouteAddRecipe from './RouteAddRecipe';
import Route404 from './Route404';

//Redux Stuff
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'


const createStoreWithMiddleware = applyMiddleware()(createStore);

ReactDOM.render((
  <Provider store={createStoreWithMiddleware(reducers)}>
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

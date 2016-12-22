import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

//Router Stuff
import RouteLogin from './RouteLogin';
import RouteSignUp from './RouteSignUp';
import RouteHomepage from './RouteHomepage';
import RouteProfile from './RouteProfile';
import RouteAddRecipe from './RouteAddRecipe';
import Route404 from './Route404';
import SearchBar from './containers/Homepage/SearchBar';
import RouteViewRecipe from './RouteViewRecipe'

//Redux Stuff
import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import ReduxPromise from 'redux-promise';

//Redux reducers and actions
import axios from 'axios'
import reducers from './reducers';
import { getUserData } from './actions/index';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const store = createStoreWithMiddleware(reducers);

// Setting redux state before the app can render - this wraps DOM.render
axios
.get('/api/users/getUserCookie')
.then(
  (cookie) => {
     var username = cookie.data;
     store.dispatch(getUserData(username)).then((data) => renderShezit())
  }
)

function renderShezit () {
  ReactDOM.render((
    <Provider store={store}>
      <Router history={browserHistory}>
        {/* Homepage route */}
        <Route path="/" component={RouteHomepage}/>

        {/* Current User Profile Settings route */}
        <Route path="/profile" component={RouteProfile}/>
                  
        {/* Signup route */}
        <Route path="/signup" component={RouteSignUp}/>
        
        {/* Login route */ }
        <Route path="/login" component={RouteLogin}/>

        {/* Recipe Routes */}
        <Route path="/addrecipe" component={RouteAddRecipe}/>
        
        {/* Test Routes*/}


        {/* These routes will handle 404 errors */}
        <Route path="/*" component={Route404}/>
        <Route path="/**/*" component={Route404}/>
        
      </Router>
    </Provider>
  ), document.getElementById('root'));
}


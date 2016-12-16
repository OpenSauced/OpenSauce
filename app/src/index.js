import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Homepage from './Homepage';
import AddRecipe from './AddRecipe';


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Homepage}/>
    {
      <Route path="/addrecipe" component={AddRecipe}/>
    //<Route path="/:user/:recipeId" component={ViewRecipe}/>
    }
  </Router>
),document.getElementById('root'));

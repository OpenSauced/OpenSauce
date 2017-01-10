import React from 'react'
import { Link } from 'react-router';

const ForkButton = ({ recipeId }) => {
  <Link className="col-2 icon" to={`/addrecipe?recipe=${recipeId}`}>
    <i className="fa fa-cutlery fa-3x icon"></i>
    <br></br>
    <p className="icon">Fork this Recipe</p>
  </Link> 
}

module.exports = ForkButton
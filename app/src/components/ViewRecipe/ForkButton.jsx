import React from 'react'
import { Link } from 'react-router';
    
// this is what the Component will look like: 
// <ForkButton recipeId={recipe._id} cssStyles={{iconColor: 'green'}}/>

const ForkButton = ({ recipeId, cssStyles }) => {

  // set color here
  // add to string in classname - will correspond with a css class
  let color = cssStyles || ''
  if ( color.iconColor ){
    color = color.iconColor 
  }
  return (
    <Link className={"col-6 icon" + color} to={`/addrecipe?recipe=${recipeId}`}>
      <i className={"fa fa-cutlery fa-3x icon" + color}></i>
      <br></br>
      <p className={"icon"+color}>Fork this Recipe</p>
    </Link> 
  )
}

export default ForkButton
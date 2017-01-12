import React from 'react'
import { Link } from 'react-router';

// this is what the Component will look like:
// <ForkButton recipeId={recipe._id} cssStyles={{iconColor: 'green'}}/>

const ForkButton = ({ recipeId, cssStyles }) => {

  // set color here
  // add to string in classname - will correspond with a css class

  return (
    <Link className="col-6 fork" to={`/addrecipe?recipe=${recipeId}`}>
      <i className="fa fa-cutlery fa-3x">
      </i>
      <p className="">Fork</p>
    </Link>
  )
}

export default ForkButton

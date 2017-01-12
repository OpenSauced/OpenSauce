import React from 'react'
import { Link } from 'react-router';

const RecipeLikeCount = ({likes}) => {

  return (
    <div className="row justify-content-center ml-auto mr-auto"> <i className="fa fa-heart"> {likes}</i></div>
  );
};

module.exports = RecipeLikeCount;


// <div> likes {recipe.likes} </div>

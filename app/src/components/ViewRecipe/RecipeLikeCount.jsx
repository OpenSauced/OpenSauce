import React from 'react'
import { Link } from 'react-router';

 {/* Shows the amount of likes a given recipe has */}
const RecipeLikeCount = ({likes}) => {

  return (
    <div className="row justify-content-center ml-auto mr-auto"> 
      <i className="fa fa-heart"> {likes}</i>
    </div>
  );
};

module.exports = RecipeLikeCount;


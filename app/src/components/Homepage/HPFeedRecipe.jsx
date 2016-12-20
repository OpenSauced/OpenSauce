import React from 'react';

const HPFeedRecipe = () => {
  return (
    <li className="col-xs-12 col-sm-4 recipe_card-cont">
      <div className="recipe_card-box">
        <img src="" alt="" title="" className="recipe_card-image"/>
        <h2 className="recipe_card-title">Recipe Title</h2>
        <p className="recipe_card-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla cursus ex nec quam placerat sagittis. 
        Pellentesque lobortis varius nunc, eu elementum nisl commodo eu. Ut iaculis egestas augue, a ultricies 
        eros tristique nec. Suspendisse nibh orci, tempus vitae dictum at, sagittis quis ipsum. Aenean non dui 
        in leo dapibus semper venenatis semper neque. Nam consequat, nunc elementum faucibus lacinia, mauris 
        elit egestas elit, non posuere odio justestsetsetto mollis nunc.</p>
        <div className="row recipe_card-fork_like-cont">
          <a className="recipe_card-fork_button col-xs-4">Fork Recipe</a>
          <a className="recipe_card-like_button col-xs-4">Like Recipe</a>
        </div>
      </div>
    </li>
  );
}

export default HPFeedRecipe;

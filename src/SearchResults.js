import React from 'react';

const SearchResults = ({ title, calories, image, ingredients, recipeUrl }) => {
  const handleRecipeClick = event => {
    event.preventDefault();
    window.open(recipeUrl, '_blank');
  };

  return (
    <div className="recipe" onClick={handleRecipeClick}>
    <a href="">
    <h1 className="recipe-title">
       {title}
    </h1>
    <p>{parseInt(calories)}</p>
    <img className="image" src={image} alt=""  />
    </a>
  </div>
);
};

export default SearchResults;

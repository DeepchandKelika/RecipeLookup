import React, { useState } from 'react';
import './IngredientsPopup.css'; 

const IngredientsPopup = ({ onClose, onFilter, recipes }) => {
  const ingredientsSet = new Set();
  recipes.forEach((recipe) => {
    recipe.recipe.ingredients.forEach((ingredient) => {
      ingredientsSet.add(ingredient.food.toLowerCase());
    });
  });
  const ingredientsList = Array.from(ingredientsSet);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  const handleIngredientClick = (ingredient) => {
    setSelectedIngredients((prevSelected) =>
      prevSelected.includes(ingredient)
        ? prevSelected.filter((item) => item !== ingredient) // This line is to remove ingredient, unselected by user.
        : [...prevSelected, ingredient]
    );
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    onFilter(selectedIngredients);
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>What do you have?(Select atleast 3) </h2>
        <form onSubmit={handleFilterSubmit}>
          {ingredientsList.map((ingredient) => (
            <button
              key={ingredient}
              type="button"
              className={`ingredient-button ${
                selectedIngredients.includes(ingredient) ? 'selected' : ''
              }`}
              onClick={() => handleIngredientClick(ingredient)}
            >
              {ingredient}
            </button>
          ))}
          <div className="button-group">
            <button type="submit">Apply Filter</button>
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default IngredientsPopup;

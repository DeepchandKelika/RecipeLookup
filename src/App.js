import React, { useState } from 'react';
import './App.css';
import SearchResults from './SearchResults';
import IngredientsPopup from './IngredientsPopup';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedIngredients, setSelectedIngredients] = useState([]); 
  const [selectedFilters, setSelectedFilters] = useState({
    diet: '',
    health: '',
    cuisineType: '',
    mealType: '',
    dishType: '',
  });
  const diet = ["balanced", "high-fiber","high-protein","low-carb", "low-fat", "low-sodium"];
  const health = ["alcohol-cocktail","alcohol-free","celery-free","crustacean-free","dairy-free","DASH","egg-free","fish-free","fodmap-free","gluten-free","immuno-supportive","keto-friendly","kidney-friendly","kosher","low-fat-abs","low-potassium","low-sugar","lupine-free","Mediterranean","mollusk-free","mustard-free","no-oil-added","paleo","peanut-free","pescatarian","pork-free","red-meat-free","sesame-free","shellfish-free","soy-free","sugar-conscious","sulfite-free","tree-nut-free","vegan","vegetarian","wheat-free"]
  const cuisineType = ["American","Asian","British","Caribbean","Central Europe","Chinese","Eastern Europe","French","Indian","Italian","Japanese","Kosher","Mediterranean","Mexican","Middle Eastern","Nordic","South American","South East Asian"]
  const mealType = ["Breakfast","Dinner","Lunch","Snack","Teatime"]
  const dishType = ["Biscuits and cookies","Bread","Cereals","Condiments and sauces","Desserts","Drinks","Main course","Pancake","Preps","Preserve","Salad","Sandwiches","Side dish","Soup","Starter","Sweets"]



  const fetchResults = async () => {
    try {
     

      const url = `http://127.0.0.1:5000/?query=${search}&diet=${selectedFilters.diet}&health=${selectedFilters.health}&cuisineType=${selectedFilters.cuisineType}&mealType=${selectedFilters.mealType}&dishType=${selectedFilters.dishType}`;
     console.log('API Request URL:', url);
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
        setResults(data.hits);
        setFilteredResults(data.hits); 
      } else {
        console.error('Error:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search:', search);
    fetchResults();
  };

  const handleFilter = (ingredients) => {
    if (ingredients.length === 0) {
      setFilteredResults(results);
    } else {
      const filtered = results.filter((recipe) => {
        const recipeIngredients = recipe.recipe.ingredients.map((ingredient) =>
          ingredient.food.toLowerCase()
        );
        const matchedIngredients = ingredients.filter((ingredient) =>
          recipeIngredients.includes(ingredient.toLowerCase())
        );
  
        return matchedIngredients.length >= 3; 
      });
      setFilteredResults(filtered);
    }
  };

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleDietFilterChange = (selectedOption) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      diet: selectedOption.value,
    }));
  };
  
  const handleHealthFilterChange = (selectedOption) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      health: selectedOption.value,
    }));
  };
  
  const handleCuisineTypeFilterChange = (selectedOption) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      cuisineType: selectedOption.value,
    }));
  };

  const handleMealTypeFilterChange = (selectedOption) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      mealType: selectedOption.value,
    }));
  };

  const handleDishTypeFilterChange = (selectedOption) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      dishType: selectedOption.value,
    }));
  };
  
  

return (
  <div className="App">
    <form onSubmit={handleSearch} className="search-form">
      <button className="filter-button" type="button" onClick={handleOpenPopup}>
          What can I make?
        </button>
        <input
          className="search-bar"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search recipes..."
        />
      <button className="search-button" type="submit">
        Search
      </button>
    
      <div className="filter-container">
      <div className="filter-item">
        <label htmlFor="diet">Diet:</label>
          <Dropdown
          options={[
            { value: '', label: 'Select an option', disabled: true },
            ...diet.map((d) => ({ value: d, label: d })),
          ]}
            label = 'Diet'
            onChange={handleDietFilterChange}
            value= {selectedFilters.diet}
            placeholder="Select an option"
          />
        </div> 

       

        <div className="filter-item">
        <label htmlFor="health">Health:</label>
        <Dropdown
          options={[
            { value: '', label: 'Select an option', disabled: true },
            ...health.map((d) => ({ value: d, label: d })),
          ]}
          onChange={handleHealthFilterChange}
          value={selectedFilters.health}
          placeholder="Select an option"
        />
        </div>

        <div className="filter-item">
        <label htmlFor="cuisineType">Cuisine Type:</label>
        <Dropdown
          options={[
            { value: '', label: 'Select an option', disabled: true },
            ...cuisineType.map((d) => ({ value: d, label: d })),
          ]}
          onChange={handleCuisineTypeFilterChange}
          value={selectedFilters.cuisineType}
          placeholder="Select an option"
        />
        </div>

        <div className="filter-item">
        <label htmlFor="mealType">Meal Type:</label>
        <Dropdown
          options={[
            { value: '', label: 'Select an option', disabled: true },
            ...mealType.map((d) => ({ value: d, label: d })),
          ]}
          onChange={handleMealTypeFilterChange}
          value={selectedFilters.mealType}
          placeholder="Select an option"
        />
        </div>

        <div className="filter-item">
        <label htmlFor="dishType">Dish Type:</label>

        <Dropdown
          options={[
            { value: '', label: 'Select an option', disabled: true },
            ...dishType.map((d) => ({ value: d, label: d })),
          ]}
          onChange={handleDishTypeFilterChange}
          value={selectedFilters.dishType}
          placeholder="Select an option"
        />
      </div>
    </div>


        
      </form>
      <div className="recipes">
        {filteredResults && 
         filteredResults.map((recipe) => (
          <SearchResults
            key={recipe.recipe.uri}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredientLines}
            recipeUrl={recipe.recipe.url}
          />
        ))}
      </div>
      {showPopup && (
  <IngredientsPopup
    recipes={results} 
    selectedIngredients={selectedIngredients}
    setSelectedIngredients={setSelectedIngredients}
    onClose={handleClosePopup}
    onFilter={handleFilter}
  />
)}

    </div>
  );
};

export default App;

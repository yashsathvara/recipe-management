import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/recipes');
        setRecipes(response.data);
      } catch (error) {
        console.error('Error fetching recipes:', error.message);
        alert('Failed to fetch recipes. Please try again later.');
      }
    };
    fetchRecipes();
  }, []);


  const filteredRecipes = recipes.filter((recipe) =>
    recipe.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2>Recipes</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search recipes by title"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="row">
        {filteredRecipes.map((recipe) => (
          <div className="col-md-4 mb-4" key={recipe.id}>
            <div className="card">
              <div className="card-body">
                <img className='card-img-top' src={recipe.itemImage} alt='recipe' />
                <h5 className="card-title">{recipe.title}</h5>
                <p className="card-text">{recipe.cuisineType}</p>
                <Link to={`/recipes/${recipe.id}`} className="btn btn-primary">
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;

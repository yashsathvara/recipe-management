import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeForm = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cuisineType, setCuisineType] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [itemImage, setItemImage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchRecipe = async () => {
        const response = await axios.get(`http://localhost:5000/recipes/${id}`);
        const { title, ingredients, instructions, cuisineType, cookingTime } = response.data;
        setTitle(title);
        setIngredients(ingredients.join(', '));
        setInstructions(instructions);
        setCuisineType(cuisineType);
        setCookingTime(cookingTime);
      };
      fetchRecipe();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipeData = {
      title,
      ingredients: ingredients.split(',').map((item) => item.trim()),
      instructions,
      cuisineType,
      cookingTime,
      itemImage,
    };

    if (id) {
      await axios.put(`http://localhost:5000/recipes/${id}`, recipeData);
    } else {
      await axios.post('http://localhost:5000/recipes', recipeData);
    }
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2>{id ? 'Edit Recipe' : 'Add Recipe'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Ingredients (comma-separated):</label>
          <input
            type="text"
            className="form-control"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Instructions:</label>
          <textarea
            className="form-control"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Cuisine Type:</label>
          <input
            type="text"
            className="form-control"
            value={cuisineType}
            onChange={(e) => setCuisineType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Cooking Time (in minutes):</label>
          <input
            type="number"
            className="form-control"
            value={cookingTime}
            onChange={(e) => setCookingTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>URL:</label>
          <input
            type="text"
            className="form-control"
            value={itemImage}
            onChange={(e) => setItemImage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Save Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;

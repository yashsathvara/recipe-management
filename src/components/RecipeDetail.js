import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      const response = await axios.get(`http://localhost:5000/recipes/${id}`);
      setRecipe(response.data);
    };
    fetchRecipe();
  }, [id]);

  const handleDelete = async () => {
    await axios.delete(`http://localhost:5000/recipes/${id}`);
    navigate('/');
  };

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container mt-5">
      <img className='card-img-top' src={recipe.itemImage} alt='recipe' style={{ width: "300px", height: "300px", objectFit:"cover", objectPosition:"top" }} />
      <h2>{recipe.title}</h2>
      <p><strong>Cuisine Type:</strong> {recipe.cuisineType}</p>
      <p><strong>Ingredients:</strong> {recipe.ingredients.join(', ')}</p>
      <p><strong>Instructions:</strong> {recipe.instructions}</p>
      <p><strong>Cooking Time:</strong> {recipe.cookingTime} minutes</p>
      <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
      <button className="btn btn-warning" onClick={() => navigate(`/edit-recipe/${id}`)}>Edit</button>
    </div>
  );
};

export default RecipeDetail;

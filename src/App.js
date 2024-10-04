import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeForm from './components/RecipeForm';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<RecipeList />} />
        <Route path="/recipes/:id" element={<RecipeDetail />} />
        <Route path="/add-recipe" element={<RecipeForm />} />
        <Route path="/edit-recipe/:id" element={<RecipeForm />} />
      </Routes>
    </Router>
  );
};

export default App;

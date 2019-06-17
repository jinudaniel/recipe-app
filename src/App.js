import React, { useState, useEffect } from 'react';
import './App.css';

import Form from "./components/Form";
import Recipes from "./components/Recipes";

const API_KEY = process.env.REACT_APP_APIKEY; // Your API key here.

const App = () => {
  const [recipes, setRecipes] = useState([]);

  async function getRecipe(e) {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const api_call = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${recipeName}&count=10`);
    
    const data = await api_call.json();
    setRecipes(data.recipes);
  }
  useEffect(() => {
    if(localStorage.getItem("recipes") !== null){
      const json = localStorage.getItem("recipes");
      const recipes = JSON.parse(json);
      setRecipes(recipes);
      }
  }, [])

  useEffect(() => { 
    const jsonrecipes = JSON.stringify(recipes);
    localStorage.setItem("recipes", jsonrecipes);
  }, [recipes])


    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={getRecipe} />
        <Recipes recipes={recipes} />
      </div>
    );
}

export default App;
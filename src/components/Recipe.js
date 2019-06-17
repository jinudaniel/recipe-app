import React, {useState, useEffect } from 'react';

import { Link } from "react-router-dom";
import Loader from './LoadingPage';

const API_KEY = process.env.REACT_APP_APIKEY; // Your API key here.

const Recipe = (props) => {
  const [activeRecipe, setActiveRecipe] = useState([]);

  useEffect(() => {
    async function fetchRecipeData () {
      try {
       const title = props.location.state.recipe;
       const req = await fetch(`https://cors-anywhere.herokuapp.com/http://food2fork.com/api/search?key=${API_KEY}&q=${title}`);
       
       const res = await req.json();
       return res.recipes[0]
      }
      catch(e) {
        console.log(e)
      }
    }
    
   fetchRecipeData().then((recipe) => {
     setActiveRecipe(recipe)
   });
  }, []);

  return (
    <div className="container">
      { activeRecipe.length === 0 ? <Loader /> :
      (<div className="active-recipe">
      <img className="active-recipe__img" src={activeRecipe.image_url} alt={activeRecipe.title}/>
      <h3 className="active-recipe__title">{ activeRecipe.title }</h3>
      <h4 className="active-recipe__publisher">
        Publisher: <span>{ activeRecipe.publisher }</span>
      </h4>
      <p className="active-recipe__website">Website: 
        <span><a href={activeRecipe.publisher_url}>{activeRecipe.publisher_url}</a></span>
      </p>
      <button className="active-recipe__button">
        <Link to="/">Go Home</Link>
      </button>
    </div>)
        
      }
    </div>
  );
}

export default Recipe;
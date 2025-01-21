import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SERVERURL from '../services/serverURL';

const Recipe = () => {

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(`${SERVERURL}/recipes`);
        setRecipes(response.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${SERVERURL}/recipes/${id}`);
      setRecipes(recipes.filter(recipe => recipe.id !== id));
      alert("Recipe deleted successfully!");
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };


  return (
    <>
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-wrap -m-4">
            {
              recipes.map((recipe) => (
                <div class="lg:w-1/4 md:w-1/2 p-4 w-full">
                  <a class="block relative h-48 rounded overflow-hidden">
                    <img alt="ecommerce" class="object-cover object-center w-full h-full block" src={recipe.imageUrl} />
                  </a>
                  <div class="mt-4 flex justify-center items-center">
                    <h2 class="text-gray-900 title-font text-lg font-medium me-3">{recipe.name}</h2>
                    <button onClick={() => handleDelete(recipe.id)} className='btn btn-link'><i className="fa-solid fa-trash text-red-500"></i></button>
                  </div>
                  <br />
                  <h3 className='text-blue-900'>Contributor: {recipe.contributor}</h3>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default Recipe
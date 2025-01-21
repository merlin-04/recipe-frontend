import axios from 'axios';
import React, { useEffect, useState } from 'react'
import SERVERURL from '../services/serverURL';
import { Modal } from 'react-bootstrap';


const Recipe = () => {

  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    contributor: "",
  });


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


  const handleEditClick = (recipe) => {
    setSelectedRecipe(recipe); // Set the recipe you're editing
    setFormData({ ...recipe }); // Pre-fill the form with the recipe data
    setModalVisible(true); // Show the modal
  };

  const handleCloseModal = () => {
    setModalVisible(false); // Hide the modal
    setSelectedRecipe(null); // Clear selected recipe
    setFormData({
      title: "",
      description: "",
      ingredients: "",
      // Reset other fields
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated data to the server (PUT request)
    axios.put(`${SERVERURL}/recipes/${selectedRecipe.id}`, formData)
      .then(response => {
        // Update the local recipes state with the updated recipe
        setRecipes(prevRecipes => prevRecipes.map(recipe =>
          recipe.id === selectedRecipe.id ? response.data : recipe
        ));
        alert("Recipe updated Successfully...")
        handleCloseModal(); // Close the modal after successful update
      })
      .catch(error => {
        console.error("Error updating recipe:", error);
      });
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

                    <button onClick={() => handleEditClick(recipe)} className='btn btn-link p-5'><i className="fa-solid fa-pen-to-square text-purple-500"></i></button>
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

      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="imageUrl" className="block mb-1">Image</label>
                <textarea
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contributor" className="block mb-1">Contributor</label>
                <textarea
                  id="contributor"
                  name="contributor"
                  value={formData.contributor}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-black px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Recipe
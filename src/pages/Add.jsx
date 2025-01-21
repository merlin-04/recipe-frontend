import React, { useState } from 'react'
import axios from 'axios';
import SERVERURL from '../services/serverURL';
import { useNavigate } from 'react-router-dom';


const Add = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [contributor, setContributor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newRecipe = { name, imageUrl, contributor }

    if (name && imageUrl && contributor) {
      try {
        await axios.post(`${SERVERURL}/recipes`, newRecipe);
        alert("Recipe Created Successfully!");
        toggleModal()
        
      } catch (error) {
        console.error("Error creating recipe:", error);
      }
    } else {
      alert("Please fill the form !!!")
    }
  }


  return (
    <>

      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://www.adobe.com/acrobat/resources/media_1c2dbc66a43cebb67d51fdce9d18adfa8f0d74d5f.png?width=750&format=png&optimize=medium" />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">Add your Recipes to our Store</h1>
              <p class="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
              <div class="flex mt-6 items-center pb-5  mb-5">
              </div>
              <div class="flex">
                <button onClick={toggleModal} class="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded">Create New Recipe</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={toggleModal} 
        >
          <div
            className="bg-white p-6 rounded-lg w-96"
            onClick={(e) => e.stopPropagation()} 
          >
            <h2 className="text-xl font-semibold mb-4">Add Recipe</h2>

            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="imageUrl" className="block text-gray-700">
                  Image URL:
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contributor" className="block text-gray-700">
                  Contributor:
                </label>
                <input
                  type="text"
                  id="contributor"
                  value={contributor}
                  onChange={(e) => setContributor(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg"
                >
                  Close
                </button>
                <button onClick={handleSubmit}
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </>
  )
}

export default Add
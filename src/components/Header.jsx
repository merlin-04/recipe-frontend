import React from 'react'
import { Link } from 'react-router-dom'


const Header = () => {
    return (
        <>
            <header class="text-gray-600 body-font bg-indigo-500">
                <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <Link to={'/'}>  <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span class="ml-3 text-xl"><i class="fa-solid fa-utensils text-black p-5"></i>Recipe Store</span>
                    </a></Link>
                  
                </div>
            </header>
        </>
    )
}

export default Header
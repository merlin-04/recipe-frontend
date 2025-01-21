import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Recipe from './pages/Recipe'
import Add from './pages/Add'

function App() {
  return (
    <>
    <Header/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/recipe' element={<Recipe />}/>
        <Route path='/add' element={<Add />}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App

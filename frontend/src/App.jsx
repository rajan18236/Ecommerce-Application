import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/LoginPage'
import Cart from './pages/Cart'
import AddProduct from './pages/AddProduct'
import { useContext } from 'react'
import { authContext } from './context/GlobalContext'
import Category from './pages/Category'
const App = () => {
  const { isUserLoggedIn } = useContext(authContext)
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cartItem' element={isUserLoggedIn ? <Cart /> : <Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/category' element={isUserLoggedIn?<Category />:<Login/>} />
        <Route path='/addproduct' element={isUserLoggedIn ? <AddProduct /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App
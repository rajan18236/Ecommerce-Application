import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/LoginPage'
import Cart from './pages/Cart'
import AddProduct from './pages/AddProduct'
import PageNotFound from './pages/PageNotFound'
import { useContext } from 'react'
import { authContext } from './context/GlobalContext'
import Category from './pages/Category'
import Hello from './pages/Hello'
import PurchaseSuccessPage from './pages/PurchaseSuccess'
import PurchaseCancelPage from './pages/PurchaseCancel'

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
        <Route path='/*' element={<PageNotFound/>} />
        <Route path='/purchase-success' element={isUserLoggedIn ? <PurchaseSuccessPage /> : <Login />} />
        <Route path='/purchase-cancel' element={isUserLoggedIn ? <PurchaseCancelPage /> : <Login />} />
      </Routes>
    </div>
  )
}

export default App
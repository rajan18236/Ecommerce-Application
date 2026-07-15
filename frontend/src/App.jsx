import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/LoginPage'
import Cart from './pages/Cart'
import AddProduct from './pages/AddProduct'
import PageNotFound from './pages/PageNotFound'
import { useContext } from 'react'
import { authContext, productContext } from './context/GlobalContext'
import Category from './pages/Category'
import Hello from './pages/Hello'
import PurchaseSuccessPage from './pages/PurchaseSuccess'
import PurchaseCancelPage from './pages/PurchaseCancel'
import Orders from './pages/Orders'

const App = () => {
  const navigate = useNavigate()
  const { isUserLoggedIn, authCheck } = useContext(authContext);
  const { fetchProducts } = useContext(productContext)
  useEffect(() => {
    fetchProducts();
    authCheck();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cartItem' element={isUserLoggedIn ? <Cart /> : navigate("/login")} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/category' element={isUserLoggedIn ? <Category /> : navigate("/login")} />
        <Route path='/orders' element={isUserLoggedIn ? <Orders /> : navigate("/login")} />
        <Route path='/addproduct' element={isUserLoggedIn ? <AddProduct /> : navigate("/login")} />
        <Route path='/*' element={<PageNotFound />} />
        <Route path='/purchase-success' element={isUserLoggedIn ? <PurchaseSuccessPage /> : navigate("/login")} />
        <Route path='/purchase-cancel' element={isUserLoggedIn ? <PurchaseCancelPage /> : navigate("/login")} />
      </Routes>
    </div>
  )
}

export default App
import React, { useEffect,useContext } from 'react'
import { Routes, Route,  Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/LoginPage'
import Cart from './pages/Cart'
import AddProduct from './pages/AddProduct'
import AdminPanel from './pages/AdminPanel'
import PageNotFound from './pages/PageNotFound'
import Category from './pages/Category'
import PurchaseSuccessPage from './pages/PurchaseSuccess'
import PurchaseCancelPage from './pages/PurchaseCancel'
import Orders from './pages/Orders'
import { authContext, productContext } from './context/GlobalContext'
import EditProduct from './pages/EditProduct'

const App = () => {
  const { isUserLoggedIn, authCheck } = useContext(authContext);
  const { fetchProducts } = useContext(productContext)

  return (
    <div className='mt-10'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/cartItem"
          element={isUserLoggedIn ? <Cart /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/category"
          element={isUserLoggedIn ? <Category /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/orders"
          element={isUserLoggedIn ? <Orders /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/addproduct"
          element={isUserLoggedIn ? <AddProduct /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/adminpanel"
          element={isUserLoggedIn ? <AdminPanel /> : <Navigate to="/login" replace />}
        />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/purchase-success"
          element={isUserLoggedIn ? <PurchaseSuccessPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/purchase-cancel"
          element={isUserLoggedIn ? <PurchaseCancelPage /> : <Navigate to="/login" replace />}
        />
        <Route path="/edit-product/:id" element={isUserLoggedIn ? <EditProduct /> : <Navigate to="/login" replace />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App
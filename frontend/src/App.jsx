import React, { useEffect, useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/LoginPage'
import Cart from './pages/Cart'
import AddProduct from './pages/AddProduct'
import AdminPanel from './pages/AdminPanel'
import PageNotFound from './pages/PageNotFound'
import Category from './pages/Category'
import PurchaseSuccessPage from './pages/PurchaseSuccess.jsx'
import PurchaseCancelPage from './pages/PurchaseCancel.jsx'
import Orders from './pages/Orders'
import { authContext, productContext } from './context/GlobalContext'
import EditProduct from './pages/EditProduct'
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx'
import AdminDashBoard from './pages/AdminDashBoard.jsx'
import AdminProducts from './pages/AdminProducts.jsx'


const ProtectedRoute = ({ children }) => {
  const { isUserLoggedIn, isAuthReady } = useContext(authContext);
  if (!isAuthReady) {
    return <div className="p-6 text-center text-gray-600">Checking session...</div>
  }

  return isUserLoggedIn ? children : <Navigate to="/login" replace />
}


const App = () => {
  const { fetchProducts } = useContext(productContext);
  const { userInfo } = useContext(authContext);

  return (
    <div className='min-h-screen relative overflow-hidden'>
      <div className='h-full  w-full gridS'>
        <div>
          <Navbar />
        </div>
        <div>
          <Routes>
            <Route
              path="/" element={userInfo.role === "admin" ? <AdminDashBoard /> : <Home />}
            />

            <Route
              path="/cartItem"
              element={<ProtectedRoute> <Cart /></ProtectedRoute>}
            />
            <Route
              path='/adminproducts' element={<AdminProducts />}
            />

            <Route
              path="/category"
              element={<ProtectedRoute><Category /></ProtectedRoute>}
            />

            <Route
              path="/orders"
              element={<ProtectedRoute><Orders /></ProtectedRoute>}
            />

            <Route
              path="/addproduct"
              element={<ProtectedRoute><AddProduct /></ProtectedRoute>}
            />
            <Route
              path="/adminpanel"
              element={<ProtectedRoute><AdminPanel /></ProtectedRoute>}
            />

            <Route
              path="/signup" element={<Signup />}
            />

            <Route
              path="/login" element={<Login />}
            />

            <Route
              path="/purchase-success"
              element={<ProtectedRoute><PurchaseSuccessPage /></ProtectedRoute>}
            />

            <Route
              path="/purchase-cancel"
              element={<ProtectedRoute><PurchaseCancelPage /></ProtectedRoute>}
            />

            <Route
              path="/edit-product/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>}
            />

            <Route
              path="*" element={<PageNotFound />}
            />
          </Routes>


        </div>
        {userInfo?.role !== "admin" &&
          <div>
            <Footer />

          </div>
        }
      </div>
      <div>
        <Toaster />
      </div>
    </div>

  )
}

export default App
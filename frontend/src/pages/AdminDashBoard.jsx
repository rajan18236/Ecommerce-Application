import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AdminProducts from './AddProduct'
import { useContext, useEffect } from 'react'
import { productContext,adminContext } from '../context/GlobalContext'


const AdminDashBoard = () => {
  const { fetchOrdersList, fetchUsers } = useContext(adminContext)
  const { fetchProducts } = useContext(productContext)

  useEffect(() => {
    fetchProducts()
    fetchOrdersList()
    fetchUsers()
  }, [])

  return (
    <div className='mt-15'>
      <Sidebar />
    </div>
  )
}

export default AdminDashBoard
import { Routes, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import AdminProducts from './AddProduct'


const AdminDashBoard = () => {
  return (
    <div className='mt-15'>
        <Sidebar />
    </div>
  )
}

export default AdminDashBoard
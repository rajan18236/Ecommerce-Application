import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { adminContext } from '../context/GlobalContext'

const Sidebar = () => {
    const { fetchOrdersList} = useContext(adminContext)
    return (
        <div className='w-[200px] bg-gray-400 min-h-screen py-5 '>
            <ul className='flex flex-col gap-10 '>
                <Link to="/adminproducts" className='active:bg-white  px-8 py-2'>Products</Link>
                <Link to='/orderList' className='active:bg-white  px-8 py-2'>Orders</Link>
                <Link to='/customerList' className='active:bg-white  px-8 py-2 '>Customers</Link>

            </ul>
        </div>
    )
}   

export default Sidebar
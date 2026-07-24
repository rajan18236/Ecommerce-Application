import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { adminContext } from '../context/GlobalContext'

const Sidebar = () => {
    const { fetchOrdersList} = useContext(adminContext)
    return (
        <div className='w-[200px] bg-gray-400 min-h-screen py-5 '>
            <ul className='flex flex-col gap-10 '>
                <Link to="/adminproducts" className='active:bg-white  px-8 py-2'>Products</Link>
                <Link to='orderList' onClick={fetchOrdersList} className='active:bg-white  px-8 py-2'>Orders</Link>
                <li className='active:bg-white  px-8 py-2 '>Customers</li>
                <li className='active:bg-white  px-8 py-2'>Categories</li>
                <li className='active:bg-white  px-8 py-2'>Feedback</li>
            </ul>
        </div>
    )
}   

export default Sidebar
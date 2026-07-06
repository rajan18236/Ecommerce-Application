import React from 'react'
import { PiWarehouseBold } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { RiHome5Fill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import { BsPersonFillAdd } from "react-icons/bs";


const Navbar = () => {
    return (
        <div className='navbar w-full flex justify-between items-center px-10 py-5 bg-gray-800 text-white z-50 fixed top-0 left-0 right-0'>
            <div className='flex items-center gap-1'>
                <span><PiWarehouseBold size={32} /></span>
                <h2 className='text-xl font-bold'>Ecommerce</h2>
            </div>
            <div>
                <ul className='flex gap-4 items-center'>
                    <Link to='/' className='hover:text-gray-400'><RiHome5Fill size={24} /></Link>
                    <Link to='/cartItem' className='hover:text-gray-400'><FaShoppingCart size={24} /></Link>
                    <Link to='/signup' className='  '>
                        <button className='hover:cursor-pointer hover:text-black flex items-center gap-1 text-gray-500 bg-white py-2 px-2 rounded-2xl'>
                            <span><BsPersonFillAdd size={24} /></span>
                            Signup</button>
                    </Link>
                    <Link to='/login' className='hover:text-black '>
                        <button className='cursor-pointer flex items-center gap-1 bg-gray-500 py-2 px-2 rounded-2xl'>
                            <span><TbLogin2 size={24} /></span>
                            Login</button>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default Navbar
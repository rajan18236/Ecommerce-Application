import React from 'react'
import { PiWarehouseBold } from "react-icons/pi";
import { Link, useNavigate } from 'react-router-dom';
import { RiHome5Fill } from "react-icons/ri";
import { FaShoppingCart } from "react-icons/fa";
import { TbLogin2 } from "react-icons/tb";
import { BsPersonFillAdd } from "react-icons/bs";
import { authContext } from '../context/GlobalContext';
import { MdAddBusiness } from "react-icons/md";
import { useContext, useEffect } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const { userLogout, userInfo, isUserLoggedIn, setIsUserLoggedIn } = useContext(authContext);

    const isSeller = userInfo?.role === "seller"
    const handleLogout = async () => {
        await userLogout();
        navigate("/");
    }

    return (
        <div className='navbar w-full flex justify-between items-center px-10 py-5 bg-gray-800 text-white z-50 fixed top-0 left-0 right-0'>
            <div className='flex items-center gap-1'>
                <span><PiWarehouseBold size={32} /></span>
                <h2 className='text-xl font-bold'>Ecommerce</h2>
            </div>
            <div>
                <ul className="flex gap-4 items-center">



                    {isUserLoggedIn ?
                        <>
                            <Link to="/" className="hover:text-gray-400 flex flex-col items-center">
                                <RiHome5Fill size={24} />
                                <span className="text-sm">Home</span>
                            </Link>
                            {isSeller ? (
                                <Link to="/addproduct" className="hover:text-gray-400 flex flex-col items-center">
                                    <MdAddBusiness size={24} />
                                    <span className="text-sm">Add Product</span>
                                </Link>
                            ) :
                                <Link to="/cartItem" className="hover:text-gray-400">
                                    <FaShoppingCart size={24} />
                                    <span className="text-sm">Cart</span>
                                </Link>
                            }
                            <select name="profile" id="profile" className='text-white bg-gray-800 outline-none'>
                                <option value="name">{userInfo?userInfo.fullName:"profile"}</option>
                                <option value="">maharjan</option>
                            </select>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
                            >
                                Logout
                            </button>
                        </>


                        :
                        <>
                            <Link to="/signup">
                                <button className="flex items-center gap-2 text-gray-500 bg-white py-2 px-4 rounded-2xl hover:text-black transition">
                                    <BsPersonFillAdd size={22} />
                                    Signup
                                </button>
                            </Link>

                            <Link to="/login">
                                <button className="flex items-center gap-2 text-white bg-gray-700 py-2 px-4 rounded-2xl hover:bg-black transition">
                                    <TbLogin2 size={22} />
                                    Login
                                </button>
                            </Link>

                        </>
                    }

                </ul>
            </div>
        </div>
    )
}

export default Navbar
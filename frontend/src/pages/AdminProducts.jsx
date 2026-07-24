import { useContext, useEffect, useState } from 'react'
import { productContext } from '../context/GlobalContext'
import { Pencil, Trash2, Info } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import ToggleSwitch from '../components/ToggelBtn';
import ProductDetails from './ProductDetails';


const AdminProducts = () => {
  const { featuredProducts, deleteProduct, fetchProductById, fetchProducts,  } = useContext(productContext)
  const navigate = useNavigate();



  

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='max-w-7xl mx-auto py-10 px-5 mt-10' >
      <div >
        <table className='w-full px-2 py-4 '>
          <thead>
            <tr className=' bg-gray-100'>
              <th className='py-2'>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Seller</th>
              <th>Disable</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {featuredProducts.toReversed().map((product, idx) => (
              <tr className='text-center' key={product._id}>
                <td className='p-2'>
                  <div className='w-20 h-20 rounded-2xl overflow-hidden'><img className='w-full h-full object-cover' src={product.image} alt={product.productName} />
                  </div>
                </td>
                <td>
                  <div> {product.productName}   </div>
                </td>
                <td><div>${product.price}</div></td>
                <td><div>#{product.category}</div></td>
                <td>
                  {product.stock > 0 ? <div>{product.stock}</div> : <div className='text-red-500 font-semibold'>No stock</div>}

                </td>
                <td><div>{product.seller.fullName}</div></td>
                <td><ToggleSwitch checked={product.isBlocked} productId={product._id} /></td>
                <td> <div className="flex gap-3 justify-center">

                  <button
                    onClick={() => {
                      fetchProductById(product._id)
                      navigate(`/edit-product/${product._id}`)
                    }
                    }
                    className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>

                </div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}

export default AdminProducts
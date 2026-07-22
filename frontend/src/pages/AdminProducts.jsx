import React, { useContext } from 'react'
import { productContext } from '../context/GlobalContext'
import { Pencil, Trash2, Plus, Info  } from "lucide-react";

const AdminProducts = () => {
  const { featuredProducts } = useContext(productContext)
  return (
    <div className='max-w-7xl mx-auto py-10 px-5 mt-10 ' >
      <div >
        <table className='w-full px-2 py-4 '>
          <thead>
            <tr className=' bg-gray-100'>
            <th className='py-2'>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Seller</th>
            <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {featuredProducts.toReversed().map((product, idx) => (
              <tr className='text-center'>
                <td className='p-2'>
                  <div className='w-20 h-20 rounded-2xl overflow-hidden'><img className='w-full h-full object-cover' src={product.image} alt={product.productName} />
                  </div>
                </td>
                <td>
                  <div> {product.productName}   </div>
                </td>
                <td><div>${product.price}</div></td>
                <td><div>{product.seller.fullName}</div></td>
                <td> <div className="flex gap-3 justify-center">

                    <button
                      onClick={() => {
                        navigate(`/edit-product/${product._id}`)
                        fetchProductById(product._id)
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
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="p-2 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600"
                    >
                    <Info  size={18}/>
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
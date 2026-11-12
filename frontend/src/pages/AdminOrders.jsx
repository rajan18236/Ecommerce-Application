import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { adminContext } from "../context/GlobalContext"
import { Pencil, Trash2, Info } from "lucide-react";

const AdminOrders = () => {
  const { orderList, deleteOrder, fetchOrdersList } = useContext(adminContext)

  useEffect(() => {
    fetchOrdersList()
  }, [])

  const handelRemoveOrder = async (orderId) => {
    await deleteOrder(orderId)
  }

  return (
    <div className='min-w-screen  mt-20 flex flex-col gap-8 px-2 py-4'>
      <h1 className='text-2xl font-bold px-2'>Orders List</h1>
      {!orderList ?
       <div className='text-6xl flex justify-center items-center text-black'>
        NO Order Yet!!
      </div>:
      orderList.map((order) => (
        <div key={order._id} className='w-full p-4 bg-gray-400 rounded-2xl '>
            <div className='flex justify-between mb-4'>
            <div>
              <div className='flex gap-2'>
                <span>Order Id :</span>
                <h2>{order._id}</h2>
              </div>
              <div className='flex gap-2'>
                <span>Order On :</span>
                <h2>
                  {new Date(order.date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </h2>
              </div>
            </div>
            <div>
              <div className='flex gap-2'>
                <span>Order Of :</span>
                <h2>{order.userId?.fullName || order.userId}</h2>
              </div>
              <div className='flex gap-2'>
                <span>Email :</span>
                <h2>{order.userId?.email || 'N/A'}</h2>
              </div>
            </div>
            <div>
              <div className='flex gap-2'>
                <span>Total Amount :</span>
                <h2>${order.totalAmount}</h2>
              </div>
              <div className='flex gap-2'>
                <span>Status :</span>
                <h2 className='text-green-700 font-semibold'>Paid</h2>
              </div>
            </div>
            <div>
                <button
                onClick={()=>{
                  handelRemoveOrder(order._id)
                }}
                    className="p-2 rounded-lg bg-red-500 text-white cursor-pointer hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
            </div>
          </div>
          <div className='mb-4'>
            <table className='w-full bg-gray-300 rounded-md overflow-hidden '>
              <thead>
                <tr className='bg-yellow-100'>
                  <th className='py-2'>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Amount</th>
                  <th>Seller</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product) => (
                  <tr key={product._id} className='text-center'>
                    <td className='py-4'>
                      <img src={product.product?.image} alt={product.product?.productName} className='w-12 h-12 object-cover rounded mx-auto' />
                    </td>
                    <td>{product.product?.productName}</td>
                    <td>{product.product?.category}</td>
                    <td>{product.productQty}</td>
                    <td>{product.price}</td>
                    <td>{product.price * product.productQty}</td>
                    <td>{product.product?.seller.fullName}</td>
                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        </div>
      ))}

    </div>
  )
}

export default AdminOrders
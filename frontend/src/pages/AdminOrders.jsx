import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { adminContext } from "../context/GlobalContext"

const AdminOrders = () => {
  const { orderList } = useContext(adminContext)

  return (
    <div className='min-w-screen overflow-scroll bg-amber-200 mt-20 '>
          <table className='w-full '>
            <thead >
              <tr >
                <th className='py-4'>OrderOn</th>
                <th>OrderId</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Buyer</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((order) => (
                 <tr key={order._id}>
                  <td className='py-2 px-3'>{order.Date}</td>
                  <td className='px-2'>{order._id}</td>
                  <td className='px-4'>{order.products.map((product)=>(
                   <div className='flex flex-col gap-2'>{product.productQty}</div> 
                  ))}</td>
                  <td className='py-2 px-4'>{order.totalAmount}</td>
                  <td className='px-4'>{order.stripeSessionId}</td>
                  <td className='px-4'>{order.userId}</td>
                </tr>
              ))}
            </tbody>
          </table>
    </div>
  )
}

export default AdminOrders
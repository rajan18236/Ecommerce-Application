import React, { useContext, useEffect } from 'react'
import { adminContext } from '../context/GlobalContext'
import { Pencil, Trash2, Info } from "lucide-react";

const AdminCustomers = () => {
  const { fetchUsers, users } = useContext(adminContext)

  useEffect(() => {
    fetchUsers()
    console.log(users);

  }, [])

  return (
    <div className='mt-15 px-4'>
      <div>
        <h2 className='text-2xl font-bold'>Customers</h2>
        <h5>Total User:{users.length}</h5>
        <div className='flex '>
          <div className='sellers w-1/3'>
            <h3 className='text-xl font-semibold text-center'>Sellers</h3>
            <div className='flex justify-center'>
              <table className=''>
                <thead>
                  <tr className='w-full bg-amber-50 '>
                    <th className='py-2'>Email</th>
                    <th >Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user) => (
                      user.role === "seller" ?
                        <tr className='text-center'>
                          <td className='py-2'>{user.email}</td>
                          <td className='px-8'>{user.fullName}</td>
                        </tr> : null
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
          <div className='buyers w-1/3'>
            <h3 className='text-xl font-semibold text-center'>Buyers</h3>
            <div className='flex justify-center'>
              <table className=''>
                <thead>
                  <tr className='w-full bg-amber-50'>
                    <th className='py-2'>Email</th>
                    <th className='px-4'>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user) => (
                      user.role === "customer" ?
                        <tr className='text-center'>
                          <td className='py-2 px-4'>{user.email}</td>
                          <td className='px-8'>{user.fullName}</td>
                        </tr> : null
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
          <div className='admin w-1/3'>
            <h3 className='text-xl font-semibold text-center'>Admin</h3>
            <div className='flex justify-center'>
              <table className=''>
                <thead>
                  <tr className='bg-amber-50'>
                    <th className='py-2'>Email</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map((user) => (
                      user.role === "admin" ?
                        <tr className='text-center'>
                          <td className='py-2 px-4'>{user.email}</td>
                          <td className='px-8'>{user.fullName}</td>
                        </tr> : null
                    ))
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminCustomers
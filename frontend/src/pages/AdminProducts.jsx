import React, { useContext } from 'react'
import { productContext } from '../context/GlobalContext'

const AdminProducts = () => {
  const { myProducts } = useContext(productContext)
  return (
    <div className='mt-10'>hello</div>
    // <div className='mt-20'>
    //   {
    //     myProducts.toReversed().map(product => (
    //  <div
    //         key={idx}
    //         className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl duration-300 group"
    //       >
    //         {/* Image */}
    //         <div className="relative overflow-hidden">
    //           <img
    //             src={product.image}
    //             alt={product.name}
    //             className="h-72 w-full object-cover group-hover:scale-110 duration-500"
    //           />
    //         </div>

    //         {/* Details */}
    //         <div className="p-5">
    //           <div className="flex justify-between">

    //             <p className="text-sm text-orange-500">
    //               @{product.seller.fullName}
    //             </p>
    //             <p className="text-sm text-orange-500">
    //               #{product.category}
    //             </p>
    //           </div>

    //           <h3 className="font-semibold text-lg mt-1">
    //             {product.productName}
    //           </h3>

    //           {/* Price */}
    //           <div className="flex items-center gap-3">
    //             <span className="text-xl font-bold">
    //               ${product.price}
    //             </span>
    //           </div>
    //         </div>
    //       </div>
    //     ))
    //   }
    // </div>
  )
}

export default AdminProducts
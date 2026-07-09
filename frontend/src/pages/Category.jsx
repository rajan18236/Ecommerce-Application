import React, { useContext } from 'react'
import { productContext } from '../context/GlobalContext'

const Category = () => {
    const {caterogyItems,setCaterogyItems} = useContext(productContext);
  return (
     <section className="max-w-7xl mx-auto px-5 py-16 mt-10 ">
      <h1 className="text-gray-800 text-2xl font-semibold uppercase tracking-widest mb-4">{caterogyItems[0].category}</h1>
      {/* Product Grid */}
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {caterogyItems.map((item,idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl duration-300 group"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="h-72 w-full object-cover group-hover:scale-110 duration-500"
              />
            </div>

            {/* Details */}
            <div className="p-5">
              <p className="text-sm text-orange-500">
                @{item.seller.fullName}
              </p>

              <div className="flex justify-between items-center gap-3">
              <h3 className="font-semibold text-lg mt-1">
                {item.productName}
              </h3>

              {/* Price */}

                <span className="text-2xl font-semibold text-black">
                  ${item.price}
                </span>
              </div>

              {/* Button */}
              <button className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:bg-orange-500 duration-300 flex items-center justify-center gap-2">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Category
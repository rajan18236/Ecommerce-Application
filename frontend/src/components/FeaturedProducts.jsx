import { Heart, ShoppingCart, Star } from "lucide-react";
import { useContext, useState } from "react";
import { authContext, productContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";


const FeaturedProducts = () => {
  const navigate = useNavigate();
  const { featuredProducts, setFeaturedProducts, fetchProducts, addToCart, cartItems } = useContext(productContext);
  const { isUserLoggedIn } = useContext(authContext);
  console.log(featuredProducts);


  const handleAddToCart = async (productId) => {
    await addToCart(productId)
  }
  return (

    <section className="max-w-7xl mx-auto px-5 py-16">
      <h1 className="text-gray-800 text-2xl font-semibold uppercase tracking-widest text-center mb-12">Featured Products</h1>
      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {featuredProducts && featuredProducts.length > 0 ? featuredProducts.map((product, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl duration-300 group"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-72 w-full object-cover group-hover:scale-110 duration-500"
              />
            </div>

            {/* Details */}
            <div className="p-5">
              <div className="flex justify-between">

                <p className="text-sm text-orange-500">
                  @{product.seller.fullName}
                </p>
                <p className="text-sm text-orange-500">
                  #{product.category}
                </p>
              </div>

              <h3 className="font-semibold text-lg mt-1">
                {product.productName}
              </h3>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">
                  ${product.price}
                </span>
              </div>

              {/* Button */}
              <button
                className="mt-5 w-full bg-black text-white py-3 rounded-xl cursor-pointer duration-300 flex items-center justify-center gap-2 active:scale-90 "
                onClick={() => {
                  if (!isUserLoggedIn) {
                    navigate("/login");
                    return;
                  }

                  handleAddToCart(product._id);
                }}
              >
                <ShoppingCart size={24} />
                Add to Cart
              </button>
            </div>
          </div>
        )) : <h1 className=" w-full text-2xl font-bold mt-2">No Products</h1>}
      </div>
    </section>
  );
};

export default FeaturedProducts;
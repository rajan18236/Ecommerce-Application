import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Nike Air Max",
    category: "Men",
    price: 120,
    discount: 89,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 2,
    name: "Apple Watch",
    category: "Electronics",
    price: 499,
    discount: 399,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500",
  },
  {
    id: 3,
    name: "Women's Jacket",
    category: "Women",
    price: 90,
    discount: 65,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500",
  },
  {
    id: 4,
    name: "Gaming Headset",
    category: "Electronics",
    price: 120,
    discount: 95,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500",
  },
  {
    id: 5,
    name: "Running Shoes",
    category: "Men",
    price: 140,
    discount: 110,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
  },
  {
    id: 6,
    name: "Lipstick Set",
    category: "Women",
    price: 35,
    discount: 24,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500",
  },
];

const categories = ["All", "Men", "Women", "Electronics"];

const FeaturedProducts = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <section className="max-w-7xl mx-auto px-5 py-16">

      {/* Product Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-xl duration-300 group"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-72 w-full object-cover group-hover:scale-110 duration-500"
              />

              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow">
                <Heart size={18} />
              </button>
            </div>

            {/* Details */}
            <div className="p-5">
              <p className="text-sm text-orange-500">
                {product.category}
              </p>

              <h3 className="font-semibold text-lg mt-1">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1 my-3">
                {[...Array(product.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="gold"
                    color="gold"
                  />
                ))}
              </div>

              {/* Price */}
              <div className="flex items-center gap-3">
                <span className="text-xl font-bold">
                  ${product.discount}
                </span>

                <span className="line-through text-gray-400">
                  ${product.price}
                </span>
              </div>

              {/* Button */}
              <button className="mt-5 w-full bg-black text-white py-3 rounded-xl hover:bg-orange-500 duration-300 flex items-center justify-center gap-2">
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
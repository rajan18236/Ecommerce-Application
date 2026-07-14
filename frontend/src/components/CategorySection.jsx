import { useContext } from "react";
import { productContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";


const categories = [
  {
    id: 1,
    name: "Electronics",
    image:
      "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    name: "Clothing",
    image:
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    name: "Books",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    name: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1484632105053-8662f3194e7f?q=80&w=1066&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300",
  },
  {
    id: 6,
    name: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300",
  },

];


const CategorySection = () => {
  const navigate = useNavigate()
  const { getProductsByCategory } = useContext(productContext)
  const handleCategory = async (category) => {
    const result = await getProductsByCategory(category)
    if (result.success) {
      navigate('/category')
    }
  }
  return (
    <section className="max-w-7xl mx-auto px-5 py-16">

      <div className="text-center mb-12">
        <p className="text-gray-800 text-2xl font-semibold uppercase tracking-widest">
          Shop By Category
        </p>
        <p className="text-gray-500 mt-1">
          Find exactly what you're looking for
        </p>
      </div>

      <div
        className="
        flex
        gap-6
        overflow-x-auto
        scroll-smooth
        pb-4
        scrollbar-hide
        justify-center
      "
      >
        {categories.map((category) => (
          <div
            key={category.id}
            className="
            max-w-[170px]
            bg-white
            rounded-3xl
            shadow-md
            p-5
            text-center
            hover:-translate-y-2
            hover:shadow-xl
            duration-300
            cursor-pointer
            shrink-0
          "
            onClick={() => {
              handleCategory(category.name)
            }}
          >
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover hover:scale-110 duration-300"
              />
            </div>

            <h3 className="mt-5 text-lg font-semibold truncate">
              #{category.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
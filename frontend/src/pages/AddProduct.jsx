import { Image, Package, DollarSign, FileText, List } from "lucide-react";
import { useState } from "react";

const categories = [
  "Men",
  "Women",
  "Electronics",
  "Shoes",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
  'Others'
];

const AdminAddProduct = () => {
  const [product, setProduct] = useState({
    productName: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(product);

    // API Call Here
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 mt-10 px-5">

      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg p-10">

        <h1 className="text-4xl font-bold mb-2">
          Add New Product
        </h1>

        <p className="text-gray-500 mb-10">
          Fill out the form below to add a new product.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          {/* Product Name */}
          <div>
            <label className="font-medium">
              Product Name
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">
              <Package className="text-gray-400" size={20} />

              <input
                type="text"
                name="productName"
                value={product.productName}
                onChange={handleChange}
                placeholder="Nike Air Max"
                className="w-full p-4 outline-none"
                required
              />
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="font-medium">
              Price
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">
              <DollarSign className="text-gray-400" size={20} />

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="99"
                className="w-full p-4 outline-none"
                required
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="font-medium">
              Category
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">

              <List
                className="text-gray-400 mr-3"
                size={20}
              />

              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full p-4 outline-none bg-transparent cursor-pointer"
                required
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="font-medium">
              Image 
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">
              <Image className="text-gray-400" size={20} />

              <input
                type="file"
                name="image"
                value={product.image}
                onChange={handleChange}
                placeholder="https://image-url.com"
                className="w-full p-4 outline-none"
                required
              />
            </div>
          </div>

          {/* Preview Image */}
          {product.image && (
            <img
              src={product.image}
              alt="Preview"
              className="w-48 h-48 rounded-xl object-cover border"
            />
          )}

          {/* Description */}
          <div>
            <label className="font-medium">
              Description
            </label>

            <div className="border rounded-xl mt-2 p-4">

              <FileText
                className="text-gray-400 mb-3"
                size={20}
              />

              <textarea
                rows="5"
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description..."
                className="w-full outline-none resize-none"
                required
              />

            </div>
          </div>

          {/* Button */}
          <button
            className="w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 duration-300"
          >
            Create Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminAddProduct;
import { Image, Package, DollarSign, FileText, List } from "lucide-react";
import { useContext, useState, useRef } from "react";
import { productContext } from "../context/GlobalContext";

const categories = ["Electronics", "Clothing", "Books", "Home & Kitchen", "Sports & Outdoors", "Beauty & Personal Care", "Toys & Games", "Automotive", "Health & Wellness", "Others"]

const AdminAddProduct = () => {
  const { product, setProduct, addProduct, } = useContext(productContext)
  const [isLoading, setIsLoading] = useState(false)
  const ref = useRef(null)
  const [result, setResult] = useState(null)
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault();
    let result = await addProduct()
    setResult(result)
    setIsLoading(false)
    if (result.success) {
      ref.current.value = ""
    }
  };


  const handleImage = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onloadend = () => {
      setProduct({
        ...product,
        image: reader.result, // Base64 string
      });
    };

    reader.readAsDataURL(file);
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

          {/* Image */}
          <div>
            <label className="font-medium">
              Image
            </label>

            <div className="flex items-center border rounded-xl mt-2 px-4">
              <Image className="text-gray-400" size={20} />

              <input
                type="file"
                name="image"
                ref={ref}
                onChange={handleImage}
                placeholder="Upload Image"
                className="w-full p-4 outline-none"
                accept="image/*"
                required
              />
            </div>
          </div>

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
          {result && (
            <div
              className={`mt-4 p-4 rounded-xl ${result.success
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
                }`}
            >
              {result.message}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            className={`w-full bg-black text-white py-4 rounded-xl hover:bg-gray-800 duration-300 ${isLoading ? 'cursor-not-allowed bg-zinc-600' : 'cursor-pointer'}`}
            disabled={isLoading}
          >
            Create Product
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminAddProduct;
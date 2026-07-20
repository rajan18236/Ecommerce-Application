
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { productContext } from "../context/GlobalContext";

const SellerProducts = () => {
  const { myProducts, setMyProducts, fetchMyProducts, deleteProduct, fetchProductById } = useContext(productContext)
  const navigate = useNavigate();

  useEffect(() => {
    fetchMyProducts();
  }, []);





  return (
    <div className="max-w-7xl mx-auto py-10 px-5 mt-10">

      <div className="flex justify-between items-center mb-8">

        <div>
          <h1 className="text-3xl font-bold">
            Seller Dashboard
          </h1>

          <p className="text-gray-500">
            Manage your products
          </p>
        </div>

        <button
          onClick={() => navigate("/addproduct")}
          className="bg-black text-white px-5 py-3 rounded-lg flex items-center gap-2 hover:bg-orange-500 duration-300"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr >

              <th className="py-4">Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>

            </tr>

          </thead>

          <tbody className="text-center">
            {myProducts.map((product) => (

              <tr
                key={product._id}
                className="border-b "
              >

                <td className="p-4">

                  <img
                    src={product.image}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                </td>

                <td >{product.productName}</td>

                <td>{product.category}</td>

                <td>${product.price}</td>

                <td>{product.stock > 0 ? product.stock : "No Stock"}</td>

                <td>

                  <div className="flex gap-3 justify-center">

                    <button
                      onClick={() => {
                        navigate(`/edit-product/${product._id}`)
                        fetchProductById(product._id)
                      }
                      }
                      className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default SellerProducts;
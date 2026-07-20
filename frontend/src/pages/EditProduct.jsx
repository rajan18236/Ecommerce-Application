import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { productContext } from "../context/GlobalContext";

const EditProduct = () => {
    const { productForEdit, setProductForEdit, fetchProductById, editProduct } = useContext(productContext)
    const { id } = useParams();
    const navigate = useNavigate();
    const categories = ["Electronics", "Clothing", "Books", "Home & Kitchen", "Sports & Outdoors", "Beauty & Personal Care", "Toys & Games", "Automotive", "Health & Wellness", "Others"]

    const handleChange = (e) => {
        setProductForEdit({
            ...productForEdit,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        const result = await editProduct(id)
        if (result.success) {
            navigate("/adminpanel")
        }

    };

    useEffect(() => {
        if (!productForEdit) {
            fetchProductById(id);
        }
    }, [id]);

    if (!productForEdit) return <div>Loading...</div>

    return (

        <div className="max-w-3xl mx-auto py-10 px-5">

            <h1 className="text-3xl font-bold mb-8">
                Edit Product
            </h1>

            <form
                onSubmit={(e) => {
                    handleSubmit(e)
                }}
                className="space-y-5 bg-white p-8 rounded-xl shadow"
            >

                <img
                    src={productForEdit.image}
                    className="w-44 h-44 rounded-lg object-cover"
                />

                <input
                    type="text"
                    name="productName"
                    value={productForEdit.productName}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="w-full border rounded-lg p-3"
                />

                <input
                    type="number"
                    name="price"
                    value={productForEdit.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="w-full border rounded-lg p-3"
                />
                <input
                    type="number"
                    name="stock"
                    value={productForEdit.stock}
                    onChange={handleChange}
                    placeholder="Number of Stocks"
                    className="w-full border rounded-lg p-3"
                />

                <select
                    name="category"
                    value={productForEdit.category}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                >
                    <option value={productForEdit.category}>{productForEdit.category}</option>
                    {categories.map(category =>
                        <option key={category} value={category}>{category}</option>
                    )}

                </select>

                <textarea
                    rows="5"
                    name="description"
                    value={productForEdit.description}
                    onChange={handleChange}
                    className="w-full border rounded-lg p-3"
                />

                <div className="flex gap-4">

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 bg-gray-200 rounded-lg py-3"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        className="flex-1 bg-black text-white rounded-lg py-3 hover:bg-orange-500 duration-300"
                    >
                        Update Product
                    </button>

                </div>

            </form>

        </div>

    );
};

export default EditProduct;
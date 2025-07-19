//frontend/src/components/AdminPanel.jsx < this file path

import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    productCode: "", productName: "", productDescription: "", productImage: "", price: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    axios.get("http://localhost:3000/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("http://localhost:3000/api/products/upload", formData);
    return res.data.imageUrl;
  };

  const handleSubmit = async () => {
    const imageUrl = await handleImageUpload();

    const method = isEditing ? "put" : "post";
    const url = isEditing
      ? `http://localhost:3000/api/products/${form.productCode}`
      : "http://localhost:3000/api/products";

    const payload = {
      ...form,
      productImage: imageUrl || form.productImage
    };

    axios[method](url, payload).then(() => {
      fetchProducts();
      setForm({ productCode: "", productName: "", productDescription: "", productImage: "", price: "" });
      setIsEditing(false);
      setFile(null);
    });
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEditing(true);
  };

  const handleDelete = (code) => {
    axios.delete(`http://localhost:3000/api/products/${code}`)
      .then(() => fetchProducts());
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen text-black">
      <h2 className="text-3xl font-bold mb-6">Admin Panel - Product Management</h2>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-10 max-w-xl">
        <h3 className="text-xl font-semibold mb-4">{isEditing ? "Edit Product" : "Add Product"}</h3>

        <input type="text" name="productCode" placeholder="Product Code" value={form.productCode}
          onChange={handleChange} disabled={isEditing}
          className="block w-full p-2 mb-3 border rounded" />

        <input type="text" name="productName" placeholder="Product Name" value={form.productName}
          onChange={handleChange} className="block w-full p-2 mb-3 border rounded" />

        <textarea name="productDescription" placeholder="Description" value={form.productDescription}
          onChange={handleChange} className="block w-full p-2 mb-3 border rounded" />

        <input type="number" name="price" placeholder="Price" value={form.price}
          onChange={handleChange} className="block w-full p-2 mb-3 border rounded" />

        <input type="file" onChange={(e) => setFile(e.target.files[0])}
          className="block w-full p-2 mb-4 border rounded" />

        <button onClick={handleSubmit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full">
          {isEditing ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow">
          <thead className="bg-orange-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Code</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.productCode} className="border-t">
                <td className="p-3">
                  <img src={`http://localhost:3000${p.productImage}`} alt={p.productName} className="h-12 w-12 rounded" />
                </td>
                <td className="p-3">{p.productCode}</td>
                <td className="p-3">{p.productName}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">
                  <button onClick={() => handleEdit(p)} className="text-blue-600 mr-3">Edit</button>
                  <button onClick={() => handleDelete(p.productCode)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

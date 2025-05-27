import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    link: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price), // narxni floatga aylantiramiz
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Mahsulot muvaffaqiyatli qo‘shildi!");
        navigate("/"); // Bosh sahifaga qaytish
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        alert("Xatolik yuz berdi!");
      });
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Yangi mahsulot qo‘shish</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Mahsulot nomi"
          value={formData.title}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <textarea
          name="description"
          placeholder="Tavsifi"
          value={formData.description}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Narxi"
          value={formData.price}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Rasm URL"
          value={formData.image}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />
        <input
          type="text"
          name="link"
          placeholder="Tashqi havola (link)"
          value={formData.link}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Qo‘shish
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

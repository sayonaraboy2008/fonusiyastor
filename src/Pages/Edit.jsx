import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    image: "",
    image2: "",
    image3: "",
    link: "",
  });

  useEffect(() => {
    fetch(`https://1803452ac6d0e553.mokky.dev/products/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data))
      .catch((err) => console.error("Xatolik:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://1803452ac6d0e553.mokky.dev/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        price: parseFloat(formData.price),
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Mahsulot muvaffaqiyatli tahrirlandi!");
        navigate("/"); // Bosh sahifaga qaytish
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        alert("Tahrirlashda xatolik yuz berdi!");
      });
  };

  return (
    <div className="max-w-xl m-auto p-4 pt-[100px]">
      <h2 className="text-2xl font-bold mb-4">Mahsulotni tahrirlash</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Mahsulot nomi"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Tavsifi"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Narxi"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Rasm URL"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image2"
          value={formData.image2}
          onChange={handleChange}
          placeholder="Rasm URL 2"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="image3"
          value={formData.image3}
          onChange={handleChange}
          placeholder="Rasm URL 3"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="link"
          value={formData.link}
          onChange={handleChange}
          placeholder="Tashqi havola (link)"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Saqlash
        </button>
      </form>
    </div>
  );
};

export default Edit;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPanel = () => {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://1803452ac6d0e553.mokky.dev/products", {
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
  //
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://1803452ac6d0e553.mokky.dev/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = (id) => {
    fetch(`https://1803452ac6d0e553.mokky.dev/products/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        alert("Mahsulot o‘chirildi!");
      })
      .catch((err) => {
        console.error("Xatolik:", err);
        alert("O‘chirishda xatolik yuz berdi.");
      });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-between max-w-[1280px] m-auto pt-[70px] pb-[30px]">
        {/* Delete */}
        <div className="max-w-full:">
          <h2 className="text-2xl font-bold mb-4">Admin Panel</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex justify-between items-center border-b pb-2">
                <span>{product.title}</span>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                  O‘chirish
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Add Page */}
        <div className="max-w-xl ">
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
              name="image2"
              placeholder="Rasm URL 2"
              value={formData.image2}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
            <input
              type="text"
              name="image3"
              placeholder="Rasm URL 3"
              value={formData.image3}
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
      </div>
    </>
  );
};

export default AdminPanel;

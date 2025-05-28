import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";

const ProductPage = () => {
  //   const { id } = useParams(); // ← URL dan id olinyapti

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ma'lumotlarni olish
    // fetch("https://1803452ac6d0e553.mokky.dev/products")
    fetch("https://1803452ac6d0e553.mokky.dev/products")
      .then((res) => res.json())
      .then((data) => {
        // ⏱ 2 soniyaga loading animatsiyasini ko‘rsatish
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 1200);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 max-w-[1280px] min-[520px]:grid-cols-2 m-auto md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="border rounded-xl shadow p-4 hover:shadow-lg transition">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-contain mb-2"
          />
          <h2 className="text-lg font-semibold mb-1">{product.title}</h2>
          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p>
          <p className="text-blue-600 font-bold mb-2">${product.price}</p>

          {/* Batafsil ko'rish */}
          <Link
            to={`/products/${product.id}`}
            className="text-white bg-blue-600 px-3 py-1 rounded mr-2 hover:bg-blue-700 text-sm">
            Batafsil
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;

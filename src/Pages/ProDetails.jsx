import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";

const ProDetails = () => {
  const { id } = useParams(); // ← URL dan id olinyapti
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://1803452ac6d0e553.mokky.dev/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Mahsulot topilmadi");
        }
        return res.json();
      })
      .then((data) => {
        // ⏱ 2 soniyadan keyin yuklashni tugatish
        setTimeout(() => {
          setProduct(data);
          setLoading(false);
        }, 400); // 2000ms = 2 sekund
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product) return <p>Mahsulot topilmadi</p>;

  return (
    <div className="max-w-[1050px] m-auto  grid grid-cols-2">
      <div className="left">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-64 object-contain mb-4"
        />
      </div>
      <div className="right">
        <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
        <p className="text-gray-700 mb-2">{product.description}</p>
        <p className="text-green-600 font-semibold text-xl mb-4">
          ${product.price}
        </p>

        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Buy Now
        </a>

        <br />
        <br />
        <Link to="/" className="text-blue-500 underline">
          ← Ortga qaytish
        </Link>
      </div>
    </div>
  );
};

export default ProDetails;

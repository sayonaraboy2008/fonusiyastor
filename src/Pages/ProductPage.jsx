import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductSkeleton from "../Components/ProductSkeleton"; // skelet import
import AOS from "aos";
import "aos/dist/aos.css";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://1803452ac6d0e553.mokky.dev/products")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
        }, 1000);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true,
      easing: "ease-in-out",
      offset: 50,
    });
  }, []);

  if (loading) {
    // Loading paytida 8 dona skeletonga o‘xshash kartani ko‘rsatamiz
    return (
      <div className="grid grid-cols-1 max-w-[1280px] min-[520px]:grid-cols-2 m-auto md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 max-w-[1280px] min-[520px]:grid-cols-2 m-auto md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => (
        <div
          key={product.id}
          className="border rounded-xl shadow p-4 hover:shadow-lg transition"
          data-aos="fade-up"
          data-aos-delay={Math.min(index * 150, 600)}>
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

          <Link
            to={`/products/${product.id}`}
            className="text-white bg-blue-600 px-3 py-1 rounded mr-2 hover:bg-blue-700 text-sm">
            See More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductPage;

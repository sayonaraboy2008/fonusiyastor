import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import AOS from "aos";
import "aos/dist/aos.css";

const ProductCard = ({ product, delay, enableAnimation }) => {
  const ref = useRef();

  return (
    <div
      ref={ref}
      className="border rounded-xl shadow p-4 hover:shadow-lg transition"
      data-aos={enableAnimation ? "fade-up" : undefined}
      data-aos-delay={enableAnimation ? delay : undefined}>
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
  );
};

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Ekran o'lchamini tekshirish
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px dan kichik bo'lsa mobil deb hisoblaymiz
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetch("https://1803452ac6d0e553.mokky.dev/products")
      .then((res) => res.json())
      .then((data) => {
        setTimeout(() => {
          setProducts(data);
          setLoading(false);
          AOS.refresh();
        }, 1000);
      })
      .catch((error) => {
        console.error("Xatolik yuz berdi:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: isMobile, // mobilda AOS ni o'chirish
    });
  }, [isMobile]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="grid grid-cols-1 max-w-[1280px] min-[520px]:grid-cols-2 m-auto md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          delay={index * 150}
          enableAnimation={!isMobile}
        />
      ))}
    </div>
  );
};

export default ProductPage;

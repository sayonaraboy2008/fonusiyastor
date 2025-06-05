import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import "./styles.css";

// import required modules
import {
  Navigation,
  Pagination,
  Mousewheel,
  Keyboard,
  Autoplay,
} from "swiper/modules";

const ProDetails = () => {
  const { id } = useParams();
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
        setTimeout(() => {
          setProduct(data);
          setLoading(false);
        }, 400);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!product)
    return <p className="text-center mt-10 text-red-600">Mahsulot topilmadi</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 pt-[100px]">
      <div className="flex flex-col md:flex-row gap-8 items-center">
        {/* Chap (Rasm) */}
        <div className="w-full md:w-1/2">
          <Swiper
            cssMode={true}
            navigation={true}
            pagination={true}
            autoplay={true}
            mousewheel={true}
            keyboard={true}
            modules={[Navigation, Pagination, Mousewheel, Keyboard, Autoplay]}
            className="mySwiper">
            <SwiperSlide>
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-64 md:h-80 object-contain rounded shadow"
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img
                src={product.image2}
                alt={product.title}
                className="w-full h-64 md:h-80 object-contain rounded shadow"
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <img
                src={product.image3}
                alt={product.title}
                className="w-full h-64 md:h-80 object-contain rounded shadow"
              />
            </SwiperSlide>
          </Swiper>
        </div>

        {/* O'ng (Ma'lumot) */}
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-gray-700">{product.description}</p>
          <p className="text-green-600 font-semibold text-2xl">
            ${product.price}
          </p>

          <a
            href={product.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition duration-200">
            Buy Now
          </a>

          <div>
            <Link to="/" className="text-blue-500 hover:underline text-sm">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
      {/*  */}
    </div>
  );
};

export default ProDetails;

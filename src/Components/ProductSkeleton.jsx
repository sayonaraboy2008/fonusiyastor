import React from "react";
import ContentLoader from "react-content-loader";

const ProductSkeleton = () => {
  return (
    <div className="border rounded-xl shadow p-4">
      <ContentLoader
        speed={2}
        width="100%"
        height={250}
        viewBox="0 0 300 250"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        className="w-full">
        {/* Rasm joyi */}
        <rect x="0" y="0" rx="10" ry="10" width="100%" height="120" />

        {/* Sarlavha */}
        <rect x="0" y="130" rx="4" ry="4" width="80%" height="12" />

        {/* Tavsif */}
        <rect x="0" y="150" rx="3" ry="3" width="90%" height="10" />
        <rect x="0" y="165" rx="3" ry="3" width="85%" height="10" />

        {/* Narx */}
        <rect x="0" y="185" rx="4" ry="4" width="40%" height="14" />

        {/* Tugma */}
        <rect x="0" y="210" rx="6" ry="6" width="70" height="25" />
      </ContentLoader>
    </div>
  );
};

export default ProductSkeleton;

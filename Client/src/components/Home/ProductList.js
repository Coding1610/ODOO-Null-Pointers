import React from "react";
import ProductCard from "../Utility/ProductCard";

const ProductList = ({ currentProducts }) => {
  return (
    <div className="w-full p-4">
      <div className="flex flex-wrap">
        {(currentProducts.length === 0)&&(
          <div className="w-full flex items-center justify-center min-h-[200px]">
            <div className="text-2xl font-semibold text-gray-600 bg-gray-100 px-8 py-4 rounded-lg shadow-md border-2 border-yellow-500 animate-pulse">
              No Products Added Yet !!
            </div>
          </div>
        )}
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;

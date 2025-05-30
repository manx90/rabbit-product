// import React from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Product } from "@/components/product";
import { useParams, Link } from "react-router-dom";
import data from "../data/products_with_real_images.json";

export default function CategoryPage() {
  const { categoryId, subcategoryId } = useParams();

  // Filter products based on category and subcategory
  const filteredProducts = data.filter((product) => {
    if (subcategoryId) {
      return (
        product.category === categoryId && product.subCategory === subcategoryId
      );
    }
    return product.category === categoryId;
  });

  // Get unique subcategories for the current category
  const subcategories = [
    ...new Set(
      data
        .filter((product) => product.category === categoryId)
        .map((product) => product.subCategory)
    ),
  ];

  return (
    <div className="flex flex-col align-center gap-2">
      <Header />

      {/* Subcategory Filter */}
      <div className="px-4 py-2 mt-[80px]">
        <div className="flex  gap-2 flex-row-reverse">
          {subcategories.map((subcategory) => (
            <Link
              key={`${categoryId}-${subcategory}`}
              to={`/category/${categoryId}/subcategory/${subcategory}`}
              className={`px-4 py-2 border rounded-[12px] transition-colors ${
                subcategoryId === subcategory
                  ? "border-blue-500 text-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-500 hover:text-blue-500"
              }`}
            >
              {subcategory}
            </Link>
          ))}
        </div>
      </div>

      {/* Products */}
      <div className="flex flex-wrap gap-4 p-4 justify-center">
        {filteredProducts.map((product, index) => (
          <Product key={product.id || index} product={product} />
        ))}
      </div>
      <Footer />
    </div>
  );
}

// frontend/src/pages/CategoryPage.jsx << this file path

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/components/ProductCard"; // Create or reuse card

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/products/category/${slug}`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load category products", err));
  }, [slug]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 capitalize">{slug.replace("-", " ")}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(p => (
          <ProductCard key={p.productCode} product={p} />
        ))}
      </div>
    </div>
  );
}

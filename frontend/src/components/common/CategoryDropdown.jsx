// frontend/src/components/CategoryDropdown.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function CategoryDropdown() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Failed to fetch categories", err));
  }, []);

  return (
    <div className="relative group">
      <button className="px-4 py-2 bg-orange-400 font-semibold hover:bg-orange-600 rounded">
        Categories ▼
      </button>
      <div className="absolute hidden group-hover:block bg-white shadow-md border rounded mt-2 min-w-[200px] z-10">
        
        <ul>
            {categories.map(cat => (
                <li key={cat.id} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                <Link to={`/category/${cat.slug}`} className="flex items-center gap-2 text-black">
                    {cat.icon && (
                    <img src={`http://localhost:3000${cat.icon}`} alt={cat.name} className="w-5 h-5" />
                    )}
                    <span>{cat.name}</span>
                </Link>
                </li>
            ))}
        </ul>

      </div>
    </div>
  );
}

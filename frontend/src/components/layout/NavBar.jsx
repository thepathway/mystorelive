// frontend/src/components/layout/NavBar.jsx



import { useEffect, useState } from "react";
import { ShoppingCart, UserCircle, LogOut, LogIn, UserPlus, ListOrdered } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function NavBar({ cartCount, onCartClick }) {
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3000/api/categories")
      .then(res => setCategories(res.data))
      .catch(err => console.error("Failed to fetch categories", err));

    const role = localStorage.getItem("role");
    const customerNumber = localStorage.getItem("customerNumber");
    if (role && customerNumber) {
      setUser({ role, customerNumber });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("customerNumber");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white border-b shadow-sm z-50 sticky top-0">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src="/Logo.svg" alt="Logo" className="h-8" />
          <span className="font-bold text-lg">MyStoreLive</span>
        </div>

        {/* Categories + Search */}
        <div className="flex-1 mx-6 relative">
          <div className="flex items-center">
            <button 
              onClick={() => setShowCategories(!showCategories)}
              className="bg-orange-500 px-4 py-2 rounded-l-md text-sm hover:bg-gray-200"
            >
              Categories
            </button>
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border-t border-b border-gray-200 focus:outline-none"
            />
            <button className="bg-orange-500 px-4 py-2 rounded-r-md text-black hover:bg-orange-600">
              🔍
            </button>
          </div>

          {showCategories && (
            <div className="absolute top-12 left-0 bg-orange shadow-lg border rounded w-64 p-4 z-50 max-h-[400px] overflow-y-auto">
              <ul className="space-y-3">
                {categories.map((cat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 hover:text-orange-500 cursor-pointer"
                  >
                    <img src={`http://localhost:3000${cat.icon}`} alt="" className="w-6 h-6 rounded" />
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4 relative">
          {!user ? (
            <>
              <Link to="/login" className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500">
                <LogIn className="w-4 h-4" /> Sign In
              </Link>
              <Link to="/register" className="flex items-center gap-1 text-sm text-gray-700 hover:text-orange-500">
                <UserPlus className="w-4 h-4" /> Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 text-sm text-gray-700 hover:text-orange-500"
              >
                <UserCircle className="w-5 h-5" /> {user.role}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded text-sm z-50">
                  <Link
                    to="/my-orders"
                    className="w-full px-4 py-2 flex items-center gap-2 text-gray-700 hover:bg-gray-100"
                  >
                    <ListOrdered className="w-4 h-4" /> My Orders
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 flex items-center gap-2 text-red-500 hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" /> Logout
                  </button>
                </div>
              )}
            </div>
          )}

          <button onClick={onCartClick} className="relative">
            <ShoppingCart className="w-6 h-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

// frontend/src/components/TemuClone.jsx
// src/components/TemuClone.jsx
// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import { Button } from "@/components/ui/button";
// import { ShoppingCart, X, Sun, Moon } from "lucide-react";
// import NavBar from "@/components/layout/NavBar";
// import CategoryDropdown from "@/components/common/CategoryDropdown";
// import ProductCard from "@/components/ProductCard";
// import { createOrder } from "@/services/api";

// export default function TemuClone() {
//   const [products, setProducts] = useState([]);
//   const [cart, setCart] = useState([]);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showCart, setShowCart] = useState(false);
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     axios.get("/api/products").then((res) => setProducts(res.data));
//   }, []);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .get("/api/cart", {
//           headers: { Authorization: `Bearer ${token}` },
//         })
//         .then((res) => setCart(res.data))
//         .catch((err) => console.error("Failed to load cart", err));
//     }
//   }, []);

//   const addToCart = (product) => {
//     const updatedCart = [...cart, product];
//     setCart(updatedCart);

//     const token = localStorage.getItem("token");
//     if (token) {
//       axios
//         .post(
//           "/api/cart",
//           {
//             cart: updatedCart.map((p) => ({
//               productCode: p.productCode,
//               quantity: 1,
//             })),
//           },
//           { headers: { Authorization: `Bearer ${token}` } }
//         )
//         .catch((err) => console.error("Failed to save cart", err));
//     }
//   };

//   const handleCheckout = async () => {
//     const token = localStorage.getItem("token");
//     const customerNumber = localStorage.getItem("customerNumber");

//     if (!token || !customerNumber) {
//       alert("Please login to place an order.");
//       return;
//     }

//     try {
//       await createOrder({ cart });
//       alert("Order placed successfully!");
//       setCart([]);
//     } catch (err) {
//       console.error("Checkout failed", err);
//       alert("Checkout failed");
//     }
//   };

//   return (
//     <>
//       <NavBar cartCount={cart.length} onCartClick={() => setShowCart(!showCart)} />
//       <div
//         className={`$\{darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-black"\} min-h-screen`}
//       >
//         <header className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
//           <h1 className="text-2xl font-bold">MyStoreLive</h1>
//           <div className="flex gap-4 items-center">
//             <CategoryDropdown />
//           </div>
//           <div className="flex gap-4 items-center">
//             <input
//               type="text"
//               placeholder="Search products..."
//               className="px-3 py-2 rounded-md w-64 text-black"
//             />
//             <button onClick={() => setDarkMode(!darkMode)}>
//               {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
//             </button>
//             <button onClick={() => setShowCart(!showCart)} className="relative">
//               <ShoppingCart className="w-6 h-6" />
//               {cart.length > 0 && (
//                 <span className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs px-2 rounded-full">
//                   {cart.length}
//                 </span>
//               )}
//             </button>
//           </div>
//         </header>

//         <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//           {products.map((product) => (
//             <ProductCard
//               key={product.productCode}
//               product={product}
//               onClick={() => setSelectedProduct(product)}
//               onAddToCart={addToCart}
//             />
//           ))}
//         </main>

//         {selectedProduct && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//             <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative text-black">
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                 onClick={() => setSelectedProduct(null)}
//               >
//                 <X className="w-5 h-5" />
//               </button>
//               <img
//                 src={`http://localhost:3000${selectedProduct.productImage}`}
//                 alt={selectedProduct.productName}
//                 className="w-full h-48 object-cover rounded mb-4"
//               />
//               <h2 className="text-xl font-bold mb-2">{selectedProduct.productName}</h2>
//               <p className="text-orange-500 font-medium mb-2">${selectedProduct.price}</p>
//               <p className="text-gray-600 mb-4">{selectedProduct.productDescription}</p>
//               <Button
//                 className="bg-orange-500 hover:bg-orange-600 text-white"
//                 onClick={() => {
//                   addToCart(selectedProduct);
//                   setSelectedProduct(null);
//                 }}
//               >
//                 Add to Cart
//               </Button>
//             </div>
//           </div>
//         )}

//         {showCart && (
//           <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 p-4 text-black">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-xl font-bold">Your Cart</h2>
//               <button onClick={() => setShowCart(false)}>
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//             {cart.length === 0 ? (
//               <p className="text-gray-600">Your cart is empty.</p>
//             ) : (
//               <>
//                 <ul className="space-y-2">
//                   {cart.map((item, index) => (
//                     <li
//                       key={index}
//                       className="flex items-center gap-2 border-b pb-2"
//                     >
//                       <img
//                         src={`http://localhost:3000${item.productImage}`}
//                         alt={item.productName}
//                         className="w-12 h-12 object-cover rounded"
//                       />
//                       <div>
//                         <p className="font-medium">{item.productName}</p>
//                         <p className="text-sm text-orange-500">${item.price}</p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//                 <Button
//                   className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
//                   onClick={handleCheckout}
//                 >
//                   Checkout
//                 </Button>
//               </>
//             )}
//           </div>
//         )}
//       </div>
//     </>
//   );
// }


import React, { useState, useEffect } from "react";
import axios from "@/axiosConfig"; // ✅ using centralized axios
import { Button } from "@/components/ui/button";
import { ShoppingCart, X, Sun, Moon } from "lucide-react";
import NavBar from "@/components/layout/NavBar";
import CategoryDropdown from "@/components/common/CategoryDropdown";
import ProductCard from "@/components/ProductCard";
import { createOrder } from "@/services/api";

export default function TemuClone() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios.get("/api/products")
      .then(res => setProducts(res.data))
      .catch(err => console.error("Failed to load products", err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setCart(res.data))
      .catch(err => console.error("Failed to load cart", err));
    }
  }, []);

  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);

    const token = localStorage.getItem("token");
    if (token) {
      axios.post("/api/cart", {
        cart: updatedCart.map(p => ({
          productCode: p.productCode,
          quantity: 1
        }))
      }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .catch(err => console.error("Failed to save cart", err));
    }
  };

  const handleCheckout = async () => {
    
    const token = localStorage.getItem("token");
    const customerNumber = localStorage.getItem("customerNumber");

    if (!token || !customerNumber) {
      alert("Please login to place an order.");
      return;
    }

    try {
      await createOrder({ cart });
      alert("Order placed successfully!");
      setCart([]);
    } catch (err) {
      console.error("Checkout failed", err);
      alert("Checkout failed");
    }
  };

  return (
    <>
      <NavBar cartCount={cart.length} onCartClick={() => setShowCart(!showCart)} />
      <div className={`${darkMode ? "dark bg-gray-900 text-white" : "bg-gray-50 text-black"} min-h-screen`}>
        <header className="bg-orange-500 text-white px-6 py-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl font-bold">MyStoreLive</h1>
          <div className="flex gap-4 items-center">
            <CategoryDropdown />
          </div>
          <div className="flex gap-4 items-center">
            <input
              type="text"
              placeholder="Search products..."
              className="px-3 py-2 rounded-md w-64 text-black"
            />
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button onClick={() => setShowCart(!showCart)} className="relative">
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-white text-orange-500 text-xs px-2 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </header>

        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {products.map(product => (
            <ProductCard
              key={product.productCode}
              product={product}
              onClick={() => setSelectedProduct(product)}
              onAddToCart={addToCart}
            />
          ))}
        </main>

        {selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-11/12 max-w-md relative text-black">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-black"
                onClick={() => setSelectedProduct(null)}
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={`http://localhost:3000${selectedProduct.productImage}`}
                alt={selectedProduct.productName}
                className="w-full h-48 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{selectedProduct.productName}</h2>
              <p className="text-orange-500 font-medium mb-2">${selectedProduct.price}</p>
              <p className="text-gray-600 mb-4">{selectedProduct.productDescription}</p>
              <Button
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        )}

        {showCart && (
          <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 p-4 text-black">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button onClick={() => setShowCart(false)}>
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-2">
                  {cart.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 border-b pb-2">
                      <img
                        src={`http://localhost:3000${item.productImage}`}
                        alt={item.productName}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-orange-500">${item.price}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleCheckout}
                >
                  Checkout
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

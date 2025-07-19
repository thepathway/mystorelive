// // frontend/src/pages/MyOrders.jsx
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function MyOrders() {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) return;

//     axios
//       .get("/api/orders/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       })
//       .then((res) => setOrders(res.data))
//       .catch((err) => console.error("Failed to fetch orders", err));
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">My Orders</h2>
//       {orders.length === 0 ? (
//         <p className="text-gray-600">You have no orders yet.</p>
//       ) : (
//         <ul className="space-y-6">
//           {orders.map((order) => (
//             <li key={order.orderNumber} className="border rounded p-4">
//               <div className="flex justify-between items-center mb-2">
//                 <h3 className="text-lg font-semibold">Order #{order.orderNumber}</h3>
//                 <span className="text-sm text-gray-500">
//                   {new Date(order.orderDate).toLocaleString()}
//                 </span>
//               </div>
//               <p className="text-sm text-gray-600 mb-1">Status: {order.status}</p>
//               <p className="text-sm text-gray-600 mb-2">Total: ${order.totalAmount.toFixed(2)}</p>

//               {order.items?.length > 0 && (
//                 <ul className="divide-y divide-gray-200 mt-4">
//                   {order.items.map((item) => (
//                     <li
//                       key={item.productCode}
//                       className="flex items-center gap-4 py-2"
//                     >
//                       <img
//                         src={`http://localhost:3000${item.productImage}`}
//                         alt={item.productName}
//                         className="w-16 h-16 rounded border"
//                       />
//                       <div className="flex-1">
//                         <p className="font-medium">{item.productName}</p>
//                         <p className="text-sm text-gray-500">
//                           {item.quantityOrdered} x ${item.priceEach.toFixed(2)}
//                         </p>
//                       </div>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import axios from "@/axiosConfig"; // ✅ centralized axios instance

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error("Failed to fetch orders", err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">You have no orders yet.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li key={order.orderNumber} className="border rounded p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">Order #{order.orderNumber}</h3>
                <span className="text-sm text-gray-500">
                  {new Date(order.orderDate).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1">Status: {order.status}</p>
              <p className="text-sm text-gray-600 mb-2">Total: ${order.totalAmount.toFixed(2)}</p>

              {order.items?.length > 0 && (
                <ul className="divide-y divide-gray-200 mt-4">
                  {order.items.map((item) => (
                    <li
                      key={item.productCode}
                      className="flex items-center gap-4 py-2"
                    >
                      <img
                        src={`http://localhost:3000${item.productImage}`}
                        alt={item.productName}
                        className="w-16 h-16 rounded border"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.productName}</p>
                        <p className="text-sm text-gray-500">
                          {item.quantityOrdered} x ${item.priceEach.toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

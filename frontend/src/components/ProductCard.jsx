// //frontend/src/components/ProductCard.jsx < this file path


// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// export default function ProductCard({ product, onClick, onAddToCart }) {
//   return (
//     <Card
//       className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
//       onClick={onClick}
//     >
//       <CardContent className="flex flex-col items-center text-center p-4">
//         <img
//           // src={`http://localhost:3000${product.productImage}`}
//           src={`http://localhost:3000${product.productImage?.replace('/public', '')}`}

//           alt={product.productName}
//           className="w-full h-40 object-cover mb-4 rounded"
//         />
//         <h3 className="text-lg font-semibold">{product.productName}</h3>
//         <p className="text-orange-500 font-medium">${product.price}</p>
//         <Button
//           className="mt-2 bg-orange-500 hover:bg-orange-600 text-white"
//           onClick={(e) => {
//             e.stopPropagation();
//             onAddToCart(product);
//           }}
//         >
//           Add to Cart
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

import React from "react";
import axios from "@/axiosConfig"; // ✅ Import axios from centralized config
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ProductCard({ product, onClick, onAddToCart }) {
  return (
    <Card
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition"
      onClick={onClick}
    >
      <CardContent className="flex flex-col items-center text-center p-4">
        <img
          src={`http://localhost:3000${product.productImage?.replace('/public', '')}`}
          alt={product.productName}
          className="w-full h-40 object-cover mb-4 rounded"
        />
        <h3 className="text-lg font-semibold">{product.productName}</h3>
        <p className="text-orange-500 font-medium">${product.price}</p>
        <Button
          className="mt-2 bg-orange-500 hover:bg-orange-600 text-white"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
}

// // components/InventoryTracker.js
// import React, { useState } from "react";

// const InventoryTracker = ({ onUseItem }) => {
//   const [inventory, setInventory] = useState({
//     "Biodegradable Bags": 10,
//     "Reusable Bottles": 5,
//     "Eco-Medicine Packs": 8,
//   });

//   const useItem = (item) => {
//     if (inventory[item] > 0) {
//       setInventory((prev) => ({
//         ...prev,
//         [item]: prev[item] - 1,
//       }));
//       onUseItem(5); // Give 5 points per usage, can be changed
//     }
//   };



//   return (
//     <div className="p-4 mb-4 bg-light rounded shadow">
//       <h5>📦 Inventory Tracker</h5>
//       <ul className="list-group">
//         {Object.entries(inventory).map(([item, count]) => (
//           <li
//             key={item}
//             className="list-group-item d-flex justify-content-between align-items-center"
//           >
//             {item}
//             <div>
//               <span className="badge bg-primary me-2">{count}</span>
//               <button
//                 className="btn btn-sm btn-outline-success"
//                 disabled={count === 0}
//                 onClick={() => useItem(item)}
//               >
//                 Use
//               </button>
//             </div>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default InventoryTracker;



// src/components/InventoryTracker.js


import React, { useState } from "react";
import "../styles/InventoryTracker.css";

const InventoryTracker = ({ onUseItem }) => {
  const [inventory, setInventory] = useState({
    "Biodegradable Bags": 10,
    "Reusable Bottles": 5,
    "Eco-Medicine Packs": 8,
  });

  const handleUseItem = (item) => {
    if (inventory[item] > 0) {
      setInventory((prev) => ({
        ...prev,
        [item]: prev[item] - 1,
      }));
      onUseItem(5); // Give 5 points per usage, can be adjusted
    }
  };

  return (
    <div className="inventory-container">
  <h5>📦 Inventory Tracker</h5>
  <ul className="list-group">
    {Object.entries(inventory).map(([item, count]) => (
      <li
        key={item}
        className="inventory-item list-group-item d-flex justify-content-between align-items-center"
      >
        {item}
        <div>
          <span className="badge bg-primary me-2">{count}</span><br></br><br></br>
          <button
            className="btn"
            disabled={count === 0}
            onClick={() => handleUseItem(item)}
          >
            Use
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>

  );
};

export default InventoryTracker;


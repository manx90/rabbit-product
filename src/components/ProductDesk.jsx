import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCart } from "@/contexts/CartContext";

export default function ProductDesk({ item }) {
  const { removeItem, changeQty } = useCart();

  const handleQtyChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      changeQty(item.id, value);
    }
  };

  return (
    <div className="flex justify-between items-center p-3 border-b border-gray-100">
      {/* أيقونة الحذف والكمية على أقصى اليسار */}
      <div className="flex flex-col items-center gap-3">
        <DeleteForeverIcon
          onClick={() => removeItem(item.id)}
          style={{ color: "#FF3737", cursor: "pointer", fontSize: 30 }}
        />
        <input
          type="number"
          min={1}
          value={item.qty}
          onChange={handleQtyChange}
          className="w-14 text-center font-Lato text-gray-700 text-[14px] px-2 py-1 rounded-lg border border-gray-400"
        />
      </div>

      {/* الصورة + الاسم والسعر جنب بعض - الصورة أقصى اليمين */}
      <div className="flex items-center gap-3 flex-row-reverse max-w-[300px]">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-20 h-20 object-cover rounded-md"
          />
        )}

        <div className="flex flex-col text-right">
          <span className="font-Lato text-[14px] text-[#535353] truncate max-w-[180px]">
            {item.name}
          </span>
          <span className="font-Lato text-[18px] text-[#0095FF] mt-1">
            {(item.price || 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}

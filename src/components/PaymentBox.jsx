import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";

export default function PaymentBox({ fix }) {
  const { items } = useCart();
  const [paymentStatus, setPaymentStatus] = useState(null); // null | 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  // دالة وهمية للدفع (تقدر تعدلها حسب الخدمة اللي تستخدمها)
  const handlePayment = async () => {
    if (total === 0) {
      setPaymentStatus("error");
      return;
    }
    setLoading(true);
    try {
      // محاكاة انتظار الدفع (مثلاً طلب API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // هنا نفترض أن الدفع تم بنجاح
      setPaymentStatus("success");
      // تقدر هنا تمسح العربة أو تفعل شي ثاني بعد الدفع
    } catch (error) {
      setPaymentStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        fix
          ? "w-full flex flex-col gap-[8px] p-[16px] border-t-2 bg-white border-gray-100 fixed bottom-0"
          : "w-full flex flex-col gap-[8px] p-[16px] border-t-2 bg-white border-gray-100"
      }
    >
      <div className="flex flex-row-reverse justify-between">
        <span className="font-Lato text-[16px]">المجموع الكلي</span>
        <div className="flex flex-row-reverse items-center gap-[4px]">
          <span className="font-Lato text-[16px] text-[#0095FF] mr-[4px]">
            {total.toFixed(2)}
          </span>
          {/* أيقونة */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 10 11"
            fill="none"
            className="inline-block"
          >
            {/* محتوى SVG */}
          </svg>
        </div>
      </div>

      <div
        className="flex flex-row-reverse items-center justify-center w-full m-auto rounded-lg bg-[#0095FF] gap-2 text-white p-[10px] cursor-pointer select-none"
        onClick={handlePayment}
        role="button"
        aria-disabled={loading}
      >
        <span className="font-Lato text-[16px]">
          {loading ? "جاري معالجة الدفع..." : "الصافي للدفع"}
        </span>
        <div className="flex flex-row-reverse items-center gap-[4px]">
          <span className="font-Lato text-[16px] text-white mr-[4px]">
            {total.toFixed(2)}
          </span>
          {/* أيقونة */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="11"
            viewBox="0 0 10 11"
            fill="none"
            className="inline-block"
          >
            {/* محتوى SVG */}
          </svg>
        </div>
      </div>

      {/* إشعار الدفع داخل الصفحة */}
      {paymentStatus === "success" && (
        <div className="text-green-600 font-Lato text-center mt-2">
          تم الدفع بنجاح 🎉
        </div>
      )}
      {paymentStatus === "error" && (
        <div className="text-red-600 font-Lato text-center mt-2">
          حدث خطأ أثناء الدفع، يرجى المحاولة مرة أخرى.
        </div>
      )}
    </div>
  );
}

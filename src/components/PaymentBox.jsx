import React, { useState } from 'react';
import { useCart } from '@/hooks/useCartRedux';

export default function PaymentBox({ fix }) {
  const { items } = useCart();
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  // دالة وهمية للدفع (تقدر تعدلها حسب الخدمة اللي تستخدمها)
  const handlePayment = async () => {
    if (total === 0) {
      setPaymentStatus('error');
      return;
    }
    setLoading(true);
    try {
      // محاكاة انتظار الدفع (مثلاً طلب API)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // هنا نفترض أن الدفع تم بنجاح
      setPaymentStatus('success');
      // تقدر هنا تمسح العربة أو تفعل شي ثاني بعد الدفع
    } catch (error) {
      setPaymentStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        (fix
          ? 'fixed bottom-0 z-40 flex w-full flex-col gap-3 border-t-2 border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'
          : 'flex w-full flex-col gap-3 border-t-2 border-gray-100 bg-white p-4 dark:border-gray-800 dark:bg-gray-900') +
        ' rounded-t-2xl shadow-2xl transition-all duration-300'
      }
    >
      {/* Main payment button */}
      <button
        dir='rtl'
        type='button'
        className='flex w-full animate-pulse items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-blue-600 via-blue-500 to-blue-700 py-3 text-lg font-bold text-white shadow-xl transition-all duration-200 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-gradient-to-l dark:from-blue-700 dark:via-blue-800 dark:to-blue-900 dark:focus:ring-blue-900'
        onClick={handlePayment}
        disabled={loading}
        aria-disabled={loading}
      >
        {loading ? 'جاري معالجة الدفع...' : 'الصافي للدفع'}
        <span className='ml-2 font-Lato text-[18px] font-extrabold'>
          {!loading && total.toFixed(2)}
        </span>
      </button>

      {/* إشعار الدفع داخل الصفحة */}
      {paymentStatus === 'success' && (
        <div className='mt-2 animate-bounce rounded-lg bg-green-50 py-2 text-center font-Lato text-green-600 shadow dark:bg-green-900/20'>
          تم الدفع بنجاح 🎉
        </div>
      )}
      {paymentStatus === 'error' && (
        <div className='animate-shake mt-2 rounded-lg bg-red-50 py-2 text-center font-Lato text-red-600 shadow dark:bg-red-900/20'>
          حدث خطأ أثناء الدفع، يرجى المحاولة مرة أخرى.
        </div>
      )}
    </div>
  );
}

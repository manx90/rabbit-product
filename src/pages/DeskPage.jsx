import Header from "@/components/Header";
import Category from "@/components/Category";
import ProductDesk from "@/components/ProductDesk";
import PaymentBox from "@/components/PaymentBox";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function DeskPage() {
  const { items } = useCart();
  const navigate = useNavigate();

  return (
    <div>
      <Header />
      <Category name={"السلة"} all={false} />

      <div className="flex flex-col gap-1 justify-center m-[16px] mb-[16px]">
        {items.length === 0 ? (
          <p className="text-center text-lg font-bold text-red-500 bg-red-50 py-4 px-6 rounded-xl shadow-sm font-Lato">
            لا توجد منتجات في السلة
          </p>
        ) : (
          items.map((item) => <ProductDesk key={item.id} item={item} />)
        )}
      </div>

      {/* زر السهم تحت ومن اليمين */}
      <div className="m-4 flex justify-end">
        <button
          onClick={() => navigate(-1)}
          aria-label="رجوع"
          className="p-2 rounded-full hover:bg-gray-200 transition-colors"
          style={{ userSelect: "none" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 text-gray-700 hover:text-blue-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </div>

      {items.length > 0 && (
        <Link to="/InfoPayment">
          <PaymentBox fix={true} />
        </Link>
      )}
    </div>
  );
}

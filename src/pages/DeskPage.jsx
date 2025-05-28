import Header from "@/components/Header";
import Category from "@/components/Category";
import ProductDesk from "@/components/ProductDesk";
import PaymentBox from "@/components/PaymentBox";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function DeskPage() {
    const { items } = useCart();

    return (
        <div>
            <Header />
            <Category name={"السلة"} all={false} />
            <div className="flex flex-col gap-1 justify-center m-[16px] mb-[112px]">
                {items.length === 0 ? (
                    <p className="text-center text-gray-500 font-Lato">لا توجد منتجات في السلة</p>
                ) : (
                    items.map((item) => <ProductDesk key={item.id} item={item} />)
                )}
            </div>
            <Link to="/InfoPayment">
                <PaymentBox fix={items.length > 0} />
            </Link>
        </div>
    );
}

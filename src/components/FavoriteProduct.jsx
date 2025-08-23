import React from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCart } from "@/hooks/useCartRedux";
import { MdDeleteForever } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

export default function FavoriteProduct({
	product,
}) {
	const { removeFromFavorites } = useFavorites();
	const { addItem } = useCart();

	const handleRemoveFromFavorites = () => {
		removeFromFavorites(
			product.productId,
			product.sizeName,
			product.colorName,
		);
	};

	const handleAddToCart = () => {
		addItem({
			...product,
			qty: 1,
		});
	};
	return (
		<div className="flex flex-row justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:shadow-md transition-shadow">
			<div className="flex flex-col justify-between">
				<button
					onClick={handleRemoveFromFavorites}
					className="p-1 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors mb-2"
					title="إزالة من المفضلة"
				>
					<MdDeleteForever className="w-5 h-5 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300" />
				</button>
				<button
					onClick={handleAddToCart}
					className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
				>
					أضف إلى السلة
				</button>
			</div>
			<div className="flex flex-col justify-between items-end">
				<span className="text-sm font-medium text-gray-900 dark:text-white text-right max-w-[140px]">
					{product.name || "اسم المنتج"}
				</span>
				<div className="flex flex-row-reverse items-center gap-2 mt-2">
					<span className="text-lg font-bold text-blue-600 dark:text-blue-400">
						${product.price || "0.00"}
					</span>
					<span className="text-xs text-gray-500 dark:text-gray-400">
						{product.sizeName} -{" "}
						{product.colorName}
					</span>
				</div>
				<div className="flex items-center mt-2">
					<FaHeart className="w-4 h-4 text-red-500 mr-1" />
					<span className="text-xs text-gray-500 dark:text-gray-400">
						في المفضلة
					</span>
				</div>
			</div>
			<img
				src={product.image || "/product.png"}
				className="w-20 h-20 object-cover rounded-lg"
				alt={product.name || "صورة المنتج"}
			/>
		</div>
	);
}

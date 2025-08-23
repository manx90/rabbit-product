import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useCart } from "@/hooks/useCartRedux";

export default function ProductDesk({ item }) {
	const { removeItem, changeQty } = useCart();

	// Get first color info (from sizeDetails[0].quantities[0] and colors[0])
	const firstQuantity =
		item.sizeDetails?.[0]?.quantities?.[0];
	const firstColorName =
		firstQuantity?.colorName?.trim();
	const firstColorObj =
		item.colors?.find(
			(c) => c.name?.trim() === firstColorName,
		) || item.colors?.[0];
	const firstColorImg = firstColorObj?.imgColor;

	// Get the correct color image for the colorName in the cart item
	const colorObj = item.colors?.find(
		(c) =>
			c.name?.trim() === item.colorName?.trim(),
	);
	const colorImg = colorObj?.imgColor;

	const handleQtyChange = (e) => {
		let value = parseInt(e.target.value, 10);
		if (isNaN(value) || value < 1) value = 1;
		if (value > item.quantity)
			value = item.quantity;
		changeQty(
			item.productId,
			item.sizeName,
			item.colorName,
			value,
		);
	};

	return (
		<div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-gray-100 dark:border-gray-800 gap-4 sm:gap-0 bg-white dark:bg-gray-900 rounded-xl shadow-md dark:shadow-lg transition-all hover:shadow-lg dark:hover:shadow-blue-900/40 w-full">
			{/* Left: Delete icon and quantity */}
			<div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-4 w-full sm:w-auto justify-between sm:justify-center">
				<div className="flex flex-col items-center gap-2">
					<DeleteForeverIcon
						onClick={() =>
							removeItem(
								item.productId,
								item.sizeName,
								item.colorName,
							)
						}
						style={{
							color: "#FF3737",
							cursor: "pointer",
							fontSize: 30,
						}}
					/>
				</div>
				<div
					dir="rtl"
					className="flex flex-row md:flex-col items-center gap-2"
				>
					<span className="text-xs md:hidden text-gray-500 dark:text-gray-400 mb-0 md:mb-1 md:order-none">
						الكمية المحددة :
					</span>
					<input
						type="number"
						min={1}
						max={item.quantity}
						value={item.qty}
						onChange={handleQtyChange}
						className="w-16 text-center font-Lato text-gray-700 dark:text-gray-200 text-[15px] px-2 py-1 rounded-lg border border-gray-400 dark:border-gray-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all shadow-sm bg-white dark:bg-gray-800"
					/>
					<span className="text-xs text-red-500 font-bold mt-1 block">
						الكمية المتوفرة: {item.quantity}
					</span>
				</div>
			</div>

			{/* Right: Product image, info, and attributes */}
			<div className="flex flex-1 items-center gap-4 flex-row-reverse max-w-full sm:max-w-[350px] w-full">
				{item.image && (
					<img
						src={item.image}
						alt={item.name}
						className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-blue-900/20 flex-shrink-0"
					/>
				)}

				<div className="flex flex-col text-right w-full">
					<span className="font-Lato text-[15px] sm:text-[16px] text-[#535353] dark:text-gray-200 truncate max-w-full font-semibold">
						{item.name}
					</span>
					<span className="font-Lato text-[18px] sm:text-[20px] text-[#0095FF] dark:text-blue-400 mt-1">
						{(item.price || 0).toFixed(2)}
					</span>

					<div className="flex flex-wrap gap-3 mt-2 items-center justify-end">
						{/* Color swatch with image and name */}
						{colorObj && (
							<div
								dir="rtl"
								className="flex items-center gap-1"
							>
								{colorImg && (
									<img
										src={colorImg}
										alt={item.colorName}
										className="inline-block w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 shadow object-cover"
									/>
								)}
								<span className="text-xs text-gray-700 dark:text-gray-200 font-bold">
									{item.colorName}
								</span>
								{/* Size badge */}
								{item.sizeName && (
									<span className="bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-700 dark:to-blue-900 text-white px-3 py-1 rounded-full text-xs font-bold border-2 border-white dark:border-gray-800 shadow-md ml-2 transition-all duration-200">
										{item.sizeName}
									</span>
								)}
							</div>
						)}
						{/* SubCategory badge */}
						{item.subCategory?.name && (
							<div
								dir="rtl"
								className="flex items-center gap-1"
							>
								{/* <span className="text-xs text-gray-500 dark:text-gray-400">
									التصنيف الفرعي:
								</span> */}
								<span className="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200 px-2 py-0.5 rounded-full text-xs border border-blue-200 dark:border-blue-700 font-semibold">
									{item.subCategory.name}
								</span>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

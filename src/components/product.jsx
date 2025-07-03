import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useToastContext } from "@/components/ui/toast";

export default function ProductSlider({
	products,
}) {
	return (
		<div className="h-full snap-x flex gap-2 flex-row-reverse overflow-x-auto scroll-smooth p-[4px] w-full custom-scrollbar">
			{products?.map((product, index) => (
				<Product
					key={product.id || index}
					product={{
						...product,
						id: product.id || index,
					}}
				/>
			))}
		</div>
	);
}

export function Product({ product }) {
	const getImagePath = (imageName) => {
		return imageName;
	};

	// Use imgCover as the main image, fallback to first color image, then default
	const mainImage =
		product.imgCover ||
		(product.colors &&
			product.colors[0]?.imgColor) ||
		"product.png";
	const [photo, setPhoto] = useState(
		getImagePath(mainImage),
	);

	const { addItem } = useCart();
	const { addToast } = useToastContext
		? useToastContext()
		: { addToast: () => {} };

	// Pick first price from the first sizeDetails entry if available
	const defaultPrice =
		product?.sizeDetails &&
		product.sizeDetails.length > 0
			? product.sizeDetails[0].price
			: product?.price || 0;

	// Modal state
	const [modalOpen, setModalOpen] =
		useState(false);
	const [selectedColor, setSelectedColor] =
		useState(product.colors?.[0]?.name || "");
	const [selectedSize, setSelectedSize] =
		useState(
			product.sizeDetails?.[0]?.sizeName || "",
		);
	const [quantity, setQuantity] = useState(1);

	// Find available sizes and colors
	const sizes =
		product.sizeDetails?.map((s) => s.sizeName) ||
		[];
	const colors = product.colors || [];

	// Find max quantity for selected color/size
	const maxQty = (() => {
		const sizeDetail = product.sizeDetails?.find(
			(s) => s.sizeName === selectedSize,
		);
		if (!sizeDetail) return 10;
		const q = sizeDetail.quantities?.find(
			(q) => q.colorName === selectedColor,
		);
		return q?.quantity || 10;
	})();

	// Parse product.quantity as a number for correct comparison
	const parsedQuantity =
		typeof product.quantity === "string"
			? parseInt(product.quantity.trim(), 10)
			: product.quantity;

	const handleColorSelect = (color) => {
		// Find the colorName from the selected size's quantities that matches this color's name
		const sizeDetail = product.sizeDetails?.find(
			(s) => s.sizeName === selectedSize,
		);
		let matchedColorName = color.name;
		if (sizeDetail && sizeDetail.quantities) {
			const found = sizeDetail.quantities.find(
				(q) =>
					q.colorName.trim() ===
					color.name.trim(),
			);
			if (found)
				matchedColorName = found.colorName;
		}
		setSelectedColor(matchedColorName);
		setPhoto(getImagePath(color.imgColor));
	};

	const handleAddToCart = () => {
		// Always use the colorName from the selected size's quantities
		const sizeDetail = product.sizeDetails?.find(
			(s) => s.sizeName === selectedSize,
		);
		let matchedColorName = selectedColor;
		let availableQuantity = 1;
		if (sizeDetail && sizeDetail.quantities) {
			const found = sizeDetail.quantities.find(
				(q) =>
					q.colorName.trim() ===
					selectedColor.trim(),
			);
			if (found) {
				matchedColorName = found.colorName;
				availableQuantity = found.quantity;
			}
		}
		addItem({
			...product,
			productId: product.id,
			sizeName: selectedSize,
			colorName: matchedColorName,
			quantity: availableQuantity,
			qty: quantity,
			image: photo,
			price: defaultPrice,
		});
		addToast({
			title: "تمت الإضافة!",
			description: `تم إضافة المنتج (${product.name}) إلى السلة بنجاح.`,
		});
		setModalOpen(false);
	};

	return (
		<div className="relative max-w-[160px] max-h-[450px] p-2 gap-2 flex flex-col justify-between bg-[#231f1f08] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:shadow-lg shadow-sm rounded-md transition-all border border-transparent dark:border-gray-700  hover:shadow-md dark:hover:shadow-blue-900/40">
			{/* Show low stock badge if product.quantity is 10 or less */}
			{typeof parsedQuantity === "number" &&
				parsedQuantity <= 10 &&
				parsedQuantity > 0 && (
					<div className="absolute top-2 right-2 z-20 bg-white/90 dark:bg-gray-100/90 border border-red-400 shadow-lg rounded-full px-3 py-1 text-red-600 text-xs font-semibold backdrop-blur-sm transition-all animate-bounce">
						<span className="font-Lato">
							!كمية محدودة
						</span>
					</div>
				)}
			<div className="flex flex-col gap-2">
				<Link
					to={`/product/${product.id}`}
					className="flex justify-center"
				>
					<div className="relative">
						<img
							src={photo}
							id="product-img"
							className="max-w-[150px] px-2 max-h-[200px] object-contain transition-all drop-shadow-md dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)] rounded-lg bg-white dark:bg-gray-900"
							alt={product.name}
						/>
					</div>
				</Link>
				<div className="flex flex-row flex-wrap mx-auto gap-1">
					{colors.map((color, index) => {
						const imageUrl = getImagePath(
							color.imgColor,
						);
						const isSelected = photo === imageUrl;
						return (
							<div
								className="mx-auto"
								key={color.name || index}
							>
								<img
									src={imageUrl}
									className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full cursor-pointer object-cover transition-all   ${
										isSelected
											? "border-2 border-blue-500 shadow-md "
											: "border border-gray-200 "
									}`}
									alt={`${product.name} - Color ${color.name}`}
									onClick={() =>
										handleColorSelect(color)
									}
								/>
							</div>
						);
					})}
				</div>
			</div>
			<div className="gap-2 flex flex-col">
				<span
					className="font-Lato text-right text-[14px] md:text-[18px] w-full text-black dark:text-white overflow-hidden text-ellipsis font-normal leading-normal whitespace-nowrap"
					dir="rtl"
				>
					{product.name}
				</span>
				<div
					dir="rtl"
					className="flex gap-1.5 flex-row"
				>
					<span className="font-medium text-[16px] md:text-[20px] text-[#0095FF] dark:text-blue-400 drop-shadow dark:drop-shadow-[0_1px_4px_rgba(0,149,255,0.3)]">
						{defaultPrice}
					</span>
					<img
						src="/Layer_1.svg"
						alt=""
						className="w-4 "
					/>
				</div>
				<button
					type="button"
					className="bg-[#fefefe] dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-700 w-full p-[4px] flex border-solid border-2 border-[#ecebebf0] dark:border-blue-800 items-center justify-center gap-[4px] flex-row-reverse rounded-sm mx-auto shadow hover:bg-blue-50 dark:hover:bg-blue-800/80 transition-colors group"
					onClick={(e) => {
						e.preventDefault();
						setModalOpen(true);
					}}
				>
					<span className="text-black font-Lato dark:text-white text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px] group-hover:text-blue-600 dark:group-hover:text-blue-200 transition-colors">
						أضف الى السلة
					</span>
					<img
						src="/shopping_cart.svg"
						alt=""
						className="w-[12px] h-[12px] fill-black dark:invert"
					/>
				</button>
			</div>

			{/* Modal */}
			{modalOpen && (
				<>
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/70 backdrop-blur-sm">
						<div
							dir="rtl"
							className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-2 sm:p-4 md:p-6 w-[95vw] max-w-xs sm:max-w-sm md:max-w-md mx-auto flex flex-col gap-4 animate-fade-in max-h-[90vh] overflow-y-auto relative"
						>
							<button
								type="button"
								className="absolute top-2 left-2 text-gray-400 hover:text-red-500 text-2xl font-bold z-10"
								onClick={() =>
									setModalOpen(false)
								}
								aria-label="إغلاق"
							>
								×
							</button>
							<div className="flex flex-col items-center gap-2">
								<img
									src={photo}
									alt={product.name}
									className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700 shadow"
								/>
								<span className="font-bold text-lg text-gray-800 dark:text-gray-100">
									{product.name}
								</span>
								<span className="text-blue-600 dark:text-blue-300 text-xl font-bold">
									{defaultPrice}{" "}
									<span className="text-xs">
										شيكل
									</span>
								</span>
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-medium text-gray-700 dark:text-gray-200">
									اختر اللون:
								</label>
								<div className="flex flex-row-reverse flex-wrap gap-2 justify-end">
									{colors.map((color, idx) => (
										<button
											type="button"
											key={color.name || idx}
											className={`flex items-center gap-1 px-2 py-1 rounded-lg border transition-all ${
												selectedColor ===
												color.name
													? "border-blue-500 bg-blue-50 dark:bg-blue-900/40"
													: "border-gray-200 dark:border-gray-700"
											}`}
											onClick={() =>
												handleColorSelect(color)
											}
										>
											<img
												src={getImagePath(
													color.imgColor,
												)}
												alt={color.name}
												className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 object-cover"
											/>
											<span className="text-xs text-gray-700 dark:text-gray-200 font-bold">
												{color.name}
											</span>
										</button>
									))}
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-medium text-gray-700 dark:text-gray-200">
									اختر المقاس:
								</label>
								<div className="flex flex-row-reverse flex-wrap gap-2 justify-end">
									{sizes.map((size, idx) => (
										<button
											type="button"
											key={size || idx}
											className={`px-3 py-1 rounded-lg border text-sm font-bold transition-all ${
												selectedSize === size
													? "border-blue-500 bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-200"
													: "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
											}`}
											onClick={() =>
												setSelectedSize(size)
											}
										>
											{size}
										</button>
									))}
								</div>
							</div>
							<div className="flex flex-col gap-2">
								<label className="font-medium text-gray-700 dark:text-gray-200">
									الكمية:
								</label>
								<div className="flex items-center gap-2 justify-end">
									<button
										type="button"
										className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-xl font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center border border-gray-300 dark:border-gray-700"
										onClick={() =>
											setQuantity((q) =>
												Math.max(1, q - 1),
											)
										}
									>
										-
									</button>
									<input
										type="text"
										min={1}
										max={maxQty}
										value={quantity}
										onChange={(e) =>
											setQuantity(
												Math.max(
													1,
													Math.min(
														maxQty,
														Number(
															e.target.value,
														),
													),
												),
											)
										}
										className="w-16 text-center font-Lato text-gray-700 dark:text-gray-200 text-[15px] px-2 py-1 rounded-lg border border-gray-400 dark:border-gray-700 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all shadow-sm bg-white dark:bg-gray-800"
									/>
									<button
										type="button"
										className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 text-xl font-bold text-gray-700 dark:text-gray-200 flex items-center justify-center border border-gray-300 dark:border-gray-700"
										onClick={() =>
											setQuantity((q) =>
												Math.min(maxQty, q + 1),
											)
										}
									>
										+
									</button>
									<span className="text-xs text-gray-500 dark:text-gray-400">
										المتوفر: {maxQty}
									</span>
								</div>
							</div>
							<div className="flex flex-row-reverse gap-2 mt-4">
								<button
									onClick={handleAddToCart}
									className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded-lg shadow transition-all text-sm"
								>
									أضف الى السلة
								</button>
								<button
									onClick={() =>
										(window.location.href =
											"/Desk")
									}
									className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg shadow transition-all text-sm"
								>
									اذهب إلى السلة
								</button>
								<button
									onClick={() =>
										setModalOpen(false)
									}
									className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-bold py-2 rounded-lg shadow transition-all text-sm"
								>
									متابعة التسوق
								</button>
							</div>
						</div>
					</div>

					<div
						className="fixed inset-0 z-40"
						onClick={() => setModalOpen(false)}
					></div>
				</>
			)}
		</div>
	);
}

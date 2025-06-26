import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

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

	const handlerChangePhoto = (e) => {
		setPhoto(e.target.src);
	};

	const { addItem } = useCart();

	// Pick first price from the first sizeDetails entry if available
	const defaultPrice =
		product?.sizeDetails &&
		product.sizeDetails.length > 0
			? product.sizeDetails[0].price
			: product?.price || 0;

	return (
		<div className="max-w-[160px] max-h-[450px] p-2 gap-2 flex flex-col justify-between bg-[#231f1f08] dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800 dark:shadow-lg shadow-sm rounded-md transition-all border border-transparent dark:border-gray-700  hover:shadow-md dark:hover:shadow-blue-900/40">
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
					{product.colors?.map((color, index) => {
						const imageUrl = getImagePath(
							color.imgColor,
						);
						const isSelected = photo === imageUrl;
						return (
							<div className="mx-auto">
								<img
									key={index}
									src={imageUrl}
									className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full cursor-pointer object-cover transition-all   ${
										isSelected
											? "border-2 border-blue-500 shadow-md "
											: "border border-gray-200 "
									}`}
									alt={`${product.name} - Color ${color.name}`}
									onClick={() =>
										setPhoto(imageUrl)
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
					className="bg-[#fefefe] dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-700 w-full p-[4px] flex border-solid border-2 border-[#ecebebf0] dark:border-blue-800 items-center justify-center gap-[4px] flex-row-reverse rounded-sm mx-auto shadow hover:bg-blue-50 dark:hover:bg-blue-800/80 transition-colors group"
					onClick={(e) => {
						e.preventDefault(); // Prevent navigation when clicking the button
						addItem({
							...product,
							image: photo,
							price: defaultPrice,
						});
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
		</div>
	);
}

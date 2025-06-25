import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function ProductSlider({ products }) {
	return (
		<div className="h-full snap-x flex gap-2 flex-row-reverse overflow-x-auto scroll-smooth p-[4px] w-full">
			{products.map((product, index) => (
				<Product key={product.id || index} product={{...product, id: product.id || index}} />
			))}
		</div>
	);
}

export function Product({ product }) {
	const getImagePath = (imageName) => {
		return imageName;
	};

	// Use imgCover as the main image, fallback to first color image, then default
	const mainImage = product.imgCover || (product.colors && product.colors[0]?.imgColor) || "product.png";
	const [photo, setPhoto] = useState(getImagePath(mainImage));

	const handlerChangePhoto = (e) => {
		setPhoto(e.target.src);
	};

	const { addItem } = useCart();

    // Pick first price from the first sizeDetails entry if available
    const defaultPrice = product?.sizeDetails && product.sizeDetails.length > 0
        ? product.sizeDetails[0].price
        : product?.price || 0;

	return (
		<div 
			className="w-[220px] h-full p-2 gap-2 flex flex-col justify-between bg-[#231f1f08] shadow-sm rounded-md  transition-all"
		>
			<div className="flex flex-col gap-2">
				<Link to={`/product/${product.id}`} className="flex justify-center">
					<div className="relative">
						<img
							src={photo}
							id="product-img"
							className="max-w-[220px] px-2 h-full  object-contain  transition-all"
							alt={product.name}
						/>
					</div>
				</Link>
				<div className="flex flex-row flex-wrap mx-auto gap-1">
					{product.colors?.map((color, index) => {
						const imageUrl = getImagePath(color.imgColor);
						const isSelected = photo === imageUrl;
						return (
							<div className="mx-auto">
							<img
								key={index}
								src={imageUrl}
								className={`h-8 w-8 lg:h-10 lg:w-10 rounded-full cursor-pointer object-cover transition-all ${
									isSelected
										? "border-2 border-blue-500"
										: "border border-gray-200"
								}`}
								alt={`${product.name} - Color ${color.name}`}
								onClick={() => setPhoto(imageUrl)}
							/>
							</div>
						);
					})}
				</div>
			</div>
			<div className="gap-2 flex flex-col">
			<span className="font-Lato text-right text-[14px] md:text-[18px] w-full text-black overflow-hidden text-ellipsis font-normal leading-normal whitespace-nowrap"
			dir='rtl'>
				{product.name}
			</span>
			<div className="flex gap-1.5 flex-row-reverse">
				<span className="font-Lato text-[16px] md:text-[20px] text-[#0095FF] font-normal">{defaultPrice}</span>
				<img src="/Layer_1.svg" alt="" />
			</div>
			<button 
				className="bg-[#fefefe] w-full p-[4px] flex border-solid border-2 border-[#ecebebf0] items-center justify-center gap-[4px] flex-row-reverse rounded-sm mx-auto"
				onClick={(e) => {
					e.preventDefault(); // Prevent navigation when clicking the button
					addItem({ ...product, image: photo, price: defaultPrice });
				}}
			>
				<span className="text-black font-Lato dark:text-white 
					text-[10px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]">
					أضف الى السلة
				</span>
				<img src="/shopping_cart.svg" alt="" className="w-[12px] h-[12px] fill-black"/>
			</button>
			</div>
		</div>
	);
}

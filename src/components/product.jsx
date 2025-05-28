import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

export default function ProductSlider({ products }) {
	return (
		<div className="snap-x flex gap-2 flex-row-reverse overflow-x-auto scroll-smooth p-[4px] w-screen">
			{products.map((product, index) => (
				<Product key={product.id || index} product={{...product, id: product.id || index}} />
			))}
		</div>
	);
}

export function Product({ product }) {
	const getImagePath = (imageName) => {
		return imageName.startsWith('/') ? imageName : `/${imageName}`;
	};

	const [photo, setPhoto] = useState(
		// eslint-disable-next-line react/prop-types
		getImagePath(product?.img_for_each_color?.[Object.keys(product.img_for_each_color)[0]] || product.images[0] || "product.png")
	);

	const handlerChangePhoto = (e) => {
		setPhoto(e.target.src);
	};

	const { addItem } = useCart();

    // Pick first price value available
    const defaultPrice = product?.price_for_each_size
        ? Object.values(product.price_for_each_size)[0]
        : product?.price || 0;

	return (
		<div 
			// className="flex flex-col items-center justify-center"
			className="p-[6px] gap-[6px] flex flex-col items-end w-[152px] bg-[#231f1f08] shadow-sm rounded-md"
		>
			<Link to={`/category/${product.category}/subcategory/${product.subCategory}/product/${product.id}`} >
			<img
				src={photo}
				id="product-img"
				className="h-[140px] w-[140px] rounded-md"
				alt={product.name}
			/>
			</Link>
			<span className="font-Lato text-right text-[14px] w-[140px] text-black overflow-hidden text-ellipsis  font-normal leading-normal">
				{product.name}
				{/* ترينين شتوي عملي ثقيل */}
			</span>
			<div className="flex flex-row mx-auto gap-[4px]">
				{product.images?.map((image, index) => (
					<img
						key={index}
						src={getImagePath(image)}
						className="h-8 w-8 rounded-full active:border-2"
						alt={`${product.name} - Image ${index + 1}`}
						onClick={handlerChangePhoto}
					/>
				))}
			</div>
			<div className="flex items-center gap-1.5 flex-row-reverse">
				<span className="font-Lato text-[16px] text-[#0095FF] font-normal">{defaultPrice}</span>
				<img src="/Layer_1.svg" alt="" />
			</div>
			<button 
				className="bg-[#fefefe] w-[140px] p-[4px] flex border-solid border-2 border-[#ecebebf0] items-center justify-center gap-[4px] flex-row-reverse rounded-sm"
				onClick={(e) => {
					e.preventDefault(); // Prevent navigation when clicking the button
					addItem({ ...product, image: photo, price: defaultPrice });
				}}
			>
				<span className="text-black text-[10px] font-Lato dark:text-white">
					أضف الى السلة
				</span>
				<img src="/shopping_cart.svg" alt="" className="w-[12px] h-[12px] fill-black"/>
			</button>
		</div>
	);
}

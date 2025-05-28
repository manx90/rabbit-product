import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Category from "@/components/category";
import productsData from "../data/products_with_real_images.json";

export default function ProductPage() {
	const { categoryId, subcategoryId, productId } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);
		// Since productId is a string from URL params, convert to number for index
		const productIndex = parseInt(productId);
		// Get product directly by index
		const foundProduct = productsData[productIndex];
		// Add ID to product if found
		if (foundProduct) {
			foundProduct.id = productIndex;
		}
		if (foundProduct) {
			setProduct(foundProduct);
			// Set initial color and size
			if (foundProduct.colors.length > 0) {
				setSelectedColor(foundProduct.colors[0]);
			}
			if (foundProduct.size.length > 0) {
				setSelectedSize(foundProduct.size[0]);
			}
		} else {
			setError("Product not found");
			// Optionally redirect to category page after a delay
			setTimeout(() => {
				navigate(`/category/${categoryId}/subcategory/${subcategoryId}`);
			}, 2000);
		}
		setLoading(false);
	}, [productId, categoryId, subcategoryId, navigate]);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
				<p className="mt-4 text-gray-600">Loading product...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<p className="text-red-500">{error}</p>
				<p className="mt-2 text-gray-600">Redirecting to category page...</p>
			</div>
		);
	}

	if (!product) {
		return null;
	}

	const handleQuantityChange = (newQuantity) => {
		if (newQuantity >= 1 && newQuantity <= product.quantity[selectedColor][selectedSize]) {
			setQuantity(newQuantity);
		}
	};

	return (
		<div className="flex flex-col align-center gap-2">
			<Header />
			<div className="my-[12px] shadow-sm">
				<div className="flex justify-between items-center py-[8px] px-[12px]">
					{/* <Link
						to={`/category/${categoryId}/subcategory/${subcategoryId}`}
						className="flex items-center gap-[4px]"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="18"
							height="18"
							viewBox="0 0 18 18"
							fill="none"
						>
							<mask
								id="mask0_1935_3170"
								style={{ maskType: "alpha" }}
								maskUnits="userSpaceOnUse"
								x="0"
								y="0"
								width="18"
								height="18"
							>
								<rect
									width="18"
									height="18"
									fill="#D9D9D9"
								/>
							</mask>
							<g mask="url(#mask0_1935_3170)">
								<path
									d="M12 16.5001L4.5 9.00006L12 1.50006L13.3313 2.83131L7.1625 9.00006L13.3313 15.1688L12 16.5001Z"
									fill="#0095FF"
								/>
							</g>
						</svg>
						<span className="font-Lato text-[#0095FF]">Back to Subcategory</span>
					</Link> */}
					<div className="font-Lato">
						<Link to={`/category/${categoryId}`} className="hover:text-blue-500">
							Category {categoryId}
						</Link>
						<span className="mx-2">›</span>
						<Link to={`/category/${categoryId}/subcategory/${subcategoryId}`} className="hover:text-blue-500">
							Subcategory {subcategoryId}
						</Link>
						<span className="mx-2">›</span>
						<span>Product {productId}</span>
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-2 justify-center m-[16px]">
				<Photos product={product} selectedColor={selectedColor} />
				<Description 
					product={product} 
					selectedColor={selectedColor}
					selectedSize={selectedSize}
					quantity={quantity}
					onColorSelect={setSelectedColor}
					onSizeSelect={setSelectedSize}
					onQuantityChange={handleQuantityChange}
				/>
			</div>
			<Footer />
		</div>
	);
}
function Photos({ product, selectedColor }) {
	return (
		<div className="flex flex-col gap-6">
			<img
				src={`/${product.img_for_each_color[selectedColor]}`}
				alt={product.name}
				className="w-[100%] h-[calc(100%-32px)] max-w-[450px] m-auto max-h-[450px] border-[1px] p-4 rounded-md"
			/>
			<div className="flex flex-wrap justify-center gap-1 max-sm:w-[calc(100%-32px)] m-auto">
				{product.images.map((image, index) => (
					<img
						key={index}
						src={`/${image}`}
						alt={`${product.name} - Image ${index + 1}`}
						className="w-16 h-16 p-1 border-[1px] rounded-lg"
					/>
				))}
			</div>
		</div>
	);
}
function Description({ 
	product, 
	selectedColor, 
	selectedSize, 
	quantity,
	onColorSelect,
	onSizeSelect,
	onQuantityChange 
}) {
	const currentPrice = product.price_for_each_size[selectedSize];
	const discount = 20; // You might want to add this to your product data
	const discountedPrice = currentPrice * (1 - discount / 100);

	return (
		<div className="flex flex-col gap-2 m-auto">
			<div className="flex flex-row-reverse sm:gap-5 gap-14 justify-between max-w-[450px]">
				<span className="font-Lato text-[18px] text-black">{product.name}</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="32"
					height="32"
					viewBox="0 0 32 32"
					fill="none"
				>
					<path
						d="M16 28L14.0667 26.2667C11.8222 24.2445 9.96667 22.5 8.5 21.0333C7.03333 19.5667 5.86667 18.25 5 17.0833C4.13333 15.9167 3.52778 14.8445 3.18333 13.8667C2.83889 12.8889 2.66667 11.8889 2.66667 10.8667C2.66667 8.77778 3.36667 7.03334 4.76667 5.63334C6.16667 4.23334 7.91111 3.53334 10 3.53334C11.1556 3.53334 12.2556 3.77778 13.3 4.26667C14.3444 4.75556 15.2444 5.44445 16 6.33334C16.7556 5.44445 17.6556 4.75556 18.7 4.26667C19.7444 3.77778 20.8444 3.53334 22 3.53334C24.0889 3.53334 25.8333 4.23334 27.2333 5.63334C28.6333 7.03334 29.3333 8.77778 29.3333 10.8667C29.3333 11.8889 29.1611 12.8889 28.8167 13.8667C28.4722 14.8445 27.8667 15.9167 27 17.0833C26.1333 18.25 24.9667 19.5667 23.5 21.0333C22.0333 22.5 20.1778 24.2445 17.9333 26.2667L16 28Z"
						fill="#DF4444"
					/>
				</svg>
			</div>

			<div className="flex flex-row-reverse justify-start">
				<span className="font-Lato m-auto text-[#535353] text-right max-w-[450px]">
					{product.description}
				</span>
			</div>

			<div className="flex flex-row-reverse">
				<span className="font-Lato text-[#535353] text-right max-w-[450px]">
					رقم المنتج: #{product.name.replace(/\s+/g, '')}
				</span>
			</div>

			<div className="flex flex-row-reverse">
				<span className="font-Lato text-[#535353] text-right max-w-[450px]">
					الكمية: {product.quantity[selectedColor][selectedSize]}
				</span>
			</div>

			<div className="flex flex-row-reverse items-center gap-2">
				<span className="font-Lato text-[#535353] text-right max-w-[450px] relative bg-white before:absolute before:inset-y-0 before:left-0 before:right-0 before:top-1/2 before:h-px before:bg-black before:content-['']">
					{currentPrice.toFixed(2)}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="10"
					height="11"
					viewBox="0 0 10 11"
					fill="none"
				>
					<path
						d="M8.57672 9.56082V1.83717C8.56763 1.73107 8.56763 1.6244 8.57672 1.5183C8.61312 1.34869 8.71366 1.19966 8.85735 1.1023C9.00105 1.00494 9.17682 0.966756 9.348 0.995718C9.51205 1.00007 9.66831 1.06654 9.78516 1.18165C9.90202 1.29676 9.97075 1.45191 9.97743 1.61573C9.98185 1.68652 9.98185 1.75753 9.97743 1.82832V10.1543C9.98185 10.2221 9.98185 10.2902 9.97743 10.358C9.97743 10.4406 9.96115 10.5223 9.92952 10.5986C9.89789 10.6749 9.85152 10.7443 9.79308 10.8027C9.73463 10.8611 9.66524 10.9074 9.58888 10.939C9.51251 10.9706 9.43066 10.9869 9.348 10.9869H6.32495C5.40088 10.9511 4.52522 10.5647 3.87628 9.90646C3.22733 9.24822 2.85391 8.36759 2.83205 7.4439C2.83205 6.47845 2.83205 5.513 2.83205 4.54754C2.81959 4.37784 2.87368 4.20994 2.98287 4.07936C3.09206 3.94878 3.24779 3.86574 3.41715 3.8478C3.58369 3.81112 3.75795 3.83806 3.90561 3.9233C4.05327 4.00854 4.16365 4.14592 4.21503 4.30839C4.24766 4.42054 4.26262 4.53708 4.25935 4.65383C4.25935 5.53957 4.25935 6.42531 4.25935 7.31105C4.25935 7.60259 4.31697 7.89126 4.42891 8.1605C4.54084 8.42973 4.70488 8.67423 4.91163 8.87997C5.11837 9.08571 5.36374 9.24863 5.63366 9.35939C5.90358 9.47015 6.19273 9.52656 6.48453 9.5254C7.11396 9.5254 7.74339 9.5254 8.37283 9.5254L8.57672 9.56082Z"
						fill="#535353"
					/>
				</svg>
			</div>

			<div className="flex flex-row-reverse items-center gap-2">
				<span className="font-Lato text-[#DF4444] text-[24px] text-right max-w-[450px]">
					{discountedPrice.toFixed(2)}
				</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
				>
					<path
						d="M11.7764 11.5592V1.67023C11.7648 1.53439 11.7648 1.39781 11.7764 1.26197C11.823 1.0448 11.9517 0.854001 12.1357 0.729343C12.3197 0.604684 12.5447 0.555799 12.7639 0.592881C12.974 0.598458 13.174 0.683556 13.3236 0.830936C13.4733 0.978317 13.5613 1.17697 13.5698 1.38672C13.5755 1.47735 13.5755 1.56826 13.5698 1.6589V12.319C13.5755 12.4059 13.5755 12.493 13.5698 12.5799C13.5698 12.6856 13.549 12.7903 13.5085 12.888C13.468 12.9857 13.4086 13.0744 13.3338 13.1492C13.2589 13.224 13.1701 13.2833 13.0723 13.3237C12.9745 13.3642 12.8698 13.385 12.7639 13.385H8.89336C7.71023 13.3392 6.58908 12.8445 5.7582 12.0017C4.92732 11.159 4.44922 10.0314 4.42123 8.84881C4.42123 7.61269 4.42123 6.37658 4.42123 5.14046C4.40528 4.92318 4.47452 4.70821 4.61432 4.54102C4.75413 4.37383 4.95353 4.26751 5.17036 4.24454C5.38359 4.19758 5.6067 4.23207 5.79576 4.3412C5.98482 4.45034 6.12615 4.62623 6.19192 4.83426C6.2337 4.97785 6.25285 5.12706 6.24868 5.27654C6.24868 6.41059 6.24868 7.54465 6.24868 8.67871C6.24867 9.05198 6.32245 9.42158 6.46576 9.7663C6.60907 10.111 6.81911 10.4241 7.08381 10.6875C7.34852 10.9509 7.66267 11.1595 8.00827 11.3013C8.35386 11.4431 8.72407 11.5153 9.09767 11.5138C9.90356 11.5138 10.7095 11.5138 11.5154 11.5138L11.7764 11.5592Z"
						fill="#DF4444"
					/>
				</svg>
				<span className="font-Lato text-[14px] bg-[#DF4444] text-[white] px-[8px] py-[2px] text-center rounded-xl text-align-center">
					{discount}%
				</span>
			</div>

			<div className="flex flex-col gap-2">
				<span className="font-Lato text-[#DF4444] text-right max-w-[450px]">
					ملاحظة: السعر يختلف حسب الحجم
				</span>
				<span className="font-Lato text-[#535353] text-right max-w-[450px]">
					يرجى اختيار القياس
				</span>
				<div className="flex flex-row-reverse items-center gap-2">
					{product.size.map((size) => (
						<span
							key={size}
							onClick={() => onSizeSelect(size)}
							className={`p-[6px] text-center align-middle w-[36px] h-[36px] font-Lato text-[18px] border-[1px] cursor-pointer ${
								selectedSize === size ? "border-blue-400" : "border-[#535353]"
							}`}
						>
							{size}
						</span>
					))}
				</div>

				<span className="font-Lato text-[#535353] text-right max-w-[450px]">
					يرجى اختيار اللون
				</span>
				<div className="flex flex-wrap gap-2 justify-start flex-row-reverse">
					{product.colors.map((color) => (
						<img
							key={color}
							src={product.img_for_each_color[color]}
							alt={color}
							onClick={() => onColorSelect(color)}
							className={`w-14 h-14 p-1 border-[1px] rounded-lg cursor-pointer ${
								selectedColor === color ? "border-blue-400" : "border-[#535353]"
							}`}
						/>
					))}
				</div>

				<span className="font-Lato text-[#535353] text-right max-w-[450px]">
					الكمية
				</span>
				<div className="flex flex-row-reverse items-center gap-2">
					<div className="flex flex-row-reverse items-center border-[#BFBFBF] h-[37px] rounded-lg justify-center w-[70px] border-[1px]">
						<span className="font-Lato text-[#BFBFBF] text-center align-middle">
							{quantity}
						</span>
					</div>
					<div className="flex flex-row-reverse items-center border-[#BFBFBF] px-2 h-[37px] rounded-lg justify-between w-[70px] border-[1px]">
						<button
							onClick={() => onQuantityChange(quantity + 1)}
							className="text-[#535353]"
						>
							+
						</button>
						<button
							onClick={() => onQuantityChange(quantity - 1)}
							className="text-[#535353]"
						>
							-
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

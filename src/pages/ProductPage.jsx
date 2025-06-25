import { Link } from "react-router-dom";
import Footer from "@/components/footer";
import Header from "@/components/header";

import { useProductPage } from "../contexts/ProductPage.context";
import { useState } from "react";
export default function ProductPage() {
	const {
		product,
		selectedColor,
		setSelectedColor,
		selectedSize,
		setSelectedSize,
		quantity,
		handleQuantityChange,
	} = useProductPage();
	const [MainImage, setMainImage] = useState();

	return (
		<div className="flex flex-col align-center gap-2">
			<Header />
			{/* <div className="my-[12px] shadow-sm">
				<div className="flex justify-between items-center py-[8px] px-[12px]">
					<div className="font-Lato">
						<Link to="/" className="hover:text-blue-500">
							Home
						</Link>
						<span className="mx-2">›</span>
						<Link
							to={`/category/${product.category?.id || product.category}`}
							className="hover:text-blue-500"
						>
							{product.category?.name || product.category}
						</Link>
						<span className="mx-2">›</span>
						<Link
							to={`/category/${product.category?.id || product.category}/subcategory/${product.subCategory?.id || product.subCategory}`}
							className="hover:text-blue-500"
						>
							{product.subCategory?.name || product.subCategory}
						</Link>
						<span className="mx-2">›</span>
						<span>{product.name}</span>
					</div>
				</div>
			</div> */}
			<div className="flex flex-col gap-2 justify-center m-[16px]">
				<Description
					MainImage={MainImage}
					setMainImage={setMainImage}
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
function Photos({
	product,
	selectedColor,
	MainImage,
	setMainImage,
}) {
	// Find the selected color object
	const selectedColorObj = product.colors?.find(
		(c) => c.name === selectedColor,
	);
	const mainImage =
		selectedColorObj?.imgColor ||
		product.imgCover ||
		product.images?.[0];

	const colorImages =
		product.colors
			?.map((c) => c.imgColor)
			.filter(Boolean) || [];
	const productImages = product.images || [];
	const allThumbnails = [
		...new Set([...productImages]),
	];

	return (
		<div className="flex flex-col gap-6">
			<img
				src={!MainImage ? mainImage : MainImage}
				alt={product.name}
				className="w-[100%] h-[calc(100%-32px)] max-w-[450px] m-auto max-h-[450px] lg:max-w-[550px] lg:max-h-[550px] border-[1px] p-4 rounded-md object-contain"
			/>
			<div className="flex flex-wrap justify-center gap-1 max-sm:w-[calc(100%-32px)] m-auto">
				{allThumbnails.map((image, index) => {
					const isSelected =
						(MainImage
							? MainImage
							: mainImage) === image;
					return (
						<img
							key={index}
							src={image}
							alt={`${product.name} - Image ${
								index + 1
							}`}
							className={`w-16 h-16 p-1 lg:w-20 lg:h-20 border-[1px] rounded-lg object-cover cursor-pointer ${
								isSelected
									? "border-blue-400"
									: ""
							}`}
							onClick={() => setMainImage(image)}
						/>
					);
				})}
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
	onQuantityChange,
	setMainImage,
	MainImage,
}) {
	// Find the selected sizeDetail
	const selectedSizeDetail =
		product.sizeDetails?.find(
			(s) => s.sizeName === selectedSize,
		);
	const currentPrice =
		selectedSizeDetail?.price || 0;
	const discount = 20; // You might want to add this to your product data
	const discountedPrice =
		currentPrice * (1 - discount / 100);

	// Find the quantity for the selected color in the selected size
	const colorQuantity =
		selectedSizeDetail?.quantities?.find(
			(q) => q.colorName === selectedColor,
		)?.quantity || 0;

	return (
		<div className="mx-2 md:mx-0">
			<form
				dir="rtl"
				className="grid  grid-cols-1 lg:grid-cols-3 lg:grid  gap-8 mx-auto"
			>
				{/* for name and photos and disc */}
				<div className="flex-col justify-between">
					<Photos
						product={product}
						selectedColor={selectedColor}
						MainImage={MainImage}
						setMainImage={setMainImage}
					/>

					<div className="flex flex-row-reverse my-5 sm:gap-5 gap-14 justify-between ">
						<span className="font-Lato text-[20px] text-black ml-auto">
							{product.name}
						</span>
					</div>
					<div
						dir="rtl"
						className="flex flex-row-reverse"
					>
						<span
							dir="rtl"
							className="text-[18px]  text-[#535353] ml-auto"
						>
							{product.description}
						</span>
					</div>
				</div>
				{/* for selecting to cart */}

				<div className="flex-col justify-between">
					<div className="flex flex-row items-center gap-2 my-2">
						<span
							dir="rtl"
							className="text-[18px] font-medium text-[#535353]"
						>
							المتوفر:
						</span>
						<div
							dir="rtl"
							className="flex items-center justify-center bg-green-100 border border-green-400 rounded-full px-4 py-1 min-w-[48px]"
						>
							<span
								dir="rtl"
								className="text-green-600 font-bold text-[20px] tracking-widest"
							>
								{colorQuantity}
							</span>
						</div>
						<span className="text-[14px] text-[#535353] mr-2 flex items-center gap-1">
							<span>قطعة</span>
							<span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
						</span>
					</div>
					<div className="flex flex-row-reverse items-end gap-2 bg-[#FFF0F0] border border-[#FFD6D6] rounded-lg px-4 py-2 ml-auto shadow-sm w-fit">
						<svg
							dir="rtl"
							className="w-5 h-5 mr-auto text-[#DF4444] animate-bounce"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M12 9v2m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
							/>
						</svg>
						<span
							dir="rtl"
							className="font-Lato text-[#DF4444] text-right text-[15px] md:text-[17px] font-semibold"
						>
							ملاحظة:{" "}
							<span className="font-normal">
								السعر يختلف حسب الحجم
							</span>
						</span>
					</div>
					<div
						dir="rtl"
						className="flex items-center ml-auto mt-2 bg-gradient-to-l from-[#E0F2FF] to-[#F0F8FF] rounded-xl shadow-md px-4 py-2 border border-[#B6E0FE] animate-pulse w-fit"
					>
						<span
							dir="rtl"
							className="font-Lato font-extrabold text-[28px] text-[#0095FF] rounded-lg px-3 tracking-wider drop-shadow-lg flex items-center gap-2"
						>
							{currentPrice.toFixed(2)}
							<img
								src="/shekl_gray.svg"
								alt="شيكل"
								className="w-6 h-6 mb-[2px] drop-shadow"
							/>
						</span>
						{/* <span className="ml-2 text-[15px] text-[#0095FF] font-Lato font-semibold bg-[#E6F7FF] px-2 py-1 rounded-lg shadow-sm animate-bounce">
					عرض خاص!
				</span> */}
					</div>
					<div className="flex flex-col gap-2 lg:gap-5">
						<span className="mt-3 mb-2 text-[#535353] text-right max-w-[450px]">
							يرجى اختيار القياس
						</span>
						<fieldset className="flex flex-row gap-3 items-center border-0 p-0 m-0">
							<legend className="sr-only">
								اختر القياس
							</legend>
							{product.sizeDetails?.map(
								(sizeDetail) => (
									<label
										key={sizeDetail.sizeName}
										className={`relative flex items-center justify-center cursor-pointer transition-all duration-200 rounded-lg shadow-sm px-4 py-2 min-w-[60px] h-[44px] font-Lato text-[18px] border-2
								${
									selectedSize ===
									sizeDetail.sizeName
										? "border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-200"
										: "border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50"
								}
							`}
										style={{ userSelect: "none" }}
									>
										<input
											type="radio"
											name="size"
											value={sizeDetail.sizeName}
											checked={
												selectedSize ===
												sizeDetail.sizeName
											}
											onChange={() =>
												onSizeSelect(
													sizeDetail.sizeName,
												)
											}
											className="absolute opacity-0 w-0 h-0"
											tabIndex={0}
											aria-label={
												sizeDetail.sizeName
											}
										/>
										<span className="pointer-events-none">
											{sizeDetail.sizeName}
										</span>
										{selectedSize ===
											sizeDetail.sizeName && (
											<span className="absolute -top-2 -left-2 bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md border-2 border-white">
												✓
											</span>
										)}
									</label>
								),
							)}
						</fieldset>
						<span className="mt-5 mb-2 text-[#535353] text-right max-w-[450px]">
							يرجى اختيار اللون
						</span>
						<fieldset className="flex flex-wrap gap-2 justify-start flex-row border-0 p-0 m-0">
							<legend className="sr-only">
								اختر اللون
							</legend>
							{product.colors?.map((color) => (
								<label
									key={color.name}
									className={`relative w-14 h-14 p-1 border-[1px] rounded-lg cursor-pointer object-cover flex items-center justify-center transition ${
										selectedColor === color.name
											? "border-blue-400"
											: "border-[#535353]"
									}`}
									style={{
										boxSizing: "border-box",
									}}
								>
									<input
										type="radio"
										name="color"
										value={color.name}
										checked={
											selectedColor === color.name
										}
										onChange={() =>
											onColorSelect(color.name)
										}
										className="absolute opacity-0 w-0 h-0"
										tabIndex={0}
										aria-label={color.name}
									/>
									<img
										src={color.imgColor}
										onClick={(e) =>
											setMainImage(e.target.value)
										}
										alt={color.name}
										className="w-full h-full object-cover rounded-md pointer-events-none"
									/>
									{selectedColor ===
										color.name && (
										<div className="absolute w-5 h-5 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center right-1 top-1 pointer-events-none">
											<svg
												width="16"
												height="16"
												viewBox="0 0 16 16"
												fill="none"
											>
												<path
													d="M4 8.5L7 11.5L12 5.5"
													stroke="white"
													strokeWidth="2"
													strokeLinecap="round"
													strokeLinejoin="round"
												/>
											</svg>
										</div>
									)}
								</label>
							))}
						</fieldset>
						<span className="mt-5 mb-2 text-[#535353] text-right max-w-[450px]">
							الكمية
						</span>
						<div className="flex flex-row items-center gap-4">
							<div className="flex flex-row-reverse items-center border border-[#E0E0E0] bg-[#FAFAFA] h-[44px] rounded-xl justify-between w-[120px] shadow-sm">
								<button
									type="button"
									onClick={() =>
										onQuantityChange(quantity + 1)
									}
									className="w-10 h-10 flex items-center justify-center text-[#0095FF] text-xl font-bold rounded-lg hover:bg-[#E6F4FF] transition"
									aria-label="زيادة الكمية"
									tabIndex={0}
								>
									+
								</button>
								<input
									type="text"
									name="quantity"
									inputMode="numeric"
									pattern="[0-9]*"
									min={1}
									max={colorQuantity}
									value={quantity}
									onChange={(e) => {
										const val =
											e.target.value.replace(
												/\D/g,
												"",
											);
										const num = parseInt(val, 10);
										if (!isNaN(num))
											onQuantityChange(num);
									}}
									className="font-Lato text-[#232323] text-center text-lg font-semibold select-none w-8 bg-transparent border-none focus:outline-none"
									aria-label="الكمية"
								/>
								<button
									type="button"
									onClick={() =>
										onQuantityChange(
											quantity > 1
												? quantity - 1
												: 1,
										)
									}
									className="w-10 h-10 flex items-center justify-center text-[#DF4444] text-xl font-bold rounded-lg hover:bg-[#FFF0F0] transition"
									aria-label="إنقاص الكمية"
									disabled={quantity <= 1}
									tabIndex={0}
								>
									-
								</button>
							</div>
						</div>
						<button className="bg-black  w-full px-[4px] py-3 flex border-solid  items-center justify-center gap-[4px] flex-row-reverse rounded-sm mx-auto">
							<span
								className="text-white 
					text-[16px] sm:text-[11px] md:text-[12px] lg:text-[13px] xl:text-[14px] 2xl:text-[15px]"
							>
								أضف الى السلة
							</span>
							<img
								src="/shopping_cart_white.svg"
								alt=""
								className="w-[20px] h-[20px]"
							/>
						</button>
					</div>
				</div>
				{/* for sizing */}

				<div
					dir="rtl"
					className="mt-12 lg:mt-0 lg:flex-col justify-between"
				>
					<span className="text-[16px]">
						الابعاد
					</span>
					<img
						src={product.imgSizeChart}
						alt=""
						className="mx-auto max-w-[450px] max-h-[450px] lg:max-w-[550px] lg:max-h-[550px] "
					/>
					<img
						src={product.imgMeasure}
						alt=""
						className="mx-auto"
					/>
				</div>
			</form>
			<div
				dir="rtl"
				className="flex flex-col gap-[12px] mt-12 lg:flex-row"
			>
				<span className="text-2xl lg:text-[16px] font-medium text-black">
					سياساتنا في العمل:
				</span>
				<div className="flex flex-col">
					<span className="text-[#535353] text-[16px] py-3">
						الدفع والتوصيل:
					</span>
					<span className="text-[#535353] text-[14px]">
						ببساطة نقوم بايصال المنتج لغاية منزلك
						وتقوم بدفع الثمن لموظف التوصيل
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-[#535353] text-[16px] py-3">
						التبديل:
					</span>
					<span className="text-[#535353] text-[14px] ">
						ببساطة نقوم بايصال المنتج لغاية منزلك
						وتقوم بدفع الثمن لموظف التوصيل
					</span>
				</div>
				<div className="flex flex-col">
					<span className="text-[#535353] text-[16px] py-3">
						الغاء الطلب:
					</span>
					<span className="text-[#535353] text-[14px] ">
						ببساطة نقوم بايصال المنتج لغاية منزلك
						وتقوم بدفع الثمن لموظف التوصيل
					</span>
				</div>
			</div>
		</div>
	);
}

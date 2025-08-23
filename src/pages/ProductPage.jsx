import { useProductPage } from "@/hooks/useProductPageRedux";
import React, {
	useState,
	useEffect,
	useRef,
} from "react";
import ProductSlider from "@/components/ProductSlider";
import { Column, Row } from "@/lib/css/Product";
import { useCategoryProducts } from "@/hooks/useCategoryProducts";
import { RxSize } from "react-icons/rx";
import { useCart } from "@/hooks/useCartRedux";
import { useToastContext } from "@/components/ui/toast";
import { MdAddShoppingCart } from "react-icons/md";

export default function ProductPage() {
	const {
		product,
		selectedColor,
		setSelectedColor,
		selectedSize,
		setSelectedSize,
		quantity,
		handleQuantityChange,
		loading,
		error,
	} = useProductPage();

	const { addItem } = useCart();
	const { addToast } = useToastContext();
	const [MainImage, setMainImage] = useState();

	const handleColorSelect = (colorName) => {
		setSelectedColor(colorName);
		setMainImage(null);
	};

	const handleAddToCart = () => {
		if (
			!product ||
			!selectedColor ||
			!selectedSize
		) {
			addToast({
				title: "خطأ في الاختيار",
				description: "يرجى اختيار اللون والحجم",
			});
			return;
		}

		// Find the selected color object
		const selectedColorObj = product.colors?.find(
			(c) => c.name === selectedColor,
		);

		// Find the selected size details
		const selectedSizeDetail =
			product.sizeDetails?.find(
				(s) => s.sizeName === selectedSize,
			);

		if (!selectedSizeDetail) {
			addToast({
				title: "خطأ في المقاس",
				description: "حجم غير صحيح",
			});
			return;
		}

		// Get available sizes and colors arrays like ProductSlider does
		const availableSizes =
			product.sizeDetails?.map(
				(size) => size.sizeName,
			) || [];
		const availableColors =
			product.colors?.map(
				(color) => color.name,
			) || [];

		// Create cart item with same structure as ProductSlider
		const cartItem = {
			...product, // Spread all product data first
			productId: product.id,
			sizeName: selectedSize,
			colorName: selectedColor,
			quantity: quantity, // ProductSlider uses "quantity"
			qty: quantity, // Also keep "qty" for compatibility
			image:
				selectedColorObj?.imgColor ||
				product.imgCover,
			price: selectedSizeDetail.price,
			availableSizes,
			availableColors,
		};

		addItem(cartItem);
		addToast({
			title: "تمت الإضافة!",
			description: `تم إضافة المنتج (${product.name}) إلى السلة بنجاح.`,
		});
	};

	if (error) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<p className="text-red-500">{error}</p>
				<p className="mt-2 text-gray-600">
					Redirecting to home page...
				</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center min-h-screen">
				<p className="text-gray-500">
					Loading product...
				</p>
			</div>
		);
	}

	if (!product) {
		return null;
	}

	return (
		<div>
			<div className="relative flex flex-col gap-2 justify-center m-[16px] lg:mt-16">
				<Description
					MainImage={MainImage}
					setMainImage={setMainImage}
					product={product}
					selectedColor={selectedColor}
					selectedSize={selectedSize}
					quantity={quantity}
					onColorSelect={handleColorSelect}
					onSizeSelect={setSelectedSize}
					onQuantityChange={handleQuantityChange}
					onAddToCart={handleAddToCart}
				/>
			</div>
			<LikeProduct product={product} />
			<VideoDraggable />
		</div>
	);
}
function Photos({ product, selectedColor }) {
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
		...new Set([
			...productImages,
			...colorImages,
		]),
	];

	// State for current image index
	const [
		currentImageIndex,
		setCurrentImageIndex,
	] = useState(0);

	// Get current image to display
	const currentImage =
		allThumbnails[currentImageIndex] || mainImage;

	// Navigation functions
	const goToNext = (e) => {
		e.preventDefault(); // Prevent form submission
		e.stopPropagation(); // Stop event bubbling
		setCurrentImageIndex((prev) =>
			prev === allThumbnails.length - 1
				? 0
				: prev + 1,
		);
	};

	const goToPrevious = (e) => {
		e.preventDefault(); // Prevent form submission
		e.stopPropagation(); // Stop event bubbling
		setCurrentImageIndex((prev) =>
			prev === 0
				? allThumbnails.length - 1
				: prev - 1,
		);
	};

	// Touch/swipe functionality
	const [touchStart, setTouchStart] =
		useState(null);
	const [touchEnd, setTouchEnd] = useState(null);

	const minSwipeDistance = 50;

	const onTouchStart = (e) => {
		e.preventDefault(); // Prevent default browser behavior
		setTouchEnd(null);
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e) => {
		e.preventDefault(); // Prevent default browser behavior
		setTouchEnd(e.targetTouches[0].clientX);
	};

	const onTouchEnd = (e) => {
		e.preventDefault(); // Prevent default browser behavior
		if (!touchStart || !touchEnd) return;

		const distance = touchStart - touchEnd;
		const isLeftSwipe =
			distance > minSwipeDistance;
		const isRightSwipe =
			distance < -minSwipeDistance;

		if (isLeftSwipe) {
			goToNext(e);
		}
		if (isRightSwipe) {
			goToPrevious(e);
		}
	};

	const handleColorImageClick = (colorImage) => {
		const imageIndex = allThumbnails.findIndex(
			(img) => img === colorImage,
		);
		if (imageIndex !== -1) {
			setCurrentImageIndex(imageIndex);
		}
	};

	useEffect(() => {
		window.updateCarouselImage =
			handleColorImageClick;
		return () => {
			delete window.updateCarouselImage;
		};
	}, [allThumbnails]);

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === "ArrowLeft") {
				goToPrevious(e);
			} else if (e.key === "ArrowRight") {
				goToNext(e);
			}
		};

		window.addEventListener(
			"keydown",
			handleKeyDown,
		);
		return () =>
			window.removeEventListener(
				"keydown",
				handleKeyDown,
			);
	}, []);

	return (
		<div className="relative w-full lg:w-1/2">
			<div
				className="relative w-full h-[400px] lg:h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden"
				onTouchStart={onTouchStart}
				onTouchMove={onTouchMove}
				onTouchEnd={onTouchEnd}
				onMouseDown={(e) => e.preventDefault()}
			>
				<img
					src={currentImage}
					alt={`${product.name} - صورة ${
						currentImageIndex + 1
					}`}
					className="w-full h-full object-contain p-4 transition-all duration-300"
				/>

				{allThumbnails.length > 1 && (
					<>
						<button
							onClick={goToPrevious}
							className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
							aria-label="الصورة السابقة"
						>
							<svg
								className="w-6 h-6 group-hover:text-blue-600 transition-colors"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M15 19l-7-7 7-7"
								/>
							</svg>
						</button>

						<button
							onClick={goToNext}
							className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110 group"
							aria-label="الصورة التالية"
						>
							<svg
								className="w-6 h-6 group-hover:text-blue-600 transition-colors"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M9 5l7 7-7 7"
								/>
							</svg>
						</button>
					</>
				)}

				{/* Swipe Indicator (only on mobile) */}
				{/* {allThumbnails.length > 1 && (
					<div className="lg:hidden absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-xs">
						اسحب للتنقل
					</div>
				)} */}
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
	onAddToCart,
	setMainImage,
	MainImage,
}) {
	const [openDimensions, setOpenDimensions] =
		useState(false);
	// Ref to access Photos component functions
	const photosRef = useRef(null);
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

	// Check if product has different prices for different sizes
	const hasDifferentPrices = () => {
		if (
			!product.sizeDetails ||
			product.sizeDetails.length <= 1
		) {
			return false;
		}
		const firstPrice =
			product.sizeDetails[0]?.price;
		return product.sizeDetails.some(
			(size) => size.price !== firstPrice,
		);
	};

	return (
		<div className="relative mx-2 md:mx-0 mt-16 lg:mt-0">
			<form
				dir="rtl"
				className="flex lg:flex-row flex-col gap-8 mx-auto"
			>
				<Column className="w-full gap-4">
					<Row className="lg:gap-8 flex-col lg:flex-row w-full ">
						<Photos
							product={product}
							selectedColor={selectedColor}
							MainImage={MainImage}
							setMainImage={setMainImage}
							ref={photosRef}
						/>

						<Column className="gap-8">
							<Column className="gap-4">
								<Row className="justify-between items-center">
									<span
										dir="rtl"
										className="font-Lato text-2xl lg:text-2xl font-bold text-slate-800 dark:text-white ml-auto"
									>
										{product.name}
									</span>
								</Row>

								<span
									dir="rtl"
									className="text-[16px] text-[#3e3e3e] dark:text-gray-400 ml-auto"
								>
									{product.description}
								</span>
								<span
									dir="rtl"
									className="font-NotoSerif font-semibold  text-4xl dark:text-white text-slate-800 rounded-lg tracking-wider drop-shadow-lg flex gap-2"
								>
									<span className="font-Lato text-[18px] font-semibold text-[#2c2c2c] dark:text-white">
										السعر :
									</span>
									<img
										src="/Layer_1.svg"
										alt="شيكل"
										className="w-4 h-4 self-end  drop-shadow"
									/>
									{currentPrice}
								</span>
							</Column>
							{hasDifferentPrices() && (
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
							)}

							<div className="flex flex-col gap-4 lg:gap-8">
								<fieldset className="flex flex-row flex-wrap gap-3 items-center border-0 p-0 m-0">
									<span className="mt-3 mb-2 text-black dark:text-white ml-2 text-right max-w-[450px]">
										القياس :
									</span>

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
												style={{
													userSelect: "none",
												}}
											>
												<input
													type="radio"
													name="size"
													value={
														sizeDetail.sizeName
													}
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
									{product.imgSizeChart &&
										product.imgMeasure && (
											<button
												type="button"
												onClick={(e) => {
													e.preventDefault();
													e.stopPropagation();
													setOpenDimensions(true);
												}}
												className="flex w-fit items-center gap-2 px-3 py-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 rounded-lg transition-all duration-200 text-sm font-medium border border-blue-200 dark:border-blue-800 shadow-sm hover:shadow-md"
											>
												<RxSize className="w-4 h-4" />
												<span>
													اضغط هنا لمعرفة مقاسك
												</span>
											</button>
										)}
								</fieldset>

								<fieldset className="flex flex-wrap gap-2 items-center justify-start flex-row border-0 p-0 m-0">
									<span className="mt-2 mb-2 text-black ml-2 dark:text-white text-right max-w-[450px]">
										اللون :
									</span>

									{product.colors?.map(
										(color) => (
											<div
												key={color.name}
												className="flex flex-col items-center gap-1"
											>
												<div
													className={`relative w-14 h-14 p-1 border-[1px] rounded-lg cursor-pointer object-cover flex items-center justify-center transition ${
														selectedColor ===
														color.name
															? "border-blue-400"
															: "border-[#535353]"
													}`}
													style={{
														boxSizing:
															"border-box",
													}}
													onClick={(e) => {
														e.preventDefault();
														e.stopPropagation();

														// Change selected color
														onColorSelect(
															color.name,
														);

														// Update carousel to show this color image
														if (
															window.updateCarouselImage
														) {
															window.updateCarouselImage(
																color.imgColor,
															);
														}
													}}
												>
													<input
														type="radio"
														name="color"
														value={color.name}
														checked={
															selectedColor ===
															color.name
														}
														onChange={() =>
															onColorSelect(
																color.name,
															)
														}
														className="absolute opacity-0 w-0 h-0"
														aria-label={
															color.name
														}
													/>
													<img
														src={color.imgColor}
														alt={color.name}
														className="w-full h-full object-cover rounded-md"
													/>
													{selectedColor ===
														color.name && (
														<div className="absolute w-5 h-5 rounded-full bg-blue-400 border-2 border-white flex items-center justify-center right-1 top-1">
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
												</div>
												<span className="text-xs text-center text-black dark:text-white max-w-[56px] truncate">
													{color.name}
												</span>
											</div>
										),
									)}
								</fieldset>
								<div className="flex flex-row items-center gap-2 my-2">
									<span
										dir="rtl"
										className="text-[18px] font-medium text-black dark:text-white"
									>
										المتوفر :
									</span>
									<div
										dir="rtl"
										className="flex items-center justify-center bg-green-100 border border-green-400 rounded-full px-4 py-1 min-w-[48px]"
									>
										<span
											dir="rtl"
											className="text-green-600 font-bold text-[20px] tracking-widest"
										>
											{colorQuantity} قطع
										</span>
									</div>
									<span className="text-[14px] text-black dark:text-white mr-2 flex items-center gap-1"></span>
								</div>

								<div className="flex flex-row items-center justify-center gap-2">
									<div className="flex flex-row-reverse  w-1/2 max-w-[150px] items-center border border-[#E0E0E0] bg-[#FAFAFA]  rounded-lg justify-between shadow-sm h-[44px]">
										<button
											type="button"
											onClick={() =>
												onQuantityChange(
													quantity + 1,
												)
											}
											className="w-10 h-10  p-[4px] py-3 flex items-center justify-center text-[#0095FF] text-xl font-bold rounded-lg hover:bg-[#E6F4FF] transition"
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
												const num = parseInt(
													val,
													10,
												);
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
									<button
										type="button"
										onClick={onAddToCart}
										className="bg-[#fefefe] w-1/2 dark:bg-gradient-to-r dark:from-blue-900 dark:to-blue-700  p-[4px] py-3 flex border-solid border-2 border-[#ecebebf0] dark:border-blue-800 items-center justify-center gap-[4px] flex-row-reverse rounded-lg  shadow hover:bg-blue-50 dark:hover:bg-blue-800/80 transition-colors group h-[44px]"
									>
										<span className="text-black font-Lato dark:text-white dark:group-hover:text-white transition-colors">
											أضف الى السلة
										</span>
										<MdAddShoppingCart className="w-5 h-5 text-blue-600 dark:text-white group-hover:fill-blue-600 dark:group-hover:fill-white  dark:fill-white  transition-colors" />
									</button>
								</div>
							</div>
						</Column>
					</Row>
					{product.imgSizeChart &&
						product.imgMeasure && (
							<Dimensions
								product={product}
								openDimensions={openDimensions}
								setOpenDimensions={
									setOpenDimensions
								}
							/>
						)}
				</Column>
				{/* for name and photos and disc */}
			</form>
			<Column
				dir="rtl"
				className="lg:flex-row p-4 justify-center mx-auto gap-10  border-y mt-4 border-gray-200 dark:border-gray-700"
			>
				<div className="flex flex-col w-64 mx-auto items-center justify-center">
					<img
						src="/okOrder.svg"
						alt=""
						className="w-20 h-20 text-blue"
					/>
					<Row>
						<span className="text-[#535353] font-semibold dark:text-white text-[20px] py-3">
							الدفع والتوصيل:
						</span>
					</Row>
					<span className=" text-center  text-gray-500 dark:text-gray-300 text-[14px]">
						ببساطة نقوم بايصال المنتج لغاية منزلك
						وتقوم بدفع الثمن لموظف التوصيل.
					</span>
				</div>
				<div className="flex flex-col w-64 mx-auto items-center justify-center">
					<img
						src="/return.svg"
						alt=""
						className="w-20 h-20"
					/>
					<span className="text-[#535353] font-semibold dark:text-white text-[20px] py-3">
						التبديل:
					</span>
					<span className="text-gray-500 text-center dark:text-gray-300 text-[14px] ">
						تواصل معنا عبر رسائل الواتس اب لإتمام
						عملية التبديل و نقوم بايصال المنتج ل
						باب منزلك مع دفع أجرة التوصيل .
					</span>
				</div>
				<div className="flex flex-col w-64 mx-auto items-center justify-center">
					<img
						src="/offOrder.svg"
						alt=""
						className="w-20 h-20"
					/>
					<span className="text-[#535353] font-semibold dark:text-white text-[20px] py-3">
						الغاء الطلب:
					</span>
					<span className="text-gray-500 text-center dark:text-gray-300 text-[14px] ">
						بعد إتمام طلبك و اردت إلغاء الطلب
						تواصل معنا عبر الواتس اب ل إلغاء الطلب
					</span>
				</div>
			</Column>
		</div>
	);
}

function LikeProduct({ product }) {
	const limit = 10;
	const {
		data: products = [],
		isLoading: productsLoading,
		error: productsError,
	} = useCategoryProducts(
		product.category.id,
		product.subCategory.id,
		limit,
	);

	return (
		<Column className="mr-4">
			<span
				dir="rtl"
				className="text-2xl lg:text-[16px] font-medium text-black dark:text-white"
			>
				المنتجات المشابهة
			</span>
			<ProductSlider
				products={products}
				subCategoryId={product.subCategory.id}
				categoryId={product.category.id}
				likeProduct={true}
			/>
		</Column>
	);
}

function Dimensions({
	product,
	openDimensions = true,
	setOpenDimensions,
}) {
	if (
		!product.imgSizeChart &&
		!product.imgMeasure
	)
		return null;
	return (
		<div
			className={`fixed top-0 left-0 w-full h-screen bg-black/50 z-50 transition-all duration-300 flex items-center justify-center ${
				openDimensions
					? "opacity-100 pointer-events-auto"
					: "opacity-0 pointer-events-none"
			}`}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				setOpenDimensions(false);
			}}
		>
			<div
				className="h-[90vh] max-w-[400px] max-h-[600px] bg-white dark:bg-gray-900 rounded-t-3xl md:rounded-3xl p-4 w-[90%] shadow-2xl border-0 md:border border-gray-200 dark:border-gray-800 overflow-hidden relative"
				onClick={(e) => e.stopPropagation()}
			>
				{/* Close button */}
				<button
					onClick={(e) => {
						e.preventDefault();
						e.stopPropagation();
						setOpenDimensions(false);
					}}
					className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors z-10"
				>
					<svg
						className="w-5 h-5 text-gray-600 dark:text-gray-500"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>

				<div
					dir="rtl"
					className="flex flex-col justify-center items-center h-full gap-4"
				>
					{product.imgSizeChart && (
						<img
							src={product.imgSizeChart}
							alt="جدول المقاسات"
							className="max-w-full max-h-[45%] object-contain"
						/>
					)}
					{product.imgMeasure && (
						<img
							src={product.imgMeasure}
							alt="دليل القياسات"
							className="max-w-full max-h-[45%] object-contain"
						/>
					)}
				</div>
			</div>
		</div>
	);
}

function VideoDraggable() {
	const [position, setPosition] = useState({
		x: 0,
		y: 96,
	}); // Initial position (top-24 = 96px)
	const [isDragging, setIsDragging] =
		useState(false);
	const [dragStart, setDragStart] = useState({
		x: 0,
		y: 0,
	});
	const [isVisible, setIsVisible] =
		useState(true);

	const handleMouseDown = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
		setDragStart({
			x: e.clientX - position.x,
			y: e.clientY - position.y,
		});
		// Prevent page scrolling while dragging
		document.body.style.overflow = "hidden";
	};

	const handleMouseMove = (e) => {
		if (!isDragging) return;
		e.preventDefault();
		e.stopPropagation();

		setPosition({
			x: e.clientX - dragStart.x,
			y: e.clientY - dragStart.y,
		});
	};

	const handleMouseUp = () => {
		setIsDragging(false);
		// Restore page scrolling
		document.body.style.overflow = "";
	};

	const handleTouchStart = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const touch = e.touches[0];
		setIsDragging(true);
		setDragStart({
			x: touch.clientX - position.x,
			y: touch.clientY - position.y,
		});
		// Prevent page scrolling while dragging
		document.body.style.overflow = "hidden";
	};

	const handleTouchMove = (e) => {
		if (!isDragging) return;
		e.preventDefault();
		e.stopPropagation();

		const touch = e.touches[0];
		setPosition({
			x: touch.clientX - dragStart.x,
			y: touch.clientY - dragStart.y,
		});
	};

	const handleTouchEnd = () => {
		setIsDragging(false);
		// Restore page scrolling
		document.body.style.overflow = "";
	};

	const handleClose = (e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsVisible(false);
	};

	useEffect(() => {
		if (isDragging) {
			document.addEventListener(
				"mousemove",
				handleMouseMove,
				{ passive: false },
			);
			document.addEventListener(
				"mouseup",
				handleMouseUp,
			);
			document.addEventListener(
				"touchmove",
				handleTouchMove,
				{ passive: false },
			);
			document.addEventListener(
				"touchend",
				handleTouchEnd,
			);
		}

		return () => {
			document.removeEventListener(
				"mousemove",
				handleMouseMove,
			);
			document.removeEventListener(
				"mouseup",
				handleMouseUp,
			);
			document.removeEventListener(
				"touchmove",
				handleTouchMove,
			);
			document.removeEventListener(
				"touchend",
				handleTouchEnd,
			);
			// Ensure overflow is restored when component unmounts
			document.body.style.overflow = "";
		};
	}, [isDragging, dragStart]);

	// Clean up on unmount
	useEffect(() => {
		return () => {
			document.body.style.overflow = "";
		};
	}, []);

	if (!isVisible) return null;

	return (
		<div
			className={`w-auto h-auto bg-red-500 fixed z-50 cursor-move select-none rounded-lg ${
				isDragging ? "opacity-80" : ""
			}`}
			style={{
				left: `${position.x}px`,
				top: `${position.y}px`,
				transform: isDragging
					? "scale(1.05)"
					: "scale(1)",
				transition: isDragging
					? "none"
					: "transform 0.2s ease",
				touchAction: "none", // Prevent touch gestures
			}}
			onMouseDown={handleMouseDown}
			onTouchStart={handleTouchStart}
		>
			{/* Close button */}
			<button
				onClick={handleClose}
				className="absolute -top-2 -right-2 w-6 h-6 bg-white hover:bg-gray-100 rounded-full shadow-md flex items-center justify-center cursor-pointer"
			>
				<svg
					className="w-4 h-4 text-gray-600"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M6 18L18 6M6 6l12 12"
					/>
				</svg>
			</button>

			<video
				src="/video.mp4"
				autoPlay
				loop
				muted
				playsInline
				className="w-30 h-40 rounded-lg object-contain"
			/>
		</div>
	);
}

import Header from "./../components/Header";
import Footer from "./../components/footer";
import Category from "../components/category";
import ProductSlider from "./../components/product";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import SideBar from "@/components/SideBar";
import { useState, useEffect } from "react";
import { Product } from "@/api/productAPI";
import React from "react";
import SecondaryHeader from "@/components/SeconderyHeader";
import StoryBar from "@/components/StoryBar";
import StoryModal from "@/components/StoryModal";

// Utility to prefix image URLs
function prefixImgUrl(url) {
	if (!url) return "";
	if (url.startsWith("http")) return url;
	return `https://api.rabbit.ps/uploads/${url}`;
}

const demoStories = [
	{
		id: 1,
		user: {
			name: "Alice",
			avatar:
				"https://api.rabbit.ps/uploads/products/حمالة_صدر_كتف_عريض_01/colors/eef7fb9a-949f-4998-98f7-454c271a4435.jpg",
		},
		content: {
			type: "image",
			url: "https://api.rabbit.ps/uploads/products/حمالة_صدر_كتف_عريض_01/colors/eef7fb9a-949f-4998-98f7-454c271a4435.jpg",
		},
		liked: false,
	},
	{
		id: 2,
		user: {
			name: "Bob",
			avatar:
				"https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		content: {
			type: "image",
			url: "https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		liked: false,
	},
	{
		id: 3,
		user: {
			name: "Carol",
			avatar:
				"https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		content: {
			type: "image",
			url: "https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		liked: false,
	},
	{
		id: 5,
		user: {
			name: "Carol",
			avatar:
				"https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		content: {
			type: "image",
			url: "./1600.jpg",
		},
		liked: false,
	},
	{
		id: 4,
		user: {
			name: "Carol",
			avatar:
				"https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		content: {
			type: "image",
			url: "https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		liked: false,
	},
	{
		id: 4,
		user: {
			name: "Carol",
			avatar:
				"https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		content: {
			type: "image",
			url: "https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		liked: false,
	},
	{
		id: 6,
		user: {
			name: "Carol",
			avatar:
				"https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		content: {
			type: "image",
			url: "https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		liked: false,
	},
	{
		id: 7,
		user: {
			name: "Carol",
			avatar:
				"https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		content: {
			type: "image",
			url: "https://api.rabbit.ps/uploads/products/%D8%A8%D8%AC%D8%A7%D9%85%D8%A9_%D8%AB%D9%84%D8%A7%D8%AB_%D9%82%D8%B7%D8%B9_018/colors/7f69d9e5-4852-465c-a3ac-a08632e9e4fd.jpg",
		},
		liked: false,
	},
];

export default function Home() {
	const [Menubar, setMenubar] = useState(false);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [stories, setStories] =
		useState(demoStories);
	const [openStory, setOpenStory] =
		useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			setError(null);
			try {
				const response = await Product.getAll();
				let fetchedProducts =
					response?.data || [];
				// Prefix all image URLs for each product
				fetchedProducts = fetchedProducts.map(
					(product) => {
						const images = (
							product.images || []
						).map(prefixImgUrl);
						const imgCover = prefixImgUrl(
							product.imgCover,
						);
						const imgSizeChart = prefixImgUrl(
							product.imgSizeChart,
						);
						const imgMeasure = prefixImgUrl(
							product.imgMeasure,
						);
						const colors = (
							product.colors || []
						).map((c) => ({
							...c,
							imgColor: prefixImgUrl(c.imgColor),
						}));
						const sizeDetails = (
							product.sizeDetails || []
						).map((s) => ({
							...s,
							quantities: (
								s.quantities || []
							).map((q) => ({ ...q })),
						}));
						return {
							...product,
							images,
							imgCover,
							imgSizeChart,
							imgMeasure,
							colors,
							sizeDetails,
						};
					},
				);
				setProducts(fetchedProducts);
				// eslint-disable-next-line no-unused-vars
			} catch (err) {
				setError("فشل في جلب المنتجات.");
			} finally {
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	// Group products by category
	// Group products by both category and subcategory for each product
	// Group products by subcategory, and include categoryId and subCategoryId for each group
	const groupedProducts = products.reduce(
		(acc, product) => {
			const categoryId =
				product.category?.id || "غير مصنف";
			const categoryName =
				product.category?.name || "غير مصنف";
			const subCategoryId =
				product.subCategory?.id ||
				product.subCategoryId ||
				"غير مصنف";
			const subCategoryName =
				product.subCategory?.name ||
				product.subCategory ||
				"غير مصنف";

			// Use subCategoryId as the key if available, otherwise subCategoryName
			const groupKey =
				subCategoryId !== "غير مصنف"
					? subCategoryId
					: subCategoryName;

			if (!acc[groupKey]) {
				acc[groupKey] = {
					categoryId,
					categoryName,
					subCategoryId,
					subCategoryName,
					products: [],
				};
			}
			acc[groupKey].products.push(product);
			// Removed invalid debug statement
			return acc;
		},
		{},
	);

	const handleOpenStory = (story) =>
		setOpenStory(story);
	const handleCloseStory = () =>
		setOpenStory(null);
	const handleLike = (id) => {
		setStories((prev) =>
			prev.map((s) =>
				s.id === id
					? { ...s, liked: !s.liked }
					: s,
			),
		);
		if (openStory && openStory.id === id) {
			setOpenStory((prev) => ({
				...prev,
				liked: !prev.liked,
			}));
		}
	};

	return (
		<>
			<Header
				Menubar={Menubar}
				setMenubar={setMenubar}
			/>
			<SecondaryHeader />
			<StoryBar
				stories={stories}
				onOpenStory={handleOpenStory}
			/>
			{openStory && (
				<StoryModal
					story={openStory}
					onClose={handleCloseStory}
					onLike={handleLike}
				/>
			)}
			{!Menubar && (
				<>
					<Announcement />
					<NoteScrolling />

					{
						// loading ? (
						// 	<div className="flex justify-center items-center min-h-[200px]">
						// 		<span className="text-gray-500">
						// 			جاري تحميل المنتجات...
						// 		</span>
						// 	</div>
						// ) :
						error ? (
							<div className="flex justify-center items-center min-h-[200px]">
								<span className="text-red-500">
									{error}
								</span>
							</div>
						) : (
							Object.entries(groupedProducts).map(
								([groupKey, group]) => (
									<React.Fragment key={groupKey}>
										<div className="lg:mx-12 mb-8">
											<Category
												name={
													group.subCategoryName
												}
												idSub={
													group.subCategoryId
												}
												idCat={group.categoryId}
												all={true}
											/>
											<ProductSlider
												products={group.products}
												subCategoryId={
													group.subCategoryId
												}
												subCategoryName={
													group.subCategoryName
												}
												categoryId={
													group.categoryId
												}
												categoryName={
													group.categoryName
												}
											/>
										</div>
									</React.Fragment>
								),
							)
						)
					}
				</>
			)}
			<Footer />
			<SideBar Menubar={Menubar} />
		</>
	);
}

export function Announcement() {
	return (
		<div className="bg-[#E04444] text-white text-center text-sm py-2 px-4 font-Lato">
			التوصيل مجانا ولفترة محدودة لجميع انحاء
			الضفة
		</div>
	);
}

function NoteScrolling() {
	const images = ["/1600.jpg", "/whitehero.jpg"];
	const [current, setCurrent] = React.useState(0);

	const goTo = (idx) => setCurrent(idx);
	const prev = () =>
		setCurrent(
			(prev) =>
				(prev - 1 + images.length) %
				images.length,
		);
	const next = () =>
		setCurrent(
			(prev) => (prev + 1) % images.length,
		);

	return (
		<div className="w-full flex items-center justify-center px-4 py-2 xl:px-32">
			<div className="relative w-full">
				<div className="w-full h-48 sm:h-64 md:h-80 lg:h-[32rem] rounded-3xl shadow-xl bg-gradient-to-r from-white/80 to-purple-100 flex items-center justify-center overflow-hidden">
					{images.map((src, idx) => (
						<img
							key={idx}
							src={src}
							alt={`Promotion Banner ${idx + 1}`}
							className={`w-full h-full absolute top-0 left-0 transition-opacity duration-700 ease-in-out ${
								current === idx
									? "opacity-100 z-10"
									: "opacity-0 z-0"
							}`}
							loading="lazy"
						/>
					))}
				</div>
				{/* Navigation Arrows */}
				<button
					className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-20"
					onClick={prev}
					aria-label="Previous slide"
				>
					<svg
						width="24"
						height="24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path d="M15 19l-7-7 7-7" />
					</svg>
				</button>
				<button
					className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white shadow-md rounded-full p-2 z-20"
					onClick={next}
					aria-label="Next slide"
				>
					<svg
						width="24"
						height="24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
						viewBox="0 0 24 24"
					>
						<path d="M9 5l7 7-7 7" />
					</svg>
				</button>
				{/* Dots */}
				<div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
					{images.map((_, idx) => (
						<button
							key={idx}
							onClick={() => goTo(idx)}
							className={`w-3 h-3 rounded-full transition-all duration-300 border-2 ${
								current === idx
									? "bg-purple-500 border-purple-500 scale-125"
									: "bg-white border-gray-300"
							}`}
							aria-label={`Go to slide ${
								idx + 1
							}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

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

// Utility to prefix image URLs
function prefixImgUrl(url) {
	if (!url) return "";
	if (url.startsWith("http")) return url;
	return `https://api.rabbit.ps/uploads/${url}`;
}

export default function Home() {
	const [Menubar, setMenubar] = useState(false);
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	return (
		<>
			<Header
				Menubar={Menubar}
				setMenubar={setMenubar}
			/>
			<SecondaryHeader />
			{!Menubar && (
				<>
					<Announcement />
					<NoteScrolling />
					{loading ? (
						<div className="flex justify-center items-center min-h-[200px]">
							<span className="text-gray-500">
								جاري تحميل المنتجات...
							</span>
						</div>
					) : error ? (
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
											name={group.subCategoryName}
											idSub={group.subCategoryId}
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
					)}
				</>
			)}
			<Footer />
			<SideBar Menubar={Menubar} />
		</>
	);
}

export function Announcement() {
	return (
		<div className="bg-[#E04444] mb-2 text-white text-center text-sm py-2 px-4 font-Lato">
			التوصيل مجانا ولفترة محدودة لجميع انحاء
			الضفة
		</div>
	);
}

function NoteScrolling() {
	return (
		<div className="w-full flex items-center justify-center px-4">
			<Carousel
				opts={{
					align: "center",
					loop: true,
				}}
				className="w-full max-w-lg sm:max-w-xl md:max-w-3xl"
			>
				<CarouselContent>
					{Array.from({ length: 3 }).map(
						(_, index) => (
							<CarouselItem
								key={index}
								className="w-full basis-full"
							>
								<div className="w-full h-auto">
									<img
										src={`/note.png`}
										alt="Promotion Banner"
										className="w-full h-auto object-contain"
										loading="lazy"
									/>
								</div>
							</CarouselItem>
						),
					)}
				</CarouselContent>
				<CarouselPrevious className="left-2" />
				<CarouselNext className="right-2" />
			</Carousel>
		</div>
	);
}

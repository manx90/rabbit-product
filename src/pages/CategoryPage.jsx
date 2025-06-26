import { useState, useEffect } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Product } from "@/components/product";
import { Announcement } from "./Home";
import {
	useParams,
	Link,
} from "react-router-dom";
import { Product as ProductAPI } from "@/api/productAPI";
import { Category as CategoryAPI } from "@/api/cateogryApi";

// Utility to prefix image URLs
function prefixImgUrl(url) {
	if (!url) return "";
	if (url.startsWith("http")) return url;
	return `https://api.rabbit.ps/uploads/${url}`;
}

export default function CategoryPage() {
	const { categoryId, subcategoryId } =
		useParams();
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [subcategories, setSubcategories] =
		useState([]);

	// Fetch subcategories for the current category
	useEffect(() => {
		const fetchSubcategories = async () => {
			if (!categoryId) return;
			try {
				const response = await CategoryAPI.getOne(
					categoryId,
				);
				const subs =
					response?.subCategories || [];
				const normalized = subs.map((sub) => ({
					id: sub.id || sub._id || sub,
					name: sub.name || sub,
				}));
				console.log(subs);
				setSubcategories(normalized);
			} catch (err) {
				setSubcategories([]);
			}
		};
		fetchSubcategories();
	}, [categoryId]);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			setError(null);
			try {
				const params = { categoryId };
				if (subcategoryId)
					params.subCategory = subcategoryId;
				const response = await ProductAPI.getAll(
					params,
				);
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
			} catch (err) {
				setError("فشل في جلب المنتجات.");
			} finally {
				setLoading(false);
			}
		};
		if (categoryId) fetchProducts();
	}, [categoryId, subcategoryId]);

	// Filtered products (already filtered by API, but keep for future logic)
	const filteredProducts = products;

	return (
		<div className="flex flex-col align-center">
			<Header />
			<Announcement />

			<div className="lg:mx-24">
				<div dir="rtl" className="px-4 py-2">
					<div className="flex flex-row flex-wrap overflow-auto gap-2">
						{subcategories.map((subcategory) => (
							<Link
								key={`${categoryId}-${subcategory.id}`}
								to={`/category/${categoryId}/${subcategory.id}`}
								className={`text-[13px] px-4 py-2 border rounded-[12px] transition-colors self-auto ${
									subcategoryId ===
									String(subcategory.id)
										? "border-blue-500 text-blue-500 bg-blue-50"
										: "border-gray-300 hover:border-blue-500 hover:text-blue-500"
								}`}
							>
								{subcategory.name}
							</Link>
						))}
					</div>
				</div>

				{/* Products */}
				<div
					dir="rtl"
					className="grid grid-cols-2 md:flex md:flex-wrap p-1 gap-2 w-fit m-auto "
				>
					{loading ? (
						<div className="text-center w-full">
							جاري تحميل المنتجات...
						</div>
					) : error ? (
						<div className="text-center w-full text-red-500">
							{error}
						</div>
					) : filteredProducts.length === 0 ? (
						<div className="text-center w-full">
							لا توجد منتجات في هذا القسم.
						</div>
					) : (
						filteredProducts.map(
							(product, index) => (
								<Product
									key={product.id || index}
									product={product}
								/>
							),
						)
					)}
				</div>
			</div>

			<Footer />
		</div>
	);
}

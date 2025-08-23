import { Product } from "@/components/ProductSlider";
import { Announcement } from "./Home";
import {
	useParams,
	Link,
} from "react-router-dom";
import { useSubcategories } from "@/hooks/useSubcategories";
import { useCategoryProducts } from "@/hooks/useCategoryProducts";

export default function CategoryPage() {
	const { categoryId, subcategoryId } =
		useParams();

	// Use React Query hooks instead of useEffect
	const {
		data: subcategories = [],
		isLoading: subcategoriesLoading,
		error: subcategoriesError,
	} = useSubcategories(categoryId);

	const {
		data: products = [],
		isLoading: productsLoading,
		error: productsError,
	} = useCategoryProducts(
		categoryId,
		subcategoryId,
	);

	// Show loading state
	const isLoading =
		subcategoriesLoading || productsLoading;
	const error =
		subcategoriesError || productsError;

	return (
		<>
			<Announcement />

			<div className="lg:mx-24">
				<div dir="rtl" className="px-4 py-2">
					<div className="flex flex-row overflow-x-auto lg:justify-center gap-2 custom-scrollbar px-4 lg:px-0">
						{subcategories.map((subcategory) => (
							<Link
								key={`${categoryId}-${subcategory.id}`}
								to={`/category/${categoryId}/${subcategory.id}`}
								className={`text-[13px]  max-w-fit min-w-fit px-4 py-2 border rounded-[12px] transition-colors self-auto ${
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
					// dir="rtl"
					className="grid grid-cols-2 md:flex md:flex-wrap p-1 gap-2 w-fit m-auto justify-center items-center"
				>
					{isLoading ? (
						<div className="text-center w-full">
							جاري تحميل المنتجات...
						</div>
					) : error ? (
						<div className="text-center w-full text-red-500">
							{error?.message ||
								"فشل في جلب المنتجات."}
						</div>
					) : products.length === 0 ? (
						<div className="text-center w-full">
							لا توجد منتجات في هذا القسم.
						</div>
					) : (
						products.map((product, index) => (
							<Product
								key={product.id || index}
								product={product}
							/>
						))
					)}
				</div>
			</div>
		</>
	);
}

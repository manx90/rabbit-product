import { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/api/productAPI";
import { useParams, useNavigate } from "react-router-dom";
const ProductPageContext = createContext();

// Utility to prefix image URLs
function prefixImgUrl(url) {
	if (!url) return "";
	if (url.startsWith("http")) return url;
	return `https://api.rabbit.ps/uploads/${url}`;
}

export function ProductPageProvider({ children }) {
	const { id } = useParams();
	const navigate = useNavigate();
	const [product, setProduct] = useState(null);
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [quantity, setQuantity] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProduct = async () => {
			setLoading(true);
			setError(null);
			try {
				const productId = parseInt(id);
				if (isNaN(productId)) {
					setError("Invalid product ID");
					setTimeout(() => {
						navigate(`/`);
					}, 2000);
					return;
				}

				const response = await Product.getAll({ id: productId });

				let foundProduct = null;
				if (response && response.data && response.data.length > 0) {
					foundProduct = response.data[0];
				}

				if (foundProduct) {
					// Prefix all image URLs
					const images = (foundProduct.images || []).map(prefixImgUrl);
					const imgCover = prefixImgUrl(foundProduct.imgCover);
					const imgSizeChart = prefixImgUrl(foundProduct.imgSizeChart);
					const imgMeasure = prefixImgUrl(foundProduct.imgMeasure);
					const colors = (foundProduct.colors || []).map(c => ({
						...c,
						imgColor: prefixImgUrl(c.imgColor)
					}));
					const sizeDetails = (foundProduct.sizeDetails || []).map(s => ({
						...s,
						quantities: (s.quantities || []).map(q => ({ ...q }))
					}));

					const productWithPrefixedImages = {
						...foundProduct,
						images,
						imgCover,
						imgSizeChart,
						imgMeasure,
						colors,
						sizeDetails
					};

					setProduct(productWithPrefixedImages);

					// Set default color/size
					if (colors.length > 0) {
						setSelectedColor(colors[0].name);
					}
					if (sizeDetails.length > 0) {
						setSelectedSize(sizeDetails[0].sizeName);
					}
				} else {
					setError("Product not found");
					setTimeout(() => {
						navigate(`/`);
					}, 2000);
				}
			} catch (err) {
				setError("Failed to fetch product data.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		if (id) {
			fetchProduct();
		}
	}, [id, navigate]);

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
				<p className="mt-2 text-gray-600">Redirecting to home page...</p>
			</div>
		);
	}

	if (!product) {
		return null;
	}

	// Find the selected sizeDetail
	const selectedSizeDetail = product.sizeDetails?.find(s => s.sizeName === selectedSize);
	// Find the quantity for the selected color in the selected size
	const colorQuantity = selectedSizeDetail?.quantities?.find(q => q.colorName === selectedColor)?.quantity || 0;

	const handleQuantityChange = (newQuantity) => {
		if (newQuantity >= 1 && newQuantity <= colorQuantity) {
			setQuantity(newQuantity);
		}
	};

	const value = {
		product,
		loading,
		error,
		selectedColor,
		setSelectedColor,
		selectedSize,
		setSelectedSize,
		quantity,
		setQuantity,
		handleQuantityChange,
		colorQuantity,
		prefixImgUrl, // Export utility for use in components
	};

	return (
		<ProductPageContext.Provider value={value}>
			{children}
		</ProductPageContext.Provider>
	);
}

export function useProductPage() {
	const context = useContext(ProductPageContext);
	if (!context) {
		throw new Error("useProductPage must be used within a ProductPageProvider");
	}
	return context;
}
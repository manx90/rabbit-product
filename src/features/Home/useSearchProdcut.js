import { useQuery } from "@tanstack/react-query";
import { Product } from "@/api/productAPI";

const useSearchProduct = (query) => {
	const { data: products, isLoading, error } = useQuery({
		queryKey: ["products", query],
		queryFn: () => Product.getAll({ q: query }),
	});
	return { products, isLoading, error };
};

export default useSearchProduct;

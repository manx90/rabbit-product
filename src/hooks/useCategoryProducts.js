import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Product as ProductAPI } from '@/api/productAPI';
import { processProductData } from '@/hooks/useProduct';

// Utility to prefix image URLs
function prefixImgUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${url}`;
}

export const useCategoryProducts = (categoryId, subcategoryId, limit = 200) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['categoryProducts', categoryId, subcategoryId],
    queryFn: async () => {
      const params = { categoryId };
      if (subcategoryId) {
        params.subCategory = subcategoryId;
      }
      params.limit = limit;
      const response = await ProductAPI.getAll(params);
      let fetchedProducts = response?.data || [];
      // Process all products and cache individual ones
      fetchedProducts = fetchedProducts.map((product) => {
        const processedProduct = processProductData(product);

        // Cache this individual product
        queryClient.setQueryData(
          ['product', String(product.id)],
          processedProduct
        );

        return processedProduct;
      });

      return fetchedProducts;
    },
    enabled: !!categoryId, // Only run the query if categoryId exists
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

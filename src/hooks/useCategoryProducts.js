import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Product as ProductAPI } from '@/api/productAPI';
import { processProductData } from '@/hooks/useProduct';

// // Utility to prefix image URLs
// function prefixImgUrl(url) {
//   if (!url) return '';
//   if (url.startsWith('http')) return url;
//   return `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${url}`;
// }

export const useCategoryProducts = (categoryId, subcategoryId, limit = 200) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['categoryProducts', categoryId, subcategoryId],
    queryFn: async () => {
      const params = {
        category: categoryId,
        limit,
      };
      if (subcategoryId) {
        params.subCategory = subcategoryId;
      }
      const response = await ProductAPI.getAll(params);
      let fetchedProducts = response?.data || [];
      fetchedProducts = fetchedProducts.map((product) => {
        const processedProduct = processProductData(product);
        queryClient.setQueryData(
          ['product', String(product.id)],
          processedProduct
        );

        return processedProduct;
      });

      return fetchedProducts;
    },
    enabled: !!categoryId,
    staleTime: 60 * 60 * 1000,
  });
};

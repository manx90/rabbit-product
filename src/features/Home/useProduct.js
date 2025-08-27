import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Product } from '@/api/productAPI';
import { processProductData } from '@/hooks/useProduct';

// Utility to prefix image URLs
function prefixImgUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${url}`;
}

export function useHomeProducts() {
  const queryClient = useQueryClient();

  const {
    data: response,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['homeProducts'],
    queryFn: () => Product.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Process the products to add image URL prefixes
  const product = response?.data
    ? response.data.map((product) => {
        const processedProduct = processProductData(product);

        // Also cache this individual product
        queryClient.setQueryData(
          ['product', String(product.id)],
          processedProduct
        );

        return processedProduct;
      })
    : [];

  return { product, isLoading, error };
}

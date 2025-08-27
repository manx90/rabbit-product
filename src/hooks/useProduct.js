import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Product as ProductAPI } from '@/api/productAPI';

// Utility to prefix image URLs
function prefixImgUrl(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${import.meta.env.VITE_RABBIT_PI_BASE_URL}/uploads/${url}`;
}

// Function to process product data (same as used in other hooks)
function processProductData(product) {
  const images = (product.images || []).map(prefixImgUrl);
  const imgCover = prefixImgUrl(product.imgCover);
  const imgSizeChart = prefixImgUrl(product.imgSizeChart);
  const imgMeasure = prefixImgUrl(product.imgMeasure);
  const colors = (product.colors || []).map((c) => ({
    ...c,
    imgColor: prefixImgUrl(c.imgColor),
  }));
  const sizeDetails = (product.sizeDetails || []).map((s) => ({
    ...s,
    quantities: (s.quantities || []).map((q) => ({
      ...q,
    })),
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
}

export const useProduct = (productId) => {
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['product', productId],
    queryFn: async () => {
      // Check if we already have this product in other caches
      const homeProducts = queryClient.getQueryData(['homeProducts']);
      const categoryQueries = queryClient.getQueriesData({
        queryKey: ['categoryProducts'],
      });

      // First, try to find the product in home products cache
      if (homeProducts?.length > 0) {
        const cachedProduct = homeProducts.find(
          (p) => String(p.id) === String(productId)
        );
        if (cachedProduct) {
          console.log('Found product in home cache, no API call needed');
          return cachedProduct;
        }
      }

      // Then try to find in any category products cache
      for (const [queryKey, data] of categoryQueries) {
        if (data?.length > 0) {
          const cachedProduct = data.find(
            (p) => String(p.id) === String(productId)
          );
          if (cachedProduct) {
            console.log('Found product in category cache, no API call needed');
            return cachedProduct;
          }
        }
      }

      // If not found in cache, fetch from API
      console.log('Product not in cache, fetching from API');
      const response = await ProductAPI.getAll({
        id: parseInt(productId),
      });

      if (response?.data && response.data.length > 0) {
        return processProductData(response.data[0]);
      }

      throw new Error('Product not found');
    },
    enabled: !!productId,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Export the processProductData function so it can be used by other hooks
export { processProductData };

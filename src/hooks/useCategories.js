import { useQuery } from '@tanstack/react-query';
import { Category } from '@/api/cateogryApi';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await Category.getAll();
      return response?.data || [];
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

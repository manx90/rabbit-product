import { useQuery } from "@tanstack/react-query";
import { Category as CategoryAPI } from "@/api/cateogryApi";

export const useSubcategories = (categoryId) => {
	return useQuery({
		queryKey: ["subcategories", categoryId],
		queryFn: async () => {
			if (!categoryId) return [];

			const response = await CategoryAPI.getOne(
				categoryId,
			);
			const subs = response?.subCategories || [];

			// Normalize the subcategories data
			return subs.map((sub) => ({
				id: sub.id || sub._id || sub,
				name: sub.name || sub,
			}));
		},
		enabled: !!categoryId, // Only run the query if categoryId exists
		staleTime: 60 * 60 * 1000, // 1 hour
	});
};

import { Collection as CollectionApi } from '@/api/cllectionApi';
import { useQuery } from '@tanstack/react-query';
export function useCollection() {
  return useQuery({
    queryKey: ['collection'],
    queryFn: async () => {
      const Collection = await CollectionApi.getCollection();
      return Collection;
    },
  });
}

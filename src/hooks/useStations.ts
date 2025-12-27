import { useQuery } from '@tanstack/react-query'
import { snotelAPI } from '@/services/api/snotel'
import { Station } from '@/types/station'

export const useStations = (params?: { network?: string; state?: string }) => {
  return useQuery<Station[], Error>({
    queryKey: ['stations', params],
    queryFn: () => snotelAPI.getStations(params),
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    retry: 2,
  })
}

import {useQuery} from '@tanstack/react-query';
import getPopularMovies from 'api/queries/getPopularMovies';

export default function useGetPopularMovies() {
  const {data, refetch, isLoading} = useQuery({
    queryKey: ['popularMovies'],
    queryFn: getPopularMovies,
  });

  return {
    popularMovies: data,
    refetchPopularMovies: refetch,
    isLoadingPopularMovies: isLoading,
  };
}

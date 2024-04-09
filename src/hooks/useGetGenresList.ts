import {useQuery} from '@tanstack/react-query';
import getMovieGenresList from 'api/queries/getMovieGenresList';

export default function useGetGenresList() {
  const {data, isLoading} = useQuery({
    queryFn: getMovieGenresList,
    queryKey: ['genres-list'],
  });

  return {
    genresList: data,
    isLoadingGenres: isLoading,
  };
}

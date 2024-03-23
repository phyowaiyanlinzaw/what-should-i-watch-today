import {useQuery} from '@tanstack/react-query';
import getMovieGenresList from 'api/queries/getMovieGenresList';

export default function useGetGenresList() {
  const {data} = useQuery({
    queryFn: getMovieGenresList,
    queryKey: ['genres-list'],
  });

  return {
    genresList: data,
  };
}

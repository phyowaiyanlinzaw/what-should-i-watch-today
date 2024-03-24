import {useMutation} from '@tanstack/react-query';
import findMoviesByGenres from 'api/mutations/findMoviesByGenres';
import {useLoadingModalStore} from 'stores/useLoadingModalStore';

export default function useMoviesByGenres() {
  const {closeLoading, openLoading} = useLoadingModalStore(state => state);

  const {mutateAsync} = useMutation({
    mutationFn: findMoviesByGenres,
    onMutate: () => {
      openLoading();
    },
    onError: error => {
      closeLoading();
      console.error('Error in useMoviesByGenres', error);
    },
    onSuccess: (res, req) => {
      closeLoading();
      console.log('Success in useMoviesByGenres', req);
      console.log('Success in useMoviesByGenres', res);
    },
  });

  const getMoviesByGenres = async (genres: number[]) => {
    return mutateAsync({genres});
  };

  return {
    getMoviesByGenres,
  };
}

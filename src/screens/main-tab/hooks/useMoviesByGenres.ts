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
      console.error(error);
    },
    onSuccess: (res, req) => {
      closeLoading();
    },
  });

  const getMoviesByGenres = async (genre: number) => {
    return mutateAsync({genre});
  };

  return {
    getMoviesByGenres,
  };
}

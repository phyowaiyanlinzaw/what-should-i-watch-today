import {useInfiniteQuery} from '@tanstack/react-query';
import getPopularMovies from 'api/queries/getPopularMovies';
import {AxiosResponse} from 'axios';
import axiosInstance from 'libs/axios/axiosInstance';
import {MovieListResponse} from 'src/@types/tmdb/declarations';

export default function useGetPopularMovies() {
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['popularMovies'],
      queryFn: async ({pageParam}) => {
        const response: AxiosResponse<MovieListResponse> =
          await axiosInstance.get('movie/popular', {
            params: {
              page: pageParam,
            },
          });
        let currentPage = response.data.page;
        let totalPages = response.data.total_pages;
        let nextPage = currentPage < totalPages ? currentPage + 1 : null;
        let movies = response.data.results;
        return {
          nextPage,
          movies,
        };
      },
      getNextPageParam: lastPage => lastPage?.nextPage,
      initialPageParam: 1,
    });

  return {
    popularMoviesData: data?.pages.map(page => page.movies).flat(),
    isFetchingNextPagePopularMovies: isFetchingNextPage,
    hasNextPagePopularMovies: hasNextPage,
    fetchNextPagePopularMovies: fetchNextPage,
  };
}

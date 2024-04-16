import {AxiosResponse} from 'axios';
import axiosInstance from 'libs/axios/axiosInstance';
import {MovieListResponse} from 'src/@types/tmdb/declarations';

export default async function getPopularMovies({page = 1}) {
  try {
    const res: AxiosResponse<MovieListResponse> = await axiosInstance.get(
      '/movie/popular',
      {
        params: {
          page,
        },
      },
    );
    let currentPage = res.data.page;
    let totalPages = res.data.total_pages;
    let nextPage = currentPage < totalPages ? currentPage + 1 : null;
    let movies = res.data.results;
    return {
      nextPage,
      movies,
    };
  } catch (error) {
    console.error('error at getPopularMovies: ', error);
  }
}

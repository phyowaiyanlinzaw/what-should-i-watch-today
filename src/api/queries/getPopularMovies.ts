import {AxiosResponse} from 'axios';
import axiosInstance from 'libs/axios/axiosInstance';
import {MovieListResponse} from 'src/@types/tmdb/declarations';

export default async function getPopularMovies() {
  try {
    const res: AxiosResponse<MovieListResponse> = await axiosInstance.get(
      '/movie/popular',
    );
    return res.data.results;
  } catch (error) {
    console.error('error at getPopularMovies: ', error);
  }
}

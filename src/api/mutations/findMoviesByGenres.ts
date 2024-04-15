import {AxiosResponse} from 'axios';
import axiosInstance from 'libs/axios/axiosInstance';
import {MovieListResponse} from 'src/@types/tmdb/declarations';

export default async function ({genre}: {genre: number}) {
  try {
    const response: AxiosResponse<MovieListResponse> = await axiosInstance.get(
      '/discover/movie',
      {
        params: {
          with_genres: genre,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error in findMoviesByGenres: ', error);
    throw error;
  }
}

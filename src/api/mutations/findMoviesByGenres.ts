import {AxiosResponse} from 'axios';
import axiosInstance from 'libs/axios/axiosInstance';
import {MovieListResponse} from 'src/@types/tmdb/declarations';

export default async function ({genres}: {genres: number[]}) {
  try {
    const response: AxiosResponse<MovieListResponse> = await axiosInstance.get(
      '/discover/movie',
      {
        params: {
          with_genres:
            genres.length > 1
              ? genres.slice(1).join('%2C')
              : genres[0].toString(),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error('Error in findMoviesByGenres: ', error);
    throw error;
  }
}

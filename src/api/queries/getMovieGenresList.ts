import axiosInstance from 'libs/axios/axiosInstance';

export type GenresListResponse = {
  genres: {
    id: number;
    name: string;
  }[];
};

export default async function getMovieGenresList() {
  try {
    const response = await axiosInstance.get<GenresListResponse>(
      '/genre/movie/list',
    );
    return response.data.genres;
  } catch (error) {
    console.error('error at getMovieGenresList: ', error);
    throw error;
  }
}

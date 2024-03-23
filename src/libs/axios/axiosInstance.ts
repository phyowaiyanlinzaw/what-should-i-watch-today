import axios from 'axios';
import {logger} from 'utils/logger';

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    append_to_response: 'credits,similar',
    language: 'en-US',
  },
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY2YmUxYjEzYTVkZjM5NDA3ZDlmNTgzZDU3OWQ1ZCIsInN1YiI6IjYzOWQ0MmNiOWJjZDBmMDA4YzUxYWFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.885dfzBlsRrx43OUWHaTqduAgiGGWup3fm2PSjcnjZw',
  },
  timeout: 90000,
  timeoutErrorMessage: 'Request timed out',
});

axiosInstance.interceptors.request.use(
  config => {
    logger('info', 'RequestObj', config.data);

    return config;
  },
  error => {
    throw error;
  },
);

axiosInstance.interceptors.response.use(
  config => {
    // logger('info', 'response_obj', config.data);
    logger('success', 'response_url', config.request.responseURL);

    return config;
  },
  err => {
    throw err;
  },
);

export default axiosInstance;

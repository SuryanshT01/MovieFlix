
import axios from 'axios';
import 'dotenv/config';
import { Movie, MovieDetails, Genre, Credits, Video } from '../types/movie';

// Note: In a real application, you would store this in environment variables
// For this demo, users need to replace this with their actual TMDb API key
   const API_KEY = process.env.TMDB_API_KEY || '';
   const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Add request interceptor to check for API key
api.interceptors.request.use((config) => {
  if (!API_KEY || API_KEY.length < 10) {
    throw new Error('Please set your TMDb API key in src/api/tmdb.ts');
  }
  return config;
});

export const getTrendingMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/trending/movie/week');
  return response.data.results;
};

export const getPopularMovies = async (): Promise<Movie[]> => {
  const response = await api.get('/movie/popular');
  return response.data.results;
};

export const searchMovies = async (query: string): Promise<Movie[]> => {
  const response = await api.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  const response = await api.get(`/movie/${id}`);
  return response.data;
};

export const getMovieCredits = async (id: string): Promise<Credits> => {
  const response = await api.get(`/movie/${id}/credits`);
  return response.data;
};

export const getMovieVideos = async (id: string): Promise<Video[]> => {
  const response = await api.get(`/movie/${id}/videos`);
  return response.data.results;
};

export const getGenres = async (): Promise<Genre[]> => {
  const response = await api.get('/genre/movie/list');
  return response.data.genres;
};

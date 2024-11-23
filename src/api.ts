const apiKey = process.env.REACT_APP_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

// 📺movie
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genres: IGenre[];
}
interface IGenre {
  id: number;
  name: string;
}
interface IVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}
export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetMovieVideosResult {
  id: number;
  results: IVideo[];
}

// 현재상영작
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${apiKey}&language=ko-KR`
  ).then((res) => res.json());
}

// 영화상세정보
export function getMovieDetails(movieId: number): Promise<IMovie> {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${apiKey}&language=ko-KR`
  ).then((res) => res.json());
}

// 영화예고편
export function getMovieVideos(
  movieId: number
): Promise<IGetMovieVideosResult> {
  return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${apiKey}`).then(
    (res) => res.json()
  );
}

// 고평점영화
export function getMoviesTopRated() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${apiKey}&language=ko-KR`
  ).then((res) => res.json());
}

// 인기작영화
export function getMoviesPopular() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${apiKey}&language=ko-KR`
  ).then((res) => res.json());
}

// 개봉예정작
export function getMoviesUpcoming() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${apiKey}&language=ko-KR`
  ).then((res) => res.json());
}

// 영화검색
export function getMoviesSearch(query: string): Promise<IGetMoviesResult> {
  return fetch(
    `${BASE_PATH}/search/movie?api_key=${apiKey}&language=ko-KR&query=${query}`
  ).then((res) => res.json());
}

// 📺tvShow
export interface TvSeries {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
}
export interface ITVShow {
  id: number;
  backdrop_path: string;
  poster_path: string;
  name: string;
  overview: string;
  results: TvSeries[];
  length: number;
}
export interface IGetTVShowVideosResult {
  id: number;
  results: IVideo[];
}
// 현재상영중
export function getTVshowsOnAir() {
  return fetch(
    `${BASE_PATH}/trending/tv/week?api_key=${apiKey}&language=ko-KR`
  ).then((res) => res.json());
}
// 예고편
export function getTVshowsVideos(
  tvId: number
): Promise<IGetTVShowVideosResult> {
  return fetch(`${BASE_PATH}/tv/${tvId}/videos?api_key=${apiKey}`).then((res) =>
    res.json()
  );
}

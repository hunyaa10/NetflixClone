const API_KEY = "4b3ccb2f68da628589d0d587dbeb8fea";
const BASE_PATH = "https://api.themoviedb.org/3";

// 데이터타입 지정
export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genres: IGenre[];
}

export interface IGenre {
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

// 현재상영작 데이터
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

// 영화 상세정보 데이터
export function getMovieDetails(movieId: number): Promise<IMovie> {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

// 영화예고편 데이터
export function getMovieVideos(
  movieId: number
): Promise<IGetMovieVideosResult> {
  return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}`).then(
    (res) => res.json()
  );
}

// 고평점 데이터
export function getMoviesTopRated() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

// 인기작 데이터
export function getMoviesPopular() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

// 개봉예정작 데이터
export function getMoviesUpcoming() {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

// tvShow Data
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

export function getTVshowsOnAir() {
  return fetch(
    `${BASE_PATH}/trending/tv/week?api_key=${API_KEY}&language=ko-KR`
  ).then((res) => res.json());
}

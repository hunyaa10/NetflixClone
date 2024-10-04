import { useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getMoviesTopRated,
  getMoviesPopular,
  getMoviesUpcoming,
  IGetMoviesResult,
} from "../api";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import MovieBanner from "../Components/movie-page/MovieBanner";
import MovieDetailModal from "../Components/modal/MovieDetailModal";
import MovieSlider from "../Components/movie-page/MovieSlider";

function Home() {
  const bigMovieMatch = useMatch("/movies/:movidId");

  // 현재 상영작 데이터
  const { data: nowPlayingData, isLoading: isLoadingNowPlaying } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "nowPlaying"],
      queryFn: getMovies,
    });

  // 고평점 영화 데이터
  const { data: topRatedData, isLoading: isLoadingTopRated } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "topRated"],
      queryFn: getMoviesTopRated,
    });

  // 인기작 데이터
  const { data: popularData, isLoading: isLoadingPopular } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "popular"],
      queryFn: getMoviesPopular,
    });

  // 개봉 예정작 데이터
  const { data: upcomingData, isLoading: isLoadingUpcoming } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "upcoming"],
      queryFn: getMoviesUpcoming,
    });

  const isLoading =
    isLoadingNowPlaying ||
    isLoadingTopRated ||
    isLoadingPopular ||
    isLoadingUpcoming;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <MovieBanner />
          <MovieSlider />

          {/* 영화 모달창 */}
          <AnimatePresence>
            {bigMovieMatch ? <MovieDetailModal /> : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Home;

// style
const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const Wrapper = styled.div`
  padding-bottom: 80px;
`;

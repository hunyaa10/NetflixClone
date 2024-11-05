import { useMatch } from "react-router-dom";
import {
  getMovies,
  getMoviesPopular,
  getMoviesTopRated,
  getMoviesUpcoming,
  IGetMoviesResult,
} from "../api";
import { useQuery } from "@tanstack/react-query";
import MovieBanner from "./movie-page/MovieBanner";
import MovieSlider from "./movie-page/MovieSlider";
import { AnimatePresence } from "framer-motion";
import MovieDetailModal from "./modal/MovieDetailModal";
import styled from "styled-components";

const HomePage = () => {
  const bigMovieMatch = useMatch("/movies/:movidId");

  const {
    isLoading: isLoadingNowPlaying,
    isError: isErrorNowPlaying,
    error: errorNowPlaying,
  } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });

  const {
    isLoading: isLoadingTopRated,
    isError: isErrorTopRated,
    error: errorTopRated,
  } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "topRated"],
    queryFn: getMoviesTopRated,
  });

  const {
    isLoading: isLoadingPopular,
    isError: isErrorPopular,
    error: errorPopular,
  } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "popular"],
    queryFn: getMoviesPopular,
  });

  const {
    isLoading: isLoadingUpcoming,
    isError: isErrorUpcoming,
    error: errorUpcoming,
  } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "upcoming"],
    queryFn: getMoviesUpcoming,
  });

  const isLoading =
    isLoadingNowPlaying ||
    isLoadingTopRated ||
    isLoadingPopular ||
    isLoadingUpcoming;

  const isError =
    isErrorNowPlaying || isErrorTopRated || isErrorPopular || isErrorUpcoming;

  const errorMessage =
    errorNowPlaying?.message ||
    errorTopRated?.message ||
    errorPopular?.message ||
    errorUpcoming?.message ||
    "알 수 없는 오류가 발생했습니다.";
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : isError ? (
        <ErrorMsg>{errorMessage}</ErrorMsg>
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
};

export default HomePage;

// style
const Loader = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
`;
const ErrorMsg = styled(Loader)``;
const Wrapper = styled.div`
  padding-bottom: 80px;
`;

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
const ErrorMsg = styled(Loader)``;
const Wrapper = styled.div`
  padding-bottom: 80px;
`;

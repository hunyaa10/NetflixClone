import { useMatch } from "react-router-dom";
import MovieBanner from "./movie-page/MovieBanner";
import MovieSlider from "./movie-page/MovieSlider";
import { AnimatePresence } from "framer-motion";
import MovieDetailModal from "./modal/MovieDetailModal";
import styled from "styled-components";

const HomePage = () => {
  const bigMovieMatch = useMatch("/movies/:movieId");

  return (
    <Wrapper>
      <MovieBanner />
      <MovieSlider />

      {/* 영화 모달창 */}
      <AnimatePresence>
        {bigMovieMatch ? <MovieDetailModal /> : null}
      </AnimatePresence>
    </Wrapper>
  );
};

export default HomePage;

// style
const Wrapper = styled.div`
  padding-bottom: 80px;
`;

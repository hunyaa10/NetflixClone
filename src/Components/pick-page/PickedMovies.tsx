import { useLikedMovies } from "../../context/LikedMoviesContext";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../../utilities";
import { theme } from "../../theme";

const PickedMovies = () => {
  const { likedMovies } = useLikedMovies();

  return (
    <Wrapper>
      <Title>내가 찜한 리스트</Title>
      <Movies>
        {likedMovies.length > 0
          ? likedMovies.map((movie) => (
              <Movie key={movie.id} bgImg={makeImagePath(movie.backdrop_path)}>
                <MovieTitle>{movie.title}</MovieTitle>
              </Movie>
            ))
          : "찜한 영화가 없습니다."}
      </Movies>
    </Wrapper>
  );
};

export default PickedMovies;

// style
const Wrapper = styled.div`
  padding: 5rem 3rem;
`;
const Title = styled.h2`
  margin-bottom: 2rem;
`;
const Movies = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem 1.5rem;
`;
const MovieTitle = styled(motion.div)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(transparent, #000);
  position: absolute;
  bottom: 0;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;
`;
const Movie = styled.div<{ bgImg: string }>`
  width: 240px;
  height: 140px;
  border-radius: 0.5rem;
  background-image: url(${(props) => props.bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0 0 10px 0 ${theme.white.opaciter};
  cursor: pointer;
  overflow: hidden;
  position: relative;
  &:hover ${MovieTitle} {
    opacity: 1;
  }
`;

import styled from "styled-components";
import { useLikedMovies } from "../context/LikedMoviesContext";
import { makeImagePath } from "../utilities";
import { motion } from "framer-motion";
import { useState } from "react";

function Pick() {
  const { likedMovies } = useLikedMovies();
  const [selectedMovie, setSelectedMovie] = useState<number | null>(null);

  const onMovieClick = (movieId: number) => {
    setSelectedMovie(movieId);
    document.body.style.overflow = "hidden";
  };

  return (
    <Wrapper>
      <Title>내가 찜한 리스트</Title>
      <Movies>
        {likedMovies.length > 0
          ? likedMovies.map((movie) => (
              <Movie
                key={movie.id}
                bgImg={makeImagePath(movie.backdrop_path)}
                onClick={() => onMovieClick(movie.id)}
              >
                <MovieTitle>{movie.title}</MovieTitle>
              </Movie>
            ))
          : "찜한 영화가 없습니다."}
      </Movies>
    </Wrapper>
  );
}
export default Pick;

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
  gap: 2rem 1rem;
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
  box-shadow: 0 0 10px 0 #ffffff92;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  &:hover ${MovieTitle} {
    opacity: 1;
  }
`;

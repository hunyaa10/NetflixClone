import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getMoviesSearch, IGetMoviesResult } from "../../api";
import styled from "styled-components";
import { motion } from "framer-motion";
import { makeImagePath } from "../../utilities";
import { theme } from "../../theme";

interface SearchMoviesProps {
  query: string;
}

const SearchMovies: React.FC<SearchMoviesProps> = ({ query }) => {
  const { data, isLoading, isError } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "search", query],
    queryFn: () => getMoviesSearch(query),
  });

  if (isLoading) {
    return <Loader>영화검색목록 로딩중...</Loader>;
  } else if (isError) {
    return <Error>영화검색목록을 로딩하는중 오류가 발생했습니다</Error>;
  }

  return (
    <Wrapper>
      <Title>검색결과</Title>
      <Movies>
        {data?.results.map((movie) => (
          <Movie key={movie.id} bgImg={makeImagePath(movie.backdrop_path)}>
            <MovieTitle>{movie.title}</MovieTitle>
          </Movie>
        ))}
      </Movies>
    </Wrapper>
  );
};

export default SearchMovies;

// style
const Loader = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: ${theme.white.darker};
`;
const Error = styled(Loader)`
  color: ${theme.red};
`;
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
  box-shadow: 0 0 10px 0 ${theme.white.darker};
  cursor: pointer;
  overflow: hidden;
  position: relative;
  &:hover ${MovieTitle} {
    opacity: 1;
  }
`;

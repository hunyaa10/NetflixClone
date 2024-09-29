import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../../utilities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IGetMoviesResult } from "../../api";

// icon
import DoubleRight from "../../icon/double-right.svg";

interface SliderProps {
  category: {
    queryFn: () => Promise<IGetMoviesResult>;
    title: string;
  };
}

// 한 화면에 보여줄 영화갯수
const offset = 6;

// row 슬라이드
const rowVariants = {
  hidden: {
    x: window.outerWidth,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth,
  },
};

// movie 호버시 사이즈
const MovieVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
    y: -40,
    transition: { delay: 0.5, duration: 0.3, type: "tween" },
  },
};

// movie 호버 시 타이틀
const infoVariants = {
  hover: {
    opacity: 1,
  },
};

const Slider = ({ category }: SliderProps) => {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const { data, isLoading } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", category.title],
    queryFn: category.queryFn,
  });

  const increaseIndex = (totalMovies: number) => {
    if (leaving) return;
    toggleLeaving();
    const maxIndex = Math.ceil(totalMovies / offset) - 1;
    setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const onMovieClick = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    document.body.style.overflow = "hidden";
  };

  if (isLoading) return null;

  return (
    <SliderWrapper>
      <SliderBox>
        <SliderTitle>{category.title}</SliderTitle>
        <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
          <Row
            key={`movies-${index}`}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Movie
                  key={movie.id}
                  bgImg={makeImagePath(movie.backdrop_path)}
                  variants={MovieVariants}
                  initial="normal"
                  whileHover="hover"
                  transition={{ type: "tween" }}
                  onClick={() => onMovieClick(movie.id)}
                >
                  <MovieInfo variants={infoVariants}>
                    <p>{movie.title}</p>
                  </MovieInfo>
                </Movie>
              ))}
          </Row>
        </AnimatePresence>
        <SliderBtn onClick={() => increaseIndex(data?.results.length || 0)}>
          <img src={DoubleRight} style={{ width: "32px" }} />
        </SliderBtn>
      </SliderBox>
    </SliderWrapper>
  );
};

export default Slider;

// style
const SliderWrapper = styled.div`
  margin-bottom: 180px;
`;
const SliderBox = styled.div`
  padding-left: 2rem;
  position: relative;
  top: -100px;
`;
const SliderTitle = styled.h4`
  padding: 0 0 1rem 1rem;
  color: rgba(255, 255, 255, 0.9);
  font-size: 20px;
`;
const Row = styled(motion.div)`
  width: 100%;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  position: absolute;
`;
const Movie = styled(motion.div)<{ bgImg: string }>`
  height: 140px;
  border-radius: 0.5rem;
  background-image: url(${(props) => props.bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  cursor: pointer;
  overflow: hidden;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;
const MovieInfo = styled(motion.div)`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(transparent, #000);
  opacity: 0;
  position: absolute;
  bottom: 0;
  p {
    font-weight: 600;
  }
`;
const SliderBtn = styled.button`
  width: 40px;
  height: 160px;
  position: absolute;
  right: 0;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

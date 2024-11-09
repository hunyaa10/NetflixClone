import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../../utilities";
import { useNavigate } from "react-router-dom";
import { IGetMoviesResult } from "../../api";

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
const infoVariants = {
  hover: {
    opacity: 1,
  },
};

interface SliderRowProps {
  index: number;
  data: IGetMoviesResult | undefined;
  offset: number;
  toggleLeaving: () => void;
}

const SliderRow = ({ index, data, offset, toggleLeaving }: SliderRowProps) => {
  const navigate = useNavigate();

  const onClickMovie = (movieId: number) => {
    navigate(`/movies/${movieId}`);
    document.body.style.overflow = "hidden";
  };
  return (
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
              $bgimg={makeImagePath(movie.backdrop_path)}
              variants={MovieVariants}
              initial="normal"
              whileHover="hover"
              transition={{ type: "tween" }}
              onClick={() => onClickMovie(movie.id)}
            >
              <MovieInfo variants={infoVariants}>
                <p>{movie.title}</p>
              </MovieInfo>
            </Movie>
          ))}
      </Row>
    </AnimatePresence>
  );
};

export default SliderRow;

// style
const Row = styled(motion.div)`
  width: 100%;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 0.5rem;
  position: absolute;
`;
const Movie = styled(motion.div)<{ $bgimg: string }>`
  height: 140px;
  border-radius: 0.5rem;
  background-image: url(${(props) => props.$bgimg});
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

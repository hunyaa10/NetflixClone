import { useQuery } from "@tanstack/react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetails, IMovie } from "../../api";
import { motion } from "framer-motion";
import MovieModalOverview from "./MovieModalOverview";
import MovieModalTrailer from "./MovieModalTrailer";
import MovieModalInfo from "./MovieModalInfo";
import { theme } from "../../theme";

const MovieDetailModal = () => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movieId");

  const handleClickBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const onCloseModal = () => {
    navigate("/home");
    document.body.style.overflow = "";
  };

  const movieId = bigMovieMatch?.params.movieId
    ? Number(bigMovieMatch.params.movieId)
    : undefined;

  const { data: movieDetails } = useQuery<IMovie | undefined>({
    queryKey: ["movieDetails", movieId],
    queryFn: () =>
      movieId ? getMovieDetails(movieId) : Promise.resolve(undefined),
    enabled: movieId !== undefined,
  });

  return (
    <Overlay onClick={onCloseModal}>
      <InfoBox onClick={handleClickBlock}>
        {movieDetails && (
          <>
            <MovieModalTrailer movieId={movieId} />
            <MovieModalInfo movieDetails={movieDetails} />
            <MovieModalOverview overview={movieDetails.overview} />
          </>
        )}
      </InfoBox>
    </Overlay>
  );
};

export default MovieDetailModal;

// style
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 999;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const InfoBox = styled(motion.div)`
  position: relative;
  width: 40vw;
  height: 80vh;
  background-color: #000;
  border: 1px solid ${theme.red.opaciter};
  box-shadow: 0 0 30px -10px ${theme.red.original};
  border-radius: 1rem;
  overflow-y: scroll;
`;

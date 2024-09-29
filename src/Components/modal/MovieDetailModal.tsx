import { useQuery } from "@tanstack/react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getMovieDetails,
  getMovieVideos,
  IGetMovieVideosResult,
  IMovie,
} from "../../api";
import { motion } from "framer-motion";

// icon
import PlusIcon from "../../icon/plus-circle.svg";
import ThumbUpIcon from "../../icon/thumb-up.svg";
import ThumbDownIcon from "../../icon/thumb-down.svg";

const MovieDetailModal = () => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movidId");

  // 모달창 오버레이
  const onOverlayClick = () => {
    navigate("/");
    document.body.style.overflow = "";
  };

  // 영화상세정보 데이터
  const movieId = bigMovieMatch?.params.movidId
    ? Number(bigMovieMatch.params.movidId)
    : undefined;

  const { data: movieDetails } = useQuery<IMovie | undefined>({
    queryKey: ["movieDetails", movieId],
    queryFn: () =>
      movieId ? getMovieDetails(movieId) : Promise.resolve(undefined),
    enabled: movieId !== undefined,
  });

  // 영화예고편 데이터
  const { data: movieVideos } = useQuery<IGetMovieVideosResult | undefined>({
    queryKey: ["movieVideos", movieId],
    queryFn: () =>
      movieId ? getMovieVideos(movieId) : Promise.resolve(undefined),
    enabled: movieId !== undefined,
  });

  return (
    <>
      <Overlay onClick={onOverlayClick} />
      <InfoBox>
        {movieDetails && (
          <>
            {movieVideos && movieVideos.results.length > 0 && (
              <VideoTrailer>
                <VideoFrame
                  key={movieVideos.results[0].id}
                  src={`https://www.youtube.com/embed/${movieVideos.results[0].key}?controls=0&showinfo=0&rel=0`}
                  title={movieVideos.results[0].name}
                  allowFullScreen
                />
                <InfoTitle>{movieDetails.title}</InfoTitle>
              </VideoTrailer>
            )}
            {console.log(movieDetails.id)}
            <InfoNav>
              <InfoBtns>
                <InfoBtn src={PlusIcon} />
                <InfoBtn src={ThumbUpIcon} />
                <InfoBtn src={ThumbDownIcon} />
              </InfoBtns>
              <InfoGenre>
                {movieDetails.genres
                  .slice(0, 3)
                  .map((g) => g.name)
                  .join(" • ")}
              </InfoGenre>
            </InfoNav>
            {movieDetails.overview ? (
              <InfoText>{movieDetails.overview}</InfoText>
            ) : (
              <InfoTextNone>정보없음</InfoTextNone>
            )}
          </>
        )}
      </InfoBox>
    </>
  );
};

export default MovieDetailModal;

// style
const InfoBox = styled(motion.div)`
  position: fixed;
  z-index: 999;
  width: 40vw;
  height: 80vh;
  background-color: #000;
  border: 1px solid #e5101350;
  box-shadow: 0 0 30px -10px ${(props) => props.theme.red};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 1rem;
  overflow-y: scroll;
`;
const VideoTrailer = styled.div`
  width: 100%;
  height: auto;
  position: relative;
`;
const VideoFrame = styled.iframe`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  margin: 10px 0;
  border: none;
`;
const InfoTitle = styled.h2`
  width: 100%;
  padding: 1rem;
  position: absolute;
  bottom: 10px;
  background: linear-gradient(transparent, #000 70%);
`;
const InfoNav = styled.div`
  width: 100%;
  padding: 0.5rem 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InfoBtns = styled.div`
  display: flex;
`;
const InfoBtn = styled.img`
  width: 32px;
  margin-right: 1rem;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const InfoGenre = styled.div``;
const InfoText = styled.p`
  padding: 1rem;
  font-size: 14px;
  letter-spacing: 2px;
  line-height: 2;
`;
const InfoTextNone = styled.p`
  padding: 1rem;
  font-size: 14px;
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 998;
  top: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

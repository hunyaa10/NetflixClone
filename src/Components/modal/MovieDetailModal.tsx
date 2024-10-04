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
import { useLikedMovies } from "../../context/LikedMoviesContext";

// icon
import ThumbUpIcon from "../../icon/thumb-up.svg";
import ThumbDownIcon from "../../icon/thumb-down.svg";
import { useState } from "react";

const MovieDetailModal = () => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/movies/:movidId");
  const { addLikedMovie } = useLikedMovies();
  const [isFilled, setIsFilled] = useState(false);

  const handleClickHeart = () => {
    setIsFilled(!isFilled);
  };
  // 찜 영화
  const handleAddLikedList = (movie: IMovie) => {
    handleClickHeart();
    addLikedMovie(movie);
    // console.log(movie);
  };

  // 이벤트버블링 방지
  const handleClickBlock = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 모달창 오버레이
  const onCloseModal = () => {
    navigate("/home");
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
    <Overlay onClick={onCloseModal}>
      <InfoBox onClick={handleClickBlock}>
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
              </VideoTrailer>
            )}
            {/* {console.log(movieDetails)} */}
            <InfoNav>
              <InfoTitle>{movieDetails.title}</InfoTitle>
              <InfoElements>
                <InfoBtns>
                  <InfoBtn onClick={() => handleAddLikedList(movieDetails)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isFilled ? "#fff" : "none"}
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#fff"
                      className="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                      />
                    </svg>
                  </InfoBtn>
                  <InfoBtn>
                    <BtnIcon src={ThumbUpIcon} alt="thumbup" />
                  </InfoBtn>
                  <InfoBtn>
                    <BtnIcon src={ThumbDownIcon} alt="thumbdown" />
                  </InfoBtn>
                </InfoBtns>
                <InfoGenre>
                  {movieDetails.genres
                    .slice(0, 3)
                    .map((g) => g.name)
                    .join(" • ")}
                </InfoGenre>
              </InfoElements>
            </InfoNav>
            {movieDetails.overview ? (
              <InfoText>{movieDetails.overview}</InfoText>
            ) : (
              <InfoTextNone>정보없음</InfoTextNone>
            )}
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
  border: 1px solid #e5101350;
  box-shadow: 0 0 30px -10px ${(props) => props.theme.red};
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
  border: none;
`;
const InfoNav = styled.div`
  padding: 0.5rem 1rem;
`;
const InfoTitle = styled.h2``;
const InfoElements = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const InfoBtns = styled.div`
  display: flex;
  align-items: center;
`;
const InfoBtn = styled.button`
  width: 32px;
  margin-right: 1rem;
  cursor: pointer;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;
const BtnIcon = styled.img`
  width: 100%;
`;
const InfoGenre = styled.div``;
const InfoText = styled.p`
  padding: 0 1rem;
  padding-bottom: 1rem;
  font-size: 14px;
  letter-spacing: 2px;
  line-height: 2;
`;
const InfoTextNone = styled.p`
  padding: 0 1rem;
  font-size: 14px;
`;

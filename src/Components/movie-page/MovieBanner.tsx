import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { makeImagePath } from "../../utilities";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  getMovies,
  getMovieVideos,
  IGetMoviesResult,
  IGetMovieVideosResult,
} from "../../api";

// icon
import ThumbUpIcon from "../../icon/thumb-up.svg";
import ThumbDownIcon from "../../icon/thumb-down.svg";
import PlayIcon from "../../icon/play.svg";

const MovieBanner = () => {
  // 베너 예고편 상태관리
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  // 현재 상영작 데이터
  const { data: nowPlayingData, isLoading: isLoadingNowPlaying } =
    useQuery<IGetMoviesResult>({
      queryKey: ["movies", "nowPlaying"],
      queryFn: getMovies,
    });

  // 베너 영화데이터(현재상영작의 첫번째영화데이터)
  const firstMovieId = nowPlayingData?.results[0].id;
  const { data: firstMovieVideos } = useQuery<
    IGetMovieVideosResult | undefined
  >({
    queryKey: ["movieVideos", firstMovieId],
    queryFn: () =>
      firstMovieId ? getMovieVideos(firstMovieId) : Promise.resolve(undefined),
    enabled: firstMovieId !== undefined,
  });

  // 플레이 아이콘 클릭 시 예고편 모달창
  const onPlayIconClick = () => {
    if (firstMovieVideos && firstMovieVideos.results.length > 0) {
      setTrailerKey(firstMovieVideos.results[0].key);
      setShowTrailer(true);
    }
  };

  const bannerOverlayClick = () => {
    setShowTrailer(false);
  };

  return (
    <>
      <Banner
        bgImg={makeImagePath(nowPlayingData?.results[0].backdrop_path || "")}
      >
        <BannerText>
          <Title>{nowPlayingData?.results[0].title}</Title>
          <Overview>{nowPlayingData?.results[0].overview}</Overview>
          <InfoBtns>
            <InfoBtn src={PlayIcon} onClick={onPlayIconClick} />
            <InfoBtn src={ThumbUpIcon} />
            <InfoBtn src={ThumbDownIcon} />
          </InfoBtns>
        </BannerText>
      </Banner>

      {/* 베너 예고편 모달창*/}
      <AnimatePresence>
        {showTrailer && trailerKey && (
          <BannerTrailerOverlay onClick={bannerOverlayClick}>
            <BannerTrailer>
              <BannerVideoFrame
                src={`https://www.youtube.com/embed/${trailerKey}?controls=0&showinfo=0&rel=0`}
                title="Trailer"
                allowFullScreen
              />
            </BannerTrailer>
          </BannerTrailerOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

export default MovieBanner;

//style

const Banner = styled.div<{ bgImg: string }>`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.bgImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
const BannerText = styled.div`
  width: 35vw;
  flex-direction: column;
  position: relative;
  top: 40%;
  left: 3rem;
  font-size: 18px;
`;
const Title = styled.h1`
  margin-bottom: 1rem;
  font-size: 6vw;
`;
const Overview = styled.p`
  margin-bottom: 2rem;
  letter-spacing: 1px;
  line-height: 1.7;
`;
const BannerTrailerOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const BannerTrailer = styled.div`
  width: 50vw;
  height: auto;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 1px solid #ffffff64;
  box-shadow: 0 0 50px 0 #ffffff64;
`;
const BannerVideoFrame = styled.iframe`
  width: 100%;
  height: auto;
  aspect-ratio: 16 / 9;
  border: none;
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

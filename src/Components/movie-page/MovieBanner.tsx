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
import MovieBnText from "./MovieBnText";

const MovieBanner = () => {
  const [showTrailer, setShowTrailer] = useState<boolean>(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);

  const { data: nowPlayingData } = useQuery<IGetMoviesResult>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: getMovies,
  });

  // 베너: 현재상영작의 첫번째영화
  const firstMovieId = nowPlayingData?.results[0].id;
  const { data: firstMovieVideos } = useQuery<
    IGetMovieVideosResult | undefined
  >({
    queryKey: ["movieVideos", firstMovieId],
    queryFn: () =>
      firstMovieId ? getMovieVideos(firstMovieId) : Promise.resolve(undefined),
    enabled: firstMovieId !== undefined,
  });

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
        $bgimg={makeImagePath(nowPlayingData?.results[0].backdrop_path || "")}
      >
        <MovieBnText
          nowPlayingData={nowPlayingData}
          onPlayIconClick={onPlayIconClick}
        />
      </Banner>
      {/* 베너 예고편 모달창*/}
      <AnimatePresence>
        {showTrailer && trailerKey && (
          <BannerTrailerOverlay onClick={bannerOverlayClick}>
            <BannerTrailer>
              <BannerVideoFrame
                src={`https://www.youtube.com/embed/${trailerKey}`}
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
const Banner = styled.div<{ $bgimg: string }>`
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)),
    url(${(props) => props.$bgimg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
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
